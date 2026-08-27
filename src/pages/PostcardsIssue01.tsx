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

      <section className="relative z-30 -mt-8 w-full pb-20 md:-mt-12 md:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-0 px-4 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:px-10">
          <div className="relative rotate-[-0.6deg] bg-[#fff8e9] px-7 py-10 shadow-[0_30px_80px_rgba(58,41,21,.22)] sm:px-10 md:px-14 md:py-14">
            <div className="absolute right-6 top-6 rotate-[7deg] border-2 border-ocean-dark/30 px-4 py-3 text-center text-[9px] font-black uppercase tracking-[0.18em] text-ocean-dark/70">
              New
              <span className="block">From DFW</span>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.23em] text-clay-deep">
              Paradox Travel Network
            </p>
            <h2 className="mt-4 max-w-3xl pr-20 font-display text-4xl font-semibold leading-[0.98] md:text-6xl">
              Travel planning without the travel-agency cheese.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              Paradox is live. Real trip help when you want it. Straightforward ways to book
              when you don’t. Useful travel stories either way.
            </p>

            <div className="mt-8 grid gap-4 border-y border-dashed border-ink/20 py-6 sm:grid-cols-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-clay-deep">01</p>
                <p className="mt-2 font-display text-2xl font-semibold">Plan With Brian</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">Research, options, booking help, and a real person behind the trip.</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-clay-deep">02</p>
                <p className="mt-2 font-display text-2xl font-semibold">Book It Yourself</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">Trusted travel partners when you already know what you want.</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-clay-deep">03</p>
                <p className="mt-2 font-display text-2xl font-semibold">Postcards</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">The good stuff: destinations, changes, tips, and trips worth noticing.</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/plan-my-trip" className="btn-primary">
                Plan With Brian <ArrowRight size={16} />
              </Link>
              <Link to="/book-it-yourself" className="btn-secondary">
                Book It Yourself
              </Link>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden bg-ocean-dark text-white shadow-[0_30px_80px_rgba(58,41,21,.18)] lg:translate-y-10 lg:rotate-[0.7deg]">
            <img src="/assets/Headshot.png" alt="Brian Voyles" className="absolute bottom-0 right-0 h-[94%] w-auto object-contain object-bottom opacity-90" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,48,58,.96),rgba(8,48,58,.62),rgba(8,48,58,.08))]" />
            <div className="relative flex h-full max-w-sm flex-col justify-between p-8 md:p-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.23em] text-[#f2d18c]">Meet the human</p>
                <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.02]">
                  Brian handles the trip. Paradox handles the noise.
                </h3>
              </div>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-white/82">
                Brian Voyles · Travel Advisor · DFW
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="the-spot" className="relative w-full overflow-hidden bg-[#102f38] text-white">
        <img
          src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_900,q_85,w_1600/v1/clients/jamaica/negril_6cc57458-39c1-40bf-a516-88d725c60b20.jpg"
          alt="Negril, Jamaica"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,29,.91)_0%,rgba(7,25,29,.68)_42%,rgba(7,25,29,.24)_72%,rgba(7,25,29,.48)_100%)]" />
        <div className="relative mx-auto flex min-h-[860px] max-w-[1600px] flex-col justify-end px-5 pb-24 pt-24 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#f2d18c]">The Spot · Issue 01</p>
            <h2 className="mt-4 font-display text-7xl font-semibold leading-[0.84] sm:text-8xl md:text-[8rem]">
              Jamaica
            </h2>
            <p className="mt-5 max-w-3xl text-base font-black uppercase tracking-[0.19em] text-[#f0a84f] md:text-lg">
              The beach is only the first chapter.
            </p>
            <div className="mt-9 flex max-w-3xl items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/78">
              <span>DFW</span>
              <span className="h-px flex-1 border-t border-dashed border-white/50" />
              <span className="rotate-12 text-lg">✈</span>
              <span className="h-px flex-1 border-t border-dashed border-white/50" />
              <span>MBJ</span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-20 bg-[#efe5d1] [clip-path:polygon(0_62%,9%_51%,20%_64%,31%_49%,44%_61%,56%_47%,68%_62%,81%_50%,91%_60%,100%_48%,100%_100%,0_100%)]" />
      </section>

      <section className="w-full bg-[#efe5d1] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 md:px-12 lg:grid-cols-[.82fr_1.18fr] lg:px-16">
          <div className="relative">
            <div className="sticky top-24 rotate-[-0.7deg] bg-[#fff8e9] p-7 shadow-[0_26px_70px_rgba(58,41,21,.17)] md:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-clay-deep">Why Jamaica</p>
              <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.02]">
                Easy to reach. Impossible to reduce to one kind of trip.
              </h3>
              <p className="mt-5 leading-relaxed text-fog">
                Montego Bay makes arrival simple, but Jamaica gets more interesting once you stop treating the airport and the resort strip as the whole island.
              </p>
              <div className="mt-7 border-t border-dashed border-ink/20 pt-5">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-ocean-dark">Brian’s take</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">
                  A resort-only week can be exactly right. But if you want Jamaica to feel like Jamaica, build at least part of the trip around the island itself.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.23em] text-clay-deep">The big idea</p>
            <h3 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-[0.98] md:text-6xl">
              Pick the Jamaica that matches the trip.
            </h3>
            <div className="mt-7 max-w-4xl space-y-5 text-base leading-relaxed text-fog md:text-lg">
              <p>
                Jamaica is sold as one thing far too often. In reality, the island can be a lazy beach week, a waterfall-and-river adventure, a food-and-music trip, a romantic cliffside escape, or a split-stay that mixes all of it.
              </p>
              <p>
                The trick is not collecting every famous stop. It is choosing the right base, the right pace, and the right amount of movement for the trip you actually want.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                ["Montego Bay", "Best for an easy arrival, broad resort choice, golf, nightlife, and day-trip flexibility."],
                ["Negril", "Best for long beach days, cliffs, sunsets, seafood, and a slower rhythm."],
                ["Ocho Rios", "Best for waterfalls, rivers, gardens, caves, and travelers who want action with the beach."],
                ["Kingston", "Best for music, food, art, history, nightlife, and the cultural side of the island."],
                ["Port Antonio", "Best for lush scenery, quieter stays, and travelers willing to trade convenience for atmosphere."],
                ["South Coast", "Best for a slower, less polished Jamaica with small-scale stays and a road-trip feel."],
              ].map(([place, copy]) => (
                <div key={place} className="border-t border-dashed border-ink/25 pt-4">
                  <p className="font-display text-2xl font-semibold">{place}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid w-full lg:grid-cols-3">
        <figure className="relative min-h-[430px] overflow-hidden lg:min-h-[520px]">
          <img
            src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_427,q_65,w_640/v1/clients/jamaica/mobay_collage_350055ae-075c-43c3-aefa-bf5a678f0ed5.png"
            alt="Montego Bay, Jamaica"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f2d18c]">Start easy</p>
            <p className="mt-2 font-display text-3xl font-semibold">Montego Bay</p>
          </figcaption>
        </figure>

        <figure className="relative min-h-[430px] overflow-hidden lg:min-h-[520px]">
          <img
            src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_427,q_65,w_640/v1/clients/jamaica/ocho_rios_collage_df1c9eda-c999-4dad-8f10-e3d8442fd30e.png"
            alt="Ocho Rios, Jamaica"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f2d18c]">Get moving</p>
            <p className="mt-2 font-display text-3xl font-semibold">Ocho Rios</p>
          </figcaption>
        </figure>

        <figure className="relative min-h-[430px] overflow-hidden lg:min-h-[520px]">
          <img
            src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_427,q_65,w_640/v1/clients/jamaica/kingston_collage_952122a0-c083-42bf-93cb-cddbf5caacf8.png"
            alt="Kingston, Jamaica"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f2d18c]">Feel the culture</p>
            <p className="mt-2 font-display text-3xl font-semibold">Kingston</p>
          </figcaption>
        </figure>
      </section>

      <section className="w-full bg-[#173943] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 md:px-12 lg:grid-cols-[1.08fr_.92fr] lg:px-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.23em] text-[#f2d18c]">Build the week</p>
            <h3 className="mt-3 font-display text-5xl font-semibold leading-[0.98] md:text-6xl">
              Seven days should feel like a trip, not a transfer schedule.
            </h3>
            <div className="mt-7 max-w-3xl space-y-5 text-base leading-relaxed text-white/72 md:text-lg">
              <p>
                For a first visit, a two-base itinerary is usually enough. Start around Montego Bay for the easy arrival, then move west to Negril for beach time, or east toward Ocho Rios if waterfalls and excursions matter more.
              </p>
              <p>
                Add Kingston when culture is a real priority, not because a checklist says you should. Add Port Antonio or the South Coast when the slower, greener, less resort-heavy version of Jamaica is the point of the trip.
              </p>
            </div>
          </div>

          <div className="rotate-[1deg] bg-[#fff8e9] p-7 text-ink shadow-[0_28px_70px_rgba(0,0,0,.24)] md:p-9">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-clay-deep">A sensible first-timer split</p>
            <div className="mt-6 space-y-5">
              <div className="border-b border-dashed border-ink/20 pb-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-ocean-dark">Days 1–3</p>
                <p className="mt-1 font-display text-2xl font-semibold">Montego Bay</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">Land, settle in, beach, food, one easy outing, no heroic logistics on arrival day.</p>
              </div>
              <div className="border-b border-dashed border-ink/20 pb-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-ocean-dark">Days 4–7</p>
                <p className="mt-1 font-display text-2xl font-semibold">Negril or Ocho Rios</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">Choose west for sunsets and beach time, east for waterfalls and a more active finish.</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-ocean-dark">Skip the mistake</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">Do not spend half a seven-day vacation proving that you can change hotels four times.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {tip && (
        <section className="relative w-full overflow-hidden bg-[#efe5d1] py-20 md:py-28">
          <div className="mx-auto max-w-[1450px] px-5 sm:px-8 md:px-12 lg:px-16">
            <div className="relative mx-auto max-w-5xl rotate-[-1deg] bg-[#f8edcf] px-7 py-10 shadow-[0_28px_70px_rgba(58,41,21,.22)] md:px-12 md:py-12 [clip-path:polygon(7%_0,100%_0,100%_100%,7%_100%,0_88%,0_12%)]">
              <div className="absolute left-8 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-[8px] border-[#b99b6c] bg-[#efe5d1]" />
              <div className="pl-16 md:pl-20">
                <div className="grid gap-8 md:grid-cols-[120px_1fr_auto] md:items-center">
                  <div className="border-r border-dashed border-ink/20 pr-6 text-center">
                    <span className="block text-5xl font-black leading-none text-ocean-dark">2</span>
                    <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.2em] text-ocean-dark">Min Tip</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-clay-deep">Brian · PTN</p>
                    <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.02] md:text-5xl">{tip.title}</h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-fog">{tip.summary}</p>
                  </div>
                  <div className="hidden h-20 w-28 md:block [background:repeating-linear-gradient(90deg,#262721_0_2px,transparent_2px_5px)] opacity-55" />
                </div>
                <Link
                  to={`/travel-tips/${tip.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-ocean-dark underline decoration-clay/60 underline-offset-4"
                >
                  Read the full tip <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

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
