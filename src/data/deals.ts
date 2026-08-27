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
  },
];

export function getDeal(slug: string): Deal | undefined {
  return deals.find((d) => d.slug === slug);
}
