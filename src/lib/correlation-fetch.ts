/**
 * Patches the global `fetch` so every outbound request carries an
 * `X-Correlation-Id` header matching the active correlation id.
 *
 * This covers Supabase JS (which uses `fetch` under the hood), edge
 * function invocations, and any direct `fetch()` call in the app, so
 * backend logs can be joined to the user action that triggered them.
 */
import { getCorrelationId } from "@/lib/correlation"

const HEADER = "X-Correlation-Id"
let installed = false

export function installCorrelationFetch() {
  if (installed) return
  if (typeof window === "undefined" || typeof window.fetch !== "function") return
  installed = true

  const originalFetch = window.fetch.bind(window)

  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const cid = getCorrelationId()

      // If a Request object was passed, clone it with an extra header.
      if (input instanceof Request) {
        const headers = new Headers(input.headers)
        if (!headers.has(HEADER)) headers.set(HEADER, cid)
        const next = new Request(input, { headers })
        return originalFetch(next, init)
      }

      const headers = new Headers(init?.headers ?? {})
      if (!headers.has(HEADER)) headers.set(HEADER, cid)
      return originalFetch(input, { ...(init ?? {}), headers })
    } catch {
      // Never break a request because of correlation tagging.
      return originalFetch(input as RequestInfo, init)
    }
  }) as typeof window.fetch
}