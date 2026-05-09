import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import * as Sentry from "@sentry/react"
import { newCorrelationId } from "@/lib/correlation"

/**
 * Records a Sentry breadcrumb on every route change so captured
 * errors include the navigation trail that led to them.
 */
export function SentryRouteBreadcrumbs() {
  const location = useLocation()
  const prev = useRef<string | null>(null)

  useEffect(() => {
    const to = location.pathname + location.search
    // New navigation = new user action = new correlation id.
    const correlationId = newCorrelationId()
    Sentry.addBreadcrumb({
      category: "navigation",
      type: "navigation",
      level: "info",
      message: `Route ${prev.current ?? "(initial)"} → ${to}`,
      data: { from: prev.current, to, correlation_id: correlationId },
    })
    prev.current = to
  }, [location.pathname, location.search])

  return null
}

export default SentryRouteBreadcrumbs