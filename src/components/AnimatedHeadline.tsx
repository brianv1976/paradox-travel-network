import { motion } from "framer-motion";
import { maskUp, stagger } from "../lib/motion";

interface Props {
  text: string;
  className?: string;
  /** Play immediately (hero) vs. when scrolled into view (sections). */
  immediate?: boolean;
  delay?: number;
}

/**
 * Headline that reveals word-by-word from behind a mask, so the copy feels
 * like it's being written rather than faded in.
 *
 * Each word sits in an `overflow-hidden` span; the inner span slides up from
 * fully below that box. Words keep their own spacing so the line still wraps
 * naturally at any width.
 */
export default function AnimatedHeadline({
  text,
  className,
  immediate = false,
  delay = 0,
}: Props) {
  const words = text.split(" ");
  const activation = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <motion.span
      className={className}
      variants={stagger(0.055, delay)}
      initial="hidden"
      {...activation}
      style={{ display: "inline-block" }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            // Pad so descenders (g, y, p) aren't clipped by overflow-hidden.
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
          }}
        >
          <motion.span variants={maskUp} style={{ display: "inline-block" }}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
