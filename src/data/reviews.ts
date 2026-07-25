/**
 * ⚠️ PLACEHOLDER REVIEWS — REPLACE BEFORE PUBLISHING.
 *
 * These are sample testimonials so the Reviews section renders with real
 * structure and motion. Swap them for genuine client reviews (with permission)
 * before the site goes live. Keep the same shape; add or remove freely.
 *
 * Tip for Bolt: you can later wire this to a Google Places reviews feed or a
 * Supabase table so reviews update without a code change.
 */

export interface Review {
  quote: string;
  name: string;
  detail: string; // trip type / location, e.g. "Honeymoon · Maldives"
  rating: number; // 1–5
}

export const reviews: Review[] = [
  {
    quote:
      "Brian turned a chaotic multi-stop idea into a trip that actually made sense. Every connection had breathing room and nothing fell apart.",
    name: "Sample Client",
    detail: "Multi-city Europe · Family of 5",
    rating: 5,
  },
  {
    quote:
      "We were about to book the wrong cabin on the wrong deck. One conversation saved the whole cruise from a very loud week.",
    name: "Sample Client",
    detail: "Caribbean cruise · Couple",
    rating: 5,
  },
  {
    quote:
      "I told him the vibe and the budget and he came back with three resorts that all fit. No upsell, no sales voice, just useful.",
    name: "Sample Client",
    detail: "All-inclusive · Riviera Maya",
    rating: 5,
  },
  {
    quote:
      "Booked most of it myself, asked Brian the scary questions, and he answered every one for free. That's rare.",
    name: "Sample Client",
    detail: "Self-booked · Costa Rica",
    rating: 5,
  },
  {
    quote:
      "Our honeymoon felt like ours — quiet where we wanted quiet, a little adventure where we wanted a story.",
    name: "Sample Client",
    detail: "Honeymoon · Santorini",
    rating: 5,
  },
];
