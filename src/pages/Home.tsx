/**
 * Central asset + link registry.
 *
 * IMAGES: Logo is self-hosted (no Webflow dependency). The 6 stock/category
 * photos + headshot/portrait/mascot still point at Webflow's CDN — download
 * each into /public/assets and swap the URL here to fully cut Webflow loose.
 *
 * LINKS: Affiliate + scheduling links are backend-tracked. Do not alter the
 * query params — they carry Brian's referral / tracking IDs.
 */

const CDN = "https://cdn.prod.website-files.com/6a5858ae0ba27f2df8e26b31";

export const assets = {
  logo: "/Web Logo.png",
  headshot: `${CDN}/6a5858ae0ba27f2df8e26b40_Brian%20Voyles%20-%20Approved%20Headshot.png`,
  portrait: `${CDN}/6a5858ae0ba27f2df8e26b3f_Brian%20Voyles%20-%20Approved%20Portrait.jpg`,
  mascotWhiteboard: `${CDN}/6a5858ae0ba27f2df8e26b5d_Brian%20Mascot%20Scene%20-%20Travel%20Tips%20Whiteboard.png`,
  img: {
    cruise: `${CDN}/6a5858ae0ba27f2df8e26b3b_Travel%20Placeholder%20-%20Cruise.jpg`,
    resort: `${CDN}/6a5858ae0ba27f2df8e26b3c_Travel%20Placeholder%20-%20Resort.jpg`,
    beach: `${CDN}/6a5858ae0ba27f2df8e26b3e_Travel%20Placeholder%20-%20Beach.jpg`,
    planning: `${CDN}/6a5858ae0ba27f2df8e26b3d_Travel%20Placeholder%20-%20Planning.jpg`,
    adventure: `${CDN}/6a5858ae0ba27f2df8e26b56_Travel%20Placeholder%20-%20Adventure.jpg`,
    localEscape: `${CDN}/6a5858ae0ba27f2df8e26b58_Travel%20Placeholder%20-%20Local%20Escape.jpg`,
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
  email: "brian@paradoxtravelnetwork.com",
};

export const business = {
  name: "Paradox Travel Network",
  owner: "Brian Voyles",
  role: "Owner & Travel Advisor",
  tagline: "Travel Beyond Expectations.",
  region: "Dallas\u2013Fort Worth",
  year: new Date().getFullYear(),
};
