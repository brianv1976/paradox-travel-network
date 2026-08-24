import { useEffect, useRef } from "react";
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
 *
 * Client-side navigation also moves keyboard/screen-reader focus into the
 * destination content. A full document navigation does this naturally; an
 * SPA otherwise leaves focus stranded on a link from the previous page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousLocation = useRef(`${pathname}${hash}`);

  useEffect(() => {
    const locationKey = `${pathname}${hash}`;
    const isClientNavigation = previousLocation.current !== locationKey;
    previousLocation.current = locationKey;

    const focusTarget = (el: HTMLElement | null) => {
      if (!isClientNavigation || !el) return;
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() =>
        focusTarget(document.getElementById("main-content"))
      );
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
        focusTarget(el);
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        rafId = requestAnimationFrame(tryScroll);
      } else {
        // Target never mounted (bad/stale hash) — land at the top rather
        // than leaving the scroll position wherever it happened to be.
        window.scrollTo({ top: 0, behavior: "auto" });
        focusTarget(document.getElementById("main-content"));
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
