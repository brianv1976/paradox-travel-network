import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { stagger, fadeUp } from "../lib/motion";
import { assets } from "../lib/assets";

const traits = [
  {
    title: "Practical",
    body: "Recommendations should connect to the travelers, budget, schedule, and real priorities.",
  },
  {
    title: "Personal",
    body: "The plan is shaped around the people taking the trip, not whichever package is easiest to advertise.",
  },
  {
    title: "Flexible",
    body: "Travelers can use self-booking resources or ask Brian to help handle the planning.",
  },
];

export default function About() {
  useSeo(
    "About Brian Voyles | Dallas–Fort Worth Travel Advisor",
    "Meet Brian Voyles, owner of Paradox Travel Network and a personal travel advisor serving Dallas–Fort Worth and beyond."
  );

  return (
    <>
      <PageHero
        eyebrow="About Brian"
        title="A real person helping make the trip make sense."
        image={assets.portrait}
        imageAlt="Brian Voyles, owner and travel advisor at Paradox Travel Network"
      >
        <p className="text-lg leading-relaxed text-fog">
          Paradox Travel Network is built around practical help, clear choices,
          and trips that fit the travelers instead of forcing everyone into a
          generic vacation template.
        </p>
      </PageHero>

      {/* Approach */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="The approach"
          title="Helpful without making travel planning feel ceremonial."
          intro="Brian helps clients sort through destinations, lodging, cruises, resorts, traveler needs, timing, budgets, and the small details that decide whether a trip feels smooth or exhausting."
        />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {traits.map((t) => (
            <motion.div
              key={t.title}
              variants={fadeUp}
              className="rounded-2xl border border-ink/10 bg-cream p-7"
            >
              <h3 className="text-xl font-semibold text-ocean">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{t.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why paradox */}
      <section className="bg-ocean text-cream">
        <div className="container-px py-20 md:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Why Paradox?
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] md:text-4xl">
              Travel can be exciting and overwhelming at the same time.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cream/80">
              The name reflects that tension. People want the experience, but the
              choices, timing, pricing, and logistics can drain the excitement
              before the trip begins. The work is to reduce that friction without
              flattening the trip into something ordinary. That mission doesn't
              depend on who does the booking. Whether Brian is handling every
              detail or simply pointing travelers to the right site to book it
              themselves, the goal stays the same: the best trip for the budget,
              with support the whole way through.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-10 border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-cream md:text-3xl">
              “The goal is not to sell every traveler the same vacation. The goal
              is to help the right trip become clear.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Postcards */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="The practical version, in writing"
          title="Travel advice for decisions that become expensive after clicking Buy."
          intro="Postcards from Paradox covers packing, airports, cruises, resorts, destinations, and the other small details that remain harmless right up until they are not."
        />
        <Reveal delay={0.1} className="mt-8">
          <Link to="/travel-tips" className="btn-primary">
            Read Postcards from Paradox <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Ready to start?"
        title="Share the trip idea, even if it is still vague."
        body="Dates, travelers, budget, destination ideas, and priorities are enough to begin."
        primaryLabel="Plan My Trip"
        primaryTo="/plan-my-trip"
        secondaryLabel="Send a message"
        secondaryTo="/contact"
      />
    </>
  );
}
