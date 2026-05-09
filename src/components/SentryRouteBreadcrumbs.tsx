import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import * as Sentry from "@sentry/react"

/**
 * Records a Sentry breadcrumb on every route change so captured
 * errors include the navigation trail that led to them.
 */
export function SentryRouteBreadcrumbs() {
  const location = useLocation()
  const prev = useRef<string | null>(null)

  useEffect(() => {
    const to = location.pathname + location.search
    Sentry.addBreadcrumb({
      category: "navigation",
      type: "navigation",
      level: "info",
      message: `Route ${prev.current ?? "(initial)"} → ${to}`,
      data: { from: prev.current, to },
    })
    prev.current = to
  }, [location.pathname, location.search])

  return null
}

export default SentryRouteBreadcrumbs