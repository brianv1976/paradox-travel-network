import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
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
 *  unlike the evergreen trip cards. A promo with a real photo renders like
 *  the trip/cruise cards for visual consistency; one without falls back to
 *  the plain text layout. `href` may be an internal `/deals/...` page
 *  (Brian-assisted supplier, no public checkout link) or an external vendor
 *  URL -- rendered as a router Link vs. a real outbound `<a>` accordingly. */
export default function PromoBanner({ promos }: { promos: Promo[] }) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {promos.map((promo) => {
        const isInternal = promo.href.startsWith("/");
        const cardClassName =
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift";
        const seeOffer = (
          <span className="link-underline mt-auto pt-4 text-sm">
            See offer {isInternal ? <ArrowRight size={13} /> : <ExternalLink size={13} />}
          </span>
        );

        const body = promo.image ? (
          <>
            <div className="relative h-48 overflow-hidden">
              <img
                src={promo.image}
                alt={promo.headline}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-bold text-ink">
                Expires {formatExpiry(promo.expires)}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream backdrop-blur-sm">
                {promo.vendor}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h4 className="font-display text-lg font-semibold leading-snug text-ink">
                {promo.headline}
              </h4>
              <p className="mt-2 text-sm text-fog">{promo.description}</p>
              {seeOffer}
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-clay-deep">
                {promo.vendor}
              </span>
              <span className="rounded-full bg-clay px-3 py-1 text-[11px] font-bold text-ink">
                Expires {formatExpiry(promo.expires)}
              </span>
            </div>
            <h4 className="mt-2 font-display text-lg font-semibold text-ink">{promo.headline}</h4>
            <p className="mt-2 text-sm text-fog">{promo.description}</p>
            {seeOffer}
          </div>
        );

        return isInternal ? (
          <motion.div key={promo.slug} variants={fadeUp}>
            <Link to={promo.href} className={cardClassName}>
              {body}
            </Link>
          </motion.div>
        ) : (
          <motion.a
            key={promo.slug}
            variants={fadeUp}
            href={promo.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={cardClassName}
          >
            {body}
          </motion.a>
        );
      })}
    </motion.div>
  );
}
