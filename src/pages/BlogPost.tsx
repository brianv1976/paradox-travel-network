import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { getPost, posts, categoryImage } from "../data/blog";
import { useSeo } from "../hooks/useSeo";
import CTASection from "../components/CTASection";
import { fadeUp, stagger } from "../lib/motion";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  useSeo(
    post ? `${post.title} | Postcards from Paradox` : "",
    post?.seoDescription
  );

  if (!post) return <Navigate to="/404" replace />;

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallback = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className="bg-cream pt-32 md:pt-40">
        <div className="container-px">
          <Link
            to="/travel-tips"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog transition-colors hover:text-ocean"
          >
            <ArrowLeft size={15} /> All Postcards
          </Link>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean"
            >
              {post.category}
            </motion.span>
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
              <span className="flex items-center gap-1.5">
                <User size={14} /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readingTime} min read
              </span>
              <span>{dateLabel}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 aspect-[16/8] max-w-4xl overflow-hidden rounded-[2rem] shadow-lift"
          >
            <img
              src={categoryImage[post.category]}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <div className="container-px">
          <div className="mx-auto mt-12 max-w-2xl">
            <p className="font-display text-xl italic leading-relaxed text-ocean">
              {post.summary}
            </p>
            <div className="mt-8 space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink/85">
                  {para}
                </p>
              ))}
            </div>
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
              <div className="relative h-36 overflow-hidden">
                <img
                  src={categoryImage[p.category]}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold text-clay">
                  {p.category}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <span className="link-underline mt-auto pt-4 text-sm">
                  Read tip <ArrowRight size={13} />
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
