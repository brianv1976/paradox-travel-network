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
  headshot: "/assets/headshot.png",
  portrait: "/assets/portrait.jpg",
  mascotWhiteboard: "/assets/mascot-whiteboard.png",
  img: {
    cruise: "/assets/cruise.jpg",
    resort: "/assets/resort.jpg",
    beach: "/assets/beach.jpg",
    planning: "/assets/planning.jpg",
    adventure: "/assets/adventure.jpg",
    familyTravel:
      "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1600",
    airportConnection:
      "https://images.pexels.com/photos/12717357/pexels-photo-12717357.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
};

export const links = {
  viator:
    "https://www.viator.com/?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  shoreExcursions:
    "https://www.shoreexcursionsgroup.com/?source=portal&id=1786436&data=brian@paradoxtravelnetwork.com",
  exoticca:
    "https://exoticca.com/us?advisor_token=brian-voyles-019a21e0-2339-7046-a141-9ecdc021d5e3",
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
