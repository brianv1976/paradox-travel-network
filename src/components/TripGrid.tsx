import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";
import type { TripSpecial } from "../data/exoticcaTrips";

/** Simple grid of real trip/cruise cards -- no carousel mechanics. With
 *  only a couple of items per category, a scroll-and-arrows carousel implies
 *  more content than actually exists; a grid shows everything at once.
 *  Each card's CTA reflects its bookingType: "self" links straight to the
 *  vendor's real checkout (advisor/affiliate-tagged), "brian" routes to
 *  Plan My Trip instead -- not every vendor supports direct self-checkout. */
export default function TripGrid({ trips }: { trips: TripSpecial[] }) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {trips.map((trip) => {
        const cardBody = (
          <>
            <div className="relative h-48 overflow-hidden">
              <img
                src={trip.image}
                alt={`${trip.destination} — ${trip.title}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-bold text-ink">
                {trip.discountPercent}% off
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream backdrop-blur-sm">
                {trip.vendor}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-clay-deep">
                {trip.destination} · {trip.duration}
              </span>
              <h4 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
                {trip.title}
              </h4>
              <p className="mt-3 text-sm text-fog">
                From <span className="text-lg font-bold text-ink">${trip.fromPrice.toLocaleString()}</span> per person
              </p>
              {trip.bookingType === "self" ? (
                <span className="link-underline mt-auto pt-4 text-sm">
                  See trip & book <ExternalLink size={13} />
                </span>
              ) : (
                <span className="link-underline mt-auto pt-4 text-sm">
                  Plan this with Brian <ArrowRight size={13} />
                </span>
              )}
            </div>
          </>
        );

        const cardClass =
          "group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift";

        return (
          <motion.div key={trip.slug} variants={fadeUp}>
            {trip.bookingType === "self" && trip.href ? (
              <a href={trip.href} target="_blank" rel="noopener noreferrer sponsored" className={cardClass}>
                {cardBody}
              </a>
            ) : (
              <Link to="/plan-my-trip" className={cardClass}>
                {cardBody}
              </Link>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
