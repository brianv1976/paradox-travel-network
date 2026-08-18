import type { Variants } from "framer-motion";

// Signature easing used across the site.
export const smooth = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: smooth },
  },
};

// --- Bigger, more cinematic entrances -------------------------------------
// Used where a section should feel like it *arrives* rather than just appears.

/** Rises further and settles — for section headings and hero blocks. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 80, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: smooth },
  },
};

/** Pushes in from depth — good for imagery and cards. */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 1.12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: smooth },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -72 },
  show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: smooth } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 72 },
  show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: smooth } },
};

/** Per-word/letter reveal, driven by a stagger parent. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: smooth } },
};

// Parent container that staggers its children.
export const stagger = (amount = 0.16, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: amount, delayChildren: delay },
  },
});

export const viewportOnce = { once: true, amount: 0.25 } as const;
