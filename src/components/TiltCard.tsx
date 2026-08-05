import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Keep it modest — past ~12 it reads as a gimmick. */
  intensity?: number;
  /** Adds a light sweep that follows the cursor across the surface. */
  glare?: boolean;
}

/**
 * Card that tilts in 3D toward the cursor, with an optional glare sweep.
 *
 * The tilt lives on a wrapper with `perspective`, so the child keeps its own
 * transforms (image zooms, etc.) without fighting this one. Springs make it
 * settle rather than snap, and it returns to flat on mouse-leave.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 9,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const cfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), cfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), cfg);
  const glareX = useTransform(mx, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);
  const glareRaw = useMotionValue(0);
  const glareOpacity = useSpring(glareRaw, { stiffness: 120, damping: 20 });
  // Hoisted above the reduced-motion early return — calling this inside JSX
  // would make it a conditional hook.
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.9), transparent 55%)`
  );

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    glareRaw.set(0.18);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    glareRaw.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full ${className}`}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ opacity: glareOpacity, background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
