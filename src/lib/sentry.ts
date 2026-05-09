import * as Sentry from "@sentry/react"
import { supabase } from "@/integrations/supabase/client"
import { getCorrelationId, initCorrelationId } from "@/lib/correlation"

const DSN =
  (import.meta.env.VITE_SENTRY_DSN as string | undefined) ||
  "https://769c947bf850e52964ed9134626415e0@o4511349450932224.ingest.de.sentry.io/4511349480292432"

// PII capture is OFF by default. Set VITE_SENTRY_SEND_PII="true" to allow
// sending personally identifiable info (e.g. user email, IP, full URLs)
// to Sentry. When false, identifiers are scrubbed before send.
const SEND_PII =
  String(import.meta.env.VITE_SENTRY_SEND_PII ?? "").toLowerCase() === "true"

export function isSentryPiiEnabled() {
  return SEND_PII
}

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
    // Only send default PII (IP, headers, cookies) when explicitly enabled.
    sendDefaultPii: SEND_PII,
    beforeSend(event) {
      try {
        if (event.request?.url) {
          const u = new URL(event.request.url)
          event.request.url = `${u.origin}${u.pathname}`
        }
        if (!SEND_PII && event.user) {
          // Strip email and any other identifying fields when PII is disabled.
          const { id, ip_address: _ip, email: _email, username: _username, ...rest } = event.user
          event.user = { id, ...rest }
        }
        // Stamp the active correlation id on every event so it can be
        // grouped with the breadcrumbs/logs from the same user action.
        const cid = getCorrelationId()
        event.tags = { ...(event.tags ?? {}), correlation_id: cid }
        event.contexts = {
          ...(event.contexts ?? {}),
          correlation: { id: cid },
        }
      } catch {
        // ignore
      }
      return event
    },
    beforeBreadcrumb(breadcrumb) {
      try {
        const cid = getCorrelationId()
        breadcrumb.data = { ...(breadcrumb.data ?? {}), correlation_id: cid }
      } catch {
        /* no-op */
      }
      return breadcrumb
    },
  })

  initialized = true
  initCorrelationId()

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
    email: SEND_PII ? user.email ?? undefined : undefined,
  })
  Sentry.setTag("pii", SEND_PII ? "enabled" : "disabled")

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