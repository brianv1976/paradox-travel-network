import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, Mail, CheckCircle2 } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { posts, categories, getPostImage, type Category, type Post } from "../data/blog";
import { submitForm } from "../lib/form";
import { fadeUp, stagger } from "../lib/motion";

type Filter = "All" | Category;

function PostRow({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl border border-ink/10 bg-cream transition-shadow duration-300 hover:shadow-soft"
    >
      <div className="p-6 pb-0 md:p-8 md:pb-0">
        <div className="flex items-center gap-1.5 text-sm text-fog">
          <Clock size={13} /> {post.readingTime} min
        </div>
        <Link to={`/travel-tips/${post.slug}`}>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-ocean md:text-3xl">
            {post.title}
          </h3>
        </Link>
      </div>

      <div className="mt-5 flex flex-col md:mt-6 md:flex-row">
        <Link
          to={`/travel-tips/${post.slug}`}
          className="relative block aspect-[4/3] self-start overflow-hidden md:w-[26rem] md:flex-shrink-0"
        >
          <img
            src={getPostImage(post)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ocean">
            {post.category}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="leading-relaxed text-fog">{post.summary}</p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-3">
                  {post.content.map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-fog">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Link
                  to={`/travel-tips/${post.slug}`}
                  className="link-underline mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ocean"
                >
                  View full article <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ocean"
          >
            {expanded ? "Show less" : "Read more"}
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  useSeo(
    "Postcards from Paradox | Practical Travel Advice",
    "Practical travel articles on packing, airports, cruises, resorts, and planning — plus an occasional newsletter with useful reminders."
  );

  const [filter, setFilter] = useState<Filter>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.category === filter)),
    [filter]
  );

  const filters: Filter[] = ["All", ...categories];

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await submitForm("Newsletter Signup", { email });
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <section className="bg-cream pt-32 md:pt-40">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src="/assets/Useful Advice. Minimal inspirational fog V2.png"
            alt="Brian pointing toward the Postcards from Paradox intro, standing beside a bookshelf with travel mementos, a cork board of destination photos, and a packed bag"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-cream">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
          className="container-px flex flex-col gap-6 py-12 md:py-16"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Postcards from Paradox
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="max-w-2xl text-4xl font-semibold leading-[1.05] text-ink md:text-5xl lg:text-6xl"
          >
            Useful advice. Minimal inspirational fog.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg leading-relaxed text-fog"
          >
            Practical articles for smoother trips, plus an occasional email
            with destination notes, booking reminders, and fewer manufactured
            emergencies.
          </motion.p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container-px pb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-ocean text-cream"
                  : "border border-ink/15 text-ink/80 hover:border-ocean hover:text-ocean"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* List */}
      <section className="container-px pb-24">
        <motion.div
          layout
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <AnimatePresence>
            {filtered.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="bg-ocean text-cream">
        <div className="container-px py-20 text-center md:py-28">
          <Mail className="mx-auto text-gold" size={32} />
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
            Postcards, not spam.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            An occasional email with destination notes, booking reminders, and
            practical tips. No manufactured emergencies.
          </p>
          {subscribed ? (
            <p className="mt-8 inline-flex items-center gap-2 text-gold">
              <CheckCircle2 size={18} /> You're on the list — talk soon.
            </p>
          ) : (
            <form
              onSubmit={subscribe}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-full bg-cream px-5 py-3 text-ink outline-none placeholder:text-fog/60 focus:ring-2 focus:ring-gold"
              />
              <button type="submit" className="btn bg-gold text-ink hover:bg-cream">
                Join the newsletter
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
