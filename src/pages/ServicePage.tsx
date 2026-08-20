import { Navigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink, MapPin } from "lucide-react";
import { getService } from "../data/services";
import { getTripsForGenre } from "../data/trips";
import { getPostsForGenre, getPostImage } from "../data/blog";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import { stagger, fadeUp } from "../lib/motion";
import { links, business } from "../lib/assets";

export default function ServicePage({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const service = slug ? getService(slug) : undefined;

  useSeo(
    service?.metaTitle ?? "",
    service?.metaDescription,
    service
      ? {
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.navLabel,
            description: service.metaDescription,
            provider: { "@type": "TravelAgency", name: business.name },
            areaServed: business.areaServed,
          },
        }
      : undefined
  );

  if (!service) return <Navigate to="/404" replace />;

  const trips = getTripsForGenre(service.slug);
  const guides = getPostsForGenre(service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        image={service.image}
        imageAlt={service.imageAlt}
      >
        <p className="text-lg leading-relaxed text-fog">{service.intro}</p>

        <div>
          <Link to="/plan-my-trip" className="btn-primary">
            Plan a Trip
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Self-book option comes after the case for planning with Brian —
            someone landing here from search should see why Paradox is worth
            staying on before being handed links off the site. */}
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
          <p className="text-sm font-medium text-ink">{service.selfBookIntro}</p>
          <ul className="mt-3 space-y-2">
            {service.vendors.map((v) => (
              <li key={v.name} className="text-sm text-fog">
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="font-semibold text-ocean-dark hover:text-clay-deep"
                >
                  {v.name}
                </a>{" "}
                — {v.blurb}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm italic text-fog">{service.selfBookNote}</p>
          <p className="mt-3 text-xs text-fog">
            Paradox may earn a commission if you book through these links, at
            no extra cost to you.
          </p>
        </div>
      </PageHero>

      {/* Fit triad */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow={service.fitTriad.eyebrow}
          title={service.fitTriad.heading}
        />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {service.fitTriad.items.map((item) => (
            <motion.div
              key={item.n}
              variants={fadeUp}
              className="group rounded-2xl border border-ink/10 bg-cream p-7 transition-all duration-300 hover:border-ocean/30 hover:shadow-soft"
            >
              <span className="font-display text-3xl font-semibold text-clay-deep">
                {item.n}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-fog">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured trips — real, priced, bookable itineraries for this trip
          type. Renders nothing at all when empty (no "coming soon" filler),
          so the page looks exactly as it does today until real trips exist. */}
      {trips.length > 0 && (
        <section className="container-px py-20 md:py-28">
          <SectionHeading
            eyebrow="Real trips, not just ideas"
            title={`Featured ${service.navLabel.toLowerCase()} trips.`}
          />
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {trips.map((trip) => (
              <motion.div key={trip.slug} variants={fadeUp}>
                <TiltCard className="rounded-2xl" intensity={7}>
                  <a
                    href={trip.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={trip.image}
                        alt={trip.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-ink">
                        Operated by {trip.operator}
                      </span>
                    </div>
                    <div
                      className="flex flex-1 flex-col p-6"
                      style={{ transform: "translateZ(28px)" }}
                    >
                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-clay-deep">
                        <MapPin size={12} /> {trip.destination}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                        {trip.title}
                      </h3>
                      <p className="mt-1 text-sm text-fog">
                        {trip.duration} · From {trip.startingPrice}/person
                      </p>
                      <ul className="mt-3 space-y-1">
                        {trip.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="text-sm text-fog">
                            · {h}
                          </li>
                        ))}
                      </ul>
                      <span className="link-underline mt-auto pt-4 text-sm">
                        See this trip <ExternalLink size={13} />
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-6 text-xs text-fog">
            Paradox may earn a commission if you book through these links, at
            no extra cost to you.
          </p>
        </section>
      )}

      {/* Checklist */}
      <section className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <SectionHeading
            eyebrow={service.checklist.eyebrow}
            title={service.checklist.heading}
          />
          <motion.ul
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {service.checklist.items.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl bg-cream px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
                  <Check size={14} />
                </span>
                <span className="font-medium text-ink">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-lg italic leading-relaxed text-fog">
              {service.checklist.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow={service.pillars.eyebrow}
          title={service.pillars.heading}
          intro={service.pillars.intro}
        />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {service.pillars.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-2xl bg-ocean-dark p-7 text-cream"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-cream">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Helpful Guides — supporting Postcards articles curated for this
          genre. Renders nothing when there aren't any yet (Romance and
          Adventure currently have none), same pattern as Featured Trips. */}
      {guides.length > 0 && (
        <section className="bg-sand/60">
          <div className="container-px py-20 md:py-28">
            <SectionHeading
              eyebrow="Worth reading first"
              title={`Helpful ${service.navLabel.toLowerCase()} guides from Postcards.`}
            />
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {guides.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link
                    to={`/travel-tips/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:shadow-soft"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={getPostImage(post)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                        {post.title}
                      </h3>
                      <span className="link-underline mt-auto pt-4 text-sm">
                        Read the guide <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Ready to narrow it down?"
        title={service.closingHeading}
        body={service.closingBody}
        primaryLabel={service.ctaLabel}
        primaryTo="/plan-my-trip"
        secondaryLabel="Ask a quick question"
        secondaryTo="/contact"
      />

      <div className="container-px pb-20 text-center text-sm text-fog">
        Not sure which planning option fits? Email{" "}
        <a
          href="mailto:hello@paradoxtravelnetwork.com"
          className="font-semibold text-ocean-dark hover:text-clay-deep"
        >
          hello@paradoxtravelnetwork.com
        </a>{" "}
        or{" "}
        <a
          href={links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ocean-dark hover:text-clay-deep"
        >
          schedule a call <ExternalLink size={13} />
        </a>
        .
      </div>
    </>
  );
}
