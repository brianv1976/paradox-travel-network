import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";

interface Props {
  eyebrow: string;
  title: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

/**
 * Standard inner-page hero: eyebrow + big display title, optional side image,
 * and optional children (intro copy, CTAs, vendor lists).
 */
export default function PageHero({
  eyebrow,
  title,
  image,
  imageAlt,
  children,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-cream pt-32 md:pt-40">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />
      <div className="container-px grid items-center gap-12 pb-16 md:grid-cols-2 md:pb-24">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold leading-[1.05] text-ink md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            {children}
          </motion.div>
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift"
          >
            <img
              src={image}
              alt={imageAlt ?? ""}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
