import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { assets, links } from "../lib/assets";
import { stagger, fadeUp } from "../lib/motion";

const nextSteps = [
  {
    n: "1",
    title: "Send the email",
    body: "One line or ten — whatever gets the question across.",
  },
  {
    n: "2",
    title: "Brian replies personally",
    body: "Usually within a business day, straight from his own inbox.",
  },
  {
    n: "3",
    title: "Go from there",
    body: "A quick answer, a call, or a hand-off to the full trip form — whatever the question needs.",
  },
];

export default function Contact() {
  useSeo(
    "Contact a DFW Travel Advisor Serving Nationwide | Paradox Travel Network",
    "Contact Brian Voyles, a Dallas–Fort Worth-based travel advisor serving travelers nationwide, to ask a travel question, discuss a vacation, or find the right planning path."
  );

  return (
    <>
      <PageHero
        eyebrow="Contact Brian"
        title="Ask the question. Start the conversation."
        image={assets.portrait}
        imageAlt="Brian Voyles, travel advisor"
        imagePosition="object-top"
      >
        <p className="text-lg leading-relaxed text-fog">
          Got a quick question that isn't ready for the full trip-planning
          inquiry? Email works best. For a specific trip, the planning form
          collects more useful details.
        </p>
        <div className="mt-4 flex flex-col gap-1.5">
          <p className="text-sm text-fog">
            Do not email payment-card details, passport numbers, medical
            records, or confidential identity documents.
          </p>
          <p className="text-sm text-fog">
            Based in Dallas–Fort Worth, working with travelers nationwide.
          </p>
        </div>
      </PageHero>

      {/* Full-bleed band — the page's one real moment, not a stack of boxes */}
      <section className="relative overflow-hidden bg-ocean-dark text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cream/5 blur-3xl"
        />
        <div className="container-px relative py-20 md:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/70">
              General inquiry
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.1] md:text-4xl">
              The fastest way to reach me is email.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={`mailto:${links.email}`}
              className="group mt-8 inline-flex flex-wrap items-center gap-3 font-display text-3xl font-semibold text-cream transition-colors hover:text-gold md:text-5xl"
            >
              {links.email}
              <ArrowRight
                size={32}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8">
              <a
                href={links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-semibold text-cream transition-colors hover:text-gold"
              >
                <CalendarClock size={18} className="text-gold" />
                Prefer to talk it through? Schedule a call
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <Link
                to="/plan-my-trip"
                className="group inline-flex items-center gap-2 font-semibold text-cream transition-colors hover:text-gold"
              >
                Already planning a trip? Use the trip form
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What happens next — plain, numbered, no card chrome */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="What happens next"
          title="Straightforward, start to finish."
        />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {nextSteps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex flex-col gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean-dark font-display text-xl font-semibold text-cream">
                {s.n}
              </span>
              <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
              <p className="leading-relaxed text-fog">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Support — a different audience (already booked) from the general inquiry above */}
      <section className="border-t border-ink/10">
        <div className="container-px py-20 md:py-28">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="eyebrow">Already booked with me?</span>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
                Trip support goes to a different inbox.
              </h2>
              <p className="mt-3 leading-relaxed text-fog">
                Something come up with a booking, a Supplier, or a trip in
                progress? Support gets to it faster than the general inbox.
              </p>
            </div>
            <a
              href={`mailto:${links.supportEmail}`}
              className="link-underline shrink-0 text-lg"
            >
              {links.supportEmail}
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
