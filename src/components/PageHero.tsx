import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { stagger, fadeUp, smooth } from "../lib/motion";
import AnimatedHeadline from "./AnimatedHeadline";

interface Props {
  eyebrow: string;
  title: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** Custom content for the image slot (e.g. a rotating scene) instead of a
   *  single static image. Still gets the same entrance + scroll-parallax
   *  treatment as the default img. */
  imageSlot?: React.ReactNode;
  /** Skip the default rounded/clipped/shadow photo-frame around imageSlot —
   *  for compositions (like a floating photo stack) that want to draw their
   *  own edges instead of being boxed into one rectangle. Ignored for the
   *  default single-image case. */
  imageFrameless?: boolean;
  /** Override the default 4:3 photo frame — use when a specific photo's own
   *  proportions would otherwise get cropped away (e.g. a taller portrait
   *  shot). Ignored for imageSlot compositions, which manage their own shape. */
  imageAspect?: string;
  children?: React.ReactNode;
}

/**
 * Standard inner-page hero — About, Contact, Plan My Trip, Book It Yourself
 * and every service page run through this, so it carries a lot of the site's
 * first-impression motion.
 *
 * On load: the rule draws, the eyebrow slides in, the title reveals word by
 * word, then the copy. On scroll: the photo drifts up and scales while the
 * copy drifts the other way, so the two columns separate into layers.
 */
export default function PageHero({
  eyebrow,
  title,
  image,
  imageAlt,
  imagePosition = "object-center",
  imageSlot,
  imageFrameless = false,
  imageAspect = "aspect-[4/3]",
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawImgY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const imgY = useSpring(rawImgY, { stiffness: 110, damping: 30, mass: 0.4 });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const rawCopyY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyY = useSpring(rawCopyY, { stiffness: 110, damping: 30, mass: 0.4 });
  const copyFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-cream pt-32 md:pt-40"
    >
      {/* Ambient blobs drift slowly and independently. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-clay/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, 26, 0], x: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-ocean/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, -30, 0], x: [0, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className={`container-px relative grid items-center gap-12 pb-16 md:pb-24 ${
          imageFrameless && imageSlot ? "md:grid-cols-[0.85fr_1.15fr]" : "md:grid-cols-2"
        }`}
      >
        <motion.div
          style={reduce ? undefined : { y: copyY, opacity: copyFade }}
          className="order-2 flex flex-col gap-6 md:order-none"
        >
          <motion.div
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.6, ease: smooth } },
              }}
              className="h-px w-8 origin-left bg-clay"
            />
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: smooth, delay: 0.1 },
                },
              }}
              className="eyebrow"
            >
              {eyebrow}
            </motion.span>
          </motion.div>

          {/* Delayed ramp to the largest sizes: at md (768px) the layout
              also switches to two columns, so the copy column is only
              ~280-300px wide there -- jumping straight to text-5xl (48px)
              at that exact breakpoint wraps longer titles (e.g. Book It
              Yourself, Family Travel) across 6-7 lines. text-4xl holds
              through the cramped md/lg range; the bigger sizes wait for
              lg/xl where the column has real room. Measured 834px width,
              294px copy column: text-5xl wrapped 7 lines, confirmed via
              real viewport testing before this change. */}
          <h1 className="text-3xl font-semibold leading-[1.1] text-ink md:text-4xl lg:text-5xl xl:text-6xl">
            <AnimatedHeadline immediate delay={0.2} text={title} />
          </h1>

          <motion.div
            variants={stagger(0.1, 0.45)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.div variants={fadeUp}>{children}</motion.div>
          </motion.div>
        </motion.div>

        {(image || imageSlot) && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 1.04 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: smooth, delay: 0.15 }}
            className={`relative order-1 ${imageAspect} md:order-none ${
              imageFrameless && imageSlot ? "" : "overflow-hidden rounded-[2rem] shadow-lift"
            }`}
          >
            <motion.div
              style={reduce ? undefined : { y: imgY, scale: imgScale }}
              className={
                imageFrameless && imageSlot ? "absolute inset-0" : "absolute inset-[-8%]"
              }
            >
              {imageSlot ?? (
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  className={`h-full w-full object-cover ${imagePosition}`}
                  loading="eager"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
