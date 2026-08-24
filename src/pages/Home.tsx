import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  Users,
  Heart,
  Ship,
  Umbrella,
  Mountain,
  LayoutGrid,
  CalendarPlus,
  Puzzle,
  Clock,
  SearchCheck,
  LifeBuoy,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { stagger, fadeUp } from "../lib/motion";
import { assets, links, business } from "../lib/assets";
import { faqs } from "../data/site";
import { featuredPosts, getPostImage } from "../data/blog";
import GlobeFallback from "../components/GlobeFallback";
import ErrorBoundary from "../components/ErrorBoundary";
import Parallax from "../components/Parallax";
import DestinationPlayer from "../components/DestinationPlayer";
import TiltCard from "../components/TiltCard";
import Magnetic from "../components/Magnetic";
import AnimatedHeadline from "../components/AnimatedHeadline";
import Marquee from "../components/Marquee";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import NewsletterForm from "../components/NewsletterForm";
import NumberedSteps from "../components/NumberedSteps";

// Three.js is a heavy dependency only this page's hero needs — lazy-loading
// it keeps every other route's bundle free of it.
const Globe = lazy(() => import("../components/Globe"));

const exploreCards = [
  { label: "Cruises", to: "/cruises", image: assets.img.cruise, icon: Ship },
  {
    label: "All-Inclusive",
    to: "/all-inclusive-resorts",
    image: assets.img.resort,
    icon: Umbrella,
  },
  {
    label: "Custom Vacations",
    to: "/plan-my-trip",
    image: assets.img.planning,
    icon: Sparkles,
    caption: "Your trip, planned around your priorities.",
  },
  {
    label: "Romance",
    to: "/romance-travel",
    image: assets.img.beach,
    icon: Heart,
    caption: "Thoughtful without fake-luxury nonsense.",
  },
  {
    label: "Family Travel",
    to: "/family-travel",
    image: assets.img.familyTravel,
    icon: Users,
    caption: "Built for actual humans of several ages.",
  },
  {
    label: "Adventure",
    to: "/adventure-guided-travel",
    image: assets.img.adventure,
    icon: Mountain,
  },
];

const diyReasons = [
  {
    icon: Compass,
    title: "You're in control",
    body: "Compare, choose, and book on your own schedule.",
  },
  {
    icon: LayoutGrid,
    title: "Trusted sites, already gathered",
    body: "Skip the search-engine hunt — Brian has gathered his selected booking partners in one place.",
  },
  {
    icon: CalendarPlus,
    title: "Already booked elsewhere? Add to it",
    body: "Browse excursions, tours, and activities to round out a trip you booked somewhere else.",
  },
];

const advisorReasons = [
  {
    icon: MessageCircle,
    title: "No job is too small",
    body: "Need a hotel for two nights? A flight and hotel for a quick trip? Tell me what you need, and I'll research the options and help get it booked.",
  },
  {
    icon: Clock,
    title: "Your time, back",
    body: "You've already got a job. Tell me dates, budget, and what would ruin the trip, and I'll turn it into real options — not another 30 tabs.",
  },
  {
    icon: SearchCheck,
    title: "Real guidance, not more choices",
    body: "I compare the details, vet the hotel, catch fees buried in the fine print, and help you avoid options that look better in photos than they are.",
  },
  {
    icon: LifeBuoy,
    title: "Me, not a call center",
    body: "Flight cancels? Hotel loses your room? You call me directly — and I'm still around after the trip's booked, not just before.",
  },
  {
    icon: Puzzle,
    title: "Smooth, even when it isn't",
    body: "Weather delays, flight cancellations, a missed connection — when something goes sideways, you've got someone actively working it with you, not a hold-music loop.",
  },
];

const steps = [
  {
    n: "1",
    title: "Tell Brian what matters",
    body: "Dates, budget, travelers, destination ideas, pace, and the things that would ruin the trip.",
  },
  {
    n: "2",
    title: "Review personalized options",
    body: "Brian researches the choices and narrows them down to what actually fits — not hundreds of nearly identical listings.",
  },
  {
    n: "3",
    title: "Finalize and book",
    body: "Once you choose the right option, Brian handles the booking and confirmations and remains your point of contact if the plans need attention.",
  },
];

const traits = [
  { title: "Practical", body: "Clear options and honest expectations." },
  { title: "Personal", body: "The trip is shaped around your priorities." },
  { title: "Flexible", body: "Self-book or ask for hands-on planning." },
];

