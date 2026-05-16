/**
 * Safe Supabase client wrapper.
 *
 * The auto-generated `./client` module calls `createClient(URL, KEY)` at
 * import time and throws synchronously if either env var is missing —
 * which crashes the whole bundle. This wrapper:
 *
 *  - Builds cleanly even when VITE_SUPABASE_* are absent.
 *  - Lazy-loads the real client only when env is configured.
 *  - Exposes a Proxy stub that logs a clear warning on any access when
 *    env is missing, instead of throwing at module init.
 *
 * Usage:
 *   import { supabase, isSupabaseConfigured } from "@/integrations/supabase/safe-client";
 *   if (isSupabaseConfigured) { ... }
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured: boolean = Boolean(SUPABASE_URL && SUPABASE_KEY);

function warnOnce(): void {
  if ((warnOnce as { fired?: boolean }).fired) return;
  (warnOnce as { fired?: boolean }).fired = true;
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are missing. " +
      "Supabase calls are disabled. Republish the app so Lovable Cloud bundles the latest env vars."
  );
}

function makeStub(): SupabaseClient<Database> {
  const handler: ProxyHandler<object> = {
    get(_t, prop) {
      warnOnce();
      // Return a recursive proxy so chained calls like supabase.from(..).select(..) don't throw.
      // Terminal awaits resolve to an error-shaped response compatible with PostgrestResponse.
      const fn = () => Promise.resolve({ data: null, error: new Error("Supabase not configured") });
      return new Proxy(fn, handler);
    },
    apply() {
      warnOnce();
      return new Proxy(() => Promise.resolve({ data: null, error: new Error("Supabase not configured") }), handler);
    },
  };
  return new Proxy({}, handler) as unknown as SupabaseClient<Database>;
}

let _supabase: SupabaseClient<Database>;
if (isSupabaseConfigured) {
  // Import the real client lazily via require-style dynamic import resolved at module load.
  // Using a synchronous re-export pattern: the auto-generated client is safe to import here
  // because we've verified env exists.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  _supabase = (await import("./client")).supabase;
} else {
  _supabase = makeStub();
}

export const supabase = _supabase;
