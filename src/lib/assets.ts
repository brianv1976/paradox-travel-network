/**
 * Central asset + link registry.
 *
 * All images are now self-hosted in /public/assets/ — no Webflow CDN dependency.
 * Safe to cancel Webflow subscription.
 *
 * LINKS: Affiliate + scheduling links are backend-tracked. Do not alter the
 * query params — they carry Brian's referral / tracking IDs.
 */

export const assets = {
  logo: "/Web Logo.png",
  headshot: "/assets/Headshot.png",
  halfBody: "/assets/Half body Shot.jpg",
  portrait: "/assets/portrait.jpg",
  img: {
    cruise: "/assets/cruise.jpg",
    resort: "/assets/resort.jpg",
    beach: "/assets/beach.jpg",
    adventure: "/assets/adventure.jpg",
    familyTravel:
      "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1600",
    airportConnection:
      "https://images.pexels.com/photos/12717357/pexels-photo-12717357.jpeg?auto=compress&cs=tinysrgb&w=1600",
    multiDayTrek:
      "https://images.pexels.com/photos/34833709/pexels-photo-34833709.jpeg?auto=compress&cs=tinysrgb&w=1600",
    localGuide:
      "https://images.pexels.com/photos/36465268/pexels-photo-36465268.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cruiseTender:
      "https://images.pexels.com/photos/745737/pexels-photo-745737.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // Replaces the corrupted local planning.jpg (truncated at 512KB).
    planning:
      "https://images.pexels.com/photos/7010194/pexels-photo-7010194.jpeg?auto=compress&cs=tinysrgb&w=1600",
    desertSafari:
      "https://images.pexels.com/photos/2867769/pexels-photo-2867769.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  // Virgin Voyages First Mate marketing library (agent-usable assets),
  // sourced 2026-08-07. Self-hosted, not hotlinked from Canto.
  virginVoyages: {
    shipExterior: "/assets/virgin-voyages/ship-exterior-1.jpg",
    beachClubPool: "/assets/virgin-voyages/beach-club-pool.jpg",
    beachClubDusk: "/assets/virgin-voyages/beach-club-loungers.jpg",
    beachClubCabana: "/assets/virgin-voyages/beach-club-cabana.jpg",
    beachClubNight: "/assets/virgin-voyages/beach-club-night.jpg",
    seaViewCabin: "/assets/virgin-voyages/sea-view-cabin.jpg",
    nightlife: "/assets/virgin-voyages/party-scene.jpg",
  },
  // Real, logo-free destination/adventure photography for the Book It
  // Yourself hero's photo stack — deliberately not tied to any one vendor
  // section below it. Mix of self-hosted Virgin Voyages shots and Pexels
  // stock (same hotlinking convention as assets.img.*).
  heroDestinations: [
    {
      src: "/assets/virgin-voyages/ship-exterior-1.jpg",
      alt: "Cruise ship sailing at sea",
    },
    {
      src: "/assets/virgin-voyages/beach-club-pool.jpg",
      alt: "Aerial view of a beach club pool",
    },
    {
      src: "/assets/virgin-voyages/beach-club-cabana.jpg",
      alt: "View of the beach from a cabana",
    },
    {
      src: "https://images.pexels.com/photos/15532995/pexels-photo-15532995.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Blue-domed church overlooking the sea in Santorini, Greece",
    },
    {
      src: "https://images.pexels.com/photos/6702772/pexels-photo-6702772.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Aerial view of clear turquoise water and palm trees on a tropical beach",
    },
    {
      src: "https://images.pexels.com/photos/37885473/pexels-photo-37885473.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Scenic view of Machu Picchu in Cusco, Peru",
    },
    {
      src: "https://images.pexels.com/photos/15763649/pexels-photo-15763649.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Scuba diver near a coral reef",
    },
    {
      src: "https://images.pexels.com/photos/1043574/pexels-photo-1043574.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Hikers climbing a mountain ridge",
    },
  ],
  // Exoticca-branded landscape photography, sourced 2026-08-09 from the
  // SharePoint Branded Imaging/Exoticca folder (Brian's own marketing
  // resource pull). Each already carries the small Exoticca logo mark
  // baked in top-left by Exoticca's own marketing team — do not add another
  // logo overlay on top of these.
  exoticca: {
    safariBalloon: "/assets/exoticca/safari-balloon.jpg",
    lakeBirds: "/assets/exoticca/lake-birds.jpg",
    elephantsWaterhole: "/assets/exoticca/elephants-waterhole.jpg",
    tajMahal: "/assets/exoticca/taj-mahal.jpg",
  },
  // Official partner logos, unmodified except for cropping page chrome off
  // shoreExcursions (see /public/assets/partners — sourced by Brian from
  // each partner's own site, per their README: original colors/proportions,
  // never stretched/cropped/recolored beyond removing non-logo background).
  partnerLogos: {
    viator: "/assets/partners/viator.jpg",
    projectExpedition: "/assets/partners/project-expedition.jpg",
    exoticca: "/assets/partners/exoticca.png",
    shoreExcursions: "/assets/partners/shore-excursions-group.jpg",
    virginVoyages: "/assets/partners/virgin-voyages.png",
  },
  // WorldVia authorized this logo for use 2026-08-07, on condition our
  // independent-agency status is displayed prominently alongside it (never
  // the logo alone). See credential-badge-rules memory.
  worldviaLogo: "/assets/partners/worldvia-travel-network-logo.png",
};

export const links = {
  viator:
    "https://www.viator.com/?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  shoreExcursions:
    "https://www.shoreexcursionsgroup.com/?source=portal&id=1786436&data=brian@paradoxtravelnetwork.com",
  exoticca:
    "https://exoticca.com/us?advisor_token=brian-voyles-019a21e0-2339-7046-a141-9ecdc021d5e3",
  projectExpedition:
    "https://www.projectexpedition.com/?utm_source=paradoxtravelnetwork-52289-brian-98147&utm_medium=referral&utm_campaign=tagent",
  // First Mate referral link — preserve agentId, agencyId, and bookingChannel exactly.
  virginVoyages:
    "https://www.virginvoyages.com/book/voyage-planner/find-a-voyage?cabins=1&currencyCode=USD&agentId=235470&agencyId=589&bookingChannel=FMLINK",
  calendly: "https://calendly.com/paradoxtravelnetwork/30min",
  email: "hello@paradoxtravelnetwork.com",
};

export const business = {
  name: "Paradox Travel Network",
  owner: "Brian Voyles",
  role: "Owner & Travel Advisor",
  tagline: "Travel Beyond Expectations.",
  region: "Dallas–Fort Worth",
  year: new Date().getFullYear(),
};
