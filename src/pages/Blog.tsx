import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Newspaper } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { postcardsHubPosts, getCardImage, type Post } from "../data/blog";
import NewsletterForm from "../components/NewsletterForm";
import { assets } from "../lib/assets";

function StoryLink({ post, label }: { post: Post; label: string }) {
  return (
    <Link
      to={`/travel-tips/${post.slug}`}
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0b5e67] underline decoration-[#c87945]/60 underline-offset-4"
    >
      {label} <ArrowRight size={14} />
    </Link>
  );
}

function Postmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" aria-hidden="true" className={className}>
      <circle cx="90" cy="90" r="68" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="90" cy="90" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="90" y="56" textAnchor="middle" className="fill-current text-[14px] font-bold tracking-[4px]">FILED FROM</text>
      <text x="90" y="99" textAnchor="middle" className="fill-current text-[34px] font-black tracking-[4px]">DFW</text>
      <text x="90" y="122" textAnchor="middle" className="fill-current text-[11px] font-bold tracking-[3px]">ISSUE 01</text>
      <path d="M18 132 C58 112 118 112 162 132" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M28 142 C68 122 122 122 152 142" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RouteMark() {
  return (
    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/80">
      <span>DFW</span>
      <span className="h-px flex-1 border-t border-dashed border-white/55" />
      <span className="rotate-12 text-base">✈</span>
      <span className="h-px flex-1 border-t border-dashed border-white/55" />
      <span>JAMAICA</span>
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
  const spotlight = postcardsHubPosts.find((p) => p.contentType === "Destination Spotlight");

  return (
    <div className="overflow-hidden bg-[#efe5d1] text-[#1f211f]">
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-black">
        <img src={assets.img.beach} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,19,24,.88)_0%,rgba(10,19,24,.58)_48%,rgba(10,19,24,.18)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1500px] flex-col justify-between px-5 pb-24 pt-24 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-start justify-between gap-6">
            <div>
              <img src={assets.logo} alt="Paradox Travel Network" className="h-10 w-auto brightness-0 invert opacity-95" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">Postcards from Paradox · Issue 01</p>
            </div>
            <Postmark className="hidden h-36 w-36 rotate-[8deg] text-white/65 md:block" />
          </div>

          <div className="max-w-5xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#f1b75e]">The launch edition</p>
            <h1 className="max-w-5xl font-display text-6xl font-semibold leading-[0.86] text-white sm:text-7xl md:text-8xl lg:text-[7.2rem]">
              Travel stories
              <span className="block italic text-[#f2d18c]">worth opening.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
              Destination stories, useful changes, practical advice, and two honest ways to book the trip when you are ready.
            </p>
            <div className="mt-10 max-w-xl"><RouteMark /></div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 z-20 h-20 bg-[#efe5d1] [clip-path:polygon(0_56%,8%_44%,17%_54%,28%_40%,40%_51%,51%_38%,64%_54%,76%_41%,88%_52%,100%_40%,100%_100%,0_100%)]" />
      </section>

      <section className="relative z-30 -mt-14 w-full pb-24">
        <div className="mx-auto grid max-w-[1500px] gap-0 px-4 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:px-10">
          <div className="relative -rotate-[.5deg] bg-[#fff8e9] px-7 py-9 shadow-[0_30px_80px_rgba(58,41,21,.22)] sm:px-10 md:px-14 md:py-14">
            <div className="absolute right-6 top-6 rotate-[7deg] border-2 border-[#0b5e67]/35 px-4 py-3 text-center text-[9px] font-black uppercase tracking-[.2em] text-[#0b5e67]/75">
              Cover Story<span className="block">Launch Edition</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#aa6338]">Latest issue</p>
            <h2 className="mt-4 max-w-2xl pr-20 font-display text-4xl font-semibold leading-[.98] sm:text-5xl md:text-6xl">
              Paradox Travel Network is officially open.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#625b50] md:text-lg">
              Issue 01 opens with the launch, then gets out of the way and lets the travel take over.
            </p>
            <Link to="/postcards/issue-01" className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#0b5e67] underline decoration-[#c87945]/60 underline-offset-4">
              Open Issue 01 <ArrowRight size={14} />
            </Link>
            <div className="mt-8 border-t border-dashed border-[#2c302e]/25 pt-4 text-[10px] font-bold uppercase tracking-[.2em] text-[#6b675f]">
              Dallas → anywhere · web edition + inbox edition
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden bg-[#173943] text-white shadow-[0_30px_80px_rgba(58,41,21,.18)] lg:translate-y-10 lg:rotate-[.6deg]">
            <img src="/assets/stock/tropical-beach-aerial.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(9,40,48,.9),rgba(9,40,48,.35))]" />
            <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
              <Newspaper size={25} className="text-[#f2d18c]" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.23em] text-[#f2d18c]">What Changed</p>
                <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.02]">News treated like a dispatch, not filler.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#173943] text-white">
        <div className="absolute inset-0">
          <img src="/assets/stock/tropical-beach-aerial.jpg" alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,33,40,.18)_0%,rgba(8,33,40,.28)_44%,rgba(8,33,40,.86)_72%,rgba(8,33,40,.95)_100%)]" />
        </div>
        <div className="relative mx-auto grid min-h-[760px] max-w-[1600px] items-end px-5 py-16 sm:px-8 md:px-12 lg:grid-cols-[1.15fr_.85fr] lg:px-16">
          <div className="pb-10 lg:pb-20">
            <div className="inline-block rotate-[-6deg] border-2 border-white/70 bg-[#a85b39]/85 px-4 py-2 text-[10px] font-black uppercase tracking-[.24em]">The Spot · Issue 01</div>
            <h2 className="mt-5 max-w-3xl font-display text-6xl font-semibold leading-[.9] sm:text-7xl md:text-8xl">Jamaica</h2>
            <p className="mt-4 text-sm font-black uppercase tracking-[.22em] text-[#f2d18c]">Beaches are only the first chapter.</p>
            <div className="mt-8 max-w-xl"><RouteMark /></div>
          </div>

          <div className="relative bg-[#fff6e3] p-7 text-[#1f211f] shadow-[0_28px_70px_rgba(0,0,0,.28)] sm:p-9 md:p-11 lg:-translate-y-12 lg:rotate-[.8deg]">
            <div className="absolute -left-7 -top-7 h-16 w-16 rotate-[-12deg] border-2 border-[#a85b39]/55 bg-[#efe5d1] text-center text-[8px] font-black uppercase tracking-[.12em] text-[#a85b39] [clip-path:polygon(8%_0,92%_0,100%_8%,100%_92%,92%_100%,8%_100%,0_92%,0_8%)]">
              <div className="pt-4">PTN<br />STAMP</div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#aa6338]">Destination Spotlight</p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.02]">The island deserves more than an all-inclusive shortcut.</h3>
            <p className="mt-5 leading-relaxed text-[#625b50]">
              Montego Bay makes arrival easy. Negril slows the pace. Ocho Rios turns the north coast into an adventure base. Kingston brings the music, food, art, and cultural weight. Portland and the South Coast reward travelers willing to leave the resort bubble.
            </p>
            <p className="mt-4 leading-relaxed text-[#625b50]">
              Issue 01 goes deeper: where to base yourself, what belongs on the itinerary, what to eat, how long to stay, and how to decide whether Jamaica fits the trip you actually want.
            </p>
            <Link to="/postcards/issue-01#the-spot" className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#0b5e67] underline decoration-[#c87945]/60 underline-offset-4">
              Read The Spot <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-[#efe5d1] [clip-path:polygon(0_66%,10%_53%,23%_65%,36%_50%,48%_61%,62%_48%,76%_63%,89%_51%,100%_61%,100%_100%,0_100%)]" />
      </section>

      {news && (
        <section className="relative w-full bg-[#efe5d1] py-20 md:py-28">
          <div className="mx-auto grid max-w-[1500px] items-stretch gap-0 px-4 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:px-10">
            <Link to={`/travel-tips/${news.slug}`} className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
              <img src={getCardImage(news)} alt={news.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <span className="bg-[#d28b44] px-3 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#201b15]">What Changed</span>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1] text-white md:text-5xl">{news.title}</h2>
              </div>
            </Link>
            <div className="relative bg-[#fff8e9] px-7 py-10 shadow-[0_28px_70px_rgba(57,45,28,.16)] sm:px-10 md:px-12 md:py-14 lg:-translate-x-5 lg:translate-y-8 lg:rotate-[.5deg]">
              <Postmark className="absolute right-4 top-4 h-28 w-28 rotate-[8deg] text-[#0b5e67]/25" />
              <p className="pr-20 text-[10px] font-black uppercase tracking-[.22em] text-[#aa6338]">DFW Dispatch</p>
              <p className="mt-6 text-lg leading-relaxed text-[#625b50]">{news.summary}</p>
              <div className="mt-7 border-l-4 border-[#0b5e67] bg-[#0b5e67]/5 px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0b5e67]">Why it matters</p>
                <p className="mt-2 text-sm leading-relaxed text-[#31322f]">North Texas travelers can keep Jamaica on the easy-Caribbean shortlist while Montego Bay continues strengthening its international gateway role.</p>
              </div>
              <div className="mt-8"><StoryLink post={news} label="Read the dispatch" /></div>
            </div>
          </div>
        </section>
      )}

      {tip && (
        <section className="relative w-full overflow-hidden bg-[#173943] py-20 text-white md:py-28">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#fff_0,transparent_22%),radial-gradient(circle_at_80%_70%,#fff_0,transparent_18%)]" />
          <div className="relative mx-auto grid max-w-[1450px] items-center gap-14 px-5 sm:px-8 md:px-12 lg:grid-cols-[.82fr_1.18fr] lg:px-16">
            <div className="relative mx-auto w-full max-w-[430px] rotate-[-4deg] bg-[#c87945] px-8 pb-10 pt-16 text-[#1f211f] shadow-[0_30px_70px_rgba(0,0,0,.28)] [clip-path:polygon(11%_0,89%_0,100%_12%,100%_100%,0_100%,0_12%)]">
              <div className="absolute left-1/2 top-5 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-[#efe5d1] bg-[#173943]" />
              <div className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-[#efe5d1]/70" />
              <p className="text-[10px] font-black uppercase tracking-[.23em]">Two-Minute Tip</p>
              <div className="mt-5 border-y border-dashed border-black/30 py-6">
                <h2 className="font-display text-4xl font-semibold leading-[1.02]">{tip.title}</h2>
              </div>
              <p className="mt-5 leading-relaxed text-black/70">{tip.summary}</p>
              <div className="mt-7 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.22em]">Filed by</p>
                  <p className="mt-1 font-display text-xl font-semibold">Brian · PTN</p>
                </div>
                <div className="h-12 w-24 [background:repeating-linear-gradient(90deg,#1f211f_0_2px,transparent_2px_5px)] opacity-60" />
              </div>
              <div className="mt-7"><StoryLink post={tip} label="Read the real tip" /></div>
            </div>

            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#f2d18c]">Useful beats generic</p>
              <h3 className="mt-4 font-display text-5xl font-semibold leading-[.98] md:text-6xl">Practical advice with Brian’s actual voice attached.</h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
                No filler written to make the layout behave. The tip block uses the real PTN article, the real headline, and a path to the full advice.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full overflow-hidden bg-black text-white">
        <img src="/assets/stock/hikers-ridge.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,18,21,.92),rgba(10,18,21,.55),rgba(10,18,21,.78))]" />
        <div className="relative mx-auto grid min-h-[620px] max-w-[1500px] items-center gap-12 px-5 py-20 sm:px-8 md:px-12 lg:grid-cols-[.9fr_1.1fr] lg:px-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#f2d18c]">From the Editor</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[.98] md:text-6xl">A travel magazine with a real person behind it.</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/74 md:text-lg">Brian is the guide behind Paradox, not the subject of every page. The publication exists to make travel more interesting, more useful, and easier to act on.</p>
            <p className="mt-7 text-sm font-bold uppercase tracking-[.15em] text-white/85">Brian Voyles · Editor & Travel Advisor, Paradox Travel Network</p>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] bg-[#fff8e9] p-7 text-[#1f211f] shadow-[0_30px_70px_rgba(0,0,0,.3)] md:p-10 lg:rotate-[1deg]">
            <Mail className="text-[#0b5e67]" />
            <p className="mt-5 text-[10px] font-black uppercase tracking-[.22em] text-[#aa6338]">Postcards in your inbox</p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.02]">The issue lands here first.</h3>
            <p className="mt-4 leading-relaxed text-[#625b50]">Destination stories, useful changes, practical advice, and the occasional trip worth opening an email for.</p>
            <div className="mt-7"><NewsletterForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-[#efe5d1] px-5 py-12 text-center sm:px-8">
        <p className="text-[10px] font-black uppercase tracking-[.23em] text-[#7d6d59]">Postcards from Paradox · Dallas-Fort Worth · Issue 01</p>
      </section>
    </div>
  );
}
