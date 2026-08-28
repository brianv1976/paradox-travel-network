import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Globe2, Compass, Facebook, Instagram, Send, Plane, Lightbulb } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { postcardsHubPosts, getCardImage } from "../data/blog";
import { assets, business, links } from "../lib/assets";

/** A hand-torn / deckle photo edge, the single most repeated postal-ephemera
 * device on the page — every framed photo uses some variant of this instead
 * of a clean rectangle. */
const DECKLE = "polygon(1% 6%,8% 1%,25% 3%,40% 0%,58% 2%,76% 0%,92% 3%,100% 9%,98% 25%,100% 45%,97% 63%,100% 82%,95% 97%,100% 100%,80% 97%,60% 100%,42% 96%,24% 100%,6% 96%,0% 80%,3% 60%,0% 40%,2% 22%)";

function Postmark({ className = "", city = "DFW", date = "SEP 2026", label = "PARADOX TRAVEL NETWORK" }: { className?: string; city?: string; date?: string; label?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="73" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" />
      <path id="pmTop" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
      <text className="fill-current text-[11px] font-bold tracking-[2.5px]">
        <textPath href="#pmTop" startOffset="50%" textAnchor="middle">{label}</textPath>
      </text>
      <text x="100" y="93" textAnchor="middle" className="fill-current text-[26px] font-black tracking-[3px]">{city}</text>
      <text x="100" y="114" textAnchor="middle" className="fill-current text-[9px] font-bold tracking-[3px]">{date}</text>
      <path d="M22 148 C62 129 138 129 178 148" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M30 158 C66 141 134 141 170 158" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Real illustrated compass rose (transparent PNG), replacing the earlier
 * hand-coded SVG approximation — see Postcards-Production-Workflow doc. */
function CompassRose({ className = "" }: { className?: string }) {
  return <img src="/assets/postcards/ephemera/compass-rose.png" alt="" aria-hidden="true" className={className} />;
}

/** Real illustrated postal cancellation-line texture (transparent PNG),
 * replacing the earlier hand-coded SVG approximation. */
function CancellationLines({ className = "" }: { className?: string }) {
  return <img src="/assets/postcards/ephemera/cancellation-lines.png" alt="" aria-hidden="true" className={className} />;
}

function TicketStub({ className = "", rotate = "-2deg", children }: { className?: string; rotate?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative inline-block bg-[#fdf6e3] px-5 py-3 shadow-[0_10px_26px_rgba(20,15,5,.3)] ${className}`}
      style={{
        transform: `rotate(${rotate})`,
        WebkitMaskImage: "radial-gradient(circle 5px at 0 50%, transparent 5px, black 5.2px), radial-gradient(circle 5px at 100% 50%, transparent 5px, black 5.2px)",
        maskImage: "radial-gradient(circle 5px at 0 50%, transparent 5px, black 5.2px), radial-gradient(circle 5px at 100% 50%, transparent 5px, black 5.2px)",
      }}
    >
      {children}
    </div>
  );
}

function HandwrittenNote({ className = "", rotate = "3deg", children }: { className?: string; rotate?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative bg-[#fdf6e3] px-5 py-4 shadow-[0_14px_32px_rgba(20,15,5,.32)] ${className}`}
      style={{ transform: `rotate(${rotate})`, clipPath: "polygon(0 3%,4% 0,100% 1%,99% 96%,96% 100%,1% 98%)" }}
    >
      <div className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[-3deg] bg-[#e8dcae]/70 shadow-sm" />
      {children}
    </div>
  );
}

function StampBoxLogo({ className = "", rotate = "-3deg" }: { className?: string; rotate?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 border border-dashed border-current px-4 py-2.5 ${className}`} style={{ transform: `rotate(${rotate})` }}>
      <Compass size={22} strokeWidth={1.6} />
      <div className="leading-[1.15]">
        <p className="text-[11px] font-black uppercase tracking-[.14em]">Postcards</p>
        <p className="text-[11px] font-black uppercase tracking-[.14em]">from Paradox</p>
      </div>
    </div>
  );
}

/** A photo torn from a print, perforated like a stamp, tilted like it was
 * dropped onto the page rather than laid out in a grid. */
function DeckleStamp({ src, alt, label, className = "", rotate = "-4deg", w = "130px" }: { src: string; alt: string; label?: string; className?: string; rotate?: string; w?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: w, transform: `rotate(${rotate})` }}>
      <div className="bg-[#fdf6e3] p-[6px] shadow-[0_16px_34px_rgba(20,15,5,.38)]">
        <div className="relative aspect-[4/5] overflow-hidden" style={{ clipPath: DECKLE }}>
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
      </div>
      {label && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1b1a17] px-2 py-0.5 text-[8px] font-black uppercase tracking-[.12em] text-white shadow">
          {label}
        </span>
      )}
    </div>
  );
}

function ChangeCard({
  tag,
  tagColor,
  icon,
  title,
  body,
  meaning,
  source,
  image,
  imageMobile,
  imageDesktop,
  badge,
  link,
  rotate,
  className = "",
}: {
  tag: string;
  tagColor: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  meaning: string;
  source: string;
  image?: string;
  imageMobile?: string;
  imageDesktop?: string;
  badge: string;
  link?: string;
  rotate: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-visible shadow-[0_26px_58px_rgba(20,15,5,.3)] ${className}`} style={{ transform: `rotate(${rotate})` }}>
      {/* front: full-bleed photo with an actual postage stamp box in the corner */}
      <div className="relative h-40 overflow-hidden sm:h-48" style={{ clipPath: "polygon(0 0,100% 0,100% 92%,0 100%)" }}>
        {imageMobile && imageDesktop ? (
          <>
            <img src={imageMobile} alt={title} className="absolute inset-0 h-full w-full object-cover sm:hidden" />
            <img src={imageDesktop} alt={title} className="absolute inset-0 hidden h-full w-full object-cover sm:block" />
          </>
        ) : (
          <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute right-3 top-3 flex h-16 w-14 flex-col items-center justify-center border-2 border-dashed border-white/80 bg-black/10 backdrop-blur-[1px]">
          <p className="text-center text-[7px] font-black uppercase leading-tight tracking-[.1em] text-white">{badge}</p>
        </div>
        <Postmark className="pointer-events-none absolute -right-2 top-8 h-16 w-16 rotate-[16deg] text-white/75" city="" date="" label="" />
      </div>

      {/* back: real postcard-back artwork (torn deckle edge, postmark, compass) instead of a flat rectangle */}
      <div
        className="relative grid min-h-[280px] gap-4 bg-top bg-no-repeat px-6 py-8 sm:grid-cols-[1fr_auto_.55fr] sm:px-8 sm:py-9"
        style={{ backgroundImage: "url(/assets/postcards/ephemera/what-changed-container.png)", backgroundSize: "100% auto" }}
      >
        <div className="min-w-0">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.14em] text-white ${tagColor}`}>
            {icon}
            {tag}
          </span>
          <h3 className="mt-3 font-display text-[1.4rem] font-semibold leading-[1.08] text-[#1b1a17]">{title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-[#3d3a30]">{body}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#3d3a30]">
            <span className={`font-bold ${tagColor.replace("bg-", "text-")}`}>What this means for you: </span>
            {meaning}
          </p>
        </div>

        <div className="hidden w-px bg-[repeating-linear-gradient(180deg,rgba(27,26,23,.3)_0_5px,transparent_5px_9px)] sm:block" />

        <div className="flex flex-col justify-between gap-3">
          <p className="text-[11px] leading-snug text-[#7a6f56]">Source: {source}</p>
          {link && (
            <Link to={link} className={`inline-flex w-fit items-center gap-1.5 text-xs font-black uppercase tracking-[.14em] underline underline-offset-4 ${tagColor.replace("bg-", "text-")}`}>
              Read more <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PostcardsIssue01() {
  const spot = postcardsHubPosts.find((p) => p.contentType === "Destination Spotlight");
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
    <div
      className="w-full pb-20 text-[#1b1a17]"
      style={{
        backgroundColor: "#ECE4D6",
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 8% 0%, rgba(139,101,58,.10), transparent 60%), radial-gradient(ellipse 55% 45% at 95% 12%, rgba(139,101,58,.08), transparent 55%), radial-gradient(ellipse 50% 35% at 20% 95%, rgba(90,70,40,.07), transparent 60%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      }}
    >
      {/* ===== HERO COLLAGE (full-bleed, no nav clearance — nav floats transparent) ===== */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "94vh" }}>
        <img src="/assets/stock/tropical-beach-aerial.jpg" alt="Jamaica coastline" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(9,16,19,.85)_0%,rgba(9,16,19,.42)_50%,rgba(9,16,19,.15)_100%)]" />
        <CancellationLines className="pointer-events-none absolute left-[6%] top-[8%] h-28 w-[70%] text-white/25 sm:h-36" />

        <div className="relative flex min-h-[94vh] flex-col justify-between px-5 py-24 sm:px-10 sm:py-28">
          <div className="flex items-start justify-between">
            <StampBoxLogo rotate="-4deg" className="border-white/70 bg-black/15 text-white backdrop-blur-[1px]" />
            <Postmark className="h-24 w-24 rotate-[9deg] text-white/80 sm:h-28 sm:w-28" label="FILED FROM" city="DFW" date="SEP 2026" />
          </div>

          <div className="relative mt-10 max-w-2xl">
            <h1 className="font-display text-[clamp(2.3rem,9vw,3.4rem)] font-black uppercase leading-[.82] tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,.5)] sm:rotate-[-1.5deg] sm:text-[5.5rem] md:text-[6.5rem]">
              Postcards
            </h1>
            <p className="relative z-10 -mt-2 ml-2 rotate-[2deg] text-4xl font-semibold text-[#f2d18c] sm:text-5xl" style={{ fontFamily: "'Caveat', cursive" }}>
              from Paradox
            </p>

            <div className="relative mt-8">
              <span className="inline-block -rotate-1 bg-[#8a5a0d] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-[#fdf6e3]">The Spot &middot; Destination Spotlight</span>
              <h2 className="mt-4 rotate-[.6deg] font-display text-3xl font-semibold leading-[1.02] text-white sm:text-4xl md:text-[2.75rem]">
                {spot ? spot.title : "Jamaica Beyond the Resort Gates"}
              </h2>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <TicketStub rotate="-2deg">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#8a5a0d]">Issue No. 01</p>
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#5a5342]">Free Edition &middot; Nationwide</p>
            </TicketStub>

            <HandwrittenNote rotate="3deg" className="max-w-[220px]">
              <p className="flex items-center gap-1.5 text-[13px] leading-tight text-[#173943]" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.25rem" }}>
                <Plane size={14} className="rotate-45 shrink-0" /> DFW &rarr; MBJ, about 1,150 miles.
              </p>
            </HandwrittenNote>
          </div>
        </div>

        <DeckleStamp
          src="/assets/jamaica/seven-mile-beach-negril.jpg"
          alt="Jamaica detail"
          label="Montego Bay"
          rotate="7deg"
          w="150px"
          className="absolute bottom-8 right-6 hidden sm:block md:right-14 md:w-[180px]"
        />
      </div>

      <div className="mx-auto max-w-[1080px]">
        {/* ===== LAUNCH INTRO — its own short postcard, not a full spotlight ===== */}
        <div className="relative px-5 py-14 sm:px-8">
          <CancellationLines className="pointer-events-none absolute -right-4 top-2 h-16 w-56 text-[#1b1a17]/8" />
          <div
            className="relative mx-auto flex max-w-3xl flex-col gap-6 rotate-[-.5deg] bg-contain bg-center bg-no-repeat px-6 py-10 drop-shadow-[0_20px_40px_rgba(20,15,5,.3)] sm:flex-row sm:items-center sm:px-14 sm:py-14"
            style={{ backgroundImage: "url(/assets/postcards/ephemera/launch-intro-postcard-container.png)", aspectRatio: "1400/670" }}
          >
            <div className="relative mx-auto w-full max-w-[150px] shrink-0 rotate-[-3deg] sm:mx-0">
              <div className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-2deg] bg-[#e8dcae]/75 shadow-sm" />
              <div className="bg-white p-[5px] shadow-[0_14px_30px_rgba(20,15,5,.3)]">
                <img src={assets.headshot} alt={business.owner} className="w-full object-cover" />
              </div>
              <p className="mt-1.5 text-center text-[9px] font-black uppercase tracking-[.14em] text-[#8a5a0d]">Brian &middot; Founder</p>
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-block w-fit -rotate-1 bg-[#8A2E2E] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.16em] text-white">Breaking &middot; Paradox Travel Network</span>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-[#1b1a17] sm:text-3xl">We&rsquo;re officially open.</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3d3a30]">
                Paradox Travel Network is a Dallas&ndash;Fort Worth-based agency serving travelers nationwide, launched to run two ways: advisor-assisted planning when a trip needs real comparison and judgment, or trusted self-booking when it doesn&rsquo;t. Backed by WorldVia Travel Network, a Travel Leaders Network associate.
              </p>
              <Link to="/about" className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[.14em] text-[#0b5e67] underline underline-offset-4">
                Meet Brian &amp; the agency <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* deep-dive spotlight body */}
        {spot && (
          <div className="px-5 py-12 sm:px-8 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr]">
              <div>
                <p className="text-base leading-relaxed text-[#2b2a24] sm:text-lg [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:mt-1 [&::first-letter]:font-display [&::first-letter]:text-[4.2rem] [&::first-letter]:font-black [&::first-letter]:leading-[.75] [&::first-letter]:text-[#8a5a0d]">
                  {spot.content[0]}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-[#3d3a30] sm:text-base">{spot.content[6]}</p>
                <Link
                  to={`/travel-tips/${spot.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[#0b5e67] underline underline-offset-4"
                >
                  Read the full spotlight &middot; {spot.readingTime} min read <ArrowRight size={13} />
                </Link>
              </div>
              <div className="flex items-start justify-start lg:justify-end">
                <HandwrittenNote rotate="-2deg" className="max-w-[220px]">
                  <p className="text-[15px] leading-snug text-[#173943]" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.3rem" }}>
                    &ldquo;Pick the version of Jamaica that fits the trip. Then build outward.&rdquo; &mdash; Brian
                  </p>
                </HandwrittenNote>
              </div>
            </div>

            <div className="relative mt-14 flex flex-wrap gap-4">
              {[
                { label: "Montego Bay", text: spot.content[1], tag: "The gateway", src: "/assets/resort.jpg", rotate: "-2deg" },
                { label: "Negril", text: spot.content[2], tag: "The exhale", src: "/assets/jamaica/seven-mile-beach-negril.jpg", rotate: "1.5deg" },
                { label: "Ocho Rios", text: spot.content[3], tag: "The active base", src: "/assets/jamaica/dunns-river-falls.jpg", rotate: "-1deg" },
                { label: "Kingston", text: spot.content[4], tag: "The culture", src: "/assets/postcards/ephemera/kingston-culture.jpg", rotate: "2deg" },
                { label: "Port Antonio", text: spot.content[5], tag: "The quiet side", src: "/assets/jamaica/blue-lagoon-portland.jpg", rotate: "-1.5deg" },
              ].map((region, i) => (
                <div
                  key={region.label}
                  className="w-[150px] shrink-0 sm:w-[170px]"
                  style={{ transform: `rotate(${region.rotate}) translateY(${i % 2 === 0 ? "0px" : "14px"})` }}
                >
                  <div className="relative aspect-square overflow-hidden shadow-[0_16px_36px_rgba(20,15,5,.28)]" style={{ clipPath: DECKLE }}>
                    <img src={region.src} alt={region.label} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-2 text-[8px] font-black uppercase tracking-[.14em] text-[#8a5a0d]">{region.tag}</p>
                  <h4 className="font-display text-base font-semibold leading-tight text-[#1b1a17]">{region.label}</h4>
                  <p className="mt-1 text-[11px] leading-snug text-[#5a5342]">{region.text.split(". ")[0]}.</p>
                </div>
              ))}
            </div>

            <div className="relative mt-16">
              <span className="inline-block rotate-1 bg-[#0b5e67] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-white">Things to See &amp; Do</span>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Dunn's River Falls", desc: "Iconic and busy, but still worth understanding as part of the Ocho Rios story rather than a one-size excursion.", src: "/assets/jamaica/dunns-river-falls.jpg", rotate: "-1.5deg" },
                  { title: "Jerk, Patties & Escovitch", desc: "Jerk chicken and pork matter, but so do patties, curry goat, festival, and the everyday places that feel like food, not a themed dinner.", src: "/assets/jamaica/ackee-and-saltfish.jpg", rotate: "1deg" },
                  { title: "Konoko Falls & Gardens", desc: "A quieter, less-touristed waterfall stop near Ocho Rios, with botanical gardens attached for a slower morning.", src: "/assets/jamaica/konoko-falls.jpg", rotate: "-1deg" },
                  { title: "Blue Mountain Mornings", desc: "A completely different visual language from the coast, and an easy reason to give the itinerary more range.", src: "/assets/jamaica/blue-mountain.jpg", rotate: "1.5deg" },
                  { title: "River Rafting, Martha Brae", desc: "A slow bamboo-raft float down the river — the classic pace-changer excursion out of the north coast.", src: "/assets/jamaica/martha-brae-river.jpg", rotate: "-2deg" },
                  { title: "Blue Lagoon, Port Antonio", desc: "The quiet-side payoff: a deep mineral-spring lagoon well outside the resort-coast crowds.", src: "/assets/jamaica/blue-lagoon-portland.jpg", rotate: "1.5deg" },
                ].map((item) => (
                  <div key={item.title} style={{ transform: `rotate(${item.rotate})` }}>
                    <div className="relative aspect-[5/4] overflow-hidden shadow-[0_16px_36px_rgba(20,15,5,.26)]" style={{ clipPath: DECKLE }}>
                      <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <h4 className="mt-2 font-display text-base font-semibold leading-tight text-[#1b1a17]">{item.title}</h4>
                    <p className="mt-1 text-[12px] leading-snug text-[#5a5342]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-[#8a7f68]">Destination photography courtesy of the Jamaica Tourist Board.</p>
            </div>
          </div>
        )}

        {/* ===== WHAT CHANGED (asymmetric collage) ===== */}
        <div className="relative px-5 py-14 sm:px-8">
          <CancellationLines className="pointer-events-none absolute -left-6 top-2 h-20 w-64 text-[#1b1a17]/8" />
          <div className="relative mb-10">
            <h2 className="inline-block -rotate-1 font-display text-3xl font-black uppercase tracking-tight text-[#1b1a17] sm:text-4xl">What Changed</h2>
            <p className="mt-1 rotate-[.4deg] text-[12px] font-bold text-[#7a6f56]" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.15rem" }}>
              One story close to home, one for clients everywhere.
            </p>
          </div>

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start">
            <ChangeCard
              className="lg:w-[56%]"
              rotate="-2.5deg"
              tag="Closer to Home &middot; DFW"
              tagColor="bg-[#8A5A0D]"
              icon={<MapPin size={12} />}
              title={news ? news.title : "Jamaica Keeps Getting Easier to Reach From DFW"}
              body={news ? news.summary : "American is currently selling Dallas Fort Worth to Montego Bay itineraries for fall 2026 while Jamaica's main tourism gateway continues adding international connectivity."}
              meaning="Jamaica doesn't need a hidden-gem makeover to be worth it — from DFW, it's already an easy comparison against other Caribbean beach trips."
              source={news?.sources?.[0]?.label ?? "American Airlines"}
              image="/assets/jamaica/dunns-river-falls.jpg"
              badge="Montego Bay"
              link={news ? `/travel-tips/${news.slug}` : "/plan-my-trip"}
            />
            <ChangeCard
              className="lg:mt-16 lg:w-[44%]"
              rotate="2.5deg"
              tag="Nationwide"
              tagColor="bg-[#0b5e67]"
              icon={<Globe2 size={12} />}
              title="American Airlines raised Basic Economy checked-bag fees nationwide."
              body="Effective for tickets purchased May 18, 2026 or later, the first checked bag is $55 at the airport ($50 prepaid) and the second is $65 ($60 prepaid), on many U.S., Canada, Mexico, Caribbean, and Central America routes."
              meaning="This applies to Basic Economy travelers everywhere, not just DFW departures."
              source="American Airlines, investor relations release"
              imageMobile="/assets/postcards/ephemera/nationwide-airport-domestic-mobile.jpg"
              imageDesktop="/assets/postcards/ephemera/nationwide-airport-domestic-desktop.jpg"
              badge="Nationwide"
            />
          </div>
        </div>
      </div>

      {/* ===== PASSPORT NOTE strip (full-bleed, torn photo) ===== */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px]">
        <img src="/assets/adventure.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/15" />
        <HandwrittenNote rotate="-3deg" className="absolute left-6 top-1/2 max-w-[300px] -translate-y-1/2 sm:left-[8%]">
          <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#8a5a0d]">
            <Plane size={11} /> Passport Note
          </p>
          <p className="mt-2 leading-snug text-[#173943]" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem" }}>
            Big changes. Better access. We&rsquo;ll keep you posted.
          </p>
        </HandwrittenNote>
        <CompassRose className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 text-white/70 sm:h-52 sm:w-52" />
      </div>

      <div className="mx-auto max-w-[1080px]">
        {/* ===== TRIP PROMO — its own voucher-postcard: cut-out dashed border, stamp-framed price + QR ===== */}
        <div className="relative px-5 py-16 sm:px-8">
          <CancellationLines className="pointer-events-none absolute right-4 top-6 h-16 w-56 text-[#1b1a17]/10" />
          <div
            className="relative mx-auto max-w-3xl rotate-[-1.6deg] bg-contain bg-center bg-no-repeat px-6 py-8 drop-shadow-[0_24px_50px_rgba(20,15,5,.34)] sm:px-9 sm:py-10"
            style={{ backgroundImage: "url(/assets/postcards/ephemera/trip-promo-voucher-container.png)", aspectRatio: "1400/793" }}
          >
            <div className="relative overflow-hidden" style={{ clipPath: DECKLE }}>
              <img src="/assets/resort.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="relative flex min-h-[260px] flex-col justify-between p-5 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="w-fit -rotate-2 bg-[#8a5a0d] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.16em] text-[#fdf6e3]">Trip Promo &middot; Clip &amp; Book</span>
                  <div className="flex flex-col items-center gap-1 border-2 border-dashed border-white/85 bg-white p-1.5">
                    <img
                      src="/assets/postcards/ephemera/sandals-qr.png"
                      alt="QR code to the Sandals Jamaica offer details page"
                      width={70}
                      height={70}
                    />
                    <p className="text-center text-[6.5px] font-black uppercase leading-tight tracking-[.08em] text-[#1b1a17]">Scan to claim</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#f2d18c]">Sandals &middot; The Great Jamaica Comeback Sale</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">Up to $1,500 instant credit + up to $350 air credit.</h3>
                </div>
              </div>
            </div>
            <div className="px-4 py-6 sm:px-7">
              <p className="text-sm leading-relaxed text-[#3d3a30]">Top tier shown is Sandals Ochi Rios, 10+ nights. Other Jamaica resorts and shorter stays qualify too, at lower tiers &mdash; final resort, stay length, and availability are confirmed at booking.</p>
              <Link to="/plan-my-trip" className="mt-4 inline-flex w-fit items-center gap-2 bg-[#173943] px-5 py-3 text-xs font-black uppercase tracking-[.16em] text-white">
                Plan With Brian <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <HandwrittenNote rotate="3deg" className="mx-auto mt-6 w-fit max-w-[260px] sm:absolute sm:-bottom-2 sm:right-10 sm:mt-0">
            <p className="text-[13px] leading-tight text-[#173943]" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>
              Real supplier deal, expires when Sandals says so &mdash; not a manufactured countdown.
            </p>
          </HandwrittenNote>
        </div>

        {/* ===== THE TIP — useful advice, minimal fog, real PTN Brian mascot art ===== */}
        {tip && (
          <div className="relative px-5 py-14 sm:px-8">
            <CancellationLines className="pointer-events-none absolute -right-2 top-2 h-14 w-48 text-[#1b1a17]/8" />
            <div className="relative mx-auto max-w-3xl">
              <Lightbulb size={26} className="text-[#8a5a0d]" strokeWidth={1.6} />
              <p className="mt-2 text-[10px] font-black uppercase tracking-[.2em] text-[#8a5a0d]">Postcards from Paradox</p>
              <h2 className="mt-1 font-display text-3xl font-semibold leading-[1.05] text-[#1b1a17] sm:text-4xl">
                Useful advice. Minimal inspirational fog.
              </h2>

              <div
                className="relative mt-10 flex flex-col gap-8 rotate-[.7deg] bg-contain bg-center bg-no-repeat px-6 py-9 drop-shadow-[0_18px_40px_rgba(20,15,5,.28)] sm:flex-row sm:items-center sm:px-9 sm:py-11"
                style={{ backgroundImage: "url(/assets/postcards/ephemera/tip-card-container.png)", aspectRatio: "1400/709" }}
              >
                <div className="relative mx-auto aspect-[1086/1448] w-full max-w-[170px] shrink-0 rotate-[-3deg] sm:mx-0">
                  <div className="absolute inset-[13%_13%_18%_13%] overflow-hidden">
                    <img src={tip.image} alt={`${business.owner} — ${tip.title}`} className="h-full w-full object-cover" />
                  </div>
                  <img src="/assets/postcards/ephemera/tip-photo-frame.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
                  <p className="absolute -bottom-5 left-0 right-0 text-center text-[9px] font-black uppercase tracking-[.14em] text-[#8a5a0d]">Filed by Brian &middot; PTN</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7a6f56]">Travel Tip &middot; No manufactured urgency</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-[#173943] sm:text-2xl">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3d3a30]">{tip.summary}</p>
                  <Link to={`/travel-tips/${tip.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[.14em] text-[#0b5e67] underline underline-offset-4">
                    Read the full tip <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== FOOTER banner (full-bleed, real torn-postcard art overlay instead of CSS approximation) ===== */}
      <div className="relative w-full overflow-hidden bg-[radial-gradient(120%_100%_at_100%_0%,#2AA7BC_0%,#066373_45%,#0a1519_100%)] px-5 pb-14 pt-20 text-white sm:px-8 sm:pb-20 sm:pt-24">
        <img
          src="/assets/postcards/ephemera/footer-nudge-banner-mobile.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top sm:hidden"
        />
        <img
          src="/assets/postcards/ephemera/footer-nudge-banner-desktop.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-top sm:block"
        />
        <div className="relative mx-auto max-w-[1080px]">
          <p className="inline-block -rotate-1 text-[10px] font-black uppercase tracking-[.24em] text-[#f2d18c]">The Nudge</p>
          <h2 className="mt-3 max-w-xl rotate-[-.4deg] font-display text-3xl font-semibold leading-[1.02] sm:text-4xl">Your trip. Your way.</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">Real advice, real options, zero manufactured urgency.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/plan-my-trip" className="inline-flex items-center gap-2 bg-[#fdf6e3] px-5 py-3 text-xs font-black uppercase tracking-[.14em] text-[#173943]">Plan With Brian <ArrowRight size={14} /></Link>
          </div>
        </div>
      </div>

      {/* ===== FOOTER credit ===== */}
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <Compass className="text-[#0b5e67]" size={22} />
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#173943]">Paradox Travel Network</p>
            <p className="text-[11px] text-[#8a7f68]">Brian Voyles &middot; Editor &amp; Travel Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#5a5342]">
          <a href={links.email ? `mailto:${links.email}` : "#"} aria-label="Share by email" className="hover:text-[#0b5e67]"><Send size={16} /></a>
          <a href="https://www.facebook.com/profile.php?id=61581081109053" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#0b5e67]"><Facebook size={16} /></a>
          <a href="https://www.instagram.com/paradoxtravelnetwork/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#0b5e67]"><Instagram size={16} /></a>
        </div>
      </div>
    </div>
  );
}
