import { motion, useReducedMotion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";

export interface Step {
  n: string;
  title: string;
  body: string;
}

/** Numbered step list (circle + title + body), staggered in on scroll.
 *  Shared by Home, Contact, and Itinerary Planning. */
export default function NumberedSteps({
  steps,
  gap = "gap-4",
  columns = "md:grid-cols-3",
}: {
  steps: Step[];
  gap?: string;
  columns?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? undefined : stagger(0.12)}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      className={`mt-12 grid gap-8 ${columns}`}
    >
      {steps.map((s) => (
        <motion.div
          key={s.n}
          variants={reduce ? undefined : fadeUp}
          className={`flex flex-col ${gap}`}
        >
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
