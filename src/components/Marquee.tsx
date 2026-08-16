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
 * no JS loop and never janks.
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
      `}</style>
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        style={{ animation: "ptn-marquee 40s linear infinite" }}
      >
        {row.map((d, i) => (
          <span
            key={i}
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
