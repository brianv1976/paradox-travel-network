import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Mail, CheckCircle2 } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { posts, categories, categoryImage, type Category } from "../data/blog";
import { submitForm } from "../lib/form";
import PageHero from "../components/PageHero";
import { assets } from "../lib/assets";
import { fadeUp, stagger } from "../lib/motion";

type Filter = "All" | Category;

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
      <PageHero
        eyebrow="Postcards from Paradox"
        title="Useful advice. Minimal inspirational fog."
        image={assets.mascotWhiteboard}
        imageAlt="Brian mascot presenting practical travel tips beside a whiteboard"
      >
        <p className="text-lg leading-relaxed text-fog">
          Practical articles for smoother trips, plus an occasional email with
          destination notes, booking reminders, and fewer manufactured
          emergencies.
        </p>
      </PageHero>

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

      {/* Grid */}
      <section className="container-px pb-24">
        <motion.div
          layout
          variants={stagger(0.06)}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.article
                key={post.slug}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/travel-tips/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={categoryImage[post.category]}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ocean">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fog">
                      {post.summary}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-sm">
                      <span className="flex items-center gap-1.5 text-fog">
                        <Clock size={13} /> {post.readingTime} min
                      </span>
                      <span className="link-underline">
                        Read tip <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
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
