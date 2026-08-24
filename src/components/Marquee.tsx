import { MapPin } from "lucide-react";

const DESTINATIONS = [
  "Cancún",
  "Rome",
  "Reykjavík",
  "Sydney",
  "Tokyo",
  "Aruba",
  "Santorini",
  "Juneau",
  "Riviera Maya",
  "Amsterdam",
  "Machu Picchu",
  "Naples",
  "Costa Rica",
  "Dubai",
];

/**
 * Infinite destination ticker. Pure CSS keyframes (defined inline) so it needs
 * no JS loop and never janks. Reduced-motion visitors get the same destinations
 * without continuous movement, and the duplicated second row is hidden from
 * assistive technology so the list is not announced twice.
 */
export default function Marquee() {
  const row = [...DESTINATIONS, ...DESTINATIONS];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ocean-dark py-5">
      <style>{`
        @keyframes ptn-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ptn-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
      <div
        className="ptn-marquee-track flex w-max items-center gap-10 whitespace-nowrap"
        style={{ animation: "ptn-marquee 40s linear infinite" }}
      >
        {row.map((d, i) => (
          <span
            key={i}
            aria-hidden={i >= DESTINATIONS.length ? "true" : undefined}
            className="flex items-center gap-2 font-display text-lg text-cream"
          >
            <MapPin size={16} className="text-gold" />
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
