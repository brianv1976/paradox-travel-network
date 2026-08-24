import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth-scroll. Mounted once at the app root.
 * Respects prefers-reduced-motion, including preference changes made while
 * the page is already open.
 */
export function useLenis() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      if (media.matches || lenis) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const onPreferenceChange = () => {
      if (media.matches) stop();
      else start();
    };

    start();
    media.addEventListener("change", onPreferenceChange);

    return () => {
      media.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);
}
