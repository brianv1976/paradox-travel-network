import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Compass, Plane } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { postcardsHubPosts, getCardImage, type Post } from "../data/blog";
import NewsletterForm from "../components/NewsletterForm";
import { assets } from "../lib/assets";

function StoryLink({ post, label }: { post: Post; label: string }) {
  return (
    <Link
      to={`/travel-tips/${post.slug}`}
      className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#0d5f67] transition-transform duration-300 hover:translate-x-1"
    >
      {label} <ArrowRight size={13} />
    </Link>
  );
}

function Postmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" aria-hidden="true" className={className}>
      <circle cx="90" cy="90" r="67" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="90" cy="90" r="56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 5" />
      <text x="90" y="53" textAnchor="middle" className="fill-current text-[12px] font-bold tracking-[4px]">FILED FROM</text>
      <text x="90" y="96" textAnchor="middle" className="fill-current text-[31px] font-black tracking-[4px]">USA</text>
      <text x="90" y="119" textAnchor="middle" className="fill-current text-[10px] font-bold tracking-[3px]">NATIONWIDE</text>
      <path d="M14 134 C58 113 121 113 166 134" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M26 145 C70 125 121 125 154 145" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StampPhoto({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative inline-block bg-[#f6efe0] p-2 shadow-[0_12px_30px_rgba(56,43,28,.14)] [clip-path:polygon(4%_0,8%_2%,12%_0,16%_2%,20%_0,24%_2%,28%_0,32%_2%,36%_0,40%_2%,44%_0,48%_2%,52%_0,56%_2%,60%_0,64%_2%,68%_0,72%_2%,76%_0,80%_2%,84%_0,88%_2%,92%_0,96%_2%,100%_0,98%_4%,100%_8%,98%_12%,100%_16%,98%_20%,100%_24%,98%_28%,100%_32%,98%_36%,100%_40%,98%_44%,100%_48%,98%_52%,100%_56%,98%_60%,100%_64%,98%_68%,100%_72%,98%_76%,100%_80%,98%_84%,100%_88%,98%_92%,100%_96%,98%_100%,94%_98%,90%_100%,86%_98%,82%_100%,78%_98%,74%_100%,70%_98%,66%_100%,62%_98%,58%_100%,54%_98%,50%_100%,46%_98%,42%_100%,38%_98%,34%_100%,30%_98%,26%_100%,22%_98%,18%_100%,14%_98%,10%_100%,6%_98%,2%_100%,0_96%,2%_92%,0_88%,2%_84%,0_80%,2%_76%,0_72%,2%_68%,0_64%,2%_60%,0_56%,2%_52%,0_48%,2%_44%,0_40%,2%_36%,0_32%,2%_28%,0_24%,2%_20%,0_16%,2%_12%,0_8%,2%_4%,0_0)]">
      <img src={src} alt="" className="h-44 w-32 object-cover sm:h-56 sm:w-40" />
      <span className="absolute bottom-4 right-4 bg-white/85 px-2 py-1 text-[9px] font-black uppercase tracking-[.18em] text-[#0c3142]">{label}</span>
    </div>
  );
}

