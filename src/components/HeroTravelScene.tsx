import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { smooth } from "../lib/motion";

type Slide = { src: string; alt: string };

const HOLD_MS = 5000;

/**
 * Hero image treatment: real photography (no vendor branding — meant for
 * spots where the page shouldn't play favorites), auto-rotating, with the
 * same cursor-tracking parallax + Ken Burns drift used by Globe and
 * DestinationPlayer elsewhere on the site. Three nested transform layers —
 * crossfade (outer), cursor parallax (middle), Ken Burns (img, CSS) — so
 * none of them fight over the same `transform` property.
 */
export default function HeroTravelScene({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 90, damping: 22, mass: 0.5 };
  const photoX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), springCfg);
  const photoY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), springCfg);
  const tilt = useSpring(useTransform(mx, [-0.5, 0.5], [-2.5, 2.5]), springCfg);

  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [slides.length, reduce]);

  const s = slides[index];

  return (
    <div
      ref={stageRef}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : reset}
      className="relative h-full w-full"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={s.src}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: smooth }}
          className="absolute inset-0"
        >
          <motion.div
            style={reduce ? undefined : { x: photoX, y: photoY, rotate: tilt }}
            className="absolute inset-[-6%]"
          >
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover animate-kenburns"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
    </div>
  );
}