export default function Home() {
  useSeo(
    "DFW Travel Advisor Serving Nationwide | Paradox Travel Network",
    "Based in Dallas-Fort Worth and serving travelers nationwide, Brian Voyles personally plans and books cruises, resorts, honeymoons, family trips, and more - or book through trusted travel partners.",
    {
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: business.name,
            url: `${window.location.origin}/`,
          },
          {
            "@type": "TravelAgency",
            name: business.name,
            location: { "@type": "Place", name: business.region },
            areaServed: business.areaServed,
            founder: { "@type": "Person", name: business.owner },
            url: `${window.location.origin}/`,
          },
        ],
      },
    }
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream pt-28 md:pt-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-clay/10 blur-3xl" />
        {/* Balanced padding: enough to clear the marquee bar below without
            leaving dead space that pushes the globe off-centre. */}
        <div className="container-px relative grid items-center gap-10 pb-16 md:grid-cols-2 md:pb-20 md:pt-4">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
            className="order-2 flex flex-col gap-6 md:order-none"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              Travel On Your Terms
            </motion.span>
            <h1 className="text-3xl font-semibold leading-[1.08] text-ink md:text-5xl lg:text-[3.5rem]">
              <AnimatedHeadline
                immediate
                delay={0.15}
                text="One place. Two ways to travel."
              />
            </h1>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-fog"
            >
              Some travelers want the freedom to browse and book on their
              own. Others want a travel advisor to research the options,
              make recommendations, and handle the booking. Paradox Travel
              Network is built for both.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-fog"
            >
              Work directly with Brian for personal planning, booking, and
              support, or explore trusted booking partners and book at your
              own pace. Two clear paths — and you choose what fits this trip.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Magnetic strength={8}>
                <Link to="/plan-my-trip" className="btn-primary">
                  Plan With Brian
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic strength={8}>
                <Link to="/book-it-yourself" className="btn-ghost">
                  Book It Yourself
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* self-start overrides the grid's items-center for this column
              only, so the globe sits high next to the headline. Below md the
              grid stacks to one column, so the globe needs a width that
              actually fits a phone viewport instead of the desktop-only
              fixed pixel sizes. From md up, explicit width (not max-w)
              because the grid track itself is narrower than the intended
              globe size — max-w alone never exceeds the track. Sized big
              enough at lg that the bottom runs past the section edge —
              accepted per Brian's call, rather than shrinking it. */}
          <Parallax
            speed={5}
            className="order-1 mx-auto w-full min-w-0 max-w-[260px] self-start landscape:max-w-[160px] sm:max-w-[320px] md:order-none md:mx-0 md:-mt-20 md:landscape:max-w-none md:w-[720px] md:max-w-none lg:w-[960px]"
          >

            <div className="relative aspect-square w-full">
              <ErrorBoundary fallback={<GlobeFallback />}>
                <Suspense fallback={<GlobeFallback />}>
                  <Globe />
                </Suspense>
              </ErrorBoundary>
            </div>
          </Parallax>
        </div>
      </section>

      <Marquee />

      {/* Destinations sit high on the page — this is a travel site, the
          places should arrive before the process does. One fixed stage that
          cycles in place, rather than sections scrolling past. */}
      <DestinationPlayer />

      {/* CHOOSE PATH — the full explanation of both paths. Absorbed what
          used to be two separate sections ("What Paradox Is" and "Why Work
          With Brian") into one place, so the detail lives right where the
          decision gets made instead of being scattered above it. No 01/02
          numbering — two options don't need to be counted. */}
      <section id="choose-path" className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Your Trip, Your Way"
          title="Choose the help that fits."
          intro="Browse and book through trusted partners, or work directly with Brian to plan and book the trip. Choose what fits this trip."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="group flex flex-col rounded-[2rem] border border-ink/10 bg-cream p-8 transition-shadow duration-300 hover:shadow-soft md:p-10">
            <div className="flex items-start justify-between">
              <Link to="/book-it-yourself">
                <h3 className="text-2xl font-semibold text-ink">Book It Yourself</h3>
              </Link>
              <ArrowUpRight
                aria-hidden="true"
                className="text-ocean-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="mt-3 leading-relaxed text-fog">
              Trusted sites for cruises, complete vacation packages, guided
              trips, tours, shore excursions, and activities — gathered in
              one place so you can browse and book directly, on your own
              schedule.
            </p>
            <ul className="mt-6 space-y-4">
              {diyReasons.map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay">
                      <Icon size={15} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{r.title}</div>
                      <p className="text-sm leading-relaxed text-fog">{r.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-fog">
                Trusted booking partners
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {[
                  { name: "Viator", href: links.viator, src: assets.partnerLogos.viator },
                  {
                    name: "Shore Excursions Group",
                    href: links.shoreExcursions,
                    src: assets.partnerLogos.shoreExcursions,
                  },
                  { name: "Exoticca", href: links.exoticca, src: assets.partnerLogos.exoticca },
                  {
                    name: "Project Expedition",
                    href: links.projectExpedition,
                    src: assets.partnerLogos.projectExpedition,
                  },
                  {
                    name: "Virgin Voyages",
                    href: links.virginVoyages,
                    src: assets.partnerLogos.virginVoyages,
                  },
                ].map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    aria-label={partner.name}
                    className="flex h-24 w-full items-center justify-center rounded-xl border border-ink/10 bg-white px-4 transition-shadow duration-200 hover:shadow-soft"
                  >
                    <img
                      src={partner.src}
                      alt={partner.name}
                      loading="lazy"
                      className="h-14 w-full object-contain"
                    />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-fog">
                Paradox Travel Network may earn a commission when you book
                through these partners, at no extra cost to you.
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-fog">
                Vendor logos displayed on this site are trademarks of their
                respective owners. Their use identifies them as Paradox
                Travel Network booking partners and does not imply
                endorsement, sponsorship, or co-branding by these companies.
              </p>
            </div>
            <Link to="/book-it-yourself" className="link-underline mt-8 pt-2">
              Explore self-booking <ArrowRight size={15} />
            </Link>
            <p className="mt-4 text-sm text-fog">
              Want help choosing or prefer to have Brian handle the booking?
              Start with Plan With Brian before you reserve.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="group flex flex-col rounded-[2rem] bg-ocean-dark p-8 text-cream transition-shadow duration-300 hover:shadow-lift md:p-10">
            <div className="flex items-start justify-between">
              <Link to="/plan-my-trip">
                <h3 className="text-2xl font-semibold">Plan With Brian</h3>
              </Link>
              <Sparkles
                aria-hidden="true"
                className="text-gold transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="mt-4 flex w-fit items-center gap-3 rounded-2xl bg-cream/10 p-3 pr-5 ring-1 ring-cream/15 backdrop-blur-sm">
              <img
                src={assets.headshot}
                alt="Brian Voyles"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-cream">Brian Voyles</div>
                <div className="text-xs text-cream/90">Founder &amp; Travel Advisor</div>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-cream">
              I'm Brian, the owner and travel advisor behind Paradox. I plan
              complicated trips and simple ones where the only real request
              is "don't let this be boring." Either way, you work directly
              with me — from the first idea through the trip.
            </p>
            <ul className="mt-6 space-y-4">
              {advisorReasons.map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon size={15} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-cream">{r.title}</div>
                      <p className="text-sm leading-relaxed text-cream/90">{r.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link to="/plan-my-trip" className="mt-8 inline-flex items-center gap-1 pt-2 font-semibold text-cream/90 hover:text-cream">
              Start planning <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* EXPLORE — stays right after Choose Path so the momentum from
          "which path fits" flows straight into "browse by trip type" before
          any detour into blog/newsletter content. Trimmed to a preview as of
          2026-08-20 — the full experience (with related Postcards and real
          trips per genre, as they exist) now lives at /explore-travel. */}
      <section id="explore" className="bg-sand/60">
        <div className="container-px py-24 md:py-32">
          <SectionHeading
            eyebrow="Explore travel"
            title="Start with the kind of trip."
            intro="A quick preview by trip type — the full guide has more on each, plus related planning tips."
          />
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {exploreCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} variants={fadeUp}>
                  <TiltCard className="rounded-2xl">
                    <Link to={card.to} className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-soft">
                      <img src={card.image} alt={card.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                      {/* Lifted off the card face so it floats above the tilt. */}
                      <div className="relative" style={{ transform: "translateZ(38px)" }}>
                        <Icon className="mb-2 text-cream/90" size={20} />
                        <h3 className="text-xl font-semibold text-cream">{card.label}</h3>
                        {card.caption && <p className="mt-1 text-sm text-cream/80">{card.caption}</p>}
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
          <Reveal delay={0.1}>
            <Link
              to="/explore-travel"
              className="link-underline mt-8 inline-flex items-center gap-1.5 text-base font-semibold"
            >
              See the full Explore Travel guide <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* POSTCARDS — up from the bottom of the page per Brian's call, but
          placed after Explore rather than blocking it, so the trip-type
          gallery isn't buried behind a blog/newsletter detour. */}
      <section id="tips" className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Postcards from Paradox"
          title="Useful advice. Minimal inspirational fog."
          intro="Practical articles for smoother trips, plus an occasional email with destination notes, booking reminders, and fewer manufactured emergencies."
        />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {featuredPosts.map((post) => (
            <motion.article key={post.slug} variants={fadeUp}>
              <Link to={`/travel-tips/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={getPostImage(post)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ocean-dark">
                    {post.contentType}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                  <span className="link-underline mt-auto pt-4 text-sm">
                    Read tip <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Newsletter — the "join" half of Postcards from Paradox, not a
          separate topic, so it sits directly under the articles with no
          divider between them. */}
      <section className="bg-ocean-dark text-cream">
        <div className="container-px py-20 text-center md:py-28">
          <Mail className="mx-auto text-gold" size={32} />
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
            The email worth opening.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream">
            Fare drops before they're gone, destination ideas worth stealing,
            and the occasional deal too good to sit on. No daily noise, no
            manufactured urgency — just what's actually worth your inbox
            space.
          </p>
          <NewsletterForm variant="inline" />
          <Link
            to="/travel-tips"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cream/80 hover:text-cream"
          >
            Or just read the tips first <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section id="about" className="bg-ocean-dark text-cream">
        <div className="container-px grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <Reveal className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] shadow-lift">
            <img src={assets.portrait} alt="Brian Voyles, owner and travel advisor" loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cream">
                A real person behind the plan
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-semibold leading-[1.1] md:text-4xl">Real advice. No sales voice.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-cream">
                Brian is the travel advisor behind Paradox, not a one-time
                booking clerk. When he plans your trip, he stays involved
                from the first conversation through the last day of travel.
                If something goes wrong mid-trip, you've got his number.
                That's kind of the whole point.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-sm text-cream/90">
                Based in the Dallas–Fort Worth area and helping travelers
                nationwide.
              </p>
            </Reveal>
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-2 grid gap-4 lg:grid-cols-3"
            >
              {traits.map((t) => (
                <motion.div key={t.title} variants={fadeUp} className="rounded-2xl bg-ocean-dark/60 p-5">
                  <div className="font-semibold text-cream">{t.title}</div>
                  <div className="mt-1 text-sm text-cream/90">{t.body}</div>
                </motion.div>
              ))}
            </motion.div>
            <Reveal delay={0.15}>
              <Link to="/about" className="inline-flex items-center gap-1 font-semibold text-cream/90 hover:text-cream">
                Meet Brian <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW PLANNING WORKS — moved to the bottom of the page per Brian's
          call, right before the closing FAQ/CTA. */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading eyebrow="How planning works" title="From idea to booked in three steps." />
        <NumberedSteps steps={steps} gap="gap-4" />
        <Reveal delay={0.1} className="mt-10">
          <Link to="/plan-my-trip" className="btn-primary">
            Send the trip details <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-sand/60">
        <div className="container-px py-24 md:py-32">
          <SectionHeading eyebrow="Quick answers" title="Before the obvious questions become emails." />
          <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
                className="group"
              >
                <h3 className="flex items-start gap-2 text-lg font-semibold text-ink">
                  <motion.span
                    className="mt-1 shrink-0 text-clay"
                    whileHover={{ rotate: 90, scale: 1.15 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Compass size={18} />
                  </motion.span>
                  {f.q}
                </h3>
                <p className="mt-2 pl-6 leading-relaxed text-fog">{f.a}</p>
                <span className="mt-4 block h-px w-0 bg-clay/40 transition-all duration-500 ease-smooth group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        eyebrow="Ready when the idea is"
        title="Turn “we should take a trip” into an actual plan."
        body="Share the basics to start planning with Brian, or head to the self-booking page if you'd rather handle the reservation yourself."
        primaryLabel="Plan With Brian"
        primaryTo="/plan-my-trip"
        secondaryLabel="Book It Yourself"
        secondaryTo="/book-it-yourself"
      />
    </>
  );
}
