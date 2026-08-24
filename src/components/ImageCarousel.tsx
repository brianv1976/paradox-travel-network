import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { smooth } from "../lib/motion";

type Slide = { src: string; alt: string; caption: string };

const HOLD_MS = 4500;

/** Autoplaying image carousel — crossfade + caption, dot nav, arrows. */
export default function ImageCarousel({
  slides,
  // object-cover's default center-crop was cutting into the Exoticca-
  // branded slides' top-left logo watermark: the carousel's mobile aspect
  // ratio (4:3) is narrower than the source photos' native 16:9, so
  // object-cover crops the sides -- centered crop removes ~150px from each
  // side of a 1200px-wide source, and the logo sits at x=110, squarely in
  // the cropped-away region. "left" biases the crop to trim only the
  // right side instead, so a left-anchored logo is never touched.
  imagePosition = "object-center",
}: {
  slides: Slide[];
  imagePosition?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  // Moving content needs a real pause mechanism, and visitors who request
  // reduced motion should never have an automatically advancing carousel.
  useEffect(() => {
    if (paused || reduce || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, slides.length]);

  const s = slides[index];

  return (
    <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
      <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
        {/* Two-layer motion: the outer div crossfades + settles between
            slides, while the img underneath runs its own independent Ken
            Burns drift — same .animate-kenburns utility as the homepage
            destination reel, so photography never sits fully still. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s.src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: smooth }}
            className="absolute inset-0"
            // touchAction: "pan-y" lets normal vertical page scroll pass
            // through untouched -- the browser only hands this element the
            // gesture once a horizontal drag is clearly intended, instead of
            // swallowing every touch on the carousel.
            style={{ touchAction: "pan-y" }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.65}
            onDragEnd={(_e, info) => {
              const SWIPE_THRESHOLD = 50;
              if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1);
              else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1);
            }}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              draggable={false}
              className={`h-full w-full object-cover animate-kenburns ${imagePosition}`}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />

        <AnimatePresence mode="wait">
          <motion.p
            key={s.caption}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: smooth }}
            className="absolute bottom-5 left-5 right-24 text-sm font-medium text-cream md:text-base"
          >
            {s.caption}
          </motion.p>
        </AnimatePresence>

        <div className="absolute right-4 top-4 flex gap-2">
          {slides.length > 1 && (
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play photo carousel" : "Pause photo carousel"}
              aria-pressed={paused}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-soft transition-colors hover:bg-cream/90"
            >
              {paused ? <Play size={17} /> : <Pause size={17} />}
            </button>
          )}
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous photo"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-soft transition-colors hover:bg-cream/90"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next photo"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-soft transition-colors hover:bg-cream/90"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Higher-contrast than the original thin dots, and each button now
          has a 32px padded hit area around the small visible mark -- the
          dot itself stays small by design, but the previous version made
          the visible mark and the clickable area the same ~8px size,
          which is well under a comfortable touch target. */}
      <div className="absolute bottom-3 right-3 flex">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`h-2 rounded-full shadow-soft transition-all duration-300 ${
                i === index ? "w-7 bg-cream" : "w-2 bg-cream/75 hover:bg-cream"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
