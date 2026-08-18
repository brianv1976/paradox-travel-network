declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 custom event. No-ops if gtag never loaded (ad blocker, etc.)
 *  — never let analytics failures affect the actual user-facing action. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}
