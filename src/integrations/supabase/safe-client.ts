/**
 * Safe Supabase client wrapper.
 *
 * The auto-generated `./client` module calls `createClient(URL, KEY)` at
 * import time and throws synchronously if either env var is missing —
 * which crashes the whole bundle. This wrapper:
 *
 *  - Builds cleanly even when VITE_SUPABASE_* are absent.
 *  - Creates the real client only when env is configured.
 *  - Exposes a Proxy stub that logs a clear warning on any access when
 *    env is missing, instead of throwing at module init.
 *
 * Usage:
 *   import { supabase, isSupabaseConfigured } from "@/integrations/supabase/safe-client";
 *   if (isSupabaseConfigured) { ... }
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
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
  const disabledError = new Error("Supabase not configured");
  const queryResponse = {
    data: null,
    error: disabledError,
    count: null,
    status: 0,
    statusText: "Supabase not configured",
  };

  const makeQueryStub = (): any => {
    let proxy: any;
    const promise = Promise.resolve(queryResponse);
    const handler: ProxyHandler<(...args: unknown[]) => any> = {
      get(_target, prop) {
        warnOnce();
        if (prop === "then") return promise.then.bind(promise);
        if (prop === "catch") return promise.catch.bind(promise);
        if (prop === "finally") return promise.finally.bind(promise);
        return () => proxy;
      },
      apply() {
        warnOnce();
        return proxy;
      },
    };
    proxy = new Proxy(() => proxy, handler);
    return proxy;
  };

  const asyncResponse = <T,>(data: T) => Promise.resolve({ data, error: disabledError });

  const authStub = {
    getSession: () => asyncResponse({ session: null }),
    getUser: () => asyncResponse({ user: null }),
    signUp: () => asyncResponse({ user: null, session: null }),
    signInWithPassword: () => asyncResponse({ user: null, session: null }),
    signOut: () => Promise.resolve({ error: disabledError }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => undefined,
        },
      },
    }),
  };

  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_target, prop) {
      warnOnce();
      if (prop === "auth") return authStub;
      if (prop === "functions") return { invoke: () => asyncResponse(null) };
      if (prop === "from" || prop === "rpc") return () => makeQueryStub();
    },
      if (prop === "channel") {
        return () => ({
          on: () => ({ subscribe: () => ({ unsubscribe: () => undefined }) }),
          subscribe: () => ({ unsubscribe: () => undefined }),
          unsubscribe: () => undefined,
        });
      }
      return makeQueryStub();
    },
  };
  return new Proxy({}, handler) as unknown as SupabaseClient<Database>;
}

export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : makeStub();
