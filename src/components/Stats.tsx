import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";
import Counter from "./Counter";
import { assets } from "../lib/assets";
import { destinations } from "../data/destinations";

// Every value here is something this site can actually verify about itself —
// no unsourced claims like "the average traveler spends 16h planning."
const STATS = [
  { value: destinations.length, suffix: "", label: "hand-picked destinations to start exploring" },
  { value: Object.keys(assets.partnerLogos).length, suffix: "", label: "trusted booking partners, gathered on one page" },
  { value: 6, suffix: "", label: "kinds of trips, each planned around you" },
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
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
