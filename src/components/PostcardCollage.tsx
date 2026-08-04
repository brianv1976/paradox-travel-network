import { motion } from "framer-motion";

/**
 * Hero postcard collage — the "dynamic" visual for the home hero, built with
 * plain DOM elements + Framer Motion instead of WebGL/three.js. Same corkboard
 * concept as before, rebuilt with the same reliable tools used everywhere
 * else on the site (no canvas, no separate render loop, no aspect-ratio or
 * z-sorting bugs to fight).
 */

interface Card {
  label: string;
  accent: string;
  tape: string;
  top: string;
  left: string;
  rotate: number;
  size: "sm" | "md" | "lg";
  delay: number;
}

const cards: Card[] = [
  { label: "Cancún", accent: "border-ocean", tape: "bg-clay", top: "6%", left: "4%", rotate: -6, size: "md", delay: 0 },
  { label: "Rome", accent: "border-clay", tape: "bg-ocean-light", top: "0%", left: "40%", rotate: 4, size: "sm", delay: 0.08 },
  { label: "Santorini", accent: "border-ocean-light", tape: "bg-clay-dark", top: "14%", left: "66%", rotate: 7, size: "md", delay: 0.16 },
  { label: "Reykjavík", accent: "border-gold", tape: "bg-ocean", top: "38%", left: "28%", rotate: -3, size: "lg", delay: 0.24 },
  { label: "Tokyo", accent: "border-clay-dark", tape: "bg-ocean-light", top: "62%", left: "2%", rotate: 5, size: "sm", delay: 0.32 },
  { label: "Machu Picchu", accent: "border-ocean", tape: "bg-clay", top: "66%", left: "56%", rotate: -5, size: "md", delay: 0.4 },
];

const sizeClasses: Record<Card["size"], string> = {
  sm: "w-28 h-20 md:w-32 md:h-24",
  md: "w-32 h-24 md:w-36 md:h-28",
  lg: "w-36 h-28 md:w-40 md:h-32",
};

export default function PostcardCollage() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sand to-cream shadow-soft" />

      {/* soft ambient color motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className={`absolute h-1.5 w-1.5 rounded-full ${
              i % 2 === 0 ? "bg-ocean-light/40" : "bg-clay/40"
            }`}
            style={{
              top: `${10 + ((i * 37) % 80)}%`,
              left: `${8 + ((i * 53) % 84)}%`,
            }}
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 24, scale: 0.9, rotate: card.rotate }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
            scale: 1,
            rotate: card.rotate,
          }}
          transition={{
            opacity: { duration: 0.6, delay: card.delay },
            scale: { duration: 0.6, delay: card.delay },
            y: {
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
          }}
          whileHover={{ scale: 1.06, rotate: 0 }}
          className={`absolute flex flex-col items-center justify-center rounded-xl border-2 bg-cream p-2 text-center shadow-lift ${card.accent} ${sizeClasses[card.size]}`}
          style={{ top: card.top, left: card.left }}
        >
          <span
            className={`absolute -top-2.5 left-1/2 h-4 w-9 -translate-x-1/2 rounded-sm opacity-85 ${card.tape}`}
            style={{ transform: "translateX(-50%) rotate(-4deg)" }}
          />
          <span className="mx-auto mb-1 h-1.5 w-1.5 rounded-full bg-ink/60" />
          <span className="font-display text-sm font-semibold text-ink md:text-base">
            {card.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
