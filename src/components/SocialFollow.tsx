import { useEffect, useState } from "react";
import { ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { links } from "../lib/assets";
import Reveal from "./Reveal";

type LatestPost = {
  permalink: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
};

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

  const image = latest?.thumbnailUrl || latest?.mediaUrl;

  return (
    <section className="container-px py-20 md:py-28" aria-labelledby="social-follow-title">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] bg-ocean-dark text-cream shadow-lift">
          <div className={`grid ${latest ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
            <div className="p-8 md:p-12">
              <span className="eyebrow text-gold">Stay connected</span>
              <h2 id="social-follow-title" className="mt-4 font-display text-3xl font-semibold md:text-4xl">
                Follow Paradox Travel Network
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-cream/85">
                Fresh travel ideas, useful reminders, destination inspiration, and the latest from Brian—without turning your feed into a sales pitch.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <Facebook size={18} aria-hidden="true" /> Follow on Facebook
                </a>
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10">
                  <Instagram size={18} aria-hidden="true" /> Follow on Instagram
                </a>
              </div>
            </div>

            {latest && (
              <a href={latest.permalink} target="_blank" rel="noopener noreferrer" className="group relative min-h-72 overflow-hidden bg-ink" aria-label="View the latest post from Paradox Travel Network on Instagram">
                {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="relative flex h-full min-h-72 flex-col justify-end p-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Latest from Paradox</span>
                  {latest.caption && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream">{latest.caption}</p>}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cream">View on Instagram <ArrowUpRight size={15} /></span>
                </div>
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
