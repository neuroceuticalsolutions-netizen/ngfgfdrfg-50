import * as Sentry from "@sentry/react"
import { supabase } from "@/integrations/supabase/client"

const DSN =
  (import.meta.env.VITE_SENTRY_DSN as string | undefined) ||
  "https://769c947bf850e52964ed9134626415e0@o4511349450932224.ingest.de.sentry.io/4511349480292432"

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

  // Anonymous, per-tab session id used as a fallback when no auth user is present.
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
    Sentry.setTag("auth", "anonymous")
  } catch {
    // sessionStorage may be unavailable — continue without it
  }

  // Attach the signed-in user's identity (id, email) and organization role
  // so every captured event is tied to the right account.
  void attachAuthContext()
  supabase.auth.onAuthStateChange((_event, session) => {
    void applyUser(session?.user ?? null)
  })
}

async function attachAuthContext() {
  try {
    const { data } = await supabase.auth.getSession()
    await applyUser(data.session?.user ?? null)
  } catch {
    // ignore
  }
}

type AuthUserLike = {
  id: string
  email?: string | null
}

async function applyUser(user: AuthUserLike | null) {
  if (!initialized) return
  if (!user) {
    Sentry.setTag("auth", "anonymous")
    Sentry.setTag("org_role", "anonymous")
    Sentry.setUser({
      id: sessionStorage.getItem("sentry_anon_session_id") ?? undefined,
    })
    return
  }

  Sentry.setTag("auth", "authenticated")
  Sentry.setUser({
    id: user.id,
    email: user.email ?? undefined,
  })

  // Organization context: derive from user_roles (admin vs user).
  try {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
    const roleList = (roles ?? []).map((r) => r.role)
    const primaryRole = roleList.includes("admin") ? "admin" : roleList[0] ?? "user"
    Sentry.setTag("org_role", primaryRole)
    Sentry.setContext("organization", {
      name: "Neuroceutical Solutions",
      roles: roleList,
    })
  } catch {
    Sentry.setTag("org_role", "unknown")
  }
}

export { Sentry }