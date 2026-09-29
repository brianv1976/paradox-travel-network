/** A supplier promo referenced from a QR code, postcard, or social post —
 *  gives the scan somewhere real to land instead of a bare booking form. */
export interface Deal {
  slug: string;
  supplier: string;
  destination: string;
  tag: string; // e.g. "Sandals · Jamaica · Current Promotion"
  headline: string; // e.g. "Up to $1,500 instant credit + up to $350 air credit."
  image: string;
  summary: string;
  details: string[];
  disclaimer: string;
  ctaLabel: string;
  seoDescription: string;
  /** Human-readable booking deadline shown as a clear validity line, e.g.
   *  "September 7, 2026". Optional — set when the supplier gave one. */
  bookBy?: string;
  /** Where "back"/"see more" navigation on the deal page should point --
   *  set this when the deal is actually referenced from a specific page
   *  (e.g. a Postcards issue). Defaults to Home if omitted, since most
   *  deals are surfaced from the homepage Promos section instead. */
  backTo?: string;
  backLabel?: string;
}

export const deals: Deal[] = [
  {
    slug: "sandals-jamaica-instant-credit",
    supplier: "Sandals",
    destination: "Jamaica",
    tag: "Sandals · The Great Jamaica Comeback Sale",
    headline: "Up to $1,500 instant credit + up to $350 air credit.",
    image: "/assets/resort.jpg",
    summary:
      "Sandals' \"Great Jamaica Comeback Sale\" — real instant-credit and air-credit tiers across several Jamaica resorts.",
    details: [
      "The top tier — $1,500 instant credit plus $350 air credit — applies specifically to Sandals Ochi Rios, for stays of 10+ nights in Room Categories 4N1 or NG2, for travel January 1 – June 30, 2027.",
      "The sale actually spans eight Jamaica resorts, each with its own tier: Sandals South Coast, Sandals Caribbean Cay, Sandals Montego Bay, Sandals Ochi (standard rooms), Sandals Royal Plantation, and Sandals Dunn's River all offer up to $1,000 instant credit plus $350 air credit for 10+ night stays, scaling down for shorter trips (3–9 nights).",
      "Every resort in the sale also includes a free excursion for two — a bamboo river rafting trip, a waterfall tour, or a catamaran cruise, depending on which resort you book — reserved on arrival at the resort's Island Routes tour desk.",
      "Bookings must be made by September 7, 2026 to qualify. Air credit requires flights booked directly through Sandals for at least 5 paid nights, for bookings with two adults and two paid tickets.",
      "Brian confirms the exact tier for your dates, resort, and room category before booking — the numbers above vary by resort and stay length, not a flat rate for every trip.",
    ],
    disclaimer:
      "Offer subject to Sandals' current terms, availability, and eligibility rules, and varies by resort, room category, and stay length. Paradox Travel Network verifies the live offer details with Brian before booking — nothing here is a guaranteed rate for every trip.",
    ctaLabel: "Plan With Brian",
    seoDescription:
      "Sandals' Great Jamaica Comeback Sale offers up to $1,500 instant credit plus up to $350 air credit on qualifying Jamaica resort stays. Ask Brian to confirm your resort, dates, and tier.",
    bookBy: "September 7, 2026",
    backTo: "/postcards/issue-01",
    backLabel: "Back to Postcards",
  },
  {
    slug: "vacation-express-st-lucia-grand-romance",
    supplier: "Vacation Express",
    destination: "Saint Lucia",
    tag: "Vacation Express · Grand Romance Package",
    headline: "Up to $1,200 in added value for 7-night+ stays.",
    image: "/assets/vacation-express/saint-lucia-serenity/main.jpg",
    summary:
      "An adults-only, all-inclusive escape at Serenity at Coconut Bay Beach Resort & Spa in Saint Lucia, with a real added-value package for longer stays.",
    details: [
      "Serenity at Coconut Bay is an adults-only, all-inclusive resort in Vieux Fort, Saint Lucia, with 36 plunge-pool suites, private butler service, 24-hour room service, and access to all restaurants and facilities at the neighboring Coconut Bay Beach Resort & Spa.",
      "The Grand Romance Package adds up to $1,200 in value for stays of 7 nights or more: an in-suite couples massage, a private island tour, a catamaran sunset cruise, and a private pool-and-beach cabana, on top of the butler service already included with every suite.",
      "Airport transfers to and from Hewanorra International Airport (UVF) — about 5 minutes from the resort — are included in the all-inclusive rate.",
      "Book by October 31, 2026 for travel between now and June 30, 2027. The resort itself is closed August 30 – October 16, 2026, so that window isn't available regardless of the booking deadline.",
      "Brian confirms the exact package, room category, and current pricing for your dates before booking — added-value packages like this vary by stay length and can change without notice.",
    ],
    disclaimer:
      "Offer subject to Vacation Express's and Serenity at Coconut Bay's current terms, availability, and eligibility rules. Saint Lucia's Tourism Levy ($6 per person, per night for adults 18+) is collected at check-in and is not included in the package value. Paradox Travel Network verifies the live offer details with Brian before booking — nothing here is a guaranteed rate for every trip.",
    ctaLabel: "Plan With Brian",
    seoDescription:
      "Serenity at Coconut Bay Beach Resort & Spa's Grand Romance Package offers up to $1,200 in added value for 7-night+ stays in Saint Lucia. Ask Brian to confirm your dates and package.",
    bookBy: "October 31, 2026",
  },
];

export function getDeal(slug: string): Deal | undefined {
  return deals.find((d) => d.slug === slug);
}
