import * as Sentry from "@sentry/react"
import { supabase } from "@/integrations/supabase/client"

const DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined

let initialized = false

export function initSentry() {
  if (initialized) return
  if (!import.meta.env.PROD) return
  if (!DSN) return

  Sentry.init({
    dsn: DSN,
    environment: "production",
    // Errors only — no tracing, no session replay
    tracesSampleRate: 0,
    // Strip potentially sensitive query strings / hash fragments from URLs
    sendDefaultPii: false,
    beforeSend(event) {
      try {
        if (event.request?.url) {
          const u = new URL(event.request.url)
          event.request.url = `${u.origin}${u.pathname}`
        }
      } catch {
        // ignore
      }
      return event
    },
  })

  initialized = true

  // Anonymous, per-tab session id (no PII). Stored only in sessionStorage.
  try {
    const KEY = "sentry_anon_session_id"
    let sid = sessionStorage.getItem(KEY)
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem(KEY, sid)
    }
    Sentry.setUser({ id: sid })
  } catch {
    // sessionStorage may be unavailable — continue without it
  }

  // Attach a hashed auth user id when signed in (no email, no PII).
  // The hash is irreversible from Sentry's side and lets you correlate
  // multiple errors from the same account without exposing identity.
  void attachAuthContext()
  supabase.auth.onAuthStateChange((_event, session) => {
    void applyUserId(session?.user?.id)
  })
}

async function attachAuthContext() {
  try {
    const { data } = await supabase.auth.getSession()
    await applyUserId(data.session?.user?.id)
  } catch {
    // ignore
  }
}

async function applyUserId(userId?: string) {
  if (!initialized) return
  if (!userId) {
    Sentry.setTag("auth", "anonymous")
    return
  }
  const hashed = await sha256(userId)
  Sentry.setTag("auth", "authenticated")
  Sentry.setUser({
    id: sessionStorage.getItem("sentry_anon_session_id") ?? undefined,
    // Non-reversible hash of the auth user id
    username: `u_${hashed.slice(0, 16)}`,
  })
}

async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", buf)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export { Sentry }