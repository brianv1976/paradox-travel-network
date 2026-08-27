import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Mail,
  MapPin,
  Newspaper,
  Send,
  Sparkles,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import {
  postcardsHubPosts,
  getCardImage,
  type Post,
} from "../data/blog";
import NewsletterForm from "../components/NewsletterForm";
import { fadeUp, stagger } from "../lib/motion";
import { assets } from "../lib/assets";

function dateLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StoryLink({
  post,
  label,
}: {
  post: Post;
  label: string;
}) {
  return (
    <Link
      to={`/travel-tips/${post.slug}`}
      className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold"
    >
      {label} <ArrowRight size={14} />
    </Link>
  );
}

export default function Blog() {
  const reduce = useReducedMotion();

  useSeo(
    "Postcards from Paradox | Travel Magazine, News & Destination Stories",
    "Postcards from Paradox is the travel magazine from Paradox Travel Network: destination stories, useful travel news, practical tips, and full web editions."
  );

  const news = postcardsHubPosts.find((p) => p.contentType === "Travel News");
  const tip = postcardsHubPosts.find((p) => p.contentType === "Travel Tip");
  const spotlight = postcardsHubPosts.find(
    (p) => p.contentType === "Destination Spotlight"
  );

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden border-b border-ink/10 pt-28 md:pt-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 grain opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-ocean/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-10 top-28 h-52 w-52 rounded-full border border-clay/20"
        />

        <div className="container-px relative pb-14 md:pb-20">
          <motion.div
            variants={reduce ? undefined : stagger(0.08)}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]"
          >
            <div>
              <motion.div
                variants={reduce ? undefined : fadeUp}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="eyebrow">Postcards from Paradox</span>
                <span className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fog">
                  Filed from DFW
                </span>
              </motion.div>

              <motion.h1
                variants={reduce ? undefined : fadeUp}
                className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.96] text-ink sm:text-6xl md:text-7xl lg:text-8xl"
              >
                A travel magazine
                <span className="block text-ocean-dark">disguised as a postcard.</span>
              </motion.h1>

              <motion.p
                variants={reduce ? undefined : fadeUp}
                className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg"
              >
                Destination stories worth the flight, travel news that actually
                matters, practical advice, and the occasional trip worth opening
                your inbox for.
              </motion.p>
            </div>

            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="relative mx-auto w-full max-w-md rotate-[-1.2deg] rounded-[1.6rem] border border-ink/15 bg-[#fffdf8] p-5 shadow-lift lg:mx-0"
            >
              <div className="absolute right-5 top-5 rotate-[7deg] rounded-md border-2 border-ocean-dark/40 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-ocean-dark/70">
                Issue 01
                <span className="block text-[8px] tracking-[0.12em]">Launch Edition</span>
              </div>
              <img
                src={assets.logo}
                alt="Paradox Travel Network"
                className="h-12 w-auto object-contain"
              />
              <div className="mt-12 border-t border-ink/15 pt-6">
                <p className="font-display text-3xl font-semibold leading-tight text-ink">
                  The first official issue is being filed now.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  The Paradox launch will be the cover story, backed by a real
                  destination feature, current travel news, a Two-Minute Tip,
                  and the first full web edition.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-ink/20 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-fog">
                <span>Dallas → Anywhere</span>
                <span>Coming soon</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container-px py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink text-cream shadow-lift">
            <div className="absolute inset-0 opacity-25 grain" aria-hidden="true" />
            <div className="relative p-7 md:p-10">
              <div className="flex items-center gap-2 text-gold">
                <BookOpen size={18} />
                <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                  Latest Issue
                </span>
              </div>
              <p className="mt-6 font-display text-4xl font-semibold leading-[1.02] md:text-5xl">
                Issue 01 will launch Paradox Travel Network like a magazine,
                not a ribbon-cutting announcement.
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-cream/75">
                The launch is the top story. The rest of the issue proves the
                point with useful travel journalism, destination inspiration,
                practical advice, and both ways to travel with Paradox.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80">
                <Sparkles size={15} className="text-gold" />
                Full web edition + inbox edition
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-sand/45 p-7 md:p-8">
            <span className="eyebrow">On the rack</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Built to grow into a real publication.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-fog">
              The hub is now organized for magazine issues, individual stories,
              current dispatches, destination features, tips, and a future archive
              without dumping everything into one endless grid.
            </p>
            <div className="mt-6 space-y-3 text-sm font-medium text-ink/80">
              <div className="flex items-center gap-2"><Newspaper size={15} /> What Changed</div>
              <div className="flex items-center gap-2"><MapPin size={15} /> The Spot</div>
              <div className="flex items-center gap-2"><Clock size={15} /> Two-Minute Tip</div>
              <div className="flex items-center gap-2"><BookOpen size={15} /> Full Issues</div>
            </div>
          </div>
        </div>
      </section>

      {news && (
        <section className="container-px pb-16 md:pb-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">What Changed</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                Travel news that matters.
              </h2>
            </div>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-fog sm:block">
              Closer to Home
            </span>
          </div>

          <article className="group overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fffdf8] shadow-soft lg:grid lg:grid-cols-[1.05fr_.95fr]">
            <Link
              to={`/travel-tips/${news.slug}`}
              className="relative block min-h-[300px] overflow-hidden lg:min-h-[520px]"
            >
              <img
                src={getCardImage(news)}
                alt={news.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full bg-cream/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                Jamaica · Caribbean
              </div>
            </Link>

            <div className="relative flex flex-col justify-center p-7 md:p-10">
              <div
                aria-hidden="true"
                className="absolute right-6 top-6 rotate-[6deg] rounded-full border-2 border-ocean-dark/25 px-4 py-3 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-ocean-dark/55"
              >
                DFW
                <span className="block">Dispatch</span>
              </div>
              <div className="pr-20 text-xs font-semibold uppercase tracking-[0.16em] text-clay-deep">
                {dateLabel(news.date)} · 2 min read
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
                {news.title}
              </h3>
              <p className="mt-5 leading-relaxed text-fog">{news.summary}</p>
              <div className="mt-6 rounded-2xl border-l-4 border-ocean-dark bg-ocean/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean-dark">
                  What this means for you
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">
                  Jamaica stays firmly in the conversation for North Texas travelers
                  comparing an easy Caribbean escape, while Montego Bay keeps adding
                  air-service momentum around it.
                </p>
              </div>
              <div className="mt-7">
                <StoryLink post={news} label="Read the dispatch" />
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="border-y border-ink/10 bg-sand/35">
        <div className="container-px py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] bg-ocean-dark p-8 text-cream md:p-10">
              <MapPin className="text-gold" size={24} />
              <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                The Spot
              </span>
              {spotlight ? (
                <>
                  <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
                    {spotlight.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-cream/80">
                    {spotlight.summary}
                  </p>
                  <div className="mt-7">
                    <Link
                      to={`/travel-tips/${spotlight.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream underline decoration-gold/70 underline-offset-4 transition-colors hover:text-gold"
                    >
                      Read The Spot <ArrowRight size={14} />
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
                    The cover destination is next.
                  </h2>
                  <p className="mt-4 leading-relaxed text-cream/80">
                    This is where each issue gets its deeper destination story:
                    cinematic photography, a real reason to go now, useful context,
                    and enough detail to make the place feel worth the flight.
                  </p>
                </>
              )}
            </div>

            {tip && (
              <article className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fffdf8] p-8 md:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-5 top-7 rotate-[10deg] rounded-md border-2 border-clay/40 px-3 py-2 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-clay-deep/70"
                >
                  2 MIN
                </div>
                <Clock className="text-clay-deep" size={24} />
                <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.22em] text-clay-deep">
                  Two-Minute Tip
                </span>
                <h2 className="mt-3 max-w-md font-display text-4xl font-semibold leading-tight text-ink">
                  {tip.title}
                </h2>
                <p className="mt-4 max-w-lg leading-relaxed text-fog">
                  {tip.summary}
                </p>
                <div className="mt-7">
                  <StoryLink post={tip} label="Read the tip" />
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <div className="grid items-center gap-8 rounded-[2rem] border border-ink/10 bg-[#fffdf8] p-7 shadow-soft md:grid-cols-[180px_1fr] md:p-10">
          <div className="mx-auto aspect-square w-40 overflow-hidden rounded-full border-8 border-sand shadow-soft md:mx-0">
            <img
              src={assets.headshot}
              alt="Brian Voyles"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">From the Editor</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Brian Voyles
            </h2>
            <p className="mt-1 text-sm font-semibold text-ocean-dark">
              Editor &amp; Travel Advisor, Paradox Travel Network
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-fog">
              Postcards from Paradox is built around a simple idea: travel content
              should either make you want to go somewhere or help you travel better.
              Preferably both. The first full issue will also mark the official
              launch of Paradox Travel Network.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="container-px grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Send size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                Send me the next postcard
              </span>
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
              The magazine lands in your inbox too.
            </h2>
            <p className="mt-3 max-w-xl text-cream/70">
              New issues, destination stories, useful changes, and the occasional
              deal worth interrupting your day for.
            </p>
          </div>
          <div className="min-w-0 md:min-w-[360px]">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </section>

      <section className="container-px py-14 text-center md:py-20">
        <Mail className="mx-auto text-ocean-dark" size={22} />
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-fog">
          Past issues will live here as the archive grows. For now, we are building
          Issue 01 properly instead of manufacturing twelve empty covers to look busy.
        </p>
      </section>
    </div>
  );
}
