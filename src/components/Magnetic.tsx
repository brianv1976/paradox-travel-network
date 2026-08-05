import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to be pulled, in px. */
  strength?: number;
}

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 *
 * Deliberately subtle — a few pixels is enough to make a control feel alive.
 * Wrap buttons and icon links, not large blocks.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 10,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const cfg = { stiffness: 220, damping: 16, mass: 0.35 };
  const x = useSpring(useMotionValue(0), cfg);
  const y = useSpring(useMotionValue(0), cfg);

  if (reduce) return <span className={className}>{children}</span>;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
