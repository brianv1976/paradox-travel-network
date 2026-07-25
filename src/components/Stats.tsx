import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";
import Counter from "./Counter";

const STATS = [
  { value: 16, suffix: "h", label: "the average traveler spends planning one trip" },
  { value: 3, suffix: "", label: "trusted booking partners, gathered on one page" },
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
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            <div className="font-display text-5xl font-semibold text-ocean md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-fog">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
