/**
 * Real, bookable trip listings — the layer competitor research (Sharon Carr
 * Travel, Vincent Vacations) showed Paradox is missing: something between
 * "here's why to work with an advisor" and "here's a link to another
 * company's booking site." A trip here is a specific, named, priced
 * itinerary from a real vendor, shown on whichever genre page(s) it
 * actually fits — not a separate showcase area.
 *
 * Deliberately empty for now. Brian hasn't completed vendor (Exoticca)
 * training yet, so there's no real package/pricing data to represent
 * honestly. This file exists so the site is structurally ready to receive
 * trips the moment that changes — ServicePage.tsx already renders a
 * Featured Trips section per genre, and it silently renders nothing when
 * `trips` is empty, exactly as it does today. Add entries here later;
 * no other file needs to change.
 *
 * Attribution pattern (from competitor research — copy Vincent Vacations'
 * honesty, not Sharon Carr's "Journey House" sub-brand that buries who the
 * real operator is): `operator` and `operatorLogo` are always shown
 * plainly on the card. Never wrap a vendor's trip in a private label that
 * obscures who's actually running it.
 */
import type { ServicePage } from "./services";

export interface Trip {
  slug: string;
  /** The real operator running the trip — always shown on the card, never hidden. */
  operator: string;
  operatorLogo?: string;
  title: string;
  destination: string;
  /** Which service page slug(s) this trip belongs on — a trip can
   *  reasonably appear on more than one (e.g. an all-inclusive honeymoon
   *  resort fits both "all-inclusive-resorts" and "romance-travel"). */
  genres: ServicePage["slug"][];
  image: string;
  imageAlt: string;
  duration: string;
  /** Starting per-person price, formatted for display (e.g. "$1,499"). A
   *  starting price only — never a full quote — matching how both
   *  competitors handle pricing on category-level pages. */
  startingPrice: string;
  /** 3-5 short highlights, not a full day-by-day itinerary — enough to
   *  make the trip feel real without committing to itinerary details that
   *  can change before booking. */
  highlights: string[];
  /** Honest outbound link to the real booking path (the advisor-tracked
   *  vendor URL) — Paradox has no in-house booking engine, and both
   *  competitors keep quote requests in-house while still linking out for
   *  the actual reservation once a trip is chosen. */
  bookingUrl: string;
}

export const trips: Trip[] = [];

export const getTripsForGenre = (genreSlug: string): Trip[] =>
  trips.filter((t) => t.genres.includes(genreSlug));
