/**
 * Destination showcase imagery.
 *
 * Sourced from Pexels (free for commercial use, no attribution required),
 * hand-checked rather than pulled blind from a search, and downloaded into
 * /public/assets/stock — not hotlinked, so the site has no runtime
 * dependency on Pexels staying up or being CSP-allowlisted.
 *
 * These are placeholders with a real shelf life: when supplier/host-agency or
 * tourism-board photography comes in, swap the `image` value here and the
 * whole site updates.
 */

export interface Destination {
  name: string;
  region: string;
  blurb: string;
  image: string;
  to: string;
}

/** Caribbean-weighted, per Brian — that's the bulk of what he sells. */
export const destinations: Destination[] = [
  {
    name: "Turks & Caicos",
    region: "Caribbean",
    blurb: "Grace Bay water that looks edited and isn't.",
    image: "/assets/stock/turks-caicos.jpg",
    to: "/all-inclusive-resorts",
  },
  {
    name: "The Maldives",
    region: "Indian Ocean",
    blurb: "Overwater villas, and the swim-up commute.",
    image: "/assets/stock/maldives.jpg",
    to: "/romance-travel",
  },
  {
    name: "Aruba",
    region: "Caribbean",
    blurb: "Reliable sun, unreliable desire to leave.",
    image: "/assets/stock/aruba.jpg",
    to: "/all-inclusive-resorts",
  },
  {
    name: "Amalfi Coast",
    region: "Italy",
    blurb: "Cliffside towns and lemon everything.",
    image: "/assets/stock/amalfi-coast.jpg",
    to: "/romance-travel",
  },
  {
    name: "The Bahamas",
    region: "Caribbean",
    blurb: "Close enough to be easy, far enough to count.",
    image: "/assets/stock/bahamas.jpg",
    to: "/cruises",
  },
  {
    name: "Kyoto",
    region: "Japan",
    blurb: "Temples, gardens, and excellent walking.",
    image: "/assets/stock/kyoto.jpg",
    to: "/adventure-guided-travel",
  },
  {
    name: "Iceland",
    region: "North Atlantic",
    blurb: "Waterfalls, aurora, and defensible layering.",
    image: "/assets/stock/iceland.jpg",
    to: "/adventure-guided-travel",
  },
  {
    name: "St. Lucia",
    region: "Caribbean",
    blurb: "The Pitons, and a very good reason to look up.",
    image: "/assets/stock/st-lucia.jpg",
    to: "/romance-travel",
  },
];
