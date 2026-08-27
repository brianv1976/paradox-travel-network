import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion";
import type { ExoticcaTrip } from "../data/exoticcaTrips";

/** Horizontal scroll-snap row of real trip cards linking straight to
 *  self-booking, each carrying Brian's advisor_token. Native scroll (not a
 *  crossfade slider) so every card stays reachable and swipeable. */
export default function TripCarousel({ trips }: { trips: ExoticcaTrip[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-trip-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-6"
        >
          {trips.map((trip) => (
            <motion.a
              key={trip.slug}
              variants={fadeUp}
              data-trip-card
              href={trip.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-[340px]"
            >
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
                <span className="link-underline mt-auto pt-4 text-sm">
                  See trip & book <ExternalLink size={13} />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-fog">
          Real Exoticca itineraries — book directly, credited to Brian.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Previous trip"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Next trip"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
