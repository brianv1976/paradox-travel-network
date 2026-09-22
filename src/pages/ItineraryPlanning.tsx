import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  Map,
  Route,
} from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import NumberedSteps from "../components/NumberedSteps";
import { useSeo } from "../hooks/useSeo";
import { assets, business, links } from "../lib/assets";

const title = "Custom Itinerary Planning | Plan It and Book It Yourself";
const description =
  "Get a personalized day-by-day travel itinerary with researched hotels, activities, dining, routing, and practical guidance, then book every part yourself.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Itinerary Planning",
  description,
  provider: {
    "@type": "TravelAgency",
    "@id": "https://paradoxtravelnetwork.com/#organization",
    name: business.name,
  },
  areaServed: business.areaServed,
};

const deliverables = [
  {
    icon: CalendarDays,
    body: "A day-by-day itinerary organized around realistic travel time, geography, opening patterns, and your preferred pace.",
  },
  {
    icon: Map,
    body: "Recommended stops, activities, attractions, dining, and areas to stay based on the actual trip.",
  },
  {
    icon: Route,
    body: "Routing and transportation guidance between destinations and major stops.",
  },
  {
    icon: ClipboardCheck,
    body: "Useful booking priorities, deadlines, direct information or booking links, and practical destination notes when they materially help.",
  },
  {
    icon: Check,
    body: "Limited alternatives for weather, energy level, or preference changes where appropriate.",
  },
];

const steps = [
  {
    n: "1",
    title: "Tell Brian about the trip",
    body: "Submit the Custom Itinerary Planning inquiry with your dates, travelers, destinations or ideas, priorities, and budget.",
  },
  {
    n: "2",
    title: "Scope and fee are confirmed",
    body: "Brian reviews the trip and confirms the planning scope, final fee, and expected delivery date before planning begins.",
  },
  {
    n: "3",
    title: "Brian researches and builds the itinerary",
    body: "The trip is organized into a practical day-by-day plan with the routing, pacing, recommendations, and useful details needed to book it confidently.",
  },
  {
    n: "4",
    title: "You receive the finished itinerary",
    body: "You receive the completed plan and make and manage the reservations yourself.",
  },
];

export default function ItineraryPlanning() {
  useSeo(title, description, {
    image: assets.img.planning,
    structuredData,
  });

  return (
    <>
      <PageHero
        eyebrow="Your trip. Professionally planned. You make the bookings."
        title="Custom Itinerary Planning"
        image={assets.img.planning}
        imageAlt="Traveler reviewing a thoughtfully researched trip itinerary"
        imageMobileMaxH="max-h-[190px]"
      >
        <p className="font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
          A custom itinerary built for your trip. You make the bookings.
        </p>
        <p className="text-lg leading-relaxed text-fog">
          Want a trip that makes sense without handing over the reservations?
          Brian researches and designs a practical day-by-day itinerary around
          your dates, interests, pace, and priorities. You receive the finished
          plan. You make and manage the bookings.
        </p>
        <a
          href={links.ternItineraryIntake}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-fit"
        >
          Request a Custom Itinerary Quote <ArrowRight size={16} />
        </a>
        <p className="max-w-xl text-sm leading-relaxed text-fog">
          Professional itinerary planning starts at $250. Your final planning
          fee is based on trip length, number of destinations, traveler count,
          and overall complexity.
        </p>
      </PageHero>

      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="What you receive"
          title="A trip plan built to work in the real world."
          intro="The goal is not to hand you a longer list of possibilities. It is to turn the possibilities into one practical trip you can actually use."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map(({ icon: Icon, body }, index) => (
            <Reveal key={body} delay={index * 0.05}>
              <TiltCard
                intensity={6}
                className="h-full rounded-2xl border border-ink/10 bg-cream p-7 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <p className="mt-5 leading-relaxed text-fog">{body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fog">
          Recommendations reflect the research available when the itinerary is
          prepared. Paradox Travel Network does not hold pricing or availability
          for planning-only service.
        </p>
      </section>

      <section className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <SectionHeading
            eyebrow="How it works"
            title="Brian builds the plan. You stay in control of the bookings."
          />
          <NumberedSteps steps={steps} columns="md:grid-cols-2 xl:grid-cols-4" />
        </div>
      </section>

      <section className="container-px py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-ink/10 bg-cream p-8 shadow-soft md:p-10">
              <span className="eyebrow">Delivery</span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink">
                Built carefully, not generated while you wait.
              </h2>
              <p className="mt-5 leading-relaxed text-fog">
                Most completed itineraries are delivered within 7–14 business
                days after your trip details are finalized and the planning fee
                is paid. Larger, multi-destination, group, or unusually complex
                trips may require additional time. Your expected delivery date
                will be confirmed before planning begins.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[2rem] border border-ink/10 bg-cream p-8 shadow-soft md:p-10">
              <span className="eyebrow">Revision</span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink">
                One reasonable revision is included.
              </h2>
              <p className="mt-5 leading-relaxed text-fog">
                One reasonable revision within the original planning scope is
                included. A new destination, materially different dates, added
                travelers, or a significantly different trip length may require
                a new quote.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ocean-dark text-cream">
        <div className="container-px py-20 md:py-28">
          <Reveal variant="rise" className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Service boundary
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              This is planning-only service.
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-cream">
              <p>
                Brian researches and designs the itinerary. You make and manage
                the reservations, payments, ticketing, changes, cancellations,
                and supplier communication.
              </p>
              <p>
                Custom Itinerary Planning does not include full-service booking,
                reservation management, supplier advocacy, or ongoing in-trip
                support.
              </p>
              <p>
                If you would rather have Brian research, book, and help manage
                the trip, use Plan With Brian instead.
              </p>
            </div>
            <Link
              to="/plan-my-trip"
              className="btn mt-8 border border-cream/30 text-cream hover:bg-cream/10"
            >
              Plan With Brian <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container-px py-24 md:py-32">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-clay/15 px-8 py-14 md:px-14 md:py-20">
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">
              Ready to turn the ideas into an actual itinerary?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fog">
              Start with the itinerary inquiry. Submitting the form begins the
              conversation; it does not create a booking or charge.
            </p>
            <a
              href={links.ternItineraryIntake}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-fit"
            >
              Request a Custom Itinerary Quote <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
