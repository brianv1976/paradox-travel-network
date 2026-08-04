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
  Airports: assets.img.airportConnection,
  Cruises: assets.img.cruise,
  Resorts: assets.img.resort,
  Planning: assets.img.planning,
  General: assets.img.beach,
};

export const getPostImage = (post: Post): string =>
  post.image ?? categoryImage[post.category];

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
      "The extra weight has a price tag, not just a wrinkle in your dignity. Most U.S. airlines cap checked bags around 50 pounds, and every pound past that gets billed separately. Overweight fees typically run $50 to $100 for a bag up to 20 pounds over the limit, and $150 to $200 or more once it climbs higher — Frontier's overweight fee alone jumped to $129 in 2026. A suitcase padded with two backup outfits and a just-in-case rain jacket is not a packing choice, it is a fee waiting to be discovered at the counter.",
      "Leave room for souvenirs, dirty-clothes organization, and the basic dignity of closing the suitcase without sitting on it.",
      "A bathroom scale at home takes thirty seconds and tells you exactly what the airline's scale will say later, in front of a line of people. Weigh the bag before you leave, not after an agent weighs it for you.",
    ],
    seoDescription:
      "Practical packing advice for lighter luggage, avoiding overweight baggage fees, repeatable outfits, and room for souvenirs.",
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
      "The risk is not hypothetical. A 30-minute delay on the inbound flight is enough to make roughly 40% of connecting passengers miss their next flight, and U.S. transportation data tied more than 127,000 missed domestic connections in a single quarter of 2025 to international arrivals running behind schedule. Airports do not leave a generous margin, either — official minimum connection times range from as little as 20 minutes at some airports to well over two hours anywhere immigration and customs are part of the route.",
      "A workable buffer looks closer to 90 minutes for a same-terminal domestic connection, two hours when connecting from an international arrival to a domestic flight, and two and a half to three hours anywhere customs is involved. The airline's published minimum is the legal floor, not a promise.",
      "A slightly longer layover can cost less than a missed flight, overnight hotel, and the fascinating emotional collapse that follows.",
    ],
    seoDescription:
      "How to choose realistic flight connection times based on minimum connection times, customs, terminals, and real delay data.",
    image: "/assets/Airport Connection Countdown 4-3 ratio.png",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "This holds even when the cruise line booked the flight. A common assumption is that the ship will wait for passengers on cruise-line-arranged air — it will not. Miss the cutoff and the standard outcome is a no-show flag, denied boarding, and a forfeited fare, with the traveler responsible for arranging and paying for their own way home. In rare cases a cruise line may help a passenger meet the ship at the next port, but it is never guaranteed, and depends on the itinerary, immigration requirements, and how quickly everyone involved can move.",
      "A hotel night can feel unnecessary until it becomes the cheapest insurance against watching the vacation depart from the pier.",
    ],
    seoDescription:
      "Why cruise travelers should arrive before embarkation day, and what actually happens if a flight delay causes a missed ship.",
    image: "/assets/Arrive before embarkation day.png",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
    featured: true,
  },
  {
    slug: "cheapest-flight-can-cost-more",
    title: "The Cheapest Flight Can Become the Most Expensive Bad Decision",
    category: "Airports",
    summary:
      "Compare bags, seats, airport location, connection risk, and schedule before deciding which fare is actually cheapest.",
    content: [
      "The first fare in the search results is only the starting number. Compare the trip you will actually buy: carry-on and checked-bag fees, seat selection, parking or rideshare, hotel and meal costs during a long layover, and transportation from a farther-out airport. U.S. airlines collected $7.4 billion in baggage fees in 2025 alone, according to the Bureau of Transportation Statistics, so those small extras are not exactly decorative.",
      "Then price the schedule itself. A lower fare can become more expensive when it requires a predawn departure, a distant airport, an overnight connection, a risky layover, or an arrival time that wipes out the first day of the trip. A ticket that saves $80 but adds $60 in fees, $40 in ground transportation, and half a vacation day did not save $80. It simply hid the rest of the bill.",
      "Look closely at how the itinerary is built. If separate tickets or a self-transfer are involved, confirm what happens to the second flight if the first one runs late. Compare connection times, terminal changes, baggage rules, and whether the schedule leaves any margin for the delays that show up on ordinary travel days.",
      "Families should also check seating rules instead of assuming the cheapest fare keeps everyone together. Only a handful of airlines currently guarantee fee-free family seating, and the Department of Transportation is actively working on a rule to ban seating fees that separate children from the adults traveling with them — which tells you how common the problem still is.",
      "Finally, know what happens if the airline changes the deal after purchase. When a flight is canceled or significantly changed and the passenger declines the new option, federal rules now require an automatic cash refund, issued without a form or a phone call. Fees for extras like seat selection or checked baggage must be refunded too, if the airline fails to deliver what was paid for.",
      "Compare the full door-to-door cost, the usable vacation time, and the risk built into the schedule. The cheapest flight is the one that is still cheapest after reality checks the receipt.",
    ],
    seoDescription:
      "How to compare total flight cost, including baggage fees, seats, connection risk, family seating rules, and refund protections.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 4,
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
      "Motion sensitivity is a real factor in that decision, not a superstition. The most stable part of a ship is low and midship, close to the vessel's center of gravity — cabins roughly in the middle third of the ship, on lower decks, feel meaningfully less rocking and swaying than cabins at the front, back, or top. Anyone prone to seasickness should treat that stretch of the deck plan as the starting point, not an afterthought, and book it early since those cabins are also the most requested.",
      "A beautiful cabin directly beneath the 6 a.m. chair-dragging championships may not feel like an upgrade.",
    ],
    seoDescription:
      "Why cruise cabin deck, location, motion sensitivity, nearby venues, and accessibility matter when choosing a room.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "\"All-inclusive\" is doing less work than it sounds like. Premium liquor, specialty restaurants, motorized watersports, spa treatments, and gratuities are commonly billed on top of the base rate — a specialty dinner alone can run $25 to $50 per person, and a single spa treatment can add another $80 to $300. A federal rule that took effect in 2025 now forces resorts to show mandatory fees in the advertised price, which helps, but optional upgrades and add-ons are still exactly as easy to get talked into as ever.",
      "The right resort is the one whose inclusions match the travelers, not the one with the longest list of things nobody planned to use.",
    ],
    seoDescription:
      "What to compare when choosing an all-inclusive resort, including hidden fees, dining, rooms, beaches, and transfers.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "A shared shuttle that stops at four other properties before yours can turn a \"forty-five minute transfer\" into two hours, and some destinations only run ferries or mountain roads on a schedule that has nothing to do with when your flight lands. Ask directly: is the transfer private or shared, is it on a fixed schedule, and what happens if the flight arrives after the last one leaves.",
      "A resort can be perfect and still be three hours away from the airport. Geography remains stubbornly unimpressed by marketing adjectives.",
    ],
    seoDescription:
      "How to evaluate real airport transfer time, shared shuttle stops, and arrival logistics before booking a resort.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "The most common trip-ending mistake is the six-month rule: many countries require a passport to stay valid for at least six months past the return date, and airline check-in counters enforce it just as strictly as border agents do, even when the passport is not technically expired. Renewing once there are twelve months of validity left, rather than waiting until it is nearly out, avoids the problem entirely.",
      "Processing time is the other piece to plan around. As of 2026, routine passport renewal runs four to six weeks and expedited service runs two to three weeks, and that window only counts time at a passport agency — add roughly a week on each end for mail. A trip booked eight weeks out is not a reason to panic, but it is a reason to start today instead of next month.",
      "Rules can change, so confirm them through official government and destination sources rather than relying on a screenshot from someone's cousin.",
    ],
    seoDescription:
      "A practical checklist for the passport six-month rule, renewal processing times, visas, and destination entry requirements.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "Occupancy limits are a fire-code rule, not a suggestion, and hotels do enforce them — a standard two-queen room is typically built for four people, full stop, no matter how well everyone gets along. A fifth person usually means a suite, a family room, or a connecting room, not a rollaway and good intentions. Some chains guarantee connecting rooms for families with more children than adults; it is worth asking for that specifically instead of hoping the front desk works it out at check-in.",
      "Family harmony improves when nobody learns at check-in that \"sleeps five\" means four beds and one negotiation.",
    ],
    seoDescription:
      "What families should confirm about hotel occupancy limits, connecting rooms, beds, bathrooms, and sleeping arrangements.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "Overscheduling is not a minor planning error, it is one of the most common ways a relaxing trip turns into a stressful one. Research on travel behavior links overly structured trips to higher stress and lower satisfaction — constantly rushing to check off a list of must-dos undercuts the actual restorative point of getting away. A trip built around two or three anchor activities a day, with everything else left optional, consistently beats a trip built around a spreadsheet.",
      "Seeing everything is not the same as enjoying anything. A vacation should contain memories, not only calendar entries.",
    ],
    seoDescription:
      "How to avoid vacation overscheduling and trip-planning stress by prioritizing key experiences and leaving room for rest.",
    author: "Brian Voyles",
    date: "2026-07-13",
    readingTime: 3,
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
      "A photo of the passport's information page, saved offline and also emailed to yourself, is the fastest way to start replacing it if it is lost or stolen abroad — a State Department replacement request asks for exactly that information first. The same logic applies to prescriptions, insurance cards, and the hotel confirmation with the address written in the local language, which matters more than it sounds like the moment a taxi driver is involved.",
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

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const featuredPosts = posts.filter((p) => p.featured);
