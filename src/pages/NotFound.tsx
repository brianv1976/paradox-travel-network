import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  const reduce = useReducedMotion();
  useSeo("Page not found | Paradox Travel Network", undefined, { noindex: true });
  return (
    <section className="container-px flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <Compass className="text-clay" size={56} />
        <h1 className="font-display text-6xl font-semibold text-ink">404</h1>
        <p className="max-w-md text-lg text-fog">
          This route wandered off the itinerary. Let's get you back to somewhere
          that exists.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back home <ArrowRight size={16} />
          </Link>
          <Link to="/plan-my-trip" className="btn-ghost">
            Plan a trip
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
