/**
 * Destination showcase imagery.
 *
 * Sourced from Pexels (free for commercial use, no attribution required) and
 * hand-checked rather than pulled blind from a search — several destination
 * searches return wildly wrong results.
 *
 * These are placeholders with a real shelf life: when supplier/host-agency or
 * tourism-board photography comes in, swap the `image` value here and the
 * whole site updates. Nothing else references these URLs.
 */

const px = (id: string, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

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
    image: px("10490921"),
    to: "/all-inclusive-resorts",
  },
  {
    name: "The Maldives",
    region: "Indian Ocean",
    blurb: "Overwater villas, and the swim-up commute.",
    image: px("9080959"),
    to: "/romance-travel",
  },
  {
    name: "Aruba",
    region: "Caribbean",
    blurb: "Reliable sun, unreliable desire to leave.",
    image: px("10490919"),
    to: "/all-inclusive-resorts",
  },
  {
    name: "Amalfi Coast",
    region: "Italy",
    blurb: "Cliffside towns and lemon everything.",
    image: px("17807444"),
    to: "/romance-travel",
  },
  {
    name: "The Bahamas",
    region: "Caribbean",
    blurb: "Close enough to be easy, far enough to count.",
    image: px("12318713"),
    to: "/cruises",
  },
  {
    name: "Kyoto",
    region: "Japan",
    blurb: "Temples, gardens, and excellent walking.",
    image: px("26946364"),
    to: "/adventure-guided-travel",
  },
  {
    name: "Iceland",
    region: "North Atlantic",
    blurb: "Waterfalls, aurora, and defensible layering.",
    image: px("1009136"),
    to: "/adventure-guided-travel",
  },
  {
    name: "St. Lucia",
    region: "Caribbean",
    blurb: "The Pitons, and a very good reason to look up.",
    image: px("506810"),
    to: "/romance-travel",
  },
];

/** Wide shot used as the section's full-bleed closing panel. */
export const featuredDestination = {
  name: "The Caribbean",
  image: px("5287936", 2000),
};
