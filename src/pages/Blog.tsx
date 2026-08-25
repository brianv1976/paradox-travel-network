import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Mail } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import {
  publishedPosts,
  featuredPosts,
  contentTypes,
  getCardImage,
  getPostCTA,
  type ContentType,
  type Post,
} from "../data/blog";
import NewsletterForm from "../components/NewsletterForm";
import { fadeUp, stagger } from "../lib/motion";

type Filter = "All" | ContentType;

const TYPE_EMPTY_COPY: Record<ContentType, string> = {
  "Destination Spotlight":
    "No destination spotlights published yet — check back soon.",
  "Travel News": "No travel news published yet — check back soon.",
  "Travel Tip": "No travel tips in this view yet.",
};

function dateLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function FeaturedArticle({ post }: { post: Post }) {
  const reduce = useReducedMotion();
  const cta = getPostCTA(post);
  const articleHref = `/travel-tips/${post.slug}`;

  return (
    <motion.article
      variants={reduce ? undefined : fadeUp}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      className="group overflow-hidden rounded-[2rem] border border-ink/10 bg-cream shadow-soft md:grid md:grid-cols-2 md:items-stretch"
    >
      <a
        href={articleHref}
        className="relative block aspect-[16/10] overflow-hidden md:aspect-auto"
      >
        <img
          src={getCardImage(post)}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </a>
      <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
        <div className="flex items-center gap-4 text-sm text-fog">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} /> {dateLabel(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> {post.readingTime} min
          </span>
        </div>
        <a href={articleHref}>
          <h2 className="font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-ocean-dark md:text-3xl">
            {post.title}
          </h2>
        </a>
        <p className="leading-relaxed text-fog">{post.summary}</p>
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <a
            href={articleHref}
            className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            Read the full story <ArrowRight size={14} />
          </a>
          {cta && (
            <Link to={cta.to} className="btn-primary">
              {cta.label} <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ArticleCard({ post }: { post: Post }) {
  const reduce = useReducedMotion();
  const cta = getPostCTA(post);
  const isSpotlight = post.contentType === "Destination Spotlight";
  const articleHref = `/travel-tips/${post.slug}`;

  return (
    <motion.article
      layout={!reduce}
      variants={reduce ? undefined : fadeUp}
      whileHover={reduce ? undefined : { y: -4 }}
      exit={
        reduce
          ? undefined
          : { opacity: 0, scale: 0.96, transition: { duration: 0.25 } }
      }
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-shadow duration-300 hover:shadow-soft"
    >
      <a
        href={articleHref}
        className={`relative block overflow-hidden ${isSpotlight ? "aspect-[4/5]" : "aspect-[4/3]"}`}
      >
        <img
          src={getCardImage(post)}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </a>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs text-fog">
          {post.contentType === "Travel News" ? (
            <>
              <Calendar size={12} />
              {dateLabel(post.updatedDate ?? post.date)}
              {post.updatedDate ? " (updated)" : ""}
            </>
          ) : (
            <>
              <Clock size={12} /> {post.readingTime} min
            </>
          )}
        </div>
        <a href={articleHref}>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-ocean-dark">
            {post.title}
          </h3>
        </a>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-fog">
          {post.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a
            href={articleHref}
            className="link-underline inline-flex items-center gap-1.5 text-sm font-medium"
          >
            Read more <ArrowRight size={13} />
          </a>
          {cta && (
            <Link
              to={cta.to}
              className="text-sm font-semibold text-clay-deep hover:text-clay-dark"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const reduce = useReducedMotion();
  useSeo(
    "Postcards from Paradox | Destination Spotlights, Travel News & Tips",
    "Destination spotlights, travel news, and practical tips from Paradox Travel Network — plus an occasional newsletter with useful reminders."
  );

  const [filter, setFilter] = useState<Filter>("All");

  const featured = featuredPosts[0] ?? publishedPosts[0];

  const filtered = useMemo(() => {
    const rest = publishedPosts.filter((p) => p.slug !== featured?.slug);
    return filter === "All" ? rest : rest.filter((p) => p.contentType === filter);
  }, [filter, featured]);

  const filters: Filter[] = ["All", ...contentTypes];

  return (
    <>
      <section className="bg-cream pt-32 md:pt-40">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src="/assets/Useful Advice. Minimal inspirational fog V3.webp"
            alt="Brian pointing toward the Postcards from Paradox intro, standing beside a bookshelf with travel mementos, a cork board of destination photos, and a packed bag"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/40 to-transparent" />

          <motion.div
            variants={reduce ? undefined : stagger(0.1)}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            // Below sm this column's only job is the eyebrow -- the H1
            // moved out to plain document flow below the image (matching
            // where the eyebrow/paragraph mobile copies already lived).
            // The image's 16:9 banner is simply too narrow at 320-374px to
            // give an overlaid, absolutely-positioned column enough room
            // for a 4-word phrase without an awkward mid-sentence wrap no
            // matter the font size -- full container width in normal flow
            // sidesteps the problem entirely instead of fighting it.
            className="container-px absolute inset-y-0 left-0 flex w-full max-w-xl flex-col justify-start gap-1.5 pt-10 sm:gap-4 sm:pt-0 sm:justify-center md:w-[46%] md:max-w-none md:justify-start md:gap-6 md:pt-10 lg:gap-8 lg:pt-14"
          >
            <motion.span variants={reduce ? undefined : fadeUp} className="eyebrow hidden text-xs sm:block md:text-sm lg:text-base">
              Postcards from Paradox
            </motion.span>
            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="hidden text-2xl font-semibold leading-[1.1] text-ink sm:block md:text-3xl lg:text-6xl xl:text-7xl"
            >
              Useful advice. Minimal inspirational fog.
            </motion.h1>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="hidden max-w-md text-sm leading-relaxed text-fog sm:block md:max-w-none md:text-base lg:text-xl xl:text-2xl"
            >
              Destination spotlights, travel news, and practical tips — plus
              an occasional email with booking reminders and fewer
              manufactured emergencies.
            </motion.p>
          </motion.div>
        </div>

        <span className="eyebrow container-px block pb-3 pt-4 text-center text-xs sm:hidden">
          Postcards from Paradox
        </span>
        <h1 className="container-px text-center text-2xl font-semibold leading-[1.15] text-ink sm:hidden">
          Useful advice. Minimal inspirational fog.
        </h1>
      </section>

      <p className="container-px pb-6 pt-6 text-center text-sm leading-relaxed text-fog sm:hidden">
        Destination spotlights, travel news, and practical tips — plus an
        occasional email with booking reminders and fewer manufactured
        emergencies.
      </p>

      {/* Featured */}
      {featured && (
        <section className="container-px pb-12 pt-6">
          <FeaturedArticle post={featured} />
        </section>
      )}

      {/* Filters — "All" is the default, so every type is showcased
          together in one place; these narrow the view, they don't gate it. */}
      <section className="container-px pb-6">
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-ocean-dark text-cream"
                  : "border border-ink/15 text-ink/80 hover:border-ocean-dark hover:text-ocean-dark"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Mixed grid */}
      <section className="container-px pb-24">
        {filtered.length === 0 && filter !== "All" ? (
          <p className="rounded-2xl border border-ink/10 bg-sand/40 p-8 text-center text-fog">
            {TYPE_EMPTY_COPY[filter]}
          </p>
        ) : (
          <motion.div
            layout={!reduce}
            variants={reduce ? undefined : stagger(0.08)}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filtered.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Newsletter — bg-ink (not bg-ocean-dark) so this doesn't visually
          merge into the ocean-dark Footer immediately below it. */}
      <section className="bg-ink text-cream">
        <div className="container-px py-20 text-center md:py-28">
          <Mail className="mx-auto text-gold" size={32} />
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
            Postcards, not spam.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream">
            An occasional email with destination notes, booking reminders, and
            practical tips. No manufactured emergencies.
          </p>
          <NewsletterForm variant="inline" />
        </div>
      </section>
    </>
  );
}
