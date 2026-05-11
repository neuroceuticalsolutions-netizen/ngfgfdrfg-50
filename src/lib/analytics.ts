/**
 * Lightweight, provider-agnostic analytics layer.
 *
 * - Forwards events to GTM/GA4 via `window.dataLayer` (if installed)
 * - Forwards to Plausible via `window.plausible` (if installed)
 * - Always logs to the browser console for local debugging
 *
 * No PII is ever forwarded. Only event names and structural props
 * (form name, CTA id, location) — never email, names or message bodies.
 */

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const isBrowser = () => typeof window !== "undefined";

export const trackEvent = (event: string, props: AnalyticsProps = {}) => {
  if (!isBrowser()) return;

  const payload = { event, ...props, timestamp: new Date().toISOString() };

  // 1. GTM / GA4 dataLayer
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    /* no-op */
  }

  // 2. GA4 direct (if gtag is installed)
  try {
    window.gtag?.("event", event, props);
  } catch {
    /* no-op */
  }

  // 3. Plausible
  try {
    window.plausible?.(event, { props });
  } catch {
    /* no-op */
  }

  // 4. Console (dev visibility)
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[analytics]", event, props);
  }
};

/** Partner / B2B partnership form submitted successfully. */
export const trackPartnerSubmit = (props: { productCategory?: string } = {}) =>
  trackEvent("partner_form_submit", {
    form: "partner_application",
    audience: "b2b",
    ...props,
  });

/** Newsletter (B2C) email signup submitted. */
export const trackNewsletterSignup = (props: { location?: string } = {}) =>
  trackEvent("newsletter_signup", {
    form: "newsletter",
    audience: "b2c",
    ...props,
  });

/**
 * CTA click. Use either by calling directly, or by adding
 * `data-analytics-cta="my-cta-id"` to any anchor/button — it will be
 * tracked automatically by `installCtaClickTracker()`.
 */
export const trackCtaClick = (
  ctaId: string,
  props: AnalyticsProps = {}
) =>
  trackEvent("cta_click", {
    cta_id: ctaId,
    location: typeof window !== "undefined" ? window.location.pathname : "unknown",
    ...props,
  });

/**
 * Global click delegate that auto-fires `cta_click` events for any
 * element (or ancestor) carrying a `data-analytics-cta` attribute.
 * Optional companion attributes:
 *   - `data-analytics-location` → label for where the CTA lives
 *   - `data-analytics-audience` → "b2c" | "b2b"
 */
let installed = false;
export const installCtaClickTracker = () => {
  if (!isBrowser() || installed) return;
  installed = true;

  document.addEventListener(
    "click",
    (evt) => {
      const target = evt.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-analytics-cta]");
      if (!el) return;

      const ctaId = el.getAttribute("data-analytics-cta") || "unknown";
      const location = el.getAttribute("data-analytics-location") || undefined;
      const audience = el.getAttribute("data-analytics-audience") || undefined;
      const label = (el.textContent || "").trim().slice(0, 80) || undefined;

      trackCtaClick(ctaId, { location, audience, label });
    },
    { capture: true }
  );
};
