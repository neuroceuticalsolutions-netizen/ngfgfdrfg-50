/**
 * Client-side cooldown / abuse guards for auth + transactional email
 * triggers.
 *
 * IMPORTANT: This is a UX guard, not a security control. A determined
 * attacker can bypass it by avoiding the UI. Real protection comes from:
 *   - Supabase Auth's built-in per-email and per-IP throttles
 *   - The Lovable email queue's retry/dedupe + 429 backoff
 *   - The `suppressed_emails` table (bounces/complaints auto-block)
 *
 * What this module provides:
 *   - Per-action cooldowns persisted in localStorage (survive reloads /
 *     duplicate tabs)
 *   - Per-(action, target) cooldowns so spamming the same email is blocked
 *     even if the target changes between attempts
 *   - A friendly remaining-seconds counter for UI countdowns
 *   - A helper that turns Supabase's "over_email_send_rate_limit" /
 *     429 errors into a clear message
 */
import { useEffect, useState, useCallback } from "react";

const STORAGE_PREFIX = "lovable.rate.";

/** Default cooldowns (seconds). Tuned to match Supabase Auth's own
 *  defaults so the UX matches what the server will accept anyway. */
export const COOLDOWNS = {
  signup: 60,
  signin: 5, // light debounce only — wrong-password retry is allowed
  recovery: 60,
  magicLink: 60,
  resendVerification: 60,
  partnerApply: 30,
  partnerStatusEmail: 10,
} as const;

export type RateLimitAction = keyof typeof COOLDOWNS;

/** Stable key for an action + optional target (e.g. email). Targets are
 *  lowercased so "Foo@x" and "foo@x" share a cooldown. */
function storageKey(action: RateLimitAction, target?: string) {
  const t = target ? `:${target.trim().toLowerCase()}` : "";
  return `${STORAGE_PREFIX}${action}${t}`;
}

function readUntil(key: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = window.localStorage.getItem(key);
    const n = v ? Number(v) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function writeUntil(key: string, untilMs: number) {
  if (typeof window === "undefined") return;
  try {
    if (untilMs <= Date.now()) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, String(untilMs));
  } catch {
    /* ignore quota / private mode */
  }
}

/** Returns remaining cooldown in seconds (0 if allowed). */
export function getCooldownRemaining(
  action: RateLimitAction,
  target?: string
): number {
  const until = Math.max(
    readUntil(storageKey(action)),
    target ? readUntil(storageKey(action, target)) : 0
  );
  const ms = until - Date.now();
  return ms > 0 ? Math.ceil(ms / 1000) : 0;
}

/** Start the cooldown clock. Use right BEFORE firing the request so the
 *  guard is in place even if the user reloads mid-request. */
export function startCooldown(
  action: RateLimitAction,
  target?: string,
  seconds = COOLDOWNS[action]
) {
  const until = Date.now() + seconds * 1000;
  writeUntil(storageKey(action), until);
  if (target) writeUntil(storageKey(action, target), until);
}

/** Clear a cooldown (e.g. after a definitive failure where you want to
 *  let the user retry immediately, like a wrong-password sign-in). */
export function clearCooldown(action: RateLimitAction, target?: string) {
  writeUntil(storageKey(action), 0);
  if (target) writeUntil(storageKey(action, target), 0);
}

/** React hook: live remaining seconds, ticks every 1s while > 0. */
export function useCooldown(action: RateLimitAction, target?: string) {
  const compute = useCallback(
    () => getCooldownRemaining(action, target),
    [action, target]
  );
  const [remaining, setRemaining] = useState(compute);

  useEffect(() => {
    setRemaining(compute());
    if (compute() <= 0) return;
    const id = window.setInterval(() => {
      const r = compute();
      setRemaining(r);
      if (r <= 0) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [compute]);

  // Re-sync if another tab updates the cooldown.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith(STORAGE_PREFIX)) setRemaining(compute());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [compute]);

  return {
    remaining,
    blocked: remaining > 0,
    /** Trigger the cooldown now (call right before firing the request). */
    arm: (seconds?: number) => {
      startCooldown(action, target, seconds);
      setRemaining(getCooldownRemaining(action, target));
    },
    reset: () => {
      clearCooldown(action, target);
      setRemaining(0);
    },
  };
}

/** Map Supabase Auth / Edge Function rate-limit errors into a clear,
 *  user-friendly message and (when possible) a recommended cooldown. */
export function describeRateLimitError(err: unknown): {
  isRateLimit: boolean;
  message: string;
  retryAfterSec?: number;
} {
  const e = err as
    | {
        message?: string;
        status?: number;
        code?: string;
        name?: string;
      }
    | null;
  const msg = (e?.message ?? "").toLowerCase();
  const code = (e?.code ?? "").toLowerCase();
  const status = e?.status;

  const isRl =
    status === 429 ||
    code === "over_email_send_rate_limit" ||
    code === "over_request_rate_limit" ||
    msg.includes("rate limit") ||
    msg.includes("too many requests") ||
    msg.includes("for security purposes");

  if (!isRl) {
    return { isRateLimit: false, message: e?.message ?? "Request failed" };
  }

  // Supabase often says: "For security purposes, you can only request this
  // after N seconds." Try to extract N.
  const m = (e?.message ?? "").match(/after\s+(\d+)\s+seconds?/i);
  const retryAfterSec = m ? Number(m[1]) : undefined;

  return {
    isRateLimit: true,
    retryAfterSec,
    message: retryAfterSec
      ? `Too many requests. Please wait ${retryAfterSec}s and try again.`
      : "Too many requests. Please wait a moment and try again.",
  };
}