export default function Blog() {
  useSeo(
    "Postcards from Paradox | Travel Magazine, News & Destination Stories",
    "Postcards from Paradox is the travel magazine from Paradox Travel Network: destination stories, useful travel news, practical tips, and full web editions."
  );

  const news = postcardsHubPosts.find((p) => p.contentType === "Travel News");
  const tip = postcardsHubPosts.find((p) => p.contentType === "Travel Tip");

  return (
    <div className="overflow-hidden bg-[#f2eadb] text-[#0c2940]">
      <section className="relative border-b border-[#0c2940]/20 bg-[#f8f1e4] px-5 pb-10 pt-24 sm:px-8 md:px-12 lg:px-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(44,35,24,.28)_1px,transparent_0)] [background-size:5px_5px]" />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.34em] text-[#9a7b3f]">Curated travel intelligence, filed from DFW for travelers nationwide</p>
              <h1 className="mt-3 font-display text-6xl font-semibold leading-[.78] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
                POSTCARDS
              </h1>
              <p className="mt-1 font-display text-4xl italic text-[#9b7a3d] sm:text-5xl md:text-6xl">from Paradox</p>
            </div>
            <div className="flex items-center gap-4 lg:pb-2">
              <div className="hidden h-px w-28 bg-[#0c2940]/30 sm:block" />
              <Postmark className="h-28 w-28 rotate-[7deg] text-[#0c2940]/80 sm:h-32 sm:w-32" />
              <StampPhoto src="/assets/stock/tropical-beach-aerial.jpg" label="PTN" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-[#0c2940]/50 py-4">
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[.2em]">
              <Plane size={17} className="rotate-12" />
              <span>Issue #1</span>
              <span className="text-[#9b7a3d]">September 2026</span>
            </div>
            <Link
              to="/postcards/issue-01"
              className="flex w-full items-center justify-center gap-2 bg-[#0c2940] px-6 py-3 text-[12px] font-black uppercase tracking-[.18em] text-[#f8f1e4] transition-colors duration-300 hover:bg-[#0d5f67] sm:w-auto"
            >
              Open full issue <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 sm:px-8 md:px-12 lg:px-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(44,35,24,.38)_1px,transparent_0)] [background-size:6px_6px]" />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#0d5f67]">Latest issue</p>
              <h2 className="mt-2 font-display text-5xl font-semibold leading-[.95] md:text-7xl">The first postcard is stamped.</h2>
            </div>
            <div className="rotate-[2deg] border-2 border-[#aa6338]/40 px-4 py-3 text-center text-[9px] font-black uppercase tracking-[.18em] text-[#aa6338]">
              Launch Edition<br />DFW → Jamaica
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <Link to="/postcards/issue-01" className="group relative min-h-[540px] overflow-hidden bg-black lg:col-span-7">
              <img src="/assets/stock/tropical-beach-aerial.jpg" alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,18,23,.06),rgba(2,18,23,.72))]" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                <div className="inline-flex items-center gap-2 bg-[#0d5f67] px-3 py-2 text-[10px] font-black uppercase tracking-[.2em]">
                  <MapPin size={13} /> The Spot
                </div>
                <h3 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[.9] md:text-7xl">Jamaica beyond the resort gate.</h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82">Montego Bay is the easy arrival. The real story stretches to Negril, Ocho Rios, Kingston, Portland, the South Coast, food, culture, waterfalls, roads, and the island between them.</p>
              </div>
            </Link>

            <div className="grid gap-5 lg:col-span-5">
              {news && (
                <Link to={`/travel-tips/${news.slug}`} className="group relative overflow-hidden border border-[#0c2940]/15 bg-[#f9f3e7] p-6 shadow-[0_16px_38px_rgba(49,40,28,.12)] transition duration-300 hover:-translate-y-1 md:p-8">
                  <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#aa6338]">What changed</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.02] md:text-4xl">{news.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-[#57564f] md:text-base">{news.summary}</p>
                      <p className="mt-5 text-[10px] font-black uppercase tracking-[.18em] text-[#0d5f67]">DFW Dispatch</p>
                    </div>
                    <div className="relative mx-auto">
                      <StampPhoto src={getCardImage(news)} label="MBJ" />
                      <div className="absolute -bottom-4 -left-6 rotate-[-8deg] border-2 border-[#0d5f67]/40 bg-[#f8f1e4] px-3 py-2 text-[9px] font-black uppercase tracking-[.18em] text-[#0d5f67]">Montego Bay</div>
                    </div>
                  </div>
                </Link>
              )}

              {tip && (
                <Link to={`/travel-tips/${tip.slug}`} className="group relative overflow-hidden border border-[#0c2940]/15 bg-[#e6d4ad] p-6 shadow-[0_16px_38px_rgba(49,40,28,.12)] transition duration-300 hover:-translate-y-1 md:p-8">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rotate-12 rounded-full border-2 border-[#0c2940]/20" />
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#0d5f67]">Travel Tip · Brian / PTN</p>
                  <h3 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-[1.02] md:text-4xl">{tip.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#57564f] md:text-base">{tip.summary}</p>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <span className="text-[10px] font-black uppercase tracking-[.18em] text-[#0d5f67]">Read the full tip</span>
                    <div className="h-9 w-24 [background:repeating-linear-gradient(90deg,#0c2940_0_2px,transparent_2px_5px)] opacity-50" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f8f1e4] px-5 py-14 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-7 flex items-center gap-4">
            <Compass size={26} className="text-[#0d5f67]" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#0d5f67]">Passport note</p>
              <h2 className="font-display text-4xl font-semibold md:text-5xl">Big changes. Better access. More reasons to go.</h2>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <img src="/assets/stock/tropical-beach-aerial.jpg" alt="" className="h-[360px] w-full object-cover md:h-[460px]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,40,.75),rgba(4,33,40,.18),rgba(4,33,40,.08))]" />
            <div className="absolute left-6 top-6 max-w-md rotate-[-2deg] bg-[#f8f1e4]/95 p-6 shadow-[0_20px_45px_rgba(0,0,0,.22)] md:left-10 md:top-10 md:p-8">
              <p className="font-display text-3xl italic leading-tight text-[#0c2940]">We’ll keep you posted.</p>
              <p className="mt-3 text-sm leading-relaxed text-[#57564f]">Useful travel changes, filed without the noise and translated into what they actually mean for the trip.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0c2940] px-5 py-16 text-white sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#f0bf68]">From the editor</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[.95] md:text-6xl">Curated travel. Curated life.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">Brian is the travel advisor behind Paradox. The magazine is here to make the destination interesting first, then make the planning easier when you are ready.</p>
            <p className="mt-7 text-sm font-bold uppercase tracking-[.14em] text-white/85">Brian Voyles · Editor & Travel Advisor, Paradox Travel Network</p>
          </div>
          <div className="border border-white/20 bg-white/8 p-7 md:p-9">
            <Mail size={22} className="text-[#f0bf68]" />
            <h3 className="mt-4 font-display text-4xl font-semibold leading-[1]">Postcards in your inbox.</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">The issue, the useful changes, the destination, and the occasional trip worth opening an email for.</p>
            <div className="mt-7"><NewsletterForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f1e4] px-5 py-8 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 border-t border-[#0c2940]/35 pt-6">
          <div className="flex items-center gap-3">
            <img src={assets.logo} alt="Paradox Travel Network" className="h-8 w-auto opacity-80" />
            <span className="text-[10px] font-black uppercase tracking-[.18em]">Your journey, curated.</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#716957]">paradoxtravelnetwork.com</p>
        </div>
      </section>
    </div>
  );
}
