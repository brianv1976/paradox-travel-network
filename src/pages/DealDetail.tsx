import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getDeal } from "../data/deals";
import { useSeo } from "../hooks/useSeo";
import CTASection from "../components/CTASection";
import { fadeUp, stagger } from "../lib/motion";
import { business } from "../lib/assets";

export default function DealDetail() {
  const { slug } = useParams();
  const deal = slug ? getDeal(slug) : undefined;

  useSeo(
    deal ? `${deal.headline} | Paradox Travel Network` : "",
    deal?.seoDescription,
    deal
      ? {
          image: deal.image,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Offer",
            name: deal.headline,
            description: deal.seoDescription,
            areaServed: deal.destination,
            seller: { "@type": "TravelAgency", name: business.name },
          },
        }
      : undefined
  );

  if (!deal) return <Navigate to="/404" replace />;

  return (
    <>
      <article className="bg-cream pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-px">
          <Link
            to="/postcards/issue-01"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog transition-colors hover:text-ocean-dark"
          >
            <ArrowLeft size={15} /> Back to Postcards
          </Link>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay-deep"
            >
              {deal.tag}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-semibold leading-[1.12] text-ink md:text-5xl"
            >
              {deal.headline}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-fog">
              {deal.summary}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-[2rem] shadow-lift"
          >
            <img src={deal.image} alt={`${deal.supplier} ${deal.destination}`} className="h-full w-full object-cover" />
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl space-y-5 text-base leading-relaxed text-ink/85">
            {deal.details.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-sand px-6 py-5 text-sm leading-relaxed text-ink/70">
            {deal.disclaimer}
          </div>
        </div>
      </article>

      <CTASection
        eyebrow={deal.supplier}
        title={`Ready to look at ${deal.destination}?`}
        body="Brian confirms the live offer terms against your dates before anything is booked — no surprises, no expired pricing."
        primaryLabel="Plan With Brian"
        primaryTo="/plan-my-trip"
        secondaryLabel="See More Postcards"
        secondaryTo="/postcards/issue-01"
      />
    </>
  );
}
