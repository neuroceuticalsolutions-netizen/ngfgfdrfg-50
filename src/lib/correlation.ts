/**
 * Correlation id management for Sentry.
 *
 * A correlation id represents a single user "action" (a CTA click, a form
 * submit, a navigation). It is attached to every Sentry event and breadcrumb
 * so multiple errors / API calls / logs caused by the same action can be
 * traced back together.
 */
import * as Sentry from "@sentry/react"

let currentId: string = newId()

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return (
    Math.random().toString(36).slice(2, 10) +
    "-" +
    Date.now().toString(36)
  )
}

/** Returns the active correlation id. */
export function getCorrelationId(): string {
  return currentId
}

/**
 * Rotates the correlation id to a new value (or the supplied one) and
 * propagates it to Sentry as a tag so subsequent events inherit it.
 */
export function newCorrelationId(id?: string): string {
  currentId = id ?? newId()
  try {
    Sentry.setTag("correlation_id", currentId)
  } catch {
    /* no-op */
  }
  return currentId
}

/** Initialise the tag on Sentry; call once after Sentry.init. */
export function initCorrelationId() {
  try {
    Sentry.setTag("correlation_id", currentId)
  } catch {
    /* no-op */
  }
}