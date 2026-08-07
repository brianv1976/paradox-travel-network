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
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { stagger, fadeUp } from "../lib/motion";
import { assets } from "../lib/assets";
import { faqs } from "../data/site";
import { featuredPosts, getPostImage } from "../data/blog";
import Globe from "../components/Globe";
import Parallax from "../components/Parallax";
import DestinationPlayer from "../components/DestinationPlayer";
import TiltCard from "../components/TiltCard";
import Magnetic from "../components/Magnetic";
import AnimatedHeadline from "../components/AnimatedHeadline";
import Marquee from "../components/Marquee";
import Stats from "../components/Stats";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

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
    body: "Compare, choose, and book on your own schedule — no one hovering over the decision.",
  },
  {
    icon: LayoutGrid,
    title: "Trusted sites, already gathered",
    body: "Viator, Shore Excursions Group, Exoticca, Project Expedition, and more, all in one place.",
  },
  {
    icon: CalendarPlus,
    title: "Already booked? Add to it",
    body: "Trip locked in somewhere else? Browse excursions, tours, and activities to round it out.",
  },
];

const advisorReasons = [
  {
    icon: Clock,
    title: "Your time, back",
    body: "You've already got a job. Tell me dates, budget, and what would ruin the trip, and I'll turn it into real options — not another 30 tabs.",
  },
  {
    icon: SearchCheck,
    title: "A concierge, not a coupon",
    body: "The value isn't a secret discount code — it's someone who vets the hotel, catches the resort fee buried in fine print, and steers you away from what looks great in photos and isn't. Deals and upgrades happen along the way, but they're the bonus, not the pitch.",
  },
  {
    icon: LifeBuoy,
    title: "Me, not a call center",
    body: "Flight cancels? Hotel loses your room? You call me directly — and I'm still around after the trip's booked, not just before.",
  },
  {
    icon: Puzzle,
    title: "Smooth, even when it isn't",
    body: "Weather delays, flight cancellations, a missed connection — sometimes I'm fixing it in the background before you even know there was a problem. You just get the version where the trip still went fine.",
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
    title: "Review practical options",
    body: "Compare choices that match the goal instead of hundreds of nearly identical listings.",
  },
  {
    n: "3",
    title: "Refine and move forward",
    body: "Adjust the details and keep the plan understandable from inquiry through departure.",
  },
];

const traits = [
  { title: "Practical", body: "Clear options and honest expectations." },
  { title: "Personal", body: "The trip is shaped around your priorities." },
  { title: "Flexible", body: "Self-book or ask for hands-on planning." },
];

