import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, MapPin, Send } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { postcardsHubPosts, getCardImage } from "../data/blog";
import { assets, business } from "../lib/assets";

export default function PostcardsIssue01() {
  const news = postcardsHubPosts.find((p) => p.contentType === "Travel News");
  const tip = postcardsHubPosts.find((p) => p.contentType === "Travel Tip");

  useSeo(
    "Issue 01 | Postcards from Paradox",
    "The launch edition of Postcards from Paradox: the Paradox Travel Network story, current travel news, a Two-Minute Tip, and the first full web issue.",
    {
      image: news ? getCardImage(news) : assets.img.beach,
      ogType: "article",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Postcards from Paradox — Issue 01",
        headline: "Issue 01: The Launch Edition",
        description:
          "The launch edition of Postcards from Paradox from Paradox Travel Network.",
        publisher: { "@type": "TravelAgency", name: business.name },
        author: {
          "@type": "Person",
          name: business.owner,
          url: `${window.location.origin}/about/`,
        },
      },
    }
  );

  return (
    <div className="bg-[#f4efe6] text-ink">
      <section className="relative isolate min-h-[86vh] overflow-hidden bg-ink">
        <img
          src="/assets/stock/tropical-beach-aerial.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/20" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="container-px relative z-10 flex min-h-[86vh] flex-col justify-between py-28 md:py-32">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Link
                to="/travel-tips"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white"
              >
                <ArrowLeft size={14} /> Postcards from Paradox
              </Link>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/65">
                Issue 01 · Launch Edition
              </p>
            </div>

            <div className="hidden rotate-[6deg] border border-white/45 px-5 py-4 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 md:block">
              Filed from
              <span className="mt-1 block text-2xl tracking-[0.08em] text-white">DFW</span>
            </div>
          </div>

          <div className="max-w-4xl pb-14">
            <span className="inline-block bg-clay px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ink">
              Cover Story
            </span>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.92] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Paradox Travel Network
              <span className="block text-[#f6d57a]">is officially open.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              The first issue starts with the launch, then gets out of the way and lets
              the travel take over.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-16 bg-[#f4efe6] [clip-path:polygon(0_62%,10%_54%,21%_60%,33%_48%,47%_58%,59%_47%,72%_57%,87%_49%,100%_56%,100%_100%,0_100%)]" />
      </section>

      <section className="container-px relative z-30 -mt-8 pb-16 md:-mt-12 md:pb-24">
        <div className="rotate-[-0.5deg] border border-ink/10 bg-[#fffaf1] px-7 py-8 shadow-lift md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-clay-deep">
                From DFW, with intent
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                Two ways to travel. One standard for both.
              </h2>
              <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-fog md:text-lg">
                <p>
                  Paradox was built around two ways people actually travel. Some want
                  a real advisor to research, compare, organize, and help carry the trip
                  from idea to booking. Others already know what they want and simply
                  need trustworthy places to book it themselves.
                </p>
                <p>
                  The point is not to force every traveler into the same funnel. The point
                  is to make both paths useful, clear, and connected to the same standard:
                  good information, sensible choices, and fewer expensive surprises.
                </p>
                <p>
                  Postcards from Paradox is the editorial side of that idea. It gives the
                  brand a reason to be useful even when nobody is booking anything today.
                </p>
              </div>
            </div>

            <div className="rotate-[5deg] border-2 border-ocean-dark/30 px-5 py-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-ocean-dark/70">
              Dallas
              <span className="block text-lg tracking-[0.08em]">→ Anywhere</span>
              <span className="mt-1 block">Issue 01</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-dashed border-ink/20 pt-6">
            <Link to="/plan-my-trip" className="btn-primary">
              Plan With Brian <ArrowRight size={16} />
            </Link>
            <Link to="/book-it-yourself" className="btn-secondary">
              Book It Yourself
            </Link>
          </div>
        </div>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr]">
          <div className="relative overflow-hidden bg-ocean-dark px-7 py-10 text-white shadow-soft md:px-10 md:py-12">
            <MapPin size={22} className="text-[#f6d57a]" />
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f6d57a]">
              The Spot
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
              The cover destination is being filed next.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/75">
              The Spot gets the biggest photography, a real reason to go now, route context,
              and enough detail to make the destination feel like more than a pretty picture.
            </p>
          </div>

          {tip && (
            <article className="relative border border-ink/10 bg-[#fbf2df] px-7 py-9 shadow-soft md:px-10 md:py-11">
              <div className="absolute left-0 top-10 h-16 w-8 -translate-x-1/2 rounded-r-full bg-[#f4efe6]" />
              <div className="grid gap-7 md:grid-cols-[150px_1fr] md:items-center">
                <div className="border-r border-dashed border-ink/20 pr-6">
                  <div className="inline-flex min-h-28 w-full flex-col items-center justify-center border-2 border-ocean-dark/45 px-4 py-5 text-center text-ocean-dark">
                    <span className="text-4xl font-bold leading-none">2</span>
                    <span className="mt-1 text-xs font-bold uppercase tracking-[0.18em]">Min Tip</span>
                  </div>
                </div>
                <div>
                  <Clock size={20} className="text-clay-deep" />
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-ink">
                    {tip.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-fog">{tip.summary}</p>
                  <Link
                    to={`/travel-tips/${tip.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ocean-dark underline decoration-clay/60 underline-offset-4"
                  >
                    Read the tip <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {news && (
        <section className="container-px pb-16 md:pb-24">
          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay-deep">
                What Changed
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
                Travel news with a reason to care.
              </h2>
            </div>
            <div className="hidden rotate-[3deg] border border-ink/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-fog md:block">
              DFW Dispatch
            </div>
          </div>

          <article className="grid overflow-hidden border border-ink/10 bg-[#fffaf1] shadow-lift lg:grid-cols-[1.08fr_.92fr]">
            <Link
              to={`/travel-tips/${news.slug}`}
              className="relative block min-h-[360px] overflow-hidden lg:min-h-[520px]"
            >
              <img
                src={getCardImage(news)}
                alt={news.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-clay px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                  Closer to Home
                </span>
              </div>
            </Link>

            <div className="flex flex-col justify-center px-7 py-9 md:px-10 md:py-12">
              <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                {news.title}
              </h3>
              <p className="mt-5 leading-relaxed text-fog">{news.summary}</p>
              <div className="mt-7 border-l-4 border-ocean-dark bg-ocean/5 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ocean-dark">
                  Why it matters
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/78">
                  Jamaica stays easy to put on the North Texas shortlist while Montego Bay
                  keeps strengthening the air-service story around it.
                </p>
              </div>
              <Link
                to={`/travel-tips/${news.slug}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ocean-dark underline decoration-clay/60 underline-offset-4"
              >
                Read the dispatch <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        </section>
      )}

      <section className="container-px pb-16 md:pb-24">
        <div className="relative overflow-hidden bg-ink text-white shadow-lift">
          <img
            src="/assets/stock/hikers-ridge.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/40" />
          <div className="relative grid gap-8 px-7 py-12 md:grid-cols-[150px_1fr] md:px-10 md:py-14">
            <div className="mx-auto aspect-square w-32 overflow-hidden rounded-full border-4 border-white/60 md:mx-0">
              <img src={assets.headshot} alt="Brian Voyles" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f6d57a]">
                From the Editor
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Brian Voyles</h2>
              <p className="mt-1 text-sm font-semibold text-white/82">
                Editor &amp; Travel Advisor, Paradox Travel Network
              </p>
              <p className="mt-4 max-w-3xl leading-relaxed text-white/72">
                Postcards should either make you want to go somewhere or help you travel
                better. Preferably both. Issue 01 starts with the launch, but the point is
                to keep earning its place in your inbox long after the launch itself is old news.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src="/assets/stock/hikers-ridge.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/78 to-ink/55" />
        <div className="container-px relative grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <div className="flex items-center gap-2 text-[#f6d57a]">
              <Send size={17} />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                The Nudge
              </span>
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
              Found the trip idea. Now choose how much help you want.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/72">
              Hand the planning to Brian, or use Paradox's trusted booking paths and handle it yourself.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/plan-my-trip" className="btn-primary">Plan With Brian</Link>
            <Link to="/book-it-yourself" className="btn-secondary border-white/25 text-white hover:bg-white/10">
              Book It Yourself
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
