import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { stagger, fadeUp } from "../lib/motion";
import type { Promo } from "../data/exoticcaTrips";

function formatExpiry(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

/** Sitewide vendor promos, separate from the trip/cruise cards above --
 *  these are time-boxed and need to be pulled/refreshed by their expiry,
 *  unlike the evergreen trip cards. No photo since there's no single trip
 *  to show; the expiration date is the whole point of this section. */
export default function PromoBanner({ promos }: { promos: Promo[] }) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {promos.map((promo) => (
        <motion.a
          key={promo.slug}
          variants={fadeUp}
          href={promo.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group flex flex-col justify-between rounded-2xl border border-clay/30 bg-clay/5 p-6 transition-colors duration-300 hover:bg-clay/10"
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-clay-deep">
                {promo.vendor}
              </span>
              <span className="rounded-full bg-clay px-3 py-1 text-[11px] font-bold text-ink">
                Expires {formatExpiry(promo.expires)}
              </span>
            </div>
            <h4 className="mt-2 font-display text-lg font-semibold text-ink">
              {promo.headline}
            </h4>
            <p className="mt-2 text-sm text-fog">{promo.description}</p>
          </div>
          <span className="link-underline mt-4 text-sm">
            See offer <ExternalLink size={13} />
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
