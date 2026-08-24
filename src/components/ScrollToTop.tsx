import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Generous bound (~5s at 60fps) so a slow first load of a lazy-loaded route
// chunk still gets found, without polling forever on a genuinely bad hash.
const MAX_ATTEMPTS = 300;

/**
 * On route change: jump to top, or scroll to a #hash target if present.
 *
 * The target may not exist yet when this effect runs — e.g. #explore lives
 * on the lazy-loaded Home page, which hasn't mounted (or even finished
 * downloading its chunk) at the moment a route change to /#explore fires.
 * Retries every animation frame until the element shows up (or the attempt
 * budget runs out), instead of checking once and giving up.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let attempts = 0;
    let cancelled = false;

    // A location hash is an element id, not necessarily a valid CSS selector.
    // Decode it once and use getElementById so punctuation in a legitimate id
    // cannot make querySelector throw a SyntaxError and break route scrolling.
    let targetId = hash.slice(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Malformed percent-encoding is harmless here; fall back to the literal id.
    }

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        rafId = requestAnimationFrame(tryScroll);
      } else {
        // Target never mounted (bad/stale hash) — land at the top rather
        // than leaving the scroll position wherever it happened to be.
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    rafId = requestAnimationFrame(tryScroll);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [pathname, hash]);

  return null;
}
