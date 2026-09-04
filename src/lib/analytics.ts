declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 custom event for site actions and concierge engagement.
 *  No-ops if gtag never loaded (ad blocker, internal QA browser, etc.).
 *  Analytics should never interfere with the visitor experience. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}
