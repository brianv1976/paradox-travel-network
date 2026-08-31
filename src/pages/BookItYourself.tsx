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
  RotateCcw,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import ImageCarousel from "../components/ImageCarousel";
import HeroPhotoStack from "../components/HeroPhotoStack";
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

const exoticcaHighlights = [
  {
    icon: RotateCcw,
    title: "Flexible cancellation options",
    body: "Cancellation coverage is selected when you book. Exoticca currently offers Flex Light, Flex Optima, and Flex Total with different cancellation windows and travel-credit levels, so check the option shown for your specific trip before paying.",
  },
  {
    icon: CreditCard,
    title: "Book now, pay over time",
    body: "Depending on how far ahead you book, Exoticca offers deposit and staged-payment options. Fixed installment options are also available through PayPal or Affirm.",
  },
  {
    icon: ShieldCheck,
    title: "Expert-crafted trips, ASTA member",
    body: "Exoticca's travel crafters design the itineraries with local partners, and Exoticca lists ASTA among its travel-industry memberships.",
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
    body: "Multi-day trips sit alongside individual tours, excursions, attractions, and transfers, so you can book a full itinerary or just one part of a trip.",
    image: assets.img.multiDayTrek,
  },
  {
    icon: Users,
    title: "Curated local operators",
    body: "Project Expedition works directly with local suppliers and says each supplier is reviewed and approved by its team before being offered on the platform.",
    image: assets.img.localGuide,
  },
  {
    icon: ShieldCheck,
    title: "Back-to-Ship protection on eligible tours",
    body: "Some shore excursions expressly include Project Expedition's Back to Ship Guarantee. Check the individual product page and booking voucher because the guarantee does not apply to every shore excursion.",
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
    caption: "Curated local operators",
  },
  {
    src: assets.img.cruiseTender,
    alt: "Cruise tender returning travelers to the ship",
    caption: "Cruise-friendly shore excursion options",
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
        <p className="text-sm text-fog/80">
          Can't find what you're looking for here? <Link to="/plan-my-trip" className="underline hover:text-ink">Ask Brian to book it</Link> instead — he can handle almost anything these partners don't cover.
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
          <div className="flex flex-col items-start gap-5 rounded-2xl bg-clay/10 p-8 md:flex-row md:items-center">
            <HelpCircle className="shrink-0 text-clay" size={32} />
            <div className="flex-1">
              <p className="text-ink/90">
                <span className="font-semibold">Not sure where to start?</span>{" "}
                Need a quick push in the right direction before you book?
                Message Brian. He may not respond immediately, but he'll do
                his best to answer in a timely manner.
              </p>
              <p className="mt-2 text-sm text-fog">
                Once you book directly with one of these partners, that
                reservation is between you and them; Paradox can't manage or
                service it after the fact.
              </p>
            </div>
            <a
              href={links.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full shrink-0 sm:w-auto"
            >
              <MessageCircle size={17} />
              Message Brian
            </a>
          </div>
        </Reveal>
      </section>

      {/* Exoticca */}
      <section id="exoticca" className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              {/* Every Exoticca photo carries their own "exoticca" wordmark
                  baked into the top-left corner -- object-left keeps the
                  crop from trimming into it (default center-crop was
                  cutting off the leading "e"). */}
              <ImageCarousel slides={exoticcaSlides} imagePosition="object-left" />
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
                Exoticca is an online tour operator, not an open marketplace.
                Its travel crafters build vacation packages with local partners,
                typically combining flights, hotels, tours, and transfers in one
                trip. Exact inclusions vary by itinerary, and some packages also
                include meals.
              </p>
              <p className="mt-4 leading-relaxed text-fog">
                On Exoticca group trips, group size averages about 12 to 15
                travelers and rarely exceeds 30. Many itineraries mix guided
                activities with time to explore independently, and self-guided
                itineraries are available for travelers who want more freedom.
              </p>
              <p className="mt-4 text-sm font-medium text-ink">
                Exoticca · 300+ itineraries across 60+ countries · Flights,
                hotels, tours &amp; transfers included on its vacation packages
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

          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {exoticcaHighlights.map((h) => {
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
              Many Caribbean sailings from Miami include The Beach Club at
              Bimini, Virgin's private beach destination, with lagoon-style
              pools, beach access, entertainment, and food included in the day.
              Check the individual itinerary because ports vary by sailing.
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
                Project Expedition is a curated platform for tours, excursions,
                attractions, transfers, and multi-day trips. It works directly
                with local suppliers and reviews and approves suppliers before
                making them bookable on the platform. Its current travel-advisor
                catalog lists more than 32,000 curated tours and excursions
                across 150 countries and territories.
              </p>
              <p className="mt-4 leading-relaxed text-fog">
                Not going anywhere yet? Search your own city too — it works
                just as well for a local day trip or a weekend adventure
                close to home as it does for planning a trip abroad.
              </p>
              <p className="mt-4 text-sm font-medium text-ink">
                Project Expedition · 32,000+ curated tours &amp; excursions · 150 countries and territories
              </p>
              <a
                href={links.projectExpedition}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary mt-6"
              >
                Explore Tours &amp; Experiences <ExternalLink size={15} />
              </a>
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
            Viator, part of Tripadvisor Group, is a global tours-and-activities
            marketplace rather than a single tour operator. Its catalog lists
            approximately 400,000 experiences worldwide from more than 65,000
            operators, covering tours, attractions, tickets, day trips, and
            transfers.
          </p>
          <p className="mt-4 leading-relaxed text-fog">
            At home and looking for an adventure? Check your own area — the
            same search that finds a Rome food tour also turns up nearby
            tours, activities, and small day trips right where you live.
          </p>
          <p className="mt-4 text-sm font-medium text-ink">
            Viator · Approximately 400,000 experiences worldwide · Tripadvisor Group company
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
              Shore Excursions Group focuses on port-day tours for cruise
              passengers, with a current catalog of more than 4,500 excursions
              across 300-plus ports worldwide. Tours are delivered by local
              operators, with private, small-group, and standard formats
              available depending on the excursion.
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
