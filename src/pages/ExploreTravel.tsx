import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Ship,
  Umbrella,
  Heart,
  Users,
  Mountain,
  Sparkles,
  MapPin,
  BookOpen,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { services } from "../data/services";
import { getPostsForGenre, getPostImage } from "../data/blog";
import { getTripsForGenre } from "../data/trips";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { stagger, fadeUp } from "../lib/motion";
import { assets, business } from "../lib/assets";

const ICONS: Record<string, typeof Ship> = {
  cruises: Ship,
  "all-inclusive-resorts": Umbrella,
  "romance-travel": Heart,
  "family-travel": Users,
  "adventure-guided-travel": Mountain,
};

const SITE_URL = "https://paradoxtravelnetwork.com";

export default function ExploreTravel() {
  useSeo(
    "Explore Travel Types | Paradox Travel Network",
    "Browse cruises, all-inclusive resorts, honeymoons, family trips, adventure travel, and custom vacations — with real planning guidance for each, from a Dallas–Fort Worth travel advisor serving travelers nationwide.",
    {
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/${s.slug}`,
          name: s.navLabel,
        })),
      },
    }
  );

  return (
    <>
      <PageHero
        eyebrow="Explore Travel"
        title="Start with the kind of trip."
        image={assets.img.planning}
        imageAlt="Planning a trip with maps and notes"
      >
        <p className="text-lg leading-relaxed text-fog">
          Every trip starts somewhere. Pick the kind that's closest to what
          you're picturing, and you'll find real planning guidance, honest
          booking-partner links, and — as they exist — real trips and
          Postcards worth reading before you decide anything.
        </p>
      </PageHero>

      {services.map((service, i) => {
        const Icon = ICONS[service.slug] ?? Sparkles;
        const guides = getPostsForGenre(service.slug);
        const trips = getTripsForGenre(service.slug);
        const reversed = i % 2 === 1;

        return (
          <section
            key={service.slug}
            className={i % 2 === 0 ? "bg-cream" : "bg-sand/60"}
          >
            <div className="container-px py-20 md:py-28">
              <div
                className={`grid items-center gap-12 md:grid-cols-2 ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="overflow-hidden rounded-[2rem] shadow-lift">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
                    <Icon size={20} />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
                    {service.navLabel}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-fog">
                    {service.intro}
                  </p>
                  <Link
                    to={`/${service.slug}`}
                    className="link-underline mt-4 inline-flex items-center gap-1.5 text-base font-semibold"
                  >
                    Explore {service.navLabel} <ArrowRight size={16} />
                  </Link>

                  {/* Featured trips teaser — renders nothing until real
                      trips exist for this genre. */}
                  {trips.length > 0 && (
                    <div className="mt-6 rounded-xl border border-ink/10 bg-white/60 p-4">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-clay-deep">
                        <MapPin size={13} /> Real trips available
                      </p>
                      <ul className="mt-2 space-y-1">
                        {trips.slice(0, 2).map((t) => (
                          <li key={t.slug} className="text-sm text-ink/80">
                            {t.title} — from {t.startingPrice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Related Postcards — renders nothing for genres with no
                      matching content yet (Romance, Adventure). */}
                  {guides.length > 0 && (
                    <div className="mt-6">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-clay-deep">
                        <BookOpen size={13} /> From Postcards
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {guides.slice(0, 2).map((post) => (
                          <li key={post.slug}>
                            <Link
                              to={`/travel-tips/${post.slug}`}
                              className="text-sm font-medium text-ocean-dark hover:text-clay-deep"
                            >
                              {post.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* Custom Vacations — not a real service page (it's what Plan With
          Brian already is), so it gets a lighter closing section instead of
          a full row like the genres above. */}
      <section className="bg-cream">
        <div className="container-px py-20 md:py-28">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-2xl rounded-[2rem] border border-ink/10 bg-sand/60 p-10 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-clay/15 text-clay-deep"
            >
              <Sparkles size={20} />
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl"
            >
              None of these quite fit?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-lg leading-relaxed text-fog">
              Custom vacations and multi-destination trips don't fit neatly
              into one category — that's exactly what {business.owner} plans
              directly, built around your priorities instead of a package.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/plan-my-trip" className="btn-primary mt-6">
                Plan a Custom Trip <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to narrow it down?"
        title="Pick a type, or ask Brian to help you choose."
        body="Every path here leads to real planning help — self-book options, or a personal plan built around your trip."
        primaryLabel="Plan My Trip"
        primaryTo="/plan-my-trip"
        secondaryLabel="Book It Yourself"
        secondaryTo="/book-it-yourself"
      />
    </>
  );
}
