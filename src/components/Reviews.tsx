import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "../data/reviews";
import SectionHeading from "./SectionHeading";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDir(next > index ? 1 : -1);
      setIndex((next + reviews.length) % reviews.length);
    },
    [index]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % reviews.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const r = reviews[index];

  return (
    <section className="bg-sand/60">
      <div className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="What travelers say"
          title="Real trips. Real relief."
          intro="A booking clerk disappears after checkout. A travel advisor is still there when the plan meets the real world."
        />

        <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-cream p-8 shadow-soft md:p-14">
          <Quote
            className="absolute right-8 top-8 text-ocean/10"
            size={96}
            strokeWidth={1}
          />
          <div className="relative min-h-[220px] md:min-h-[200px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                <div className="flex gap-1 text-clay">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="max-w-3xl font-display text-2xl leading-snug text-ink md:text-3xl">
                  “{r.quote}”
                </p>
                <footer className="mt-2">
                  <div className="font-semibold text-ocean-dark">{r.name}</div>
                  <div className="text-sm text-fog">{r.detail}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-ocean" : "w-2 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ocean hover:text-ocean"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ocean hover:text-ocean"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
