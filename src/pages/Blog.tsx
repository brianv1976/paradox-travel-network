import { Link } from "react-router-dom";
import { ArrowRight, Clock, Mail, MapPin, Newspaper, Send } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { postcardsHubPosts, getCardImage, type Post } from "../data/blog";
import NewsletterForm from "../components/NewsletterForm";
import { assets } from "../lib/assets";

function StoryLink({ post, label }: { post: Post; label: string }) {
  return (
    <Link
      to={`/travel-tips/${post.slug}`}
      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ocean-dark underline decoration-clay/60 underline-offset-4 transition-colors hover:text-clay-deep"
    >
      {label} <ArrowRight size={14} />
    </Link>
  );
}

export default function Blog() {
  useSeo(
    "Postcards from Paradox | Travel Magazine, News & Destination Stories",
    "Postcards from Paradox is the travel magazine from Paradox Travel Network: destination stories, useful travel news, practical tips, and full web editions."
  );

  const news = postcardsHubPosts.find((p) => p.contentType === "Travel News");
  const tip = postcardsHubPosts.find((p) => p.contentType === "Travel Tip");
  const spotlight = postcardsHubPosts.find((p) => p.contentType === "Destination Spotlight");

  return (
    <div className="bg-[#f4efe6] text-ink">
      <section className="relative isolate min-h-[82vh] overflow-hidden bg-ink">
        <img
          src={assets.img.beach}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />

        <div className="container-px relative z-10 flex min-h-[82vh] flex-col justify-between py-28 md:py-32">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-xs">
              <img
                src={assets.logo}
                alt="Paradox Travel Network"
                className="h-10 w-auto brightness-0 invert"
              />
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/75">
                Postcards from Paradox · Issue 01
              </p>
            </div>

            <div className="hidden rotate-[5deg] border border-white/50 px-5 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 md:block">
              Filed from
              <span className="mt-1 block text-2xl tracking-[0.08em] text-white">DFW</span>
            </div>
          </div>

          <div className="max-w-4xl pb-16">
            <span className="inline-flex items-center gap-2 bg-ocean-dark px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
              <MapPin size={14} /> Postcards from Paradox
            </span>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.92] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Travel stories
              <span className="block text-[#f6d57a]">worth opening.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              Destination stories, useful changes, practical advice, and the occasional
              trip worth interrupting your day for.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-14 bg-[#f4efe6] [clip-path:polygon(0_68%,8%_55%,17%_61%,28%_48%,40%_58%,53%_45%,66%_60%,80%_50%,91%_57%,100%_47%,100%_100%,0_100%)]" />
      </section>

      <section className="container-px relative z-30 -mt-6 pb-16 md:-mt-10 md:pb-24">
        <div className="grid gap-7 lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative rotate-[-0.6deg] border border-ink/10 bg-[#fffaf1] px-7 py-8 shadow-lift md:px-10 md:py-10">
            <div className="absolute right-7 top-7 rotate-[7deg] border-2 border-ocean-dark/35 px-4 py-3 text-center text-[9px] font-bold uppercase tracking-[0.17em] text-ocean-dark/70">
              Issue 01
              <span className="block">Launch Edition</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay-deep">
              On the cover
            </p>
            <h2 className="mt-4 max-w-xl pr-20 font-display text-4xl font-semibold leading-[1.02] md:text-5xl">
              Paradox Travel Network is officially open.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-fog">
              The launch is the lead story, but the issue is built to prove what the
              brand is for: useful travel journalism, stronger decisions, and two honest
              ways to book.
            </p>
            <Link
              to="/postcards/issue-01"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ocean-dark underline decoration-clay/60 underline-offset-4"
            >
              Open Issue 01 <ArrowRight size={14} />
            </Link>
            <div className="mt-8 border-t border-dashed border-ink/20 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-fog">
              Dallas → Anywhere · Web edition + inbox edition
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#0e3142] text-white shadow-lift">
            <div className="absolute right-5 top-5 rotate-[5deg] rounded-full border border-white/40 px-5 py-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">
              New
              <span className="block">Dispatch</span>
            </div>
            <div className="p-7 md:p-9">
              <Newspaper size={22} className="text-[#f6d57a]" />
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6d57a]">
                What Changed
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                News gets treated like news.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/72">
                Short, sourced, and built around one question: what does this actually
                change for the traveler?
              </p>
            </div>
          </div>
        </div>
      </section>

      {news && (
        <section className="container-px pb-16 md:pb-24">
          <div className="grid overflow-hidden border border-ink/10 bg-[#fffaf1] shadow-soft lg:grid-cols-[1.08fr_.92fr]">
            <Link
              to={`/travel-tips/${news.slug}`}
              className="relative block min-h-[360px] overflow-hidden lg:min-h-[520px]"
            >
              <img
                src={getCardImage(news)}
                alt={news.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-clay px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  What Changed
                </span>
                <p className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight text-white">
                  {news.title}
                </p>
              </div>
            </Link>

            <div className="relative flex flex-col justify-center px-7 py-9 md:px-10 md:py-12">
              <div className="absolute right-7 top-7 rotate-[4deg] border border-ocean-dark/30 px-4 py-3 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-ocean-dark/65">
                DFW
                <span className="block">Dispatch</span>
              </div>
              <p className="pr-20 text-[11px] font-bold uppercase tracking-[0.18em] text-clay-deep">
                Closer to Home
              </p>
              <p className="mt-5 text-lg leading-relaxed text-fog">{news.summary}</p>
              <div className="mt-7 border-l-4 border-ocean-dark bg-ocean/5 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ocean-dark">
                  Why it matters
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/78">
                  Jamaica stays easy to put on the North Texas shortlist while Montego Bay
                  keeps strengthening the air-service story around it.
                </p>
              </div>
              <div className="mt-7">
                <StoryLink post={news} label="Read the dispatch" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container-px pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-ocean-dark px-7 py-10 text-white shadow-soft md:px-10 md:py-12">
            <MapPin size={22} className="text-[#f6d57a]" />
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f6d57a]">
              The Spot
            </p>
            {spotlight ? (
              <>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
                  {spotlight.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/75">{spotlight.summary}</p>
                <div className="mt-7">
                  <Link
                    to={`/travel-tips/${spotlight.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white underline decoration-[#f6d57a]/70 underline-offset-4"
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
                <p className="mt-4 max-w-xl leading-relaxed text-white/75">
                  Big photography, a real reason to go now, route context, and enough
                  detail to make the destination feel like more than a pretty picture.
                </p>
              </>
            )}
          </div>

          {tip && (
            <article className="relative rotate-[0.5deg] border border-ink/10 bg-[#fbf2df] px-7 py-9 shadow-soft md:px-10 md:py-11">
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
                  <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-ink">
                    {tip.title}
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-fog">{tip.summary}</p>
                  <div className="mt-6">
                    <StoryLink post={tip} label="Read the tip" />
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <div className="relative overflow-hidden bg-ink text-white shadow-lift">
          <img
            src="/assets/stock/hikers-ridge.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
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
                better. Preferably both. Issue 01 starts with the launch, then gets out of
                the way and lets the travel take over.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-px grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
          <div>
            <div className="flex items-center gap-2 text-[#f6d57a]">
              <Send size={17} />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                Send me the next postcard
              </span>
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
              The magazine lands in your inbox too.
            </h2>
          </div>
          <div className="min-w-0 md:min-w-[360px]">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </section>

      <section className="container-px py-12 text-center md:py-16">
        <Mail className="mx-auto text-ocean-dark" size={20} />
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-fog">
          Past issues will live here as the archive grows. Issue 01 gets to earn the shelf first.
        </p>
      </section>
    </div>
  );
}
