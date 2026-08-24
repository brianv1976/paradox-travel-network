import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import {
  getPost,
  publishedPosts,
  getPostImage,
  getPostCTA,
  type ContentType,
} from "../data/blog";
import { useSeo } from "../hooks/useSeo";
import CTASection from "../components/CTASection";
import { fadeUp, stagger } from "../lib/motion";
import { business } from "../lib/assets";

const TYPE_BADGE: Record<ContentType, string> = {
  "Destination Spotlight": "bg-clay/10 text-clay-deep",
  "Travel News": "bg-ocean/10 text-ocean-dark",
  "Travel Tip": "bg-ink/10 text-ink",
};

function canonicalPath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  useSeo(
    post ? `${post.title} | Postcards from Paradox` : "",
    post?.seoDescription,
    post
      ? {
          image: getPostImage(post),
          ogType: "article",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.seoDescription,
            image: window.location.origin + getPostImage(post),
            author: {
              "@type": "Person",
              name: post.author,
              url: `${window.location.origin}/about/`,
            },
            datePublished: post.date,
            dateModified: post.updatedDate ?? post.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": window.location.origin + canonicalPath(window.location.pathname),
            },
            publisher: {
              "@type": "TravelAgency",
              name: business.name,
              logo: {
                "@type": "ImageObject",
                url: `${window.location.origin}/Web%20Logo.png`,
              },
            },
          },
        }
      : undefined
  );

  if (!post) return <Navigate to="/404" replace />;

  const sameType = publishedPosts.filter(
    (p) => p.slug !== post.slug && p.contentType === post.contentType
  );
  const sameTopic = publishedPosts.filter(
    (p) => p.slug !== post.slug && post.category && p.category === post.category
  );
  const fallback = publishedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const suggestions = (sameTopic.length ? sameTopic : sameType.length ? sameType : fallback).slice(0, 3);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const dateLabel = formatDate(post.date);
  const cta = getPostCTA(post);

  return (
    <>
      <article className="bg-cream pt-32 md:pt-40">
        <div className="container-px">
          <Link
            to="/travel-tips"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog transition-colors hover:text-ocean-dark"
          >
            <ArrowLeft size={15} /> All Postcards
          </Link>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${TYPE_BADGE[post.contentType]}`}
              >
                {post.contentType}
              </span>
              {post.category && (
                <span className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink/70">
                  {post.category}
                </span>
              )}
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-semibold leading-[1.12] text-ink md:text-5xl"
            >
              {post.title}
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-wrap items-center gap-5 text-sm text-fog"
            >
              <Link
                to="/about"
                className="flex items-center gap-1.5 transition-colors hover:text-ocean-dark"
              >
                <User size={14} /> {post.author}
              </Link>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readingTime} min read
              </span>
              <span>{dateLabel}</span>
              {post.updatedDate && (
                <span className="text-clay-deep">
                  Updated {formatDate(post.updatedDate)}
                </span>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 aspect-[4/3] max-w-4xl overflow-hidden rounded-[2rem] shadow-lift"
          >
            <img
              src={getPostImage(post)}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <div className="container-px">
          <div className="mx-auto mt-12 max-w-2xl">
            <p className="font-display text-xl italic leading-relaxed text-ocean-dark">
              {post.summary}
            </p>
            <div className="mt-8 space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink/85">
                  {para}
                </p>
              ))}
            </div>
            {cta && (
              <Link to={cta.to} className="btn-primary mt-10 w-fit">
                {cta.label} <ArrowRight size={16} />
              </Link>
            )}

            {/* Sources -- only on posts with specific regulatory/statistical
                claims (see src/data/blog.ts). Deliberately quiet: not every
                post needs one, and this isn't meant to read as a citation
                wall. */}
            {post.sources && post.sources.length > 0 && (
              <div className="mt-10 border-t border-ink/10 pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-fog">
                  Sources &amp; Further Reading
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {post.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ocean-dark hover:text-clay-deep hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="container-px py-24">
        <h2 className="font-display text-2xl font-semibold text-ink">
          More Postcards
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {suggestions.map((p) => (
            <Link
              key={p.slug}
              to={`/travel-tips/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={getPostImage(p)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold text-clay-deep">
                  {p.contentType}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <span className="link-underline mt-auto pt-4 text-sm">
                  Read more <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Turn advice into a trip"
        title="Have a trip these tips apply to?"
        body="Share the basics and Brian will help you book it right the first time — or point you to the right place to book it yourself."
        primaryLabel="Plan My Trip"
        primaryTo="/plan-my-trip"
        secondaryLabel="Book It Yourself"
        secondaryTo="/book-it-yourself"
      />
    </>
  );
}
