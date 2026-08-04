import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * How far the content drifts against the scroll, in percent of its own box.
   * Positive drifts up (recedes into depth), negative drifts down (comes
   * forward). Stack a few different speeds in one section to build real depth.
   */
  speed?: number;
  /** Gently scales down as the element leaves the viewport. */
  scaleOut?: boolean;
  /** Fades at the edges of the viewport. */
  fadeEdges?: boolean;
}

/**
 * Scroll-linked parallax wrapper. The motion is spring-smoothed so it glides
 * instead of tracking the scrollbar 1:1 (which reads as jittery).
 *
 * Honours prefers-reduced-motion by rendering completely static.
 */
export default function Parallax({
  children,
  className,
  speed = 20,
  scaleOut = false,
  fadeEdges = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `${-speed}%`]);
  const y = useSpring(rawY, { stiffness: 130, damping: 30, mass: 0.35 });

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const scale = useSpring(rawScale, { stiffness: 130, damping: 30, mass: 0.35 });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    // `relative` matters: framer-motion needs a non-static container to
    // measure scroll offset against, and warns loudly otherwise.
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <motion.div
        style={{
          y,
          ...(scaleOut ? { scale } : {}),
          ...(fadeEdges ? { opacity } : {}),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
