import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";

export interface Step {
  n: string;
  title: string;
  body: string;
}

/** Numbered step list (circle + title + body), staggered in on scroll.
 *  Shared by Home's "How planning works" and Contact's "What happens next". */
export default function NumberedSteps({
  steps,
  gap = "gap-4",
}: {
  steps: Step[];
  gap?: string;
}) {
  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-12 grid gap-8 md:grid-cols-3"
    >
      {steps.map((s) => (
        <motion.div key={s.n} variants={fadeUp} className={`flex flex-col ${gap}`}>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean-dark font-display text-xl font-semibold text-cream">
            {s.n}
          </span>
          <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
          <p className="leading-relaxed text-fog">{s.body}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
