import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Ship,
  Compass,
  Plane,
  HelpCircle,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { assets, links } from "../lib/assets";
import { fadeUp, stagger } from "../lib/motion";

const bookingTypes = [
  {
    icon: Plane,
    title: "Book a Trip",
    body: "Explore flights, hotels, tours, and transfers bundled into one trip.",
    href: "#exoticca",
  },
  {
    icon: Compass,
    title: "Tours & Activities",
    body: "Find memorable things to do almost anywhere.",
    href: "#viator",
  },
  {
    icon: Ship,
    title: "Shore Excursions",
    body: "Plan the best part of every port day.",
    href: "#shore",
  },
];

const viatorExamples = [
  {
    place: "Rome · Ancient History",
    title: "Colosseum & Ancient Rome",
    blurb: "Tour the Colosseum, Roman Forum, and Palatine Hill with a guide.",
    image: assets.img.adventure,
    href: "https://www.viator.com/tours/Rome/Colosseum-and-Ancient-Rome-Tour-with-Roman-Forum-and-Palatine-Hill/d511-3731COLOSSEUM?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  },
  {
    place: "Cancún · Water Adventure",
    title: "Speedboat & Snorkel",
    blurb: "Drive a speedboat through Nichupté Lagoon, then snorkel Punta Nizuc.",
    image: assets.img.beach,
    href: "https://www.viator.com/tours/Cancun/Cancun-Jungle-Tour-Adventure-Speed-Boat-and-Snorkeling/d631-19032P1?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  },
  {
    place: "Dubai · Desert Adventure",
    title: "Red Dunes Desert Safari",
    blurb: "Ride the dunes, try sandboarding and camel riding, then a camp dinner.",
    image: assets.img.planning,
    href: "https://www.viator.com/tours/Dubai/Dubai-Premium-Red-Dunes-Camel-Ride-and-5-BBQ-at-Al-Khayma-Camp/d828-91421P12?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  },
];

const shoreExamples = [
  {
    place: "Italy · Private tour",
    title: "Private Naples",
    blurb: "Explore Naples with a private guide and a more personal port-day pace.",
    image: assets.img.cruise,
    href: "https://www.shoreexcursionsgroup.com/tour/private-naples/euapnappvt2?shipId=1966&id=1786436&data=brian@paradoxtravelnetwork.com",
  },
  {
    place: "Alaska · Port experiences",
    title: "Juneau Adventures",
    blurb: "Discover glaciers, wildlife, scenery, and memorable Alaska experiences.",
    image: assets.img.adventure,
    href: "https://www.shoreexcursionsgroup.com/port/juneau-excursion-tours?shipId=1966&id=1786436&data=brian@paradoxtravelnetwork.com",
  },
  {
    place: "Caribbean · Island day",
    title: "Aruba Excursions",
    blurb: "Beaches, sightseeing, water adventures, and island highlights.",
    image: assets.img.beach,
    href: "https://www.shoreexcursionsgroup.com/port/aruba-shore-excursions?shipId=1966&id=1786436&data=brian@paradoxtravelnetwork.com",
  },
];

function ExampleGrid({
  items,
}: {
  items: { place: string; title: string; blurb: string; image: string; href: string }[];
}) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid gap-5 md:grid-cols-3"
    >
      {items.map((it) => (
        <motion.a
          key={it.title}
          variants={fadeUp}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft"
        >
          <div className="relative h-40 overflow-hidden">
            <img
              src={it.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-clay">
              {it.place}
            </span>
            <h4 className="mt-1 font-display text-lg font-semibold text-ink">
              {it.title}
            </h4>
            <p className="mt-1 text-sm text-fog">{it.blurb}</p>
            <span className="link-underline mt-auto pt-4 text-sm">
              View experience <ExternalLink size={13} />
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}

export default function BookItYourself() {
  useSeo(
    "Book Travel Yourself | Paradox Travel Network",
    "Book complete trips, shore excursions, tours, activities, attractions, transfers, and adventures through trusted travel partners."
  );

  return (
    <>
      <PageHero
        eyebrow="Independent booking. Backup human included."
        title="All Your Favorite Booking Sites. One Page."
        image={assets.img.planning}
        imageAlt="Traveler planning a journey with maps and travel essentials"
      >
        <p className="text-lg leading-relaxed text-fog">
          Search and find the best deals across the web from one place — complete
          trips, shore excursions, tours, activities, attractions, transfers, and
          adventures, all from trusted names, no advisor markup. And Brian's
          always available for questions, no obligation to book through him.
        </p>
        <a href="#booking-types" className="btn-primary w-fit">
          Choose a booking type <ArrowRight size={16} />
        </a>
      </PageHero>

      {/* Booking types */}
      <section id="booking-types" className="container-px py-20 md:py-28">
        <SectionHeading eyebrow="Start here" title="What are you booking?" />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {bookingTypes.map((b) => {
            const Icon = b.icon;
            return (
              <motion.a
                key={b.title}
                variants={fadeUp}
                href={b.href}
                className="group rounded-2xl border border-ink/10 bg-cream p-8 transition-all duration-300 hover:border-ocean/30 hover:shadow-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-fog">{b.body}</p>
                <span className="link-underline mt-4 text-sm">
                  Explore <ArrowRight size={14} />
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Ask Brian callout */}
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-clay/10 p-8 md:flex-row md:items-center">
            <HelpCircle className="shrink-0 text-clay" size={32} />
            <p className="text-ink/90">
              <span className="font-semibold">Stuck? Overthinking a price?</span>{" "}
              Ask Brian. He wants you to have the best vacation — even if you're
              booking it yourself. He'll answer for free, help you weigh options,
              or even help you plan it yourself. No strings, no pressure to book
              through him.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Exoticca */}
      <section id="exoticca" className="bg-sand/60">
        <div className="container-px grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={assets.img.resort}
              alt="Curated international vacation package destination"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <div>
            <span className="eyebrow">Complete vacations</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
              Browse Curated Trips
            </h2>
            <p className="mt-4 leading-relaxed text-fog">
              Explore fully planned vacation packages with flights, hotels, tours,
              and transfers built in — crafted by expert trip designers to exotic
              destinations worldwide.
            </p>
            <p className="mt-4 text-sm font-medium text-ink">
              Exoticca · 150+ destinations · Flights, hotels &amp; tours included
            </p>
            <a
              href={links.exoticca}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary mt-6"
            >
              Browse Curated Trips <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Viator */}
      <section id="viator" className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="Tours, activities and local experiences"
          title="Viator"
          intro="Search tours, attractions, tickets, day trips, transfers, food experiences, cultural activities, outdoor adventures, and memorable things to do around the world."
        />
        <Reveal delay={0.05} className="mt-6">
          <a
            href={links.viator}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary"
          >
            Browse all Viator experiences <ExternalLink size={15} />
          </a>
        </Reveal>
        <div className="mt-12">
          <ExampleGrid items={viatorExamples} />
        </div>
      </section>

      {/* Shore Excursions */}
      <section id="shore" className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <SectionHeading
            eyebrow="Cruise shore excursions"
            title="Shore Excursions Group"
            intro="Browse port-day experiences matched to cruise destinations worldwide, including smaller-group tours, private options, sightseeing, beaches, wildlife, food, culture, and adventure."
          />
          <Reveal delay={0.05} className="mt-6">
            <a
              href={links.shoreExcursions}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary"
            >
              Browse all shore excursions <ExternalLink size={15} />
            </a>
          </Reveal>
          <div className="mt-12">
            <ExampleGrid items={shoreExamples} />
          </div>
        </div>
      </section>

      <div className="container-px py-12">
        <p className="text-sm text-fog">
          <span className="font-semibold text-ink">Booking disclosure:</span>{" "}
          Reservations and payments are completed directly through the
          selected provider, and provider terms and cancellation policies
          apply. Any questions Brian answers about a trip you book yourself
          are general guidance, not a formal recommendation or advisory
          service — see the{" "}
          <Link to="/terms" className="underline hover:text-ink">
            Terms of Use
          </Link>{" "}
          for details.
        </p>
      </div>
    </>
  );
}