export default function Home() {
  useSeo(
    "Dallas-Fort Worth Travel Advisor | Paradox Travel Network",
    "Personal Dallas-Fort Worth travel advisor planning cruises, all-inclusive resorts, honeymoons, and family vacations - or book trusted resources yourself."
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
            className="flex flex-col gap-6"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              Travel On Your Terms
            </motion.span>
            <h1 className="text-4xl font-semibold leading-[1.03] text-ink md:text-5xl lg:text-[3.5rem]">
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
              Paradox Travel Network isn't just a booking page, and it isn't a
              traditional travel agency either. It's a real travel business
              built on one idea: you shouldn't have to choose between a
              massive marketplace and a single advisor's phone number. Find
              destination inspiration, browse cruises, resorts, hotels,
              vacation packages, tours, and activities, and book directly
              through popular, trusted booking partners.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-fog"
            >
              Prefer to handle the booking yourself? You're already in the
              right place. Want an experienced second opinion — or the whole
              trip planned and handled? Founder and travel advisor Brian
              Voyles picks up from there. Two clear paths, one place, and it's
              your call which one fits this trip.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Magnetic strength={8}>
                <Link to="/book-it-yourself" className="btn-ghost">
                  Book It Yourself
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic strength={8}>
                <Link to="/plan-my-trip" className="btn-primary">
                  Plan With Brian
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* self-start overrides the grid's items-center for this column
              only, so the globe sits high next to the headline. Explicit
              width (not max-w) because the grid track itself is narrower
              than the intended globe size — max-w alone never exceeds the
              track. Sized big enough that the bottom runs past the section
              edge — accepted per Brian's call, rather than shrinking it. */}
          <Parallax speed={5} className="w-[620px] self-start -mt-10 md:-mt-20 md:w-[720px] lg:w-[960px]">
            <div className="relative aspect-square w-full">
              <Globe />
            </div>
          </Parallax>
        </div>
      </section>

      <Marquee />

      {/* Destinations sit high on the page — this is a travel site, the
          places should arrive before the process does. One fixed stage that
          cycles in place, rather than sections scrolling past. */}
      <DestinationPlayer />

      <Stats />

      {/* CHOOSE PATH — the full explanation of both paths. Absorbed what
          used to be two separate sections ("What Paradox Is" and "Why Work
          With Brian") into one place, so the detail lives right where the
          decision gets made instead of being scattered above it. No 01/02
          numbering — two options don't need to be counted. */}
      <section id="choose-path" className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Your Trip, Your Way"
          title="Choose the help that fits."
          intro="Some travelers want control. Others want the details handled. Both paths stay clear and easy to find."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="group flex flex-col rounded-[2rem] border border-ink/10 bg-cream p-8 transition-shadow duration-300 hover:shadow-soft md:p-10">
            <div className="flex items-start justify-between">
              <Link to="/book-it-yourself">
                <h3 className="text-2xl font-semibold text-ink">Book It Yourself</h3>
              </Link>
              <Link to="/book-it-yourself">
                <ArrowUpRight className="text-ocean transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <p className="mt-3 leading-relaxed text-fog">
              Popular booking sites you've probably already used — gathered
              in one place so you can easily compare prices, navigate, and
              book activities at your destination.
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
            <Link to="/book-it-yourself" className="link-underline mt-8 pt-2">
              Explore self-booking <ArrowRight size={15} />
            </Link>
            <p className="mt-4 text-sm text-fog">
              Booking it yourself doesn't mean you're on your own — Brian's
              still around for questions along the way. He wants you to have
              a great trip, whether he's planning it or just helping you book
              it right.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="group flex flex-col rounded-[2rem] bg-ocean p-8 text-cream transition-shadow duration-300 hover:shadow-lift md:p-10">
            <div className="flex items-start justify-between">
              <Link to="/plan-my-trip">
                <h3 className="text-2xl font-semibold">Plan With Brian</h3>
              </Link>
              <Link to="/plan-my-trip">
                <Sparkles className="text-gold transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
            <div className="mt-4 flex w-fit items-center gap-3 rounded-2xl bg-cream/10 p-3 pr-5 ring-1 ring-cream/15 backdrop-blur-sm">
              <img
                src={assets.headshot}
                alt="Brian Voyles"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-cream">Brian Voyles</div>
                <div className="text-xs text-cream/70">Founder &amp; Travel Advisor</div>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-cream/80">
              This is where I stop being modest. I've planned trips
              complicated enough to make an airline hold desk cry, and simple
              ones where the only real ask was "don't let this be boring."
              Either way, I'm the one on the phone when something needs
              fixing — not you.
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
                      <p className="text-sm leading-relaxed text-cream/80">{r.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link to="/plan-my-trip" className="mt-8 inline-flex items-center gap-1 pt-2 font-semibold text-gold hover:text-cream">
              Start planning <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* EXPLORE */}
      <section id="explore" className="bg-sand/60">
        <div className="container-px py-24 md:py-32">
          <SectionHeading
            eyebrow="Explore travel"
            title="Start with the kind of trip."
            intro="Pick a direction. The details can become civilized afterward."
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
                      <img src={card.image} alt={card.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110" />
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
        </div>
      </section>

      {/* HOW PLANNING WORKS */}
      <section className="container-px py-24 md:py-32">
        <SectionHeading eyebrow="How planning works" title="Three clear steps." />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex flex-col gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean font-display text-xl font-semibold text-cream">
                {s.n}
              </span>
              <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
              <p className="leading-relaxed text-fog">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
        <Reveal delay={0.1} className="mt-10">
          <Link to="/plan-my-trip" className="btn-primary">
            Send the trip details <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* ABOUT TEASER */}
      <section id="about" className="bg-ocean text-cream">
        <div className="container-px grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <Reveal className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] shadow-lift">
            <img src={assets.portrait} alt="Brian Voyles, owner and travel advisor" className="h-full w-full object-cover" />
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                A real person behind the plan
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-semibold leading-[1.1] md:text-4xl">Real advice. No sales voice.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-cream/80">
                Brian works like a personal concierge, not a one-time booking
                clerk — there from the first conversation through the last day of
                the trip. Something goes wrong mid-trip — and eventually something
                always does — you've got his number. That's kind of the whole point.
              </p>
            </Reveal>
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-2 grid gap-4 sm:grid-cols-3"
            >
              {traits.map((t) => (
                <motion.div key={t.title} variants={fadeUp} className="rounded-2xl bg-ocean-dark/60 p-5">
                  <div className="font-semibold text-gold">{t.title}</div>
                  <div className="mt-1 text-sm text-cream/75">{t.body}</div>
                </motion.div>
              ))}
            </motion.div>
            <Reveal delay={0.15}>
              <Link to="/about" className="inline-flex items-center gap-1 font-semibold text-gold hover:text-cream">
                Meet Brian <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* POSTCARDS */}
      <section id="tips" className="container-px py-24 md:py-32">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            eyebrow="Postcards from Paradox"
            title="Useful advice. Minimal inspirational fog."
            intro="Practical articles for smoother trips, plus an occasional email with destination notes, booking reminders, and fewer manufactured emergencies."
          />
          <Reveal className="hidden justify-self-end md:block">
            <img src={assets.mascotWhiteboard} alt="Brian mascot presenting practical travel tips" className="max-h-56 w-auto" />
          </Reveal>
        </div>
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
                  <img src={getPostImage(post)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ocean">
                    {post.category}
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
        <Reveal delay={0.1} className="mt-10">
          <Link to="/travel-tips" className="btn-ghost">
            Read tips & join the newsletter <ArrowRight size={16} />
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
        title="Turn we should take a trip into an actual plan."
        body="Share the basics. The first step is an inquiry, not a booking or a charge."
        primaryLabel="Plan My Trip"
        primaryTo="/plan-my-trip"
        secondaryLabel="Or send a general message"
        secondaryTo="/contact"
      />
    </>
  );
}
