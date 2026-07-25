/**
 * Central asset + link registry.
 *
 * IMAGES: These currently point at the Webflow CDN (they load fine today).
 * Before you cancel Webflow, download each file into /public/assets and swap
 * the URL here to e.g. "/assets/brian-portrait.jpg". One place, one edit.
 *
 * LINKS: Affiliate + scheduling links are backend-tracked. Do not alter the
 * query params — they carry Brian's referral / tracking IDs.
 */

const CDN = "https://cdn.prod.website-files.com/6a5858ae0ba27f2df8e26b31";

export const assets = {
  logo: `${CDN}/6a5858ae0ba27f2df8e26b41_Paradox%20Travel%20Network%20-%20Primary%20Logo.svg`,
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
  },
};

export const links = {
  // Affiliate / white-label (tracking IDs embedded — do not edit params)
  viator:
    "https://www.viator.com/?pid=P00003200&uid=U00747481&mcid=58086&currency=USD",
  shoreExcursions:
    "https://www.shoreexcursionsgroup.com/?source=portal&id=1786436&data=brian@paradoxtravelnetwork.com",
  exoticca:
    "https://exoticca.com/us?advisor_token=brian-voyles-019a21e0-2339-7046-a141-9ecdc021d5e3",
  // Scheduling
  calendly: "https://calendly.com/paradoxtravelnetwork/30min",
  // Contact
  email: "brian@paradoxtravelnetwork.com",
};

export const business = {
  name: "Paradox Travel Network",
  owner: "Brian Voyles",
  role: "Owner & Travel Advisor",
  tagline: "Travel Beyond Expectations.",
  region: "Dallas–Fort Worth",
  year: new Date().getFullYear(),
};
