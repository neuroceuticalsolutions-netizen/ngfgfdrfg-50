/**
 * Lightweight render-stage tracker.
 *
 * We record timestamps (ms since navigationStart, falling back to
 * performance.now()) for the key milestones in the app's boot/render
 * lifecycle. The watchdog reads these when it decides the page never
 * painted, so the Sentry event tells us *exactly* how far we got
 * (e.g. "mount-success but skeleton-shown never fired" → React rendered
 * a different route; "mount-attempt-1 only" → render threw).
 *
 * Intentionally tiny — no deps, safe to import everywhere, no-ops on SSR.
 */

export type RenderStage =
  | "script-eval"
  | "sentry-init"
  | "mount-attempt-1"
  | "mount-attempt-2"
  | "mount-attempt-3"
  | "mount-success"
  | "mount-hard-fallback"
  | "app-render"
  | "home-skeleton-shown"
  | "home-content-revealed"
  | "route-change"

interface StageRecord {
  stage: RenderStage
  /** ms since page navigation start (or performance.now() fallback). */
  t: number
  /** Optional free-form detail (e.g. pathname for "route-change"). */
  detail?: string
}

const stages: StageRecord[] = []

function now(): number {
  if (typeof performance === "undefined") return 0
  // Prefer time relative to navigation start so values are comparable
  // across stages even if performance.now()'s origin shifts.
  const nav = performance.getEntriesByType?.("navigation")?.[0] as
    | PerformanceNavigationTiming
    | undefined
  if (nav && typeof nav.startTime === "number") {
    return Math.round(performance.now() - nav.startTime)
  }
  return Math.round(performance.now())
}

export function markRenderStage(stage: RenderStage, detail?: string): void {
  stages.push({ stage, t: now(), ...(detail ? { detail } : {}) })
  // Keep memory bounded — render lifecycle should never produce many entries.
  if (stages.length > 64) stages.splice(0, stages.length - 64)
}

export function getRenderStages(): ReadonlyArray<StageRecord> {
  return stages
}

export function getLastRenderStage(): StageRecord | null {
  return stages.length ? stages[stages.length - 1] : null
}