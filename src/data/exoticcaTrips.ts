/** Hand-picked real Exoticca itineraries departing Dallas, refreshed
 *  periodically from the advisor portal (advisors.exoticca.com) — not a
 *  live price feed. Each href carries Brian's advisor_token so a booking
 *  is credited to him, same pattern as links.exoticca in lib/assets.ts. */
export interface ExoticcaTrip {
  slug: string;
  destination: string;
  title: string;
  duration: string;
  fromPrice: number;
  discountPercent: number;
  image: string;
  href: string;
}

const ADVISOR_TOKEN = "brian-voyles-019a21e0-2339-7046-a141-9ecdc021d5e3";

export const exoticcaTrips: ExoticcaTrip[] = [
  {
    slug: "punta-cana",
    destination: "Dominican Republic",
    title: "All-Incl. Paradise in Punta Cana",
    duration: "5 days, 4 nights",
    fromPrice: 949,
    discountPercent: 40,
    image: "/assets/exoticca-trips/punta-cana-all-inclusive.jpg",
    href: `https://www.exoticca.com/us/beaches/america/13684-all-incl-paradise-in-punta-cana-5?advisor_token=${ADVISOR_TOKEN}`,
  },
  {
    slug: "peru",
    destination: "Peru",
    title: "Sacred Land of the Incas",
    duration: "9 days",
    fromPrice: 1049,
    discountPercent: 60,
    image: "/assets/exoticca-trips/peru-sacred-land-incas.jpg",
    href: `https://www.exoticca.com/us/tours/america/7452-sacred-land-of-the-incas?advisor_token=${ADVISOR_TOKEN}`,
  },
  {
    slug: "japan",
    destination: "Japan",
    title: "A Taste of Japan: Tokyo, Kyoto & Osaka",
    duration: "9 days",
    fromPrice: 1899,
    discountPercent: 30,
    image: "/assets/exoticca-trips/japan-tokyo-kyoto-osaka.jpg",
    href: `https://www.exoticca.com/us/tours/asia/21202-a-taste-of-japan-tokyo-kyoto-osaka?advisor_token=${ADVISOR_TOKEN}`,
  },
];
