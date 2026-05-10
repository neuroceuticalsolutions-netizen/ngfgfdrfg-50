import { useEffect, useState } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as Sentry from "@sentry/react"

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

function hasPaintedContent(): boolean {
  if (typeof document === "undefined") return true
  const root = document.getElementById("root")
  if (!root) return false

  // A nav OR a section/main with measurable layout counts as "rendered".
  const candidates = root.querySelectorAll("nav, main, section, header")
  for (const el of Array.from(candidates)) {
    const rect = (el as HTMLElement).getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) return true
  }
  // Fallback: any visible text content at all.
  return (root.textContent ?? "").trim().length > 0
}

export const RenderWatchdog = ({ timeoutMs = 8000 }: Props) => {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!hasPaintedContent()) {
        setFailed(true)
        try {
          Sentry.captureMessage("render-watchdog: no content after timeout", {
            level: "error",
            tags: { source: "render-watchdog" },
            extra: {
              timeoutMs,
              url: typeof window !== "undefined" ? window.location.href : null,
              vw: typeof window !== "undefined" ? window.innerWidth : null,
              vh: typeof window !== "undefined" ? window.innerHeight : null,
            },
          })
        } catch {
          /* no-op */
        }
        // eslint-disable-next-line no-console
        console.error("[RenderWatchdog] No content painted after", timeoutMs, "ms")
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