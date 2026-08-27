import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock, MapPin, Newspaper, Send } from "lucide-react";
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
        publisher: {
          "@type": "TravelAgency",
          name: business.name,
        },
        author: {
          "@type": "Person",
          name: business.owner,
          url: `${window.location.origin}/about/`,
        },
      },
    }
  );

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden border-b border-ink/10 pt-28 md:pt-36">
        <div className="absolute inset-0 grain opacity-60" aria-hidden="true" />
        <div className="container-px relative pb-14 md:pb-20">
          <Link
            to="/travel-tips"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-fog transition-colors hover:text-ocean-dark"
          >
            <ArrowLeft size={15} /> Back to Postcards
          </Link>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">Postcards from Paradox</span>
                <span className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fog">
                  Issue 01 · Launch Edition
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.96] text-ink sm:text-6xl md:text-7xl">
                The first postcard starts with the launch.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
                Paradox Travel Network is officially stepping out as a travel brand,
                but this issue is not a brochure about us. The launch is the cover
                story. The rest proves what Postcards is here to do: inspire the trip,
                explain what changed, and make the useful stuff easier to find.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md rotate-[-1deg] rounded-[1.6rem] border border-ink/15 bg-[#fffdf8] p-6 shadow-lift lg:mx-0">
              <img src={assets.logo} alt="Paradox Travel Network" className="h-12 w-auto object-contain" />
              <div className="mt-10 border-t border-dashed border-ink/20 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-deep">
                  Filed from DFW
                </p>
                <p className="mt-2 font-display text-3xl font-semibold leading-tight text-ink">
                  Dallas → Anywhere
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  One issue, five recurring sections, and zero interest in filling
                  the page with travel-agent wallpaper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-[2rem] bg-ink p-8 text-cream shadow-lift md:p-10">
            <div className="flex items-center gap-2 text-gold">
              <BookOpen size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Cover Story</span>
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Paradox Travel Network, officially open.
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-cream/78">
              <p>
                Paradox was built around two ways people actually travel. Some want
                a real advisor to research, compare, organize, and help carry the
                trip from idea to booking. Others already know what they want and
                simply need trustworthy places to book it themselves.
              </p>
              <p>
                The point is not to force every traveler into the same funnel. The
                point is to make both paths useful, clear, and connected to the same
                standard: good information, sensible choices, and fewer expensive
                surprises.
              </p>
              <p>
                Postcards from Paradox is the editorial side of that idea. It exists
                to give the brand a reason to be useful even when nobody is booking
                anything today.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/plan-my-trip" className="btn-primary">
                Plan With Brian <ArrowRight size={16} />
              </Link>
              <Link to="/book-it-yourself" className="btn-secondary border-cream/25 text-cream hover:bg-cream/10">
                Book It Yourself
              </Link>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-ink/10 bg-sand/45 p-8">
            <span className="eyebrow">Inside Issue 01</span>
            <div className="mt-6 space-y-4 text-sm font-medium text-ink/80">
              <div className="flex items-center gap-3"><BookOpen size={16} /> The Launch</div>
              <div className="flex items-center gap-3"><MapPin size={16} /> The Spot</div>
              <div className="flex items-center gap-3"><Newspaper size={16} /> What Changed</div>
              <div className="flex items-center gap-3"><Clock size={16} /> Two-Minute Tip</div>
              <div className="flex items-center gap-3"><Send size={16} /> The Nudge</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/35">
        <div className="container-px grid gap-8 py-16 md:py-24 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-ocean-dark p-8 text-cream md:p-10">
            <MapPin className="text-gold" size={24} />
            <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              The Spot
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
              The cover destination is being filed next.
            </h2>
            <p className="mt-4 leading-relaxed text-cream/80">
              The Spot is the issue's deeper destination feature: the place that
              earns the biggest photography, the strongest reason to go now, and
              enough real context to make the destination feel like more than a
              pretty picture.
            </p>
          </div>

          {tip && (
            <article className="rounded-[2rem] border border-ink/10 bg-[#fffdf8] p-8 md:p-10">
              <Clock className="text-clay-deep" size={24} />
              <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.22em] text-clay-deep">
                Two-Minute Tip
              </span>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">
                {tip.title}
              </h2>
              <p className="mt-4 leading-relaxed text-fog">{tip.summary}</p>
              <Link
                to={`/travel-tips/${tip.slug}`}
                className="link-underline mt-7 inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                Read the tip <ArrowRight size={14} />
              </Link>
            </article>
          )}
        </div>
      </section>

      {news && (
        <section className="container-px py-16 md:py-24">
          <div className="mb-6">
            <span className="eyebrow">What Changed</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
              Travel news with a reason to care.
            </h2>
          </div>

          <article className="overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fffdf8] shadow-soft lg:grid lg:grid-cols-[1.05fr_.95fr]">
            <Link to={`/travel-tips/${news.slug}`} className="relative block min-h-[320px] overflow-hidden">
              <img src={getCardImage(news)} alt={news.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full bg-cream/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                DFW Dispatch
              </div>
            </Link>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-deep">
                Closer to Home
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
                {news.title}
              </h3>
              <p className="mt-5 leading-relaxed text-fog">{news.summary}</p>
              <Link
                to={`/travel-tips/${news.slug}`}
                className="link-underline mt-7 inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                Read the dispatch <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        </section>
      )}

      <section className="container-px pb-16 md:pb-24">
        <div className="grid items-center gap-8 rounded-[2rem] border border-ink/10 bg-[#fffdf8] p-8 shadow-soft md:grid-cols-[160px_1fr] md:p-10">
          <div className="mx-auto aspect-square w-36 overflow-hidden rounded-full border-8 border-sand md:mx-0">
            <img src={assets.headshot} alt="Brian Voyles" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="eyebrow">From the Editor</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Brian Voyles</h2>
            <p className="mt-1 text-sm font-semibold text-ocean-dark">
              Editor &amp; Travel Advisor, Paradox Travel Network
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-fog">
              Postcards is built around travel content that should either make you
              want to go somewhere or help you travel better. Preferably both.
              Issue 01 starts with the launch, but the publication is meant to keep
              earning its place in your inbox long after the launch itself is old news.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="container-px grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The Nudge</span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold">
              Found the trip idea. Now choose how much help you want.
            </h2>
            <p className="mt-3 max-w-xl text-cream/70">
              Hand the planning to Brian, or use Paradox's trusted booking paths and handle it yourself.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/plan-my-trip" className="btn-primary">Plan With Brian</Link>
            <Link to="/book-it-yourself" className="btn-secondary border-cream/25 text-cream hover:bg-cream/10">Book It Yourself</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
