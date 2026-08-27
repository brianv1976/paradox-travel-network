import { assets } from "../lib/assets";

/** Primary, visitor-facing organization — what a card's type badge shows
 *  and what the page's top-level filters group by. */
export type ContentType = "Destination Spotlight" | "Travel News" | "Travel Tip";

export const contentTypes: ContentType[] = [
  "Destination Spotlight",
  "Travel News",
  "Travel Tip",
];

/** Fallback hero/card art when a post has no `category` (a Destination
 *  Spotlight or Travel News post may not have one) and no explicit image. */
export const contentTypeImage: Record<ContentType, string> = {
  "Destination Spotlight": assets.img.beach,
  "Travel News": assets.img.airportConnection,
  "Travel Tip": assets.img.planning,
};

/** The original tip categories — kept as an optional secondary topic
 *  rather than the primary organization (see ContentType above). */
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
  contentType: ContentType;
  category?: Category;
  /** Which service-page slug(s) this post is genuinely useful supporting
   *  content for (e.g. "cruises", "family-travel") — drives the "Helpful
   *  Guides" section on ServicePage.tsx. Deliberately curated per post, not
   *  auto-derived from `category` (which serves a different, blog-only
   *  purpose) — leave unset rather than force a weak match. Most posts have
   *  none; that's correct, not a bug, until more genre-specific content
   *  exists. */
  genres?: string[];
  summary: string;
  content: string[];
  seoDescription: string;
  author: string;
  date: string; // ISO, publication date
  updatedDate?: string; // ISO — set when a Travel News post gets refreshed
  readingTime: number;
  featured: boolean;
  image?: string;
  /** Card-specific crop, if it should differ from the hero image. */
  cardImage?: string;
  ctaLabel?: string;
  ctaTo?: string;
  /** Primary-source citations for posts that make specific regulatory or
   *  statistical claims -- deliberately not on every post. Rendered as a
   *  quiet "Sources & Further Reading" block at the bottom of the article. */
  sources?: { label: string; href: string }[];
  /** Flags a Travel News post whose facts are expected to age — the page
   *  affordance is just showing the date prominently, not auto-expiring it. */
  timeSensitive?: boolean;
  /** Unpublished layout-testing placeholder — never shown outside dev. */
  draft?: boolean;
}

export const categoryImage: Record<Category, string> = {
  Packing: assets.img.planning,
  Airports: assets.img.airportConnection,
  Cruises: assets.img.cruise,
  Resorts: assets.img.resort,
  // Distinct from Packing's assets.img.planning — three published posts
  // (one Packing, two Planning) were otherwise showing the identical photo.
  Planning: assets.img.localGuide,
  General: assets.img.beach,
};

export const getPostImage = (post: Post): string =>
  post.image ?? (post.category ? categoryImage[post.category] : contentTypeImage[post.contentType]);

export const getCardImage = (post: Post): string => post.cardImage ?? getPostImage(post);

