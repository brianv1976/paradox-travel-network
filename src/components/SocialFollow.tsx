import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, ExternalLink, Play } from "lucide-react";
import { stagger, fadeUp } from "../lib/motion";
import { links } from "../lib/assets";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";

interface LatestPost {
  available: true;
  image: string;
  caption: string;
  permalink: string;
  isVideo: boolean;
}

/** Client-only fetch to the Netlify function -- never runs during SSR
 *  (no effect fires server-side), so the server/hydration render both start
 *  from "nothing here yet," matching cleanly with no hydration mismatch.
 *  Renders nothing at all until a real post resolves; if the API isn't
 *  configured yet, rate-limited, or briefly down, this just silently stays
 *  empty -- the Follow buttons above never depend on it. */
function useLatestInstagramPost() {
  const [post, setPost] = useState<LatestPost | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram-latest")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.available) setPost(data);
      })
      .catch(() => {
        /* silent -- card just doesn't appear */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return post;
}

export default function SocialFollow() {
  const post = useLatestInstagramPost();

  return (
    <section className="bg-cream">
      <div className="container-px py-24 md:py-32">
        <Reveal variant="rise">
          <p className="eyebrow text-center">Stay in the loop</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-semibold text-ink md:text-4xl">
            Follow Paradox Travel Network
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-fog">
            Cruise ideas, travel tips, destination inspiration, and the
            occasional deal worth knowing about.
          </p>
        </Reveal>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.div variants={fadeUp} className="w-full sm:w-auto">
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Paradox Travel Network on Facebook"
                className="btn-primary w-full justify-center sm:w-auto"
              >
                <Facebook size={18} />
                Follow on Facebook
              </a>
            </Magnetic>
          </motion.div>
          <motion.div variants={fadeUp} className="w-full sm:w-auto">
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Paradox Travel Network on Instagram"
                className="btn-ghost w-full justify-center sm:w-auto"
              >
                <Instagram size={18} />
                Follow on Instagram
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* "Latest from Paradox" -- only takes up space once a real post
            actually resolves, so there's nothing to reserve/skeleton while
            Meta access is still being set up. */}
        {post && (
          <Reveal variant="zoom" className="mx-auto mt-14 max-w-sm">
            <TiltCard className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft" intensity={6}>
              <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {post.isVideo && (
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur-sm">
                      <Play size={14} fill="currentColor" />
                    </span>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ocean-dark">
                    Latest from Paradox
                  </span>
                </div>
                {post.caption && (
                  <p className="px-5 pt-4 text-sm leading-relaxed text-fog">{post.caption}</p>
                )}
                <span className="link-underline mx-5 mb-5 mt-3 inline-flex items-center gap-1.5 text-sm">
                  View on Instagram <ExternalLink size={13} />
                </span>
              </a>
            </TiltCard>
          </Reveal>
        )}
      </div>
    </section>
  );
}
