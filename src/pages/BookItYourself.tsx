import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Ship,
  Anchor,
  Compass,
  Plane,
  HelpCircle,
  Users,
  Map,
  ShieldCheck,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import ImageCarousel from "../components/ImageCarousel";
import HeroTravelScene from "../components/HeroTravelScene";
import HeroPhotoStack from "../components/HeroPhotoStack";
import { assets, links } from "../lib/assets";
import { fadeUp, stagger } from "../lib/motion";

// Real, unbranded photography for the hero scene — deliberately no vendor
// logos so it doesn't play favorites among the sections below. Used by
// HeroTravelScene, kept here as an easy fallback while HeroPhotoStack (the
// 3D layered version) is being tried out — swap the imageSlot below to
// revert.
const heroSlides = [
  { src: assets.virginVoyages.shipExterior, alt: "Cruise ship sailing at sea" },
  { src: assets.virginVoyages.beachClubPool, alt: "Aerial view of a beach club pool" },
  { src: assets.virginVoyages.beachClubDusk, alt: "Beach club pool at dusk" },
  { src: assets.virginVoyages.beachClubCabana, alt: "View of the beach from a cabana" },
];

const bookingTypes = [
  {
    icon: Plane,
    title: "Book a Trip",
    body: "Explore flights, hotels, tours, and transfers bundled into one trip.",
    href: "#exoticca",
  },
  {
    icon: Anchor,
    title: "Cruises",
    body: "Browse sailings and find the right ship and cabin.",
    href: "#virgin-voyages",
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
    image: assets.img.romeColosseum,
    href: "https://www.viator.com/tours/Rome/Colosseum-and-Ancient-Rome-Tour-with-Roman-Forum-and-Palatine-Hill/d511-3731COLOSSEUM?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  },
  {
    place: "Cancún · Water Adventure",
    title: "Speedboat & Snorkel",
    blurb: "Drive a speedboat through Nichupté Lagoon, then snorkel Punta Nizuc.",
    image: assets.img.cancunSpeedboat,
    href: "https://www.viator.com/tours/Cancun/Cancun-Jungle-Tour-Adventure-Speed-Boat-and-Snorkeling/d631-19032P1?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  },
  {
    place: "Dubai · Desert Adventure",
    title: "Red Dunes Desert Safari",
    blurb: "Ride the dunes, try sandboarding and camel riding, then a camp dinner.",
    image: assets.img.desertSafari,
    href: "https://www.viator.com/tours/Dubai/Dubai-Premium-Red-Dunes-Camel-Ride-and-5-BBQ-at-Al-Khayma-Camp/d828-91421P12?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  },
];

const exoticcaSlides = [
  {
    src: assets.exoticca.safariBalloon,
    alt: "Hot air balloon safari over the Serengeti",
    caption: "Serengeti balloon safari",
  },
  {
    src: assets.exoticca.tajMahal,
    alt: "The Taj Mahal at sunset",
    caption: "Taj Mahal at sunset",
  },
  {
    src: assets.exoticca.elephantsWaterhole,
    alt: "Elephant herd at a waterhole in Africa",
    caption: "African safari",
  },
  {
    src: assets.exoticca.lakeBirds,
    alt: "Fishermen on a lake surrounded by birds at sunset",
    caption: "Golden-hour boat life",
  },
];

const virginVoyagesSlides = [
  {
    src: assets.virginVoyages.shipExterior,
    alt: "Scarlet Lady sailing at sea",
    caption: "Scarlet Lady at sea",
  },
  {
    src: assets.virginVoyages.beachClubPool,
    alt: "Aerial view of the pool at The Beach Club at Bimini",
    caption: "The Beach Club at Bimini — Virgin Voyages' private destination",
  },
  {
    src: assets.virginVoyages.beachClubDusk,
    alt: "Pool at The Beach Club at Bimini at dusk",
    caption: "Bimini at golden hour",
  },
  {
    src: assets.virginVoyages.seaViewCabin,
    alt: "Sea View cabin aboard a Virgin Voyages ship",
    caption: "Sea View cabins",
  },
  {
    src: assets.virginVoyages.nightlife,
    alt: "Nightlife onboard a Virgin Voyages ship",
    caption: "Nightlife onboard",
  },
];

const projectExpeditionHighlights = [
  {
    icon: Map,
    title: "Full multi-day itineraries",
    body: "Genuine multi-day trips and adventures, planned start to finish — not single-day tours stitched together.",
    image: assets.img.multiDayTrek,
  },
  {
    icon: Users,
    title: "Local operators, not a marketplace",
    body: "A smaller, curated catalog run by local guides who know their destination, rather than an endless generic listing.",
    image: assets.img.localGuide,
  },
  {
    icon: ShieldCheck,
    title: "Back-to-Ship Guarantee",
    body: "If a shore excursion runs long, they cover getting you back to the ship — no clock-watching on port day.",
    image: assets.img.cruiseTender,
  },
];

const projectExpeditionSlides = [
  {
    src: assets.img.multiDayTrek,
    alt: "Multi-day trekking adventure",
    caption: "Full multi-day itineraries",
  },
  {
    src: assets.img.localGuide,
    alt: "Local guide leading a small group tour",
    caption: "Local operators, not a marketplace",
  },
  {
    src: assets.img.cruiseTender,
    alt: "Cruise tender returning travelers to the ship",
    caption: "Back-to-Ship Guarantee",
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
      variants={stagger(0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid gap-5 md:grid-cols-3"
    >
      {items.map((it) => (
        <motion.div key={it.title} variants={fadeUp}>
          <TiltCard className="rounded-2xl" intensity={7}>
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft"
            >
              <div className="relative h-40 overflow-hidden">
                {/* Nested transforms so the idle Ken Burns drift (on the
                    img) and the hover zoom (on this wrapper) don't fight
                    over the same transform property. */}
                <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                  <img
                    src={it.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover animate-kenburns"
                  />
                </div>
                {/* Sweeps across the image on hover. */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/25 to-transparent transition-transform duration-[900ms] ease-smooth group-hover:translate-x-full" />
              </div>
              <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(28px)" }}>
                <span className="text-xs font-semibold uppercase tracking-wide text-clay-deep">
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
            </a>
          </TiltCard>
        </motion.div>
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
        eyebrow="The smart way to book it yourself."
        title="Popular Booking Sites You Know — and Brian Trusts. One Page."
        imageFrameless
        imageSlot={<HeroPhotoStack photos={assets.heroDestinations} />}
      >
        <p className="text-lg leading-relaxed text-fog">
          A hand-picked lineup of the booking sites Brian actually trusts —
          cruises, tours, shore excursions, and more — all in one place. No
          hunting through search results wondering which site is legit. And
          Brian's happy to weigh in before you book — just ask.
        </p>
        <a href="#booking-types" className="btn-primary w-fit">
          Choose a booking type <ArrowRight size={16} />
        </a>
      </PageHero>

      {/* Booking types */}
      <section id="booking-types" className="container-px py-20 md:py-28">
        <SectionHeading eyebrow="Start here" title="What are you booking?" />
        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
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
              Ask Brian before you book — he's happy to help you weigh options
              or think it through. Once you book directly with one of these
              partners, that reservation is between you and them; Paradox
              can't manage or service it after the fact.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Exoticca */}
      <section id="exoticca" className="bg-sand/60">
        <div className="container-px grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <ImageCarousel slides={exoticcaSlides} />
          </Reveal>
          <div>
            <span className="eyebrow">Complete, multi-destination trips</span>
            <img
              src={assets.partnerLogos.exoticca}
              alt="Exoticca"
              loading="lazy"
              className="mt-3 h-12 w-auto md:h-14"
            />
            <p className="mt-5 leading-relaxed text-fog">
              Exoticca is an online tour operator, not a marketplace — their
              own trip designers build each itinerary in-house. A trip
              bundles flights, hotels,
              guided tours, transfers, and breakfast into one upfront price,
              so there's no separate flight search or hotel comparison to do
              yourself.
            </p>
            <p className="mt-4 leading-relaxed text-fog">
              Most trips run as small guided groups — typically 12 to 15
              travelers, rarely more than 30 — with free time built into most
              stops for exploring on your own. Fully self-guided versions are
              also available for travelers who'd rather skip the group
              entirely.
            </p>
            <p className="mt-4 text-sm font-medium text-ink">
              Exoticca · 300+ itineraries across 60+ countries · Flights,
              hotels, tours &amp; transfers included
            </p>
            <a
              href={links.exoticca}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary mt-6"
            >
              Browse Curated Trips <ExternalLink size={15} />
            </a>
            <p className="mt-3 text-xs text-fog">
              Paradox may earn a commission if you book through this link, at
              no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Virgin Voyages */}
      <section id="virgin-voyages" className="container-px py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-none">
            <span className="eyebrow">Adults-only cruising</span>
            <img
              src={assets.partnerLogos.virginVoyages}
              alt="Virgin Voyages"
              loading="lazy"
              className="mt-3 h-12 w-auto md:h-14"
            />
            <p className="mt-5 leading-relaxed text-fog">
              Virgin Voyages is a cruise line for adults only (18+), sailing
              four ships — Scarlet, Valiant, Resilient, and Brilliant Lady.
              Every restaurant onboard is included in the fare across 20-plus
              eateries, so there's no specialty-dining surcharge to plan
              around, and WiFi is standard on every sailing.
            </p>
            <p className="mt-4 leading-relaxed text-fog">
              Every Caribbean sailing from Miami stops at The Beach Club at
              Bimini, Virgin's own private beach — two lagoon-style pools,
              DJ sets, sunset fire pits, and complimentary food and loungers
              included in the day.
            </p>
            <p className="mt-4 text-sm font-medium text-ink">
              Virgin Voyages · 4 ships · Dining &amp; WiFi included on every sailing
            </p>
            <a
              href={links.virginVoyages}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary mt-6"
            >
              Browse Virgin Voyages <ExternalLink size={15} />
            </a>
            <p className="mt-3 text-xs text-fog">
              Paradox may earn a commission if you book through this link, at
              no extra cost to you.
            </p>
          </div>
          <Reveal delay={0.05} className="order-1 md:order-none">
            <ImageCarousel slides={virginVoyagesSlides} />
          </Reveal>
        </div>
      </section>

      {/* Project Expedition */}
      <section id="project-expedition" className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-none">
              <span className="eyebrow">Boutique tours, activities &amp; multi-day trips</span>
              <img
                src={assets.partnerLogos.projectExpedition}
                alt="Project Expedition"
                loading="lazy"
                className="mt-3 h-12 w-auto md:h-14"
              />
              <p className="mt-5 leading-relaxed text-fog">
                Project Expedition is a smaller, curated alternative to a
                giant open marketplace — every local operator on the
                platform is reviewed and approved by their own team before
                it's bookable, rather than an open listing anyone can join.
                Founded in 2015, they now cover more than 20,000 tours,
                activities, and multi-day trips across 150-plus countries.
              </p>
              <p className="mt-4 leading-relaxed text-fog">
                Not going anywhere yet? Search your own city too — it works
                just as well for a local day trip or a weekend adventure
                close to home as it does for planning a trip abroad.
              </p>
              <p className="mt-4 text-sm font-medium text-ink">
                Project Expedition · 20,000+ experiences · 150+ countries
              </p>
              <a
                href={links.projectExpedition}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary mt-6"
              >
                Explore Tours &amp; Experiences <ExternalLink size={15} />
              </a>
              <p className="mt-3 text-xs text-fog">
                Paradox may earn a commission if you book through this link,
                at no extra cost to you.
              </p>
            </div>
            <Reveal delay={0.05} className="order-1 md:order-none">
              <ImageCarousel slides={projectExpeditionSlides} />
            </Reveal>
          </div>

          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {projectExpeditionHighlights.map((h) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  className="flex gap-4 rounded-2xl bg-cream p-6"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-sm text-fog">{h.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Viator */}
      <section id="viator" className="container-px py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">Tours, activities and local experiences</span>
          <img
            src={assets.partnerLogos.viator}
            alt="Viator"
            loading="lazy"
            className="mt-3 h-12 w-auto md:h-14"
          />
          <p className="mt-5 text-lg leading-relaxed text-fog">
            Viator is TripAdvisor's tours-and-activities marketplace — not a
            single operator, but a booking platform for local guides and
            operators worldwide, with hundreds of thousands of bookable
            tours, attractions, tickets, day trips, and transfers across
            every continent. Every listing carries the same reviews you'd
            already trust from TripAdvisor itself.
          </p>
          <p className="mt-4 leading-relaxed text-fog">
            At home and looking for an adventure? Check your own area — the
            same search that finds a Rome food tour also turns up nearby
            tours, activities, and small day trips right where you live.
          </p>
          <p className="mt-4 text-sm font-medium text-ink">
            Viator · 200,000+ bookable experiences · Backed by TripAdvisor reviews
          </p>
        </div>
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
        <p className="mt-3 text-xs text-fog">
          Paradox may earn a commission if you book through this link, at no
          extra cost to you.
        </p>
        <div className="mt-12">
          <ExampleGrid items={viatorExamples} />
        </div>
      </section>

      {/* Shore Excursions */}
      <section id="shore" className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Cruise shore excursions</span>
            <img
              src={assets.partnerLogos.shoreExcursions}
              alt="Shore Excursions Group"
              loading="lazy"
              className="mt-3 h-12 w-auto md:h-14"
            />
            <p className="mt-5 text-lg leading-relaxed text-fog">
              Shore Excursions Group does one thing — port-day tours for
              cruise passengers — at a scale no cruise line's own excursion
              desk can match: 4,000-plus excursions across 300-plus ports
              worldwide, run by local operators instead of the ship. Groups
              stay small by design, averaging around 12 guests per
              excursion, with private, small-group, and standard formats
              depending on how much company you want on port day.
            </p>
            <p className="mt-4 text-sm font-medium text-ink">
              Shore Excursions Group · 5.7M+ excursions delivered · 4.7/5 from 56,500+ reviews
            </p>
          </div>
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
          <p className="mt-3 text-xs text-fog">
            Paradox may earn a commission if you book through this link, at
            no extra cost to you.
          </p>
          <div className="mt-12">
            <ExampleGrid items={shoreExamples} />
          </div>
        </div>
      </section>

      <div className="container-px py-12">
        <p className="text-sm text-fog">
          <span className="font-semibold text-ink">Booking disclosure:</span>{" "}
          Paradox Travel Network may earn a commission when you book through
          the partner links on this page, at no additional cost to you.
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