export const getPostCTA = (post: Post): { label: string; to: string } | null => {
  if (post.ctaLabel && post.ctaTo) return { label: post.ctaLabel, to: post.ctaTo };
  if (post.contentType === "Destination Spotlight") {
    return { label: "Plan This Trip With Brian", to: "/plan-my-trip" };
  }
  return null;
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
    slug: "jamaica-keeps-getting-easier-from-dfw",
    contentType: "Travel News",
    title: "Jamaica Keeps Getting Easier to Reach From DFW",
    summary:
      "American is currently selling Dallas Fort Worth to Montego Bay itineraries for fall 2026 while Jamaica's main tourism gateway continues adding international connectivity.",
    content: [
      "For North Texas travelers, Jamaica remains one of the Caribbean's easier escapes to put on the short list. American Airlines is currently selling Dallas Fort Worth to Montego Bay itineraries for fall 2026, keeping a straightforward Jamaica option in reach from DFW.",
      "At the same time, Sangster International Airport in Montego Bay has continued expanding its international network in 2026, including new direct service to Medellín and Guadeloupe. Those routes are not about getting Texans to Jamaica, but they do show a tourism gateway that is still broadening its reach rather than standing still.",
      "What this means for you: Jamaica does not need a 'hidden gem' makeover to be interesting. From Dallas, it is already practical to compare against other Caribbean beach trips, and the island's air-access story keeps getting stronger.",
    ],
    seoDescription:
      "Why Jamaica remains a practical Caribbean option from Dallas Fort Worth, with current DFW-Montego Bay itineraries and continued air-service growth at Sangster International Airport.",
    image: "/assets/beach.jpg",
    author: "Brian Voyles",
    date: "2026-08-26",
    readingTime: 2,
    featured: true,
    timeSensitive: true,
    sources: [
      {
        label: "American Airlines — Dallas Fort Worth to Montego Bay",
        href: "https://www.aa.com/en-us/flights-from-dallas-to-montego-bay",
      },
      {
        label: "Sangster International Airport — News Releases",
        href: "https://www.mbjairport.com/news-releases",
      },
      {
        label: "Jamaica Tourist Board — Unrestricted Use Image Library",
        href: "https://www.jtbonline.org/download-category/unrestricted-use-images/",
      },
    ],
  },
  {
    slug: "if-the-suitcase-needs-a-wrestling-match",
    contentType: "Travel Tip",
    title: "If the Suitcase Needs a Wrestling Match, You Packed Too Much",
    category: "Packing",
    summary:
      "Pack around repeatable outfits, real weather, and what cannot be replaced easily.",
    content: [
      "Start with the weather, the activities you will actually do, and a small group of clothes that work together. Shoes and bulky just-in-case items consume luggage faster than almost anything else.",
      "The extra weight has a price tag, not just a wrinkle in your dignity. Most U.S. airlines cap checked bags around 50 pounds, and every pound past that gets billed separately, cheerfully, at the counter. Frontier, for example, charges $75 for a bag that lands 41 to 50 pounds and $129 once it crosses into the 51-to-99.99-pound range — a lot to pay for the privilege of packing indecisively. A suitcase padded with two backup outfits and a just-in-case rain jacket is not a packing choice, it is a fee waiting to introduce itself.",
      "Leave room for souvenirs, dirty-clothes organization, and the basic dignity of closing the suitcase without sitting on it.",
      "A bathroom scale at home takes thirty seconds and tells you exactly what the airline's scale will say later, in front of a line of people. Weigh the bag before you leave, not after an agent weighs it for you.",
    ],
    seoDescription:
      "Practical packing advice for lighter luggage, avoiding overweight baggage fees, repeatable outfits, and room for souvenirs.",
    image: "/assets/If your suitcase needs a wrestling match.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 2,
    featured: true,
    sources: [
      { label: "Frontier Airlines — Optional Services (baggage fees)", href: "https://www.flyfrontier.com/optional-services" },
    ],
  },
  {
    slug: "six-minute-connection-is-a-dare",
    contentType: "Travel Tip",
    title: "A Six-Minute Connection Is Not an Itinerary. It Is a Dare.",
    category: "Airports",
    summary:
      "Connection time should account for airport size, terminals, customs, mobility, and delay risk.",
    content: [
      "The shortest connection is not automatically the best connection. Consider airport layout, terminal changes, security, customs, mobility, family travel, and what happens if the inbound flight is late.",
      "Minimum connection times are real industry standards, not comfort margins. IATA defines a minimum connecting time as the official shortest interval an airport allows to transfer a passenger and their luggage between flights, and it varies by airport, airline, terminal, connection type, and whether customs and immigration are involved — official minimums range from a brisk 20-some minutes at some airports to well over two hours anywhere a border gets a vote.",
      "Brian's own planning buffer runs more conservative than the legal floor: closer to 90 minutes for a same-terminal domestic connection, two hours from an international arrival into a domestic flight, and two and a half to three hours anywhere customs is involved. That is professional judgment, not an official minimum — the airline's published number is the shortest interval allowed, not a promise, and no one from the airline will be jogging alongside you to close the gap.",
      "A slightly longer layover can cost less than a missed flight, overnight hotel, and the fascinating emotional collapse that follows.",
    ],
    seoDescription:
      "How to choose realistic flight connection times based on minimum connection times, customs, terminals, and real delay data.",
    image: "/assets/Airport Connection Countdown 4-3 ratio.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: true,
    sources: [
      { label: "IATA — Minimum Connecting Time standard", href: "https://www.iata.org/en/publications/manuals/station-standard-minimum-connecting-time-mct/" },
      { label: "OAG — Minimum Connection Times explained", href: "https://www.oag.com/minimum-connection-times" },
    ],
  },
  {
    slug: "arrive-before-cruise-embarkation-day",
    contentType: "Travel Tip",
    title: "Arrive Before Embarkation Day When the Schedule Matters",
    category: "Cruises",
    genres: ["cruises"],
    summary:
      "Flying in before a cruise reduces the risk that one delay leaves the ship without you.",
    content: [
      "When practical, arrive in the embarkation city at least one day before the cruise. Weather, mechanical delays, baggage problems, and missed connections do not care what time the ship leaves.",
      "This holds even when the cruise line booked the flight. A common assumption is that the ship will wait for passengers on cruise-line-arranged air — it generally will not. Ships run on a schedule, not a search party. If you miss embarkation, what happens next depends on the cruise line, the itinerary, your documentation, how the airfare was arranged, and whether you bought travel protection: you may need to arrange and pay your own way to meet the ship at a later permissible port, or you may miss the sailing entirely. Royal Caribbean, for one, explicitly recommends arriving the day before and says a traveler who misses embarkation due to travel delays may in some circumstances be able to join at a later port — usually at their own expense, never guaranteed.",
      "A hotel night can feel unnecessary until it becomes the cheapest insurance against watching the vacation depart from the pier.",
    ],
    seoDescription:
      "Why cruise travelers should arrive before embarkation day, and what actually happens if a flight delay causes a missed ship.",
    image: "/assets/Arrive before embarkation day.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: true,
    ctaLabel: "See the Cruise Travel Guide",
    ctaTo: "/cruises",
    sources: [
      { label: "Royal Caribbean — What if I miss my ship's departure time?", href: "https://www.royalcaribbean.com/faq/questions/miss-departure-time" },
    ],
  },
  {
    slug: "cheapest-flight-can-cost-more",
    contentType: "Travel Tip",
    title: "The Cheapest Flight Can Become the Most Expensive Bad Decision",
    category: "Airports",
    summary:
      "Compare bags, seats, airport location, connection risk, and schedule before deciding which fare is actually cheapest.",
    content: [
      "The first fare in the search results is only the starting number. Compare the trip you will actually buy: carry-on and checked-bag fees, seat selection, parking or rideshare, hotel and meal costs during a long layover, and transportation from a farther-out airport. U.S. airlines collected $7.4 billion in baggage fees in 2025 alone, according to the Bureau of Transportation Statistics, so those small extras are not exactly decorative.",
      "Then price the schedule itself. A lower fare can become more expensive when it requires a predawn departure, a distant airport, an overnight connection, a risky layover, or an arrival time that wipes out the first day of the trip. A ticket that saves $80 but adds $60 in fees, $40 in ground transportation, and half a vacation day did not save $80. It simply hid the rest of the bill.",
      "Look closely at how the itinerary is built. If separate tickets or a self-transfer are involved, confirm what happens to the second flight if the first one runs late. Compare connection times, terminal changes, baggage rules, and whether the schedule leaves any margin for the delays that show up on ordinary travel days.",
      "Families should also check seating rules instead of assuming the cheapest fare keeps everyone together. Several airlines now guarantee adjacent seating for young children and an accompanying adult at no additional cost, while others still do not — and a federal rule that would require it industry-wide remains proposed, not final, which tells you exactly how often a parent has landed to find their seven-year-old assigned a middle seat, solo, three rows back, among strangers.",
      "Finally, know what happens if the airline changes the deal after purchase. When a flight is canceled or significantly changed and the passenger declines the new option, federal rules now require an automatic cash refund, issued without a form, a phone call, or a hold-music tour of a call center. Fees for extras like seat selection or checked baggage must be refunded too, if the airline fails to deliver what was paid for.",
      "Compare the full door-to-door cost, the usable vacation time, and the risk built into the schedule. The cheapest flight is the one that is still cheapest after reality checks the receipt.",
    ],
    seoDescription:
      "How to compare total flight cost, including baggage fees, seats, connection risk, family seating rules, and refund protections.",
    image: "/assets/The cheapest flight can become the most expensive.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 4,
    featured: false,
    sources: [
      { label: "Bureau of Transportation Statistics — 2025 airline financial data", href: "https://www.bts.gov/newsroom/us-airlines-profited-60-billion-2025-decrease-over-2024" },
      { label: "DOT — Automatic Refund Rule for flight cancellations/changes", href: "https://www.transportation.gov/airconsumer/refundsfinalruleapril2024" },
      { label: "DOT — Airline Family Seating Dashboard", href: "https://www.transportation.gov/airconsumer/airline-family-seating-dashboard" },
    ],
  },
  {
    slug: "cruise-cabin-location-matters",
    contentType: "Travel Tip",
    title: "Your Cruise Cabin Is a Room and Also a Location Decision",
    category: "Cruises",
    genres: ["cruises"],
    summary:
      "Cabin category, deck, nearby venues, motion, elevators, and accessibility can affect the entire sailing.",
    content: [
      "Do not choose a cruise cabin by category alone. Check the deck plan, nearby elevators, theaters, pools, kitchens, nightclubs, connecting doors, and the distance to the places you expect to use most.",
      "Motion sensitivity is a real factor in that decision, not a superstition. Travelers who are sensitive to motion generally do better away from the parts of the ship that move the most — health guidance for cruise travelers specifically calls out avoiding locations of maximum motion, like the bow. Midship cabins, particularly on lower decks, are commonly preferred for that reason; cabins at the front, back, or top can pitch like a mechanical bull with an ocean view. Anyone prone to seasickness should treat that stretch of the deck plan as the starting point, not an afterthought, and book it early, since everyone else who has ever been seasick had this same idea first.",
      "A beautiful cabin directly beneath the 6 a.m. chair-dragging championships may not feel like an upgrade.",
    ],
    seoDescription:
      "Why cruise cabin deck, location, motion sensitivity, nearby venues, and accessibility matter when choosing a room.",
    image: "/assets/Your Cruise Cabin.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
    ctaLabel: "See the Cruise Travel Guide",
    ctaTo: "/cruises",
    sources: [
      { label: "CDC Yellow Book — Motion Sickness", href: "https://www.cdc.gov/yellow-book/hcp/travel-air-sea/motion-sickness.html" },
    ],
  },
  {
    slug: "all-inclusive-does-not-mean-everything-matters",
    contentType: "Travel Tip",
    title: "All-Inclusive Does Not Mean Every Inclusion Matters to You",
    category: "Resorts",
    genres: ["all-inclusive-resorts"],
    summary:
      "Compare dining, rooms, beach conditions, transfers, activities, and extra charges instead of stopping at the label.",
    content: [
      "Two all-inclusive resorts can offer completely different experiences. Compare atmosphere, food, room category, beach, pools, entertainment, transfers, premium areas, and what still costs extra.",
      "\"All-inclusive\" is doing less work than it sounds like. Premium liquor, specialty restaurants, motorized watersports, spa treatments, and gratuities are commonly billed on top of the base rate — optional specialty dining, premium drinks, spa treatments, excursions, and other upgrades can still increase the final cost substantially. A federal rule effective in 2025 requires businesses advertising covered short-term lodging to disclose the total price including mandatory fees upfront, which helps, but optional upgrades and add-ons remain exactly as easy to get talked into as ever, usually by someone extremely pleasant holding a clipboard.",
      "The right resort is the one whose inclusions match the travelers, not the one with the longest list of things nobody planned to use.",
    ],
    seoDescription:
      "What to compare when choosing an all-inclusive resort, including hidden fees, dining, rooms, beaches, and transfers.",
    image: "/assets/All Inclusive Does not mean.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
    ctaLabel: "See the All-Inclusive Guide",
    ctaTo: "/all-inclusive-resorts",
    sources: [
      { label: "FTC — Rule on Unfair or Deceptive Fees (FAQ)", href: "https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" },
    ],
  },
  {
    slug: "check-resort-transfer-time",
    contentType: "Travel Tip",
    title: "The Resort Is Not Close Because the Brochure Used the Word Convenient",
    category: "Resorts",
    genres: ["all-inclusive-resorts"],
    summary:
      "Check the actual airport transfer distance, route, transportation type, and arrival timing before choosing a resort.",
    content: [
      "Review the real transfer time from the airport to the resort, including traffic, shared stops, ferry schedules, mountain roads, and late-arrival limitations.",
      "A shared shuttle that stops at four other properties before yours can turn a \"forty-five minute transfer\" into a two-hour tour of resorts you are not staying at, and some destinations only run ferries or mountain roads on a schedule that has nothing to do with when your flight lands. Ask directly: is the transfer private or shared, is it on a fixed schedule, and what happens if the flight arrives after the last one leaves.",
      "A resort can be perfect and still be three hours away from the airport. Geography remains stubbornly unimpressed by marketing adjectives.",
    ],
    seoDescription:
      "How to evaluate real airport transfer time, shared shuttle stops, and arrival logistics before booking a resort.",
    image: "/assets/The Resort Is Not Close.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
    ctaLabel: "See the All-Inclusive Guide",
    ctaTo: "/all-inclusive-resorts",
  },
  {
    slug: "check-passport-rules-early",
    contentType: "Travel Tip",
    title: "Check Passport Rules Before the Countdown Becomes Emotional",
    category: "Planning",
    summary:
      "Review expiration, name, blank-page, visa, and destination entry rules early in the planning process.",
    content: [
      "Check passport validity, exact traveler names, blank-page requirements, visas, and destination entry rules well before departure. Some destinations require validity beyond the return date.",
      "One of the easiest passport problems to miss is the six-month rule: many countries require a passport to stay valid for at least six months past the return date, and airline check-in counters enforce it just as strictly as border agents do, even when the passport is not technically expired — a distinction the gate agent will not find nearly as interesting as you do. If international travel is likely, checking validity when you're within about a year of expiration gives you plenty of room to renew before the rule becomes a problem.",
      "Processing time is the other piece to plan around. As of 2026, routine passport renewal runs four to six weeks and expedited service runs two to three weeks, and that window only counts time at a passport agency — the State Department says to plan for up to two additional weeks for your application to arrive, and up to two more weeks for the finished passport to reach you afterward. A trip booked eight weeks out is not a reason to panic, but it is a reason to start today, before \"next month\" turns into a very specific kind of regret.",
      "Rules can change, so confirm them through official government and destination sources rather than relying on a screenshot from someone's cousin.",
    ],
    seoDescription:
      "A practical checklist for the passport six-month rule, renewal processing times, visas, and destination entry requirements.",
    image: "/assets/Check Passport Rules.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
    sources: [
      { label: "U.S. State Department — Passport FAQ", href: "https://travel.state.gov/en/passports/contact-support/faq.html" },
      { label: "U.S. State Department — Passport Processing Times", href: "https://travel.state.gov/en/passports/apply/help/processing-time.html" },
    ],
  },
  {
    slug: "family-room-layout-matters",
    contentType: "Travel Tip",
    title: "A Family Hotel Room Is Not Bigger Because Everyone Is Optimistic",
    category: "Planning",
    genres: ["family-travel"],
    summary:
      "Confirm beds, bathrooms, privacy, connecting-room guarantees, storage, and sleeping arrangements before booking family lodging.",
    content: [
      "Check the actual sleeping setup, bed sizes, bathroom count, room capacity, storage, connecting-room policy, kitchen access, and whether a sofa bed is being asked to perform miracles.",
      "Occupancy limits are a fire-code rule, not a suggestion, and hotels do enforce them — a standard two-queen room is typically built for four people, full stop, no matter how well everyone gets along. A fifth person usually means a suite, a family room, or a connecting room, not a rollaway and good intentions, however abundant the good intentions. Some chains guarantee connecting rooms for families with more children than adults; it is worth asking for that specifically instead of hoping the front desk improvises a miracle at check-in.",
      "Family harmony improves when nobody learns at check-in that \"sleeps five\" means four beds and one negotiation.",
    ],
    seoDescription:
      "What families should confirm about hotel occupancy limits, connecting rooms, beds, bathrooms, and sleeping arrangements.",
    image: "/assets/A Family Hotel Room.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
    ctaLabel: "See the Family Travel Guide",
    ctaTo: "/family-travel",
  },
  {
    slug: "do-not-overschedule-the-vacation",
    contentType: "Travel Tip",
    title: "Do Not Schedule Your Vacation So Tightly That It Feels Like Another Job",
    category: "General",
    summary:
      "Prioritize the experiences that matter and leave room for rest, weather, discovery, and reality.",
    content: [
      "Choose the experiences that matter most, then leave space around them. Travel time, meals, weather, fatigue, and unexpected discoveries all need room in the itinerary.",
      "Overscheduling is not a minor planning error, it is one of the most common ways a relaxing trip turns into a stressful one. Research on travel behavior links overly structured trips to higher stress and lower satisfaction — constantly rushing to check off a list of must-dos undercuts the entire, expensive point of getting away in the first place. A trip built around two or three anchor activities a day, with everything else left optional, consistently beats a trip built around a spreadsheet, which was never relaxing to begin with.",
      "Seeing everything is not the same as enjoying anything. A vacation should contain memories, not only calendar entries.",
    ],
    seoDescription:
      "How to avoid vacation overscheduling and trip-planning stress by prioritizing key experiences and leaving room for rest.",
    image: "/assets/Do Not Schedule Your Vacation.webp",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
  },
  {
    slug: "save-travel-documents-offline",
    contentType: "Travel Tip",
    title: "Save the Documents Before the Airport Wi-Fi Begins Its Rebellion",
    category: "Airports",
    summary:
      "Keep offline copies of confirmations, addresses, insurance details, and important contact information before departure.",
    content: [
      "Save important confirmations, addresses, transfer instructions, insurance information, emergency contacts, and document copies where they can be reached without cellular service or airport Wi-Fi.",
      "A photo of the passport's information page, saved offline and also emailed to yourself, is the fastest way to start replacing it if it is lost or stolen abroad — a State Department replacement request asks for exactly that information first, not your best recollection of the number. The same logic applies to prescriptions, insurance cards, and the hotel confirmation with the address written in the local language, which matters more than it sounds like the moment a taxi driver is involved and everyone is pointing at a phone with 2% battery.",
      "Keep sensitive records protected, and avoid storing full payment-card details unnecessarily. Technology is extremely confident until the exact moment it is needed.",
    ],
    seoDescription:
      "Why travelers should save protected offline copies of passports, confirmations, insurance details, and emergency contacts.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: false,
  },
];

