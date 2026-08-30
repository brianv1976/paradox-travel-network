import { assets, links } from "../lib/assets";

export interface Vendor {
  name: string;
  href: string;
  blurb: string;
}

export interface TriadItem {
  n: string;
  title: string;
  body: string;
}

export interface PillarCard {
  title: string;
  body: string;
}

export interface ServicePage {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  selfBookIntro: string;
  vendors: Vendor[];
  selfBookNote: string;
  fitTriad: { eyebrow: string; heading: string; items: TriadItem[] };
  checklist: {
    eyebrow: string;
    heading: string;
    items: string[];
    note: string;
  };
  pillars: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: PillarCard[];
  };
  closingHeading: string;
  closingBody: string;
  ctaLabel: string;
}

export const services: ServicePage[] = [
  {
    slug: "cruises",
    navLabel: "Cruises",
    metaTitle: "Cruise Travel Agent | Dallas–Fort Worth Advisor",
    metaDescription:
      "Work with a Dallas–Fort Worth-based cruise travel agent, serving travelers nationwide, to choose the right cruise line, ship, itinerary, and cabin for your next vacation.",
    eyebrow: "Cruise travel",
    h1: "The ship matters. So does everything around it.",
    intro:
      "The right sailing is more than a price and a balcony photo. Route, ship style, ports, timing, cabin location, and the people traveling all change the experience.",
    image: assets.img.cruise,
    imageAlt: "Cruise ship sailing on open water",
    selfBookIntro:
      "Looking to book it yourself? Here's where cruisers go to book the sailing itself, plus shore excursions:",
    vendors: [
      {
        name: "Virgin Voyages",
        href: links.virginVoyages,
        blurb:
          "Adults-only sailings with dining and Wi-Fi included; service gratuities are separate on current bookings.",
      },
      {
        name: "Shore Excursions Group",
        href: links.shoreExcursions,
        blurb:
          "Independent port-day tours and excursions with private, small-group, and standard options.",
      },
    ],
    selfBookNote:
      "Want Brian's take before you book? Just ask — he's happy to weigh in beforehand.",
    fitTriad: {
      eyebrow: "A better fit",
      heading: "Start with how the trip should feel.",
      items: [
        {
          n: "01",
          title: "Relaxed or active",
          body: "Some ships are built around quiet sea days. Others behave like floating neighborhoods with a scheduling problem.",
        },
        {
          n: "02",
          title: "Ports or ship experience",
          body: "The itinerary may be the point, or the ship may be the destination. Planning should know which one wins.",
        },
        {
          n: "03",
          title: "Couples, families, or friends",
          body: "The best option changes dramatically depending on who is traveling and what everyone expects onboard.",
        },
      ],
    },
    checklist: {
      eyebrow: "Details worth handling early",
      heading: "Avoid the expensive surprises.",
      items: [
        "Cabin location and category",
        "Arrival before embarkation day",
        "Flights and transfer timing",
        "Dining and drink-package value",
        "Port plans and excursion pace",
        "Documents and entry requirements",
      ],
      note: "Cruise planning is mostly a collection of small decisions that become very noticeable once the ship leaves without caring about anyone’s feelings.",
    },
    pillars: {
      eyebrow: "Where Paradox is developing deeper focus",
      heading: "Some cruise trips deserve more than a search box.",
      intro:
        "Brian is building deeper expertise in the cruise styles and destinations where matching the traveler to the right product matters most — including the milestone trips, anniversaries, and bucket-list vacations people have been planning for years.",
      cards: [
        {
          title: "Alaska",
          body: "Alaska is where “just book the cruise” stops being especially helpful. One-way or round-trip, Glacier Bay or another route, Seattle or Vancouver, three days on land or seven — the version matters almost as much as the destination.",
        },
        {
          title: "Europe & the Mediterranean",
          body: "In the Mediterranean, the ship can be the hotel with an excellent parking problem. The ports are usually the point, which makes itinerary, embarkation city, and what you do before and after the cruise matter a lot.",
        },
        {
          title: "River Cruising",
          body: "River cruising is not ocean cruising with the ship put in the dryer. Smaller vessels, destination-first days, frequent port access, and very different inclusion levels make line and itinerary matching especially important.",
        },
      ],
    },
    closingHeading: "Build the cruise around the travelers.",
    closingBody:
      "Share your dates, budget, destination ideas, who's traveling, and what would make the trip feel worth it — including if this is the milestone trip, anniversary, or bucket-list vacation you've been waiting to plan properly. You don't need to know the cruise line yet. That's one of the things we can work through together.",
    ctaLabel: "Start Cruise Planning",
  },
  {
    slug: "all-inclusive-resorts",
    navLabel: "All-Inclusive",
    metaTitle: "All-Inclusive Resort Planning | Dallas–Fort Worth Advisor",
    metaDescription:
      "Find the right all-inclusive resort with a Dallas–Fort Worth-based travel advisor, serving travelers nationwide, matching your budget, travel style, and vacation priorities.",
    eyebrow: "All-inclusive resorts",
    h1: "Easy should still fit the people traveling.",
    intro:
      "The right resort balances location, atmosphere, dining, room setup, beach, activities, and budget. “All-inclusive” is a category, not a personality.",
    image: assets.img.resort,
    imageAlt: "Tropical resort pool and coastal setting",
    selfBookIntro:
      "Looking to book it yourself? Here's a short list of good options for all-inclusive trips:",
    vendors: [
      {
        name: "Viator",
        href: links.viator,
        blurb: "Add-on tours and activities near your resort.",
      },
      {
        name: "Exoticca",
        href: links.exoticca,
        blurb:
          "Packaged trips combining flights, hotels, tours, and transfers; some itineraries also include meals or resort stays.",
      },
    ],
    selfBookNote:
      "Want Brian's take before you book? Just ask — he's happy to weigh in beforehand.",
    fitTriad: {
      eyebrow: "Find the right atmosphere",
      heading: "Relaxing means different things to different humans.",
      items: [
        {
          n: "01",
          title: "Quiet or lively",
          body: "A peaceful pool and an all-day party are both valid. They are simply terrible surprises when someone expected the other.",
        },
        {
          n: "02",
          title: "Adults-only or family-focused",
          body: "Room layouts, activities, dining hours, and the overall pace change depending on who the resort is built to serve.",
        },
        {
          n: "03",
          title: "Beach, food, or activities",
          body: "The strongest resort for one priority may be average at another. Rank what actually matters before choosing.",
        },
      ],
    },
    checklist: {
      eyebrow: "Check before booking",
      heading: "Included does not always mean important.",
      items: [
        "Airport transfer details",
        "Room category and bedding",
        "Restaurant reservations",
        "Beach and water conditions",
        "Kids clubs or adults-only zones",
        "Premium upgrades and exclusions",
      ],
      note: "A long inclusion list is impressive right up until none of it matches how the travelers plan to spend the week.",
    },
    pillars: {
      eyebrow: "Resort fit, decoded",
      heading: "“All included” is only useful when it includes what matters to you.",
      intro:
        "The best match lives where atmosphere, beach, dining, room style, and budget overlap—not where the longest amenity list wins.",
      cards: [
        {
          title: "Energy",
          body: "Lively, serene, adults-only, family-forward, or happily somewhere between.",
        },
        {
          title: "Flavor",
          body: "Dining variety, reservation rules, local character, and whether “gourmet” survives lunch.",
        },
        {
          title: "Shore",
          body: "Swimmable water, walkability, shade, and the beach conditions behind the brochure angle.",
        },
      ],
    },
    closingHeading: "Start with the experience, not the brochure.",
    closingBody:
      "Share the dates, travelers, destination ideas, budget, and the priorities that matter most.",
    ctaLabel: "Start Resort Planning",
  },
  {
    slug: "romance-travel",
    navLabel: "Romance",
    metaTitle: "Honeymoon Travel Agent | Dallas–Fort Worth Advisor",
    metaDescription:
      "Plan honeymoons, destination weddings, and romantic getaways with a Dallas–Fort Worth-based travel advisor serving couples nationwide, built around your style and budget.",
    eyebrow: "Romance and honeymoons",
    h1: "Romantic should feel like the two people taking the trip.",
    intro:
      "A meaningful trip can be quiet, adventurous, indulgent, simple, or several of those before lunch. The plan should fit the couple, not a generic luxury brochure.",
    image: assets.img.beach,
    imageAlt: "Tropical beach with clear water and white sand",
    selfBookIntro:
      "Looking to book it yourself? Here's a short list of good options for romantic getaways:",
    vendors: [
      {
        name: "Viator",
        href: links.viator,
        blurb: "Couples' excursions, private tours, and date-night experiences.",
      },
      {
        name: "Exoticca",
        href: links.exoticca,
        blurb:
          "Honeymoon and couples packages that can bundle flights, hotels, transfers, and guided experiences.",
      },
    ],
    selfBookNote:
      "Want Brian's take before you book? Just ask — he's happy to weigh in beforehand.",
    fitTriad: {
      eyebrow: "Start with the couple",
      heading: "Build around shared priorities.",
      items: [
        {
          n: "01",
          title: "Rest or exploration",
          body: "Some couples want a quiet beach. Others want a new city every day. Both are romantic when nobody is being dragged through the wrong vacation.",
        },
        {
          n: "02",
          title: "Privacy or energy",
          body: "The right atmosphere may be secluded and calm or social and lively. It should never be chosen by accident.",
        },
        {
          n: "03",
          title: "Meaningful upgrades",
          body: "Spend more where it changes the experience, not simply where the brochure has added a gold border.",
        },
      ],
    },
    checklist: {
      eyebrow: "Common trip types",
      heading: "Celebrate without copying everyone else.",
      items: [
        "Honeymoons",
        "Anniversary trips",
        "Proposal travel",
        "Couples resorts",
        "Romantic cruises",
        "Private guided escapes",
      ],
      note: "The goal is not to make the trip look romantic online. The goal is for the people taking it to actually enjoy being there.",
    },
    pillars: {
      eyebrow: "Designed around two people",
      heading: "Romantic is a feeling, not a preset package.",
      intro:
        "Honeymoons, anniversaries, and just-because escapes work best when the pace and place reflect your version of connection.",
      cards: [
        {
          title: "Quiet",
          body: "Private corners, slow mornings, and fewer reasons to check the time.",
        },
        {
          title: "Adventurous",
          body: "A little motion, a memorable story, and plans that feel like the two of you.",
        },
        {
          title: "Indulgent",
          body: "Beautiful details with purpose—not rose petals staging a hostile takeover.",
        },
      ],
    },
    closingHeading: "Share what would make the trip feel special.",
    closingBody:
      "Send the dates, budget, destination ideas, pace, and the experiences that matter most.",
    ctaLabel: "Start Romance Planning",
  },
  {
    slug: "family-travel",
    navLabel: "Family Travel",
    metaTitle: "Family Vacation Travel Agent | Dallas–Fort Worth",
    metaDescription:
      "A Dallas–Fort Worth-based family vacation planner serving travelers nationwide, balancing ages, interests, logistics, comfort, and budget for stress-free family trips.",
    eyebrow: "Family travel",
    h1: "A family trip should work for the family actually taking it.",
    intro:
      "Room setup, flight timing, food, naps, mobility, activities, and downtime matter more than a perfect schedule that collapses by the second afternoon.",
    image: assets.img.familyTravel,
    imageAlt: "Family enjoying a beach vacation together",
    selfBookIntro:
      "Looking to book it yourself? Here's a short list of good options for family trips:",
    vendors: [
      {
        name: "Viator",
        href: links.viator,
        blurb: "Family-friendly tours and activities at your destination.",
      },
      {
        name: "Exoticca",
        href: links.exoticca,
        blurb:
          "Family-friendly packages that can combine flights, hotels, transfers, tours, and local experiences.",
      },
    ],
    selfBookNote:
      "Want Brian's take before you book? Just ask — he's happy to weigh in beforehand.",
    fitTriad: {
      eyebrow: "Plan for real life",
      heading: "Comfort and pacing are part of the destination.",
      items: [
        {
          n: "01",
          title: "Room setup matters",
          body: "Beds, bathrooms, connecting rooms, kitchen access, and quiet space can matter more than another decorative lobby chandelier.",
        },
        {
          n: "02",
          title: "Travel days need mercy",
          body: "Reasonable flight times and manageable connections often improve the trip more than squeezing in one extra day.",
        },
        {
          n: "03",
          title: "Leave room for different ages",
          body: "The plan should include shared experiences without forcing toddlers, teenagers, parents, and grandparents into one energy level.",
        },
      ],
    },
    checklist: {
      eyebrow: "Possible directions",
      heading: "Choose the format that reduces friction.",
      items: [
        "Family resorts",
        "Multi-generational cruises",
        "Cabin and nature escapes",
        "Theme-park trips",
        "Guided family tours",
        "Beach vacations",
      ],
      note: "The best family itinerary is not the one with the most activities. It is the one everyone can still tolerate by the final day.",
    },
    pillars: {
      eyebrow: "Pace is the secret amenity",
      heading: "A good family itinerary has room for energy—and recovery.",
      intro:
        "The day should bend around real ages, real attention spans, and at least one person who insists they are not tired.",
      cards: [
        {
          title: "Morning — One clear win",
          body: "Start with the activity everyone will still talk about at dinner.",
        },
        {
          title: "Midday — Built-in breathing room",
          body: "Pool, snack, shade, nap, wandering—strategic nothing is still a plan.",
        },
        {
          title: "Evening — Flexible finish",
          body: "Keep a choice between one more memory and an early night.",
        },
      ],
    },
    closingHeading: "Share the ages, needs, budget, and pace.",
    closingBody:
      "Include room preferences, mobility considerations, destination ideas, and the activities everyone is most excited about.",
    ctaLabel: "Start Family Planning",
  },
  {
    slug: "adventure-guided-travel",
    navLabel: "Adventure",
    metaTitle: "Adventure & Guided Travel Planning | Dallas–Fort Worth",
    metaDescription:
      "Explore guided tours and adventure travel with a Dallas–Fort Worth-based advisor serving travelers nationwide, offering thoughtful pacing, support, and destination planning.",
    eyebrow: "Adventure and guided travel",
    h1: "See more without turning the trip into punishment.",
    intro:
      "Adventure can mean mountains, wildlife, culture, water, remote landscapes, or simply going somewhere unfamiliar with the logistics handled well.",
    image: assets.img.adventure,
    imageAlt: "Mountain adventure landscape",
    selfBookIntro:
      "Looking to book it yourself? Here's a short list of good options for adventure travel:",
    vendors: [
      {
        name: "Viator",
        href: links.viator,
        blurb: "Guided tours, outdoor excursions, and local adventure experiences.",
      },
      {
        name: "Exoticca",
        href: links.exoticca,
        blurb:
          "Packaged guided and self-guided trips that can combine flights, hotels, transfers, tours, and local experiences.",
      },
    ],
    selfBookNote:
      "Want Brian's take before you book? Just ask — he's happy to weigh in beforehand.",
    fitTriad: {
      eyebrow: "Match the pace",
      heading: "Adventure is not one difficulty setting.",
      items: [
        {
          n: "01",
          title: "Independent or guided",
          body: "Some travelers want freedom. Others want transportation, expertise, and someone else remembering which road leads back.",
        },
        {
          n: "02",
          title: "Active or immersive",
          body: "A trip can be physically demanding, culturally deep, scenic, wildlife-focused, or a practical mixture.",
        },
        {
          n: "03",
          title: "Comfort still matters",
          body: "The route, lodging, recovery time, and transportation should support the experience rather than sabotage it.",
        },
      ],
    },
    checklist: {
      eyebrow: "Possible experiences",
      heading: "Choose the challenge deliberately.",
      items: [
        "Guided small-group tours",
        "Hiking and scenic landscapes",
        "Wildlife and nature travel",
        "Cultural itineraries",
        "Water-based excursions",
        "Remote or unusual destinations",
      ],
      note: "A trip can push the comfort zone without making everyone regret owning knees.",
    },
    pillars: {
      eyebrow: "Choose your version of bold",
      heading: "Adventure and comfort can share an itinerary.",
      intro:
        "The right trip matches challenge, support, pace, and recovery. Nobody gets bonus points for pretending a sunrise hike is relaxing.",
      cards: [
        {
          title: "Comfort-led — Scenic, supported, spacious",
          body: "Immersion with gentler pacing, reliable logistics, and a good bed waiting.",
        },
        {
          title: "Balanced — Active days, easier edges",
          body: "A rewarding challenge with smart transfers, guides, and recovery built in.",
        },
        {
          title: "Challenge-led — More effort, more story",
          body: "Higher activity, purposeful discomfort, and support where it counts.",
        },
      ],
    },
    closingHeading: "Share the pace, interests, and limits.",
    closingBody:
      "Include activity preferences, comfort expectations, destination ideas, budget, and any mobility considerations.",
    ctaLabel: "Start Adventure Planning",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
