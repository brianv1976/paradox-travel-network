import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";
import Counter from "./Counter";

// The 16h figure is real, cited research (Priceline, "Average Traveler
// Spends Two Full Work Days To Plan and Book Trips") — it was previously
// removed for being an uncredited-looking claim, not because it was made up.
// Restoring it WITH the citation resolves that instead of dropping it.
const STATS = [
  {
    value: 16,
    suffix: "h",
    label: "the average traveler spends planning and booking a trip",
    hasCitation: true,
  },
  { value: 50, suffix: "", label: "states served — nationwide planning, not just DFW" },
  { value: 1, suffix: "", label: "point of contact, start to finish — never a call center" },
  { value: 0, suffix: "", label: "sales pressure — self-book or plan together" },
];

export default function Stats() {
  return (
    <section className="container-px py-20 md:py-24">
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-8 rounded-[2rem] border border-ink/10 bg-cream p-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative text-center"
          >
            {/* Divider rules draw down between columns as the row lands. */}
            {i > 0 && (
              <motion.span
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="absolute -left-4 top-1/2 hidden h-16 w-px origin-top -translate-y-1/2 bg-ink/10 lg:block"
              />
            )}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
                delay: i * 0.09,
              }}
              className="font-display text-5xl font-semibold text-ocean transition-colors duration-300 group-hover:text-clay md:text-6xl"
            >
              <Counter value={s.value} suffix={s.suffix} />
            </motion.div>
            <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-fog">
              {s.label}
              {s.hasCitation && <sup className="ml-0.5">*</sup>}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-fog/70">
        *{" "}
        <a
          href="https://press.priceline.com/new-priceline-research-finds-average-traveler-spends-two-full-work-days-to-plan-and-book-trips/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fog"
        >
          Priceline research
        </a>
        , "Average Traveler Spends Two Full Work Days To Plan and Book Trips."
      </p>
    </section>
  );
}
