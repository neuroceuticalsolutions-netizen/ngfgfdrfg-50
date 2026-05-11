import { useEffect, useState } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as Sentry from "@sentry/react"
import { getRenderStages, getLastRenderStage, markRenderStage } from "@/lib/render-stage"

/**
 * Client-side render watchdog.
 *
 * After `timeoutMs`, verifies that the app's primary chrome has actually
 * painted: a <nav> element and a hero section (or any <main>/<section>) with
 * non-zero layout. If nothing rendered we show a recoverable error state
 * with a reload action so users aren't stuck staring at a blank screen.
 *
 * The watchdog is best-effort and intentionally conservative: it will not
 * fire if it sees ANY meaningful painted content, so a slow network or a
 * route that legitimately renders something other than the homepage chrome
 * still passes.
 */

interface Props {
  /** How long to wait before declaring render failure. Default 8s. */
  timeoutMs?: number
}

interface PaintProbe {
  painted: boolean
  rootExists: boolean
  rootHtmlLength: number
  rootTextLength: number
  visibleElements: { tag: string; w: number; h: number }[]
}

function probePaint(): PaintProbe {
  const probe: PaintProbe = {
    painted: false,
    rootExists: false,
    rootHtmlLength: 0,
    rootTextLength: 0,
    visibleElements: [],
  }
  if (typeof document === "undefined") {
    probe.painted = true
    return probe
  }
  const root = document.getElementById("root")
  if (!root) return probe
  probe.rootExists = true
  probe.rootHtmlLength = root.innerHTML.length
  probe.rootTextLength = (root.textContent ?? "").trim().length

  const candidates = root.querySelectorAll("nav, main, section, header")
  for (const el of Array.from(candidates)) {
    const rect = (el as HTMLElement).getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      probe.visibleElements.push({
        tag: el.tagName.toLowerCase(),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      })
    }
  }
  probe.painted = probe.visibleElements.length > 0 || probe.rootTextLength > 0
  return probe
}

function collectNavTiming() {
  if (typeof performance === "undefined") return null
  const nav = performance.getEntriesByType?.("navigation")?.[0] as
    | PerformanceNavigationTiming
    | undefined
  if (!nav) return null
  return {
    type: nav.type,
    domInteractive: Math.round(nav.domInteractive),
    domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
    loadEvent: Math.round(nav.loadEventEnd),
    transferSize: nav.transferSize,
    sinceStart: Math.round(performance.now() - nav.startTime),
  }
}

export const RenderWatchdog = ({ timeoutMs = 8000 }: Props) => {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    markRenderStage("app-render")
    const t = window.setTimeout(() => {
      const probe = probePaint()
      if (!probe.painted) {
        setFailed(true)
        const stages = getRenderStages()
        const last = getLastRenderStage()
        const navTiming = collectNavTiming()
        const fontsStatus =
          typeof document !== "undefined" && (document as Document).fonts
            ? (document as Document).fonts.status
            : "unsupported"
        try {
          Sentry.captureMessage("render-watchdog: no content after timeout", {
            level: "error",
            tags: {
              source: "render-watchdog",
              route: typeof window !== "undefined" ? window.location.pathname : "unknown",
              last_render_stage: last?.stage ?? "none",
              fonts_status: String(fontsStatus),
              root_exists: String(probe.rootExists),
            },
            contexts: {
              render_watchdog: {
                timeoutMs,
                last_render_stage: last,
                stages,
                paint_probe: probe,
                nav_timing: navTiming,
                url: typeof window !== "undefined" ? window.location.href : null,
                pathname:
                  typeof window !== "undefined" ? window.location.pathname : null,
                referrer: typeof document !== "undefined" ? document.referrer : null,
                document_ready_state:
                  typeof document !== "undefined" ? document.readyState : null,
                fonts_status: String(fontsStatus),
                user_agent:
                  typeof navigator !== "undefined" ? navigator.userAgent : null,
                vw: typeof window !== "undefined" ? window.innerWidth : null,
                vh: typeof window !== "undefined" ? window.innerHeight : null,
                dpr: typeof window !== "undefined" ? window.devicePixelRatio : null,
                online: typeof navigator !== "undefined" ? navigator.onLine : null,
              },
            },
          })
        } catch {
          /* no-op */
        }
        // eslint-disable-next-line no-console
        console.error(
          "[RenderWatchdog] No content painted after",
          timeoutMs,
          "ms",
          { lastStage: last, stages, probe, navTiming },
        )
      }
    }, timeoutMs)

    return () => window.clearTimeout(t)
  }, [timeoutMs])

  if (!failed) return null

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background px-6 py-12"
    >
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-3">
          This page didn't load
        </h1>
        <p className="text-muted-foreground mb-8">
          We couldn't render the page in time. This is usually a temporary
          network or browser hiccup. Reloading almost always fixes it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload page
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/"
            }}
            className="w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RenderWatchdog