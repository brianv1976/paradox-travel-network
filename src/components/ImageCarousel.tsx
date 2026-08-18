import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { smooth } from "../lib/motion";

type Slide = { src: string; alt: string; caption: string };

const HOLD_MS = 4500;

/** Autoplaying image carousel — crossfade + caption, dot nav, arrows. */
export default function ImageCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [slides.length]);

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
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: smooth }}
            className="absolute inset-0"
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="h-full w-full object-cover animate-kenburns"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />

        <AnimatePresence mode="wait">
          <motion.p
            key={s.caption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smooth }}
            className="absolute bottom-5 left-5 right-24 text-sm font-medium text-cream md:text-base"
          >
            {s.caption}
          </motion.p>
        </AnimatePresence>

        <div className="absolute right-4 top-4 flex gap-2">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous photo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink transition-colors hover:bg-cream"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next photo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink transition-colors hover:bg-cream"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/50 hover:bg-cream/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
