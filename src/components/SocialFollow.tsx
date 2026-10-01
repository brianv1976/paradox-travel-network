import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { stagger, fadeUp } from "../lib/motion";
import { links } from "../lib/assets";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

type LatestPost = {
  permalink: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
};

const INSTAGRAM_GRADIENT =
  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)";

export default function SocialFollow() {
  const [latest, setLatest] = useState<LatestPost | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/instagram-latest", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setLatest(payload?.post ?? null))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const isVideo = latest?.mediaType === "VIDEO";
  const image = latest?.mediaUrl || latest?.thumbnailUrl;

  return (
    <section className="container-px py-20 md:py-28" aria-labelledby="social-follow-title">
      <Reveal variant="rise">
        <div className="overflow-hidden rounded-[2rem] bg-ocean-dark text-cream shadow-lift">
          <div className={`grid ${latest ? "lg:grid-cols-2" : ""}`}>
            <motion.div
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="p-8 md:p-12 lg:flex lg:min-h-[24rem] lg:flex-col lg:justify-center"
            >
              <motion.span variants={fadeUp} className="eyebrow text-gold">
                Stay connected
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="social-follow-title"
                className="mt-4 font-display text-3xl font-semibold md:text-4xl"
              >
                Follow Paradox Travel Network
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-2xl leading-relaxed text-cream/85">
                Fresh travel ideas, useful reminders, destination inspiration, and the latest from Brian—without turning your feed into a sales pitch.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                <Magnetic strength={8}>
                  <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2]"
                      aria-hidden="true"
                    >
                      <Facebook size={14} className="fill-white text-white" />
                    </span>
                    Follow on Facebook
                  </a>
                </Magnetic>
                <Magnetic strength={8}>
                  <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: INSTAGRAM_GRADIENT }}
                      aria-hidden="true"
                    >
                      <Instagram size={14} className="text-white" />
                    </span>
                    Follow on Instagram
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>

            {latest && (
              <Reveal variant="zoom" className="aspect-square h-full min-h-80 w-full">
                <a
                  href={latest.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-full min-h-80 overflow-hidden bg-ink"
                  aria-label="View the latest post from Paradox Travel Network on Instagram"
                >
                  {isVideo && latest.mediaUrl ? (
                    <video
                      src={latest.mediaUrl}
                      poster={latest.thumbnailUrl}
                      className="absolute inset-0 h-full w-full object-contain opacity-80 transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : image ? (
                    <img
                      src={image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-contain opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
                  <div className="relative flex h-full min-h-80 flex-col justify-end p-7">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      Latest from Paradox
                    </span>
                    {latest.caption && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream">{latest.caption}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cream">
                      View on Instagram <ArrowUpRight size={15} />
                    </span>
                  </div>
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
