import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  riseIn,
  zoomIn,
  slideInLeft,
  slideInRight,
  viewportOnce,
} from "../lib/motion";

const variantMap = {
  fade: fadeUp,
  rise: riseIn,
  zoom: zoomIn,
  left: slideInLeft,
  right: slideInRight,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  /**
   * How the element arrives. "fade" is the quiet default; "rise" and "zoom"
   * are the cinematic ones for headings and imagery.
   */
  variant?: keyof typeof variantMap;
}

/**
 * Scroll-reveal wrapper. Plays once when the element scrolls into view.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "fade",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
