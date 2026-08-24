import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { stagger, fadeUp } from "../lib/motion";
import { assets, business } from "../lib/assets";

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
    title: "Resourceful",
    body: "Years of comparing suppliers, room categories, and package pricing mean less guessing and fewer surprises for you.",
  },
];

export default function About() {
  const reduce = useReducedMotion();
  useSeo(
    "About Brian Voyles | Dallas–Fort Worth Travel Advisor",
    "Meet Brian Voyles, owner of Paradox Travel Network — based in Dallas–Fort Worth, personally planning trips for travelers nationwide.",
    {
      image: assets.portrait,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: business.owner,
        jobTitle: business.role,
        worksFor: { "@type": "TravelAgency", name: business.name },
      },
    }
  );

  return (
    <>
      <PageHero
        eyebrow="About Brian"
        title="A real person helping make the trip make sense."
        image={assets.portrait}
        imageAlt="Brian Voyles, owner and travel advisor at Paradox Travel Network"
        imagePosition="object-top"
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
          variants={reduce ? undefined : stagger(0.12)}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {traits.map((t) => (
            <motion.div
              key={t.title}
              variants={reduce ? undefined : fadeUp}
              className="rounded-2xl border border-ink/10 bg-cream p-7"
            >
              <h3 className="text-xl font-semibold text-ocean-dark">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{t.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story */}
      <section className="bg-ocean-dark text-cream">
        <div className="container-px py-20 md:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cream">
              How this started
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] md:text-4xl">
              The short version: I got obsessed.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-cream">
              <p>
                I got my first taste of travel in my late twenties — a few
                cruises that did something to me I couldn't quite explain at
                the time. Then life threw me a curveball that changed
                everything. When I came out the other side, I knew exactly
                what I wanted to do with the time I had.
              </p>
              <p>
                The oilfield schedule gave me 14 days off between hitches and I
                used every one of them. Cruises, scuba, adventure travel,
                destinations I had to actually research to find. I got
                obsessed. My wife will confirm this.
              </p>
              <p>
                PTN exists because that enthusiasm needed somewhere to go —
                and because nobody should have to wait as long as I did to
                find out what they've been missing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-10 max-w-3xl border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-cream md:text-3xl">
              “Something goes wrong mid-trip — and eventually something always
              does — you've got my number. That's kind of the whole point.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Why work with me — connects the personal story above to the
          professional case: what that obsession actually turned into. */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading eyebrow="Why work with me" title="I'm not a coupon code." />
        <Reveal delay={0.1} className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-fog">
          <p>
            Planning travel well takes more than finding a hotel and clicking
            “reserve.”
          </p>
          <p>
            I spend time comparing resorts, room categories, flights,
            packages, promotions, and suppliers to figure out what actually
            makes sense for the person taking the trip.
          </p>
          <p>That means looking past the headline price and asking the questions that usually matter more:</p>
          <div className="space-y-1 font-medium text-ink">
            <p>What's actually included?</p>
            <p>Is this room category worth the upgrade?</p>
            <p>Is there a better package?</p>
            <p>Is this promotion really a promotion?</p>
            <p>
              Is this resort actually a good fit, or does it just have
              excellent photography?
            </p>
          </div>
          <p>That last one gets people more often than you'd think.</p>
          <p>
            I'm not here to pretend I'll always have the absolute cheapest
            price on the internet. I'm also not a coupon code.
          </p>
          <p>
            The real value is knowing where to look, what to compare, what to
            avoid, and how to put the pieces together around the way you
            actually want to travel.
          </p>
          <p>
            And yes, sometimes that experience means I can find better
            pricing or better overall value than what you'll find searching
            on your own. Package rates, supplier promotions, advisor offers,
            and different booking channels can make a real difference.
          </p>
          <p>Sometimes the savings are obvious.</p>
          <p>Sometimes the better deal is simply getting more for the same money.</p>
          <p>Either way, I'm looking at the entire trip, not just one number.</p>
          <p>I also believe the job goes beyond making the reservation.</p>
          <p>
            When possible, I'll reach out to hotels, resorts, and cruise
            lines before you travel to ask about available upgrades,
            amenities, celebrations, or special touches. Nothing is
            guaranteed, but it never hurts to ask, and occasionally being a
            polite nuisance has its rewards.
          </p>
          <p>
            Most importantly, if something changes or goes wrong, you have a
            real person who already knows your trip and your reservation.
          </p>
          <p>
            That's the kind of travel service I want Paradox Travel Network
            to provide: practical advice, clear choices, honest
            recommendations, and someone in your corner when you need them.
          </p>
        </Reveal>
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
