import { motion } from "framer-motion";
import Reveal from "./Reveal";
import AnimatedHeadline from "./AnimatedHeadline";
import { smooth } from "../lib/motion";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Standard section heading. Used on every section of every page, so the
 * motion here sets the rhythm for the whole site:
 *   a rule draws out, the eyebrow slides in behind it,
 *   the title reveals word-by-word from behind a mask,
 *   the intro fades up last.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: Props) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className={`flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
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
      )}

      <h2 className="text-3xl font-semibold leading-[1.1] text-ink md:text-4xl lg:text-5xl">
        <AnimatedHeadline text={title} />
      </h2>

      {intro && (
        <Reveal delay={0.18}>
          <p className="text-lg leading-relaxed text-fog">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
