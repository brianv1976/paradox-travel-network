import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Compass,
  Users,
  Heart,
  Ship,
  Umbrella,
  Mountain,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { stagger, fadeUp } from "../lib/motion";
import { assets, links } from "../lib/assets";
import { faqs } from "../data/site";
import { featuredPosts, categoryImage } from "../data/blog";
import Globe from "../components/Globe";
import Reviews from "../components/Reviews";
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
        <div className="container-px relative grid items-center gap-10 pb-16 md:grid-cols-2 md:pb-24 md:pt-8">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              Travel Beyond Expectations
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold leading-[1.03] text-ink md:text-5xl lg:text-[3.5rem]"
            >
              Planning a great trip is harder than booking one. That's what a
              travel advisor is for.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-fog"
            >
              I'm Brian Voyles — travel advisor, trip planner, and the person who
              picks up the phone when something goes sideways. I help with
              cruises, all-inclusive resorts, honeymoons, family vacations, and
              adventure travel. Prefer to do it yourself? You'll find the booking
              sites you already know and trust — gathered in one place, vetted,
              and sorted so you're not spending 16 hours on tabs.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/book-it-yourself" className="btn-ghost">
                Book It Yourself
                <ArrowRight size={16} />
              </Link>
              <Link to="/plan-my-trip" className="btn-primary">
                Let Brian Plan It
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[460px]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sand to-cream shadow-soft" />
            <div className="absolute inset-0">
              <Globe />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -bottom-2 left-2 flex items-center gap-3 rounded-2xl bg-cream/90 p-3 pr-5 shadow-lift backdrop-blur-sm ring-1 ring-ink/5"
            >
              <img
                src={assets.headshot}
                alt="Brian Voyles"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-ink">Brian Voyles</div>
                <div className="text-xs text-fog">Owner & Travel Advisor</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Marquee />
      <Stats />

      {/* CHOOSE PATH */}
      <section id="choose-path" className="container-px py-24 md:py-32">
        <SectionHeading
          eyebrow="Your Trip, Your Way"
          title="Choose the help that fits."
          intro="Some travelers want control. Others want the details handled. Both paths stay clear and easy to find."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col rounded-[2rem] border border-ink/10 bg-cream p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-semibold text-clay">01</span>
              <ArrowUpRight className="text-ocean" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-ink">Book It Yourself</h3>
            <p className="mt-3 leading-relaxed text-fog">
              Book directly with trusted names — all gathered in one place so you
              don't have to hunt across a dozen sites.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["Viator", links.viator, "Tours, activities, and local experiences worldwide."],
                ["Shore Excursions Group", links.shoreExcursions, "Independent cruise port excursions, often cheaper than the ship."],
                ["Exoticca", links.exoticca, "Fully packaged international vacations, flights included."],
              ].map(([name, href, blurb]) => (
                <li key={name} className="text-fog">
                  <a href={href} target="_blank" rel="noopener noreferrer sponsored" className="font-semibold text-ocean hover:text-clay">
                    {name}
                  </a>{" "}
                  — {blurb}
                </li>
              ))}
            </ul>
            <Link to="/book-it-yourself" className="link-underline mt-auto pt-8">
              Explore self-booking <ArrowRight size={15} />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-[2rem] bg-ocean p-8 text-cream md:p-10">
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-semibold text-gold">02</span>
              <Sparkles className="text-gold" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold">Let Brian Plan It</h3>
            <p className="mt-3 leading-relaxed text-cream/80">
              Complicated itinerary or group logistics? Tell Brian what you're
              planning — he'll book it right the first time.
            </p>
            <ul className="mt-6 space-y-3">
              {["Personal planning support", "Options shaped around your goals", "A real person when details get messy"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-cream/90">
                  <Check size={16} className="text-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/plan-my-trip" className="mt-auto inline-flex items-center gap-1 pt-8 font-semibold text-gold hover:text-cream">
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
                  <Link to={card.to} className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-soft">
                    <img src={card.image} alt={card.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                    <div className="relative">
                      <Icon className="mb-2 text-cream/90" size={20} />
                      <h3 className="text-xl font-semibold text-cream">{card.label}</h3>
                      {card.caption && <p className="mt-1 text-sm text-cream/80">{card.caption}</p>}
                    </div>
                  </Link>
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

      <Reviews />

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
                <div className="relative h-40 overflow-hidden">
                  <img src={categoryImage[post.category]} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <h3 className="flex items-start gap-2 text-lg font-semibold text-ink">
                  <Compass size={18} className="mt-1 shrink-0 text-clay" />
                  {f.q}
                </h3>
                <p className="mt-2 pl-6 leading-relaxed text-fog">{f.a}</p>
              </Reveal>
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
