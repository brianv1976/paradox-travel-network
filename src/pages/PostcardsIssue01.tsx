import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { postcardsHubPosts, getCardImage } from "../data/blog";
import { assets, business } from "../lib/assets";

function Postmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" aria-hidden="true" className={className}>
      <circle cx="90" cy="90" r="68" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="90" cy="90" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="90" y="55" textAnchor="middle" className="fill-current text-[13px] font-bold tracking-[4px]">FILED FROM</text>
      <text x="90" y="98" textAnchor="middle" className="fill-current text-[34px] font-black tracking-[4px]">DFW</text>
      <text x="90" y="120" textAnchor="middle" className="fill-current text-[10px] font-bold tracking-[3px]">SEP 2026</text>
      <path d="M16 133 C60 112 121 112 164 133" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M25 143 C68 123 119 123 155 143" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RouteLine() {
  return (
    <div className="flex max-w-xl items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/85">
      <span>DFW</span>
      <span className="h-px flex-1 border-t border-dashed border-white/60" />
      <span className="rotate-12 text-lg">✈</span>
      <span className="h-px flex-1 border-t border-dashed border-white/60" />
      <span>MBJ</span>
    </div>
  );
}

export default function PostcardsIssue01() {
  const news = postcardsHubPosts.find((p) => p.contentType === "Travel News");
  const tip = postcardsHubPosts.find((p) => p.contentType === "Travel Tip");

  useSeo(
    "Issue 01 | Postcards from Paradox",
    "The launch edition of Postcards from Paradox: Jamaica, current travel news, a real Two-Minute Tip, and the first full web issue.",
    {
      image: news ? getCardImage(news) : assets.img.beach,
      ogType: "article",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Postcards from Paradox — Issue 01",
        headline: "Issue 01: The Launch Edition",
        description: "The launch edition of Postcards from Paradox from Paradox Travel Network.",
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
    <div className="overflow-hidden bg-[#efe5d1] text-[#1f211f]">
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-black">
        <img src="/assets/stock/tropical-beach-aerial.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,16,19,.9)_0%,rgba(9,16,19,.5)_48%,rgba(9,16,19,.18)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1550px] flex-col justify-between px-5 pb-24 pt-24 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Link to="/travel-tips" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-white/75 hover:text-white">
                <ArrowLeft size={14} /> Postcards from Paradox
              </Link>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[.26em] text-white/70">Issue 01 · September 2026</p>
            </div>
            <Postmark className="hidden h-36 w-36 rotate-[8deg] text-white/70 md:block" />
          </div>

          <div className="max-w-5xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[.27em] text-[#f1b75e]">The Spot</p>
            <h1 className="max-w-5xl font-display text-6xl font-semibold leading-[.86] text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Jamaica
              <span className="block italic text-[#f2d18c]">beyond the resort gate.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
              Easy from North Texas, layered enough for repeat trips, and far more interesting when the itinerary leaves room for the island itself.
            </p>
            <div className="mt-10"><RouteLine /></div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 z-20 h-20 bg-[#efe5d1] [clip-path:polygon(0_56%,9%_45%,18%_55%,29%_41%,42%_53%,54%_40%,67%_55%,79%_43%,91%_52%,100%_41%,100%_100%,0_100%)]" />
      </section>

      <section className="relative z-30 -mt-12 w-full pb-20">
        <div className="mx-auto grid max-w-[1500px] gap-0 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-10">
          <div className="relative -rotate-[.4deg] bg-[#fff8e9] px-7 py-10 shadow-[0_30px_80px_rgba(58,41,21,.22)] sm:px-10 md:px-14 md:py-14">
            <p className="text-[10px] font-black uppercase tracking-[.23em] text-[#aa6338]">From DFW, with intent</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[.98] sm:text-5xl md:text-6xl">
              Jamaica works best when you decide what kind of trip you actually want.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#625b50] md:text-lg">
              Montego Bay is the easy entry point. Negril is about the beach and the sunset. Ocho Rios puts waterfalls and adventure within reach. Kingston brings the strongest dose of music, food, history, and contemporary culture. Portland and the South Coast reward travelers who want quieter scenery and fewer resort-compound rhythms.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#625b50] md:text-lg">
              The mistake is treating Jamaica like one interchangeable beach product. The better trip starts by matching the base, pace, and excursions to the traveler.
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden bg-[#173943] text-white shadow-[0_30px_80px_rgba(58,41,21,.18)] lg:translate-y-12 lg:rotate-[.7deg]">
            <img src="/assets/stock/local-guide.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(9,40,48,.9),rgba(9,40,48,.28))]" />
            <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
              <MapPin className="text-[#f2d18c]" />
              <p className="mt-5 text-[10px] font-black uppercase tracking-[.23em] text-[#f2d18c]">Brian's take</p>
              <p className="mt-3 font-display text-3xl font-semibold leading-tight">Pick the part of Jamaica that fits the trip. Then build outward.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="the-spot" className="w-full bg-[#efe5d1] py-12 md:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-12 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#aa6338]">The Spot · Jamaica</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[.94] md:text-7xl">One island. Several very different trips.</h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-[#625b50] md:text-lg">
              A good Jamaica itinerary is less about collecting attractions and more about choosing the right region, then adding the experiences that make sense from there.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <div className="relative min-h-[440px] overflow-hidden md:col-span-7 md:row-span-2">
              <img src="/assets/stock/tropical-beach-aerial.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Negril</p>
                <h3 className="mt-2 font-display text-4xl font-semibold">Long beach days and the sunset people came for.</h3>
              </div>
            </div>
            <div className="relative min-h-[250px] overflow-hidden md:col-span-5">
              <img src="/assets/stock/local-guide.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Kingston</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">Music, food, history, and the island in motion.</h3>
              </div>
            </div>
            <div className="relative min-h-[250px] overflow-hidden md:col-span-5">
              <img src="/assets/adventure.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Ocho Rios</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">A stronger base when you want to get out and do things.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#173943] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1450px] gap-14 px-5 sm:px-8 md:px-12 lg:grid-cols-3 lg:px-16">
          <article>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Where to base</p>
            <h3 className="mt-3 font-display text-3xl font-semibold">Montego Bay</h3>
            <p className="mt-4 leading-relaxed text-white/72">Best for the easiest arrival, broad resort choice, and travelers who want the vacation to start quickly after landing.</p>
          </article>
          <article>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Where to slow down</p>
            <h3 className="mt-3 font-display text-3xl font-semibold">Negril</h3>
            <p className="mt-4 leading-relaxed text-white/72">Best for long beach time, smaller-property possibilities, casual days, and the island's most famous sunset ritual.</p>
          </article>
          <article>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Where to explore</p>
            <h3 className="mt-3 font-display text-3xl font-semibold">Ocho Rios + beyond</h3>
            <p className="mt-4 leading-relaxed text-white/72">Best for travelers who want waterfalls, river experiences, scenic drives, and a more active itinerary between beach days.</p>
          </article>
        </div>
      </section>

      <section className="w-full bg-[#efe5d1] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 md:px-12 lg:grid-cols-[.9fr_1.1fr] lg:px-16">
          <div className="relative overflow-hidden">
            <img src="/assets/resort.jpg" alt="" className="h-full min-h-[520px] w-full object-cover" />
            <div className="absolute left-5 top-5 rotate-[-5deg] bg-[#fff8e9] px-4 py-3 text-[9px] font-black uppercase tracking-[.2em] text-[#0b5e67] shadow-lg">Worth leaving the resort for</div>
          </div>
          <div className="self-center">
            <p className="text-[10px] font-black uppercase tracking-[.23em] text-[#aa6338]">Build the trip around moments</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[.96] md:text-6xl">Waterfalls. Jerk smoke. Blue Mountain mornings. Roads that make the island feel bigger.</h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-[#625b50] md:text-lg">
              <p><strong className="text-[#222]">Dunn's River Falls:</strong> iconic, busy, and still worth understanding as part of the Ocho Rios story rather than pretending everybody wants the exact same excursion.</p>
              <p><strong className="text-[#222]">Food:</strong> jerk chicken and pork matter, but so do patties, escovitch fish, curry goat, festival, fresh fruit, and the everyday places where Jamaican food feels like food instead of a themed dinner.</p>
              <p><strong className="text-[#222]">Kingston:</strong> the best counterweight to the resort-only version of Jamaica, especially for travelers interested in music, culture, history, and a real city rhythm.</p>
              <p><strong className="text-[#222]">Blue Mountains:</strong> a completely different visual language from the coast and an excellent reason to give the itinerary more range.</p>
            </div>
          </div>
        </div>
      </section>

      {news && (
        <section className="relative w-full bg-[#173943] py-20 text-white md:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-0 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
            <Link to={`/travel-tips/${news.slug}`} className="relative min-h-[440px] overflow-hidden lg:min-h-[620px]">
              <img src={getCardImage(news)} alt={news.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <span className="bg-[#d28b44] px-3 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#201b15]">What Changed</span>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1] text-white md:text-5xl">{news.title}</h2>
              </div>
            </Link>
            <div className="relative bg-[#fff8e9] px-7 py-10 text-[#1f211f] shadow-[0_28px_70px_rgba(0,0,0,.22)] sm:px-10 md:px-12 md:py-14 lg:-translate-x-5 lg:translate-y-8 lg:rotate-[.6deg]">
              <Postmark className="absolute right-4 top-4 h-28 w-28 rotate-[8deg] text-[#0b5e67]/24" />
              <p className="pr-20 text-[10px] font-black uppercase tracking-[.22em] text-[#aa6338]">DFW Dispatch</p>
              <p className="mt-6 text-lg leading-relaxed text-[#625b50]">{news.summary}</p>
              <div className="mt-7 border-l-4 border-[#0b5e67] bg-[#0b5e67]/5 px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0b5e67]">Why it matters</p>
                <p className="mt-2 text-sm leading-relaxed text-[#31322f]">Jamaica remains a practical Caribbean choice from North Texas, while Montego Bay continues to strengthen its role as the island's main tourism gateway.</p>
              </div>
              <Link to={`/travel-tips/${news.slug}`} className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#0b5e67] underline decoration-[#c87945]/60 underline-offset-4">
                Read the dispatch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {tip && (
        <section className="relative w-full overflow-hidden bg-[#efe5d1] py-20 md:py-28">
          <div className="mx-auto grid max-w-[1450px] items-center gap-14 px-5 sm:px-8 md:px-12 lg:grid-cols-[.82fr_1.18fr] lg:px-16">
            <div className="relative mx-auto w-full max-w-[440px] rotate-[-4deg] bg-[#6da5a5] px-8 pb-10 pt-16 shadow-[0_30px_70px_rgba(59,44,27,.22)] [clip-path:polygon(11%_0,89%_0,100%_12%,100%_100%,0_100%,0_12%)]">
              <div className="absolute left-1/2 top-5 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-[#efe5d1] bg-[#173943]" />
              <div className="absolute left-1/2 top-0 h-11 w-px -translate-x-1/2 bg-[#173943]/45" />
              <p className="text-[10px] font-black uppercase tracking-[.23em] text-[#173943]">2 Min Tip</p>
              <div className="mt-5 border-y border-dashed border-[#173943]/35 py-6">
                <h2 className="font-display text-4xl font-semibold leading-[1.02] text-[#173943]">{tip.title}</h2>
              </div>
              <p className="mt-5 leading-relaxed text-[#173943]/80">{tip.summary}</p>
              <div className="mt-7 flex items-end justify-between gap-6 text-[#173943]">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.22em]">Filed by</p>
                  <p className="mt-1 font-display text-xl font-semibold">Brian · PTN</p>
                </div>
                <div className="h-12 w-24 [background:repeating-linear-gradient(90deg,#173943_0_2px,transparent_2px_5px)] opacity-60" />
              </div>
              <Link to={`/travel-tips/${tip.slug}`} className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#173943] underline decoration-[#173943]/50 underline-offset-4">
                Read the full tip <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#aa6338]">Two-Minute Tip</p>
              <h3 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[.98] md:text-6xl">The real PTN tip, not layout filler.</h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#625b50] md:text-lg">
                Pack around repeatable outfits, actual weather, and the things that cannot be replaced easily. Leave enough room to close the suitcase without turning it into a wrestling event.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full overflow-hidden bg-[#173943] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="grid overflow-hidden bg-[#fff8e9] text-[#1f211f] shadow-[0_30px_80px_rgba(0,0,0,.25)] lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative min-h-[420px] overflow-hidden">
              <img src="/assets/resort.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <div className="absolute left-5 top-5 bg-[#d28b44] px-4 py-2 text-[10px] font-black uppercase tracking-[.22em] text-[#201b15]">Trip Promo</div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2d18c]">Sandals · Jamaica</p>
                <h2 className="mt-2 font-display text-4xl font-semibold leading-[1]">The Great Jamaica Comeback Sale</h2>
              </div>
            </div>
            <div className="relative px-7 py-10 sm:px-10 md:px-12 md:py-14">
              <div className="absolute right-6 top-6 rotate-[7deg] border-2 border-[#0b5e67]/30 px-4 py-3 text-center text-[9px] font-black uppercase tracking-[.18em] text-[#0b5e67]/70">Jamaica<br />Comeback</div>
              <p className="pr-24 text-[10px] font-black uppercase tracking-[.23em] text-[#aa6338]">Current supplier promotion</p>
              <h3 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] md:text-5xl">Up to $1,500 instant credit + up to $350 air credit.</h3>
              <p className="mt-4 text-xl font-semibold text-[#0b5e67]">Plus a free Jamaican adventure.</p>
              <p className="mt-6 max-w-2xl leading-relaxed text-[#625b50]">
                This is a real Sandals promotional asset supplied for the Jamaica campaign. Final qualification, applicable stay, and availability are confirmed at booking.
              </p>
              <Link to="/plan-my-trip" className="mt-8 inline-flex items-center gap-2 bg-[#173943] px-6 py-4 text-xs font-black uppercase tracking-[.18em] text-white">
                Ask Brian about this offer <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-black text-white">
        <img src="/assets/stock/hikers-ridge.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,18,21,.92),rgba(10,18,21,.56),rgba(10,18,21,.8))]" />
        <div className="relative mx-auto flex min-h-[560px] max-w-[1500px] flex-col justify-center px-5 py-20 sm:px-8 md:px-12 lg:px-16">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#f2d18c]">The Nudge</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[.95] md:text-7xl">Your trip. Your way.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/74">Plan it together or book it yourself. Real advice, real options, zero manufactured urgency.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/plan-my-trip" className="inline-flex items-center gap-2 bg-[#0b5e67] px-6 py-4 text-xs font-black uppercase tracking-[.18em] text-white">Plan With Brian <ArrowRight size={15} /></Link>
            <Link to="/book-it-yourself" className="inline-flex items-center gap-2 bg-[#fff8e9] px-6 py-4 text-xs font-black uppercase tracking-[.18em] text-[#173943]">Book It Yourself <ArrowRight size={15} /></Link>
          </div>
          <p className="mt-10 text-sm font-bold uppercase tracking-[.15em] text-white/70">Brian Voyles · Editor & Travel Advisor, Paradox Travel Network</p>
        </div>
      </section>
    </div>
  );
}
