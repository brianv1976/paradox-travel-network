import { assets } from "../lib/assets";

export type Category =
  | "Packing"
  | "Airports"
  | "Cruises"
  | "Resorts"
  | "Planning"
  | "General";

export interface Post {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  content: string[];
  seoDescription: string;
  author: string;
  date: string; // ISO
  readingTime: number;
  featured: boolean;
  image?: string;
}

export const categoryImage: Record<Category, string> = {
  Packing: assets.img.planning,
  Airports: assets.img.localEscape,
  Cruises: assets.img.cruise,
  Resorts: assets.img.resort,
  Planning: assets.img.planning,
  General: assets.img.beach,
};

export const categories: Category[] = [
  "Packing",
  "Airports",
  "Cruises",
  "Resorts",
  "Planning",
  "General",
];

export const posts: Post[] = [
  {
    slug: "if-the-suitcase-needs-a-wrestling-match",
    title: "If the Suitcase Needs a Wrestling Match, You Packed Too Much",
    category: "Packing",
    summary:
      "Pack around repeatable outfits, real weather, and what cannot be replaced easily.",
    content: [
      "Start with the weather, the activities you will actually do, and a small group of clothes that work together. Shoes and bulky just-in-case items consume luggage faster than almost anything else.",
      "Leave room for souvenirs, dirty-clothes organization, and the basic dignity of closing the suitcase without sitting on it.",
    ],
    seoDescription:
      "Practical packing advice for lighter luggage, repeatable outfits, useful essentials, and room for souvenirs.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: true,
  },
  {
    slug: "six-minute-connection-is-a-dare",
    title: "A Six-Minute Connection Is Not an Itinerary. It Is a Dare.",
    category: "Airports",
    summary:
      "Connection time should account for airport size, terminals, customs, mobility, and delay risk.",
    content: [
      "The shortest connection is not automatically the best connection. Consider airport layout, terminal changes, security, customs, mobility, family travel, and what happens if the inbound flight is late.",
      "A slightly longer layover can cost less than a missed flight, overnight hotel, and the fascinating emotional collapse that follows.",
    ],
    seoDescription:
      "How to choose realistic flight connection times based on airport size, customs, terminals, mobility, and delay risk.",
    image: assets.img.airportConnection,
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: true,
  },
  {
    slug: "arrive-before-cruise-embarkation-day",
    title: "Arrive Before Embarkation Day When the Schedule Matters",
    category: "Cruises",
    summary:
      "Flying in before a cruise reduces the risk that one delay leaves the ship without you.",
    content: [
      "When practical, arrive in the embarkation city at least one day before the cruise. Weather, mechanical delays, baggage problems, and missed connections do not care what time the ship leaves.",
      "A hotel night can feel unnecessary until it becomes the cheapest insurance against watching the vacation depart from the pier.",
    ],
    seoDescription:
      "Why cruise travelers should consider arriving before embarkation day to reduce flight and baggage delay risks.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: true,
  },
  {
    slug: "cheapest-flight-can-cost-more",
    title: "The Cheapest Flight Can Become the Most Expensive Bad Decision",
    category: "Airports",
    summary:
      "Compare bags, seats, airport location, connection risk, and schedule before deciding which fare is actually cheapest.",
    content: [
      "Compare the complete trip cost, not only the first number in the search results. Bag fees, seat assignments, transportation to a distant airport, overnight connections, and a schedule that destroys the first vacation day all count.",
      "A lower fare is useful when it stays lower after reality arrives with its collection plate.",
    ],
    seoDescription:
      "How to compare total flight cost, including baggage, seats, airport location, connection risk, and schedule quality.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "cruise-cabin-location-matters",
    title: "Your Cruise Cabin Is a Room and Also a Location Decision",
    category: "Cruises",
    summary:
      "Cabin category, deck, nearby venues, motion, elevators, and accessibility can affect the entire sailing.",
    content: [
      "Do not choose a cruise cabin by category alone. Check the deck plan, nearby elevators, theaters, pools, kitchens, nightclubs, connecting doors, and the distance to the places you expect to use most.",
      "A beautiful cabin directly beneath the 6 a.m. chair-dragging championships may not feel like an upgrade.",
    ],
    seoDescription:
      "Why cruise cabin deck, location, nearby venues, motion, elevators, and accessibility matter when choosing a room.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "all-inclusive-does-not-mean-everything-matters",
    title: "All-Inclusive Does Not Mean Every Inclusion Matters to You",
    category: "Resorts",
    summary:
      "Compare dining, rooms, beach conditions, transfers, activities, and extra charges instead of stopping at the label.",
    content: [
      "Two all-inclusive resorts can offer completely different experiences. Compare atmosphere, food, room category, beach, pools, entertainment, transfers, premium areas, and what still costs extra.",
      "The right resort is the one whose inclusions match the travelers, not the one with the longest list of things nobody planned to use.",
    ],
    seoDescription:
      "What to compare when choosing an all-inclusive resort, including dining, rooms, beaches, transfers, and extra charges.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "check-resort-transfer-time",
    title: "The Resort Is Not Close Because the Brochure Used the Word Convenient",
    category: "Resorts",
    summary:
      "Check the actual airport transfer distance, route, transportation type, and arrival timing before choosing a resort.",
    content: [
      "Review the real transfer time from the airport to the resort, including traffic, shared stops, ferry schedules, mountain roads, and late-arrival limitations.",
      "A resort can be perfect and still be three hours away from the airport. Geography remains stubbornly unimpressed by marketing adjectives.",
    ],
    seoDescription:
      "How to evaluate airport transfer time, route, transportation type, and arrival logistics before booking a resort.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "check-passport-rules-early",
    title: "Check Passport Rules Before the Countdown Becomes Emotional",
    category: "Planning",
    summary:
      "Review expiration, name, blank-page, visa, and destination entry rules early in the planning process.",
    content: [
      "Check passport validity, exact traveler names, blank-page requirements, visas, and destination entry rules well before departure. Some destinations require validity beyond the return date.",
      "Rules can change, so confirm them through official government and destination sources rather than relying on a screenshot from someone’s cousin.",
    ],
    seoDescription:
      "A practical checklist for reviewing passport validity, names, visas, blank pages, and destination entry requirements early.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "family-room-layout-matters",
    title: "A Family Hotel Room Is Not Bigger Because Everyone Is Optimistic",
    category: "Planning",
    summary:
      "Confirm beds, bathrooms, privacy, connecting-room guarantees, storage, and sleeping arrangements before booking family lodging.",
    content: [
      "Check the actual sleeping setup, bed sizes, bathroom count, room capacity, storage, connecting-room policy, kitchen access, and whether a sofa bed is being asked to perform miracles.",
      "Family harmony improves when nobody learns at check-in that “sleeps five” means four beds and one negotiation.",
    ],
    seoDescription:
      "What families should confirm about beds, bathrooms, connecting rooms, privacy, storage, and sleeping arrangements.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "do-not-overschedule-the-vacation",
    title: "Do Not Schedule the Vacation Until It Feels Like Another Job",
    category: "General",
    summary:
      "Prioritize the experiences that matter and leave room for rest, weather, discovery, and reality.",
    content: [
      "Choose the experiences that matter most, then leave space around them. Travel time, meals, weather, fatigue, and unexpected discoveries all need room in the itinerary.",
      "Seeing everything is not the same as enjoying anything. A vacation should contain memories, not only calendar entries.",
    ],
    seoDescription:
      "How to avoid overplanning a vacation by prioritizing key experiences and leaving room for rest and flexibility.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
  {
    slug: "save-travel-documents-offline",
    title: "Save the Documents Before the Airport Wi-Fi Begins Its Rebellion",
    category: "General",
    summary:
      "Keep offline copies of confirmations, addresses, insurance details, and important contact information before departure.",
    content: [
      "Save important confirmations, addresses, transfer instructions, insurance information, emergency contacts, and document copies where they can be reached without cellular service or airport Wi-Fi.",
      "Keep sensitive records protected, and avoid storing full payment-card details unnecessarily. Technology is extremely confident until the exact moment it is needed.",
    ],
    seoDescription:
      "Why travelers should save protected offline copies of confirmations, addresses, insurance details, and important contacts.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: false,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const featuredPosts = posts.filter((p) => p.featured);
