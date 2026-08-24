import { motion, useReducedMotion } from "framer-motion";
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
 * Reduced-motion visitors receive the content immediately with no reveal.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "fade",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

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
