import * as Sentry from "@sentry/react";

/**
 * Runtime sanity check for viewport / responsive layout regressions.
 *
 * Catches the kinds of states that have caused "blank screen" or
 * "hero rendered offscreen" reports in mobile preview:
 *   - <html>/<body> reporting 0 width or 0 height (preview iframe not sized)
 *   - documentElement.scrollWidth wider than the viewport (horizontal overflow)
 *   - missing/broken viewport meta tag
 *
 * In dev we log a warning so the issue is obvious in the console; in
 * production we send a single Sentry breadcrumb (not an error) so we can
 * correlate it with user reports without spamming the issue tracker.
 */

let installed = false;

function checkOnce() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollW = document.documentElement.scrollWidth;
  const meta = document.querySelector('meta[name="viewport"]');

  const issues: string[] = [];

  if (!meta) {
    issues.push("missing <meta name=viewport>");
  }
  if (vw === 0 || vh === 0) {
    issues.push(`zero viewport (${vw}x${vh})`);
  }
  // Allow a 1px tolerance for sub-pixel rounding.
  if (vw > 0 && scrollW - vw > 1) {
    issues.push(`horizontal overflow (scrollWidth=${scrollW}, innerWidth=${vw})`);
  }

  if (issues.length === 0) return;

  const message = `viewport-sanity: ${issues.join("; ")}`;

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(`[viewport-sanity] ${message}`, { vw, vh, scrollW });
  }

  try {
    Sentry.addBreadcrumb({
      category: "viewport",
      level: "warning",
      message,
      data: { vw, vh, scrollW, hasViewportMeta: !!meta },
    });
  } catch {
    // Sentry may not be initialized in dev; ignore.
  }
}

export function installViewportSanity() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const run = () => {
    // Defer to next frame so layout has settled after route changes.
    requestAnimationFrame(checkOnce);
  };

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }

  // Re-check on resize/orientation change (debounced).
  let t: number | undefined;
  const debounced = () => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(run, 250);
  };
  window.addEventListener("resize", debounced);
  window.addEventListener("orientationchange", debounced);
}