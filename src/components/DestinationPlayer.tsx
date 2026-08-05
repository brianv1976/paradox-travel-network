import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { destinations } from "../data/destinations";
import { smooth } from "../lib/motion";

/** Swoop: overshoots slightly then settles. Reads as motion-graphics easing
 *  rather than a plain linear slide. */
const swoop = [0.16, 1.02, 0.24, 1] as const;

const HOLD_MS = 5200;

/**
 * Auto-playing destination reel.
 *
 * Runs on its own — no scrolling, no clicking required. Each slide:
 *   - wipes in behind a clip-path while the outgoing frame drifts and dims
 *   - holds on a slow Ken Burns push so the still is never actually still
 *   - re-animates its type per word, so the name lands with the image
 *
 * Autoplay pauses on hover/focus (and while the tab is hidden, so it doesn't
 * churn in a background tab), and can be paused outright — an autoplaying
 * thing that can't be stopped is an accessibility problem.
 */
export default function DestinationPlayer() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const active = destinations[index];
  const running = !paused && !hovered && !reduce;

  // --- Cursor parallax: photo, ghost type and copy each track the pointer at
  // a different depth, so the stage has real dimensionality on hover. ------
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 90, damping: 22, mass: 0.5 };
  const photoX = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), springCfg);
  const photoY = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), springCfg);
  const ghostX = useSpring(useTransform(mx, [-0.5, 0.5], [64, -64]), springCfg);
  const copyX = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), springCfg);

  const onStageMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetParallax = () => {
    mx.set(0);
    my.set(0);
  };

  /** Sends people to the Book It Yourself / Let Brian Book It decision that
   *  already lives further down the home page, rather than a separate route. */
  const scrollToChoosePath = useCallback(() => {
    document
      .getElementById("choose-path")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const go = useCallback((next: number) => {
    setIndex(((next % destinations.length) + destinations.length) % destinations.length);
  }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = window.setTimeout(
      () => setIndex((i) => (i + 1) % destinations.length),
      HOLD_MS
    );
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, running]);

  // Don't advance in a hidden tab.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden ? true : false);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section className="relative bg-ink py-12 md:py-16">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow text-clay">Where people actually go</span>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-[1.06] text-cream md:text-4xl">
              Somewhere in here is your next trip.
            </h2>
          </div>
          {!reduce && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:border-clay hover:text-clay"
              aria-label={paused ? "Play destination reel" : "Pause destination reel"}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>

        {/* ---- Stage ---------------------------------------------------- */}
        <div
          ref={stageRef}
          // Sized to leave room for the heading and rail inside one laptop
          // screen — the whole section should be visible without scrolling.
          className="relative mt-6 h-[clamp(300px,46vh,460px)] w-full overflow-hidden rounded-[2rem] bg-ink/60 shadow-lift"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            resetParallax();
          }}
          onMouseMove={reduce ? undefined : onStageMove}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
        >
          {/* Photo layer: clip-path wipe on the outside, swoop + cursor
              parallax on the inside, Ken Burns push on the image itself.
              Separate nodes so the transforms never fight. */}
          <AnimatePresence initial={false}>
            <motion.div
              key={active.name}
              className="absolute inset-0"
              initial={
                reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 0% 100%)" }
              }
              animate={
                reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }
              }
              exit={reduce ? { opacity: 0 } : { opacity: 0 }}
              transition={{
                clipPath: { duration: 1.15, ease: swoop },
                opacity: { duration: 0.9, ease: smooth },
              }}
            >
              <motion.div
                className="absolute inset-[-6%]"
                style={reduce ? undefined : { x: photoX, y: photoY }}
                initial={reduce ? undefined : { scale: 1.2, rotate: 0.8 }}
                animate={reduce ? undefined : { scale: 1, rotate: 0 }}
                exit={reduce ? undefined : { scale: 1.08 }}
                transition={{ duration: 1.4, ease: swoop }}
              >
                <img
                  src={active.image}
                  alt={`${active.name}, ${active.region}`}
                  className="h-full w-full object-cover animate-kenburns"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
            </motion.div>
          </AnimatePresence>

          {/* Ghost type: an oversized watermark of the destination name that
              swoops across behind the copy and tracks the cursor hardest —
              this is the layer that sells the depth. */}
          {!reduce && (
            <AnimatePresence mode="wait">
              <motion.span
                key={`${active.name}-ghost`}
                style={{ x: ghostX }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.12, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1.1, ease: swoop }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[14%] select-none whitespace-nowrap text-center font-display text-[7vw] font-semibold uppercase leading-none tracking-[-0.02em] text-cream"
              >
                {active.region}
              </motion.span>
            </AnimatePresence>
          )}

          {/* Region tag */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`${active.name}-region`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: smooth, delay: 0.35 }}
              className="absolute left-6 top-6 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-ocean backdrop-blur-sm md:left-9 md:top-9"
            >
              {active.region}
            </motion.span>
          </AnimatePresence>

          {/* Big type + copy */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={`${active.name}-copy`}>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: 0.75, ease: smooth, delay: 0.25 }}
                    className="block font-display text-4xl font-semibold leading-[0.95] text-cream md:text-6xl"
                  >
                    {active.name}
                  </motion.span>
                </span>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: smooth, delay: 0.45 }}
                  className="mt-3 max-w-md text-base leading-relaxed text-cream/80 md:text-lg"
                >
                  {active.blurb}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: smooth, delay: 0.55 }}
                  className="mt-5 flex flex-wrap items-center gap-3"
                >
                  {/* Both paths, equally weighted — the reel sells the place,
                      these decide how they book it. */}
                  <Link
                    to="/plan-my-trip"
                    className="btn bg-clay text-cream hover:bg-clay-dark"
                  >
                    Let Brian Book It
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={scrollToChoosePath}
                    className="btn border border-cream/35 text-cream hover:bg-cream/10"
                  >
                    Book It Yourself
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---- Chapter rail --------------------------------------------- */}
        <div className="mt-6 grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-3">
          {destinations.map((d, i) => {
            const isActive = i === index;
            return (
              <button
                key={d.name}
                onClick={() => go(i)}
                className="group text-left"
                aria-label={`Show ${d.name}`}
                aria-current={isActive}
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-cream/20">
                  {isActive && (
                    <motion.span
                      key={`${d.name}-bar-${index}`}
                      className="absolute inset-y-0 left-0 bg-clay"
                      initial={{ width: "0%" }}
                      animate={{ width: running ? "100%" : "12%" }}
                      transition={{
                        duration: running ? HOLD_MS / 1000 : 0.3,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
                <span
                  className={`mt-2 block truncate text-[11px] font-medium transition-colors md:text-xs ${
                    isActive
                      ? "text-cream"
                      : "text-cream/40 group-hover:text-cream/75"
                  }`}
                >
                  {d.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