/** `posts` includes drafts (for local layout testing); everything the site
 *  actually shows visitors should go through this instead. */
export const publishedPosts = posts.filter((p) => !p.draft);

/** The Postcards hub intentionally launches small: one current destination
 *  spotlight plus the original packing tip. The rest of the existing tip
 *  library stays published at its direct URLs and available to service-page
 *  helpers, but is held back from the hub so future issues can release those
 *  pieces gradually instead of dumping the whole archive on day one. */
const HUB_LAUNCH_TIP_SLUG = "if-the-suitcase-needs-a-wrestling-match";
export const postcardsHubPosts = publishedPosts.filter(
  (p) =>
    p.contentType !== "Travel Tip" ||
    p.slug === HUB_LAUNCH_TIP_SLUG
);
export const postcardsHubFeaturedPosts = postcardsHubPosts.filter(
  (p) => p.featured
);

export const getPost = (slug: string) => {
  const post = posts.find((p) => p.slug === slug);
  return post && !post.draft ? post : undefined;
};
export const featuredPosts = publishedPosts.filter((p) => p.featured);

/** Posts curated as genuinely useful supporting content for a given service
 *  page's genre slug. Returns an empty array for genres with no matching
 *  content yet (e.g. romance-travel, adventure-guided-travel) — that's
 *  correct and expected, not a bug to work around. */
export const getPostsForGenre = (genreSlug: string): Post[] =>
  publishedPosts.filter((p) => p.genres?.includes(genreSlug));
