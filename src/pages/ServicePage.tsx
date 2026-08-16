import { Navigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { getService } from "../data/services";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { stagger, fadeUp } from "../lib/motion";
import { links } from "../lib/assets";

export default function ServicePage({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const service = slug ? getService(slug) : undefined;

  useSeo(service?.metaTitle ?? "", service?.metaDescription);

  if (!service) return <Navigate to="/404" replace />;

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        image={service.image}
        imageAlt={service.imageAlt}
      >
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
          <p className="text-sm font-medium text-ink">{service.selfBookIntro}</p>
          <ul className="mt-3 space-y-2">
            {service.vendors.map((v) => (
              <li key={v.name} className="text-sm text-fog">
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="font-semibold text-ocean-dark hover:text-clay-deep"
                >
                  {v.name}
                </a>{" "}
                — {v.blurb}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm italic text-fog">{service.selfBookNote}</p>
          <p className="mt-3 text-xs text-fog/70">
            Paradox may earn a commission if you book through these links, at
            no extra cost to you.
          </p>
        </div>

        <p className="text-lg leading-relaxed text-fog">{service.intro}</p>

        <div>
          <Link to="/plan-my-trip" className="btn-primary">
            Plan a Trip
            <ArrowRight size={16} />
          </Link>
        </div>
      </PageHero>

      {/* Fit triad */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow={service.fitTriad.eyebrow}
          title={service.fitTriad.heading}
        />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {service.fitTriad.items.map((item) => (
            <motion.div
              key={item.n}
              variants={fadeUp}
              className="group rounded-2xl border border-ink/10 bg-cream p-7 transition-all duration-300 hover:border-ocean/30 hover:shadow-soft"
            >
              <span className="font-display text-3xl font-semibold text-clay-deep">
                {item.n}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-fog">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Checklist */}
      <section className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <SectionHeading
            eyebrow={service.checklist.eyebrow}
            title={service.checklist.heading}
          />
          <motion.ul
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {service.checklist.items.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl bg-cream px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
                  <Check size={14} />
                </span>
                <span className="font-medium text-ink">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-lg italic leading-relaxed text-fog">
              {service.checklist.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow={service.pillars.eyebrow}
          title={service.pillars.heading}
          intro={service.pillars.intro}
        />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {service.pillars.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-2xl bg-ocean-dark p-7 text-cream"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-cream">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <CTASection
        eyebrow="Ready to narrow it down?"
        title={service.closingHeading}
        body={service.closingBody}
        primaryLabel={service.ctaLabel}
        primaryTo="/plan-my-trip"
        secondaryLabel="Ask a quick question"
        secondaryTo="/contact"
      />

      <div className="container-px pb-20 text-center text-sm text-fog">
        Not sure which planning option fits? Email{" "}
        <a
          href="mailto:hello@paradoxtravelnetwork.com"
          className="font-semibold text-ocean-dark hover:text-clay-deep"
        >
          hello@paradoxtravelnetwork.com
        </a>{" "}
        or{" "}
        <a
          href={links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ocean-dark hover:text-clay-deep"
        >
          schedule a call <ExternalLink size={13} />
        </a>
        .
      </div>
    </>
  );
}
