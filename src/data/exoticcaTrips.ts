/** Hand-picked real trip/cruise specials from booking partners, refreshed
 *  periodically (not a live price feed). Not every vendor's trips are
 *  self-bookable the same way -- `bookingType` says which path(s) actually
 *  work for a given trip, and the card UI reflects it:
 *  - "self": visitor can book it directly (href goes straight to the
 *    vendor's real checkout, tagged with Brian's advisor/affiliate id so
 *    the booking is still credited to him). Brian can also help either way.
 *  - "brian": this vendor/trip isn't a self-checkout flow (e.g. an
 *    advisor-only supplier rate) -- the card sends the visitor to Plan My
 *    Trip instead of a dead or misleading "book it yourself" link.
 *  `category` groups specials into their own homepage section (Trips,
 *  Cruises, ...) instead of one mixed list. */
export type TripBookingType = "self" | "brian";
export type TripCategory = "trip" | "cruise";

export interface TripSpecial {
  slug: string;
  category: TripCategory;
  vendor: string;
  destination: string;
  title: string;
  duration: string;
  fromPrice: number;
  discountPercent: number;
  image: string;
  bookingType: TripBookingType;
  /** Required when bookingType is "self" -- the real customer-facing
   *  checkout URL, already carrying Brian's affiliate/advisor id. */
  href?: string;
}

const EXOTICCA_ADVISOR_TOKEN = "brian-voyles-019a21e0-2339-7046-a141-9ecdc021d5e3";
const VV_PARAMS = "agencyId=589&agentId=235470&bookingChannel=FMLINK&currencyCode=USD";

export const tripSpecials: TripSpecial[] = [
  {
    slug: "punta-cana",
    category: "trip",
    vendor: "Exoticca",
    destination: "Dominican Republic",
    title: "All-Incl. Paradise in Punta Cana",
    duration: "5 days, 4 nights",
    fromPrice: 949,
    discountPercent: 40,
    image: "/assets/exoticca-trips/punta-cana-all-inclusive.jpg",
    bookingType: "self",
    href: `https://www.exoticca.com/us/beaches/america/13684-all-incl-paradise-in-punta-cana-5?advisor_token=${EXOTICCA_ADVISOR_TOKEN}`,
  },
  {
    slug: "italy",
    category: "trip",
    vendor: "Exoticca",
    destination: "Italy",
    title: "Escorted Eternal Cities",
    duration: "9 days",
    fromPrice: 1799,
    discountPercent: 35,
    image: "/assets/exoticca-trips/italy-escorted-eternal-cities.jpg",
    bookingType: "self",
    href: `https://www.exoticca.com/us/tours/europe/15644-escorted-eternal-cities?advisor_token=${EXOTICCA_ADVISOR_TOKEN}`,
  },
  {
    slug: "japan",
    category: "trip",
    vendor: "Exoticca",
    destination: "Japan",
    title: "A Taste of Japan: Tokyo, Kyoto & Osaka",
    duration: "9 days",
    fromPrice: 1899,
    discountPercent: 30,
    image: "/assets/exoticca-trips/japan-tokyo-kyoto-osaka.jpg",
    bookingType: "self",
    href: `https://www.exoticca.com/us/tours/asia/21202-a-taste-of-japan-tokyo-kyoto-osaka?advisor_token=${EXOTICCA_ADVISOR_TOKEN}`,
  },
  {
    slug: "dr-bimini",
    category: "cruise",
    vendor: "Virgin Voyages",
    destination: "Dominican Republic & Bimini",
    title: "Dominican Republic & Bimini Beach Club",
    duration: "5 nights",
    fromPrice: 595,
    discountPercent: 26,
    image: "/assets/virgin-voyages/beach-club-pool.jpg",
    bookingType: "self",
    href: `https://www.virginvoyages.com/book/voyage-planner/fullCruiseDetails?${VV_PARAMS}&packageCode=5NPP`,
  },
  {
    slug: "alaska",
    category: "cruise",
    vendor: "Virgin Voyages",
    destination: "Seattle to Vancouver",
    title: "Alaska: Seattle to Vancouver",
    duration: "8 nights",
    fromPrice: 2865,
    discountPercent: 33,
    image: "/assets/virgin-voyages/ship-exterior-1.jpg",
    bookingType: "self",
    href: `https://www.virginvoyages.com/book/voyage-planner/fullCruiseDetails?${VV_PARAMS}&packageCode=8NSABC`,
  },
  {
    slug: "eastern-caribbean-bimini",
    category: "cruise",
    vendor: "Virgin Voyages",
    destination: "Miami · Eastern Caribbean & Bimini",
    title: "Eastern Caribbean & Bimini Halloween",
    duration: "6 nights",
    fromPrice: 1134,
    discountPercent: 30,
    image: "/assets/virgin-voyages/beach-club-loungers.jpg",
    bookingType: "self",
    href: `https://www.virginvoyages.com/book/voyage-planner/fullCruiseDetails?${VV_PARAMS}&durations=6&packageCode=6NGT2`,
  },
];
