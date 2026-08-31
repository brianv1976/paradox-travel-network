import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import NumberedSteps from "../components/NumberedSteps";
import { assets, links } from "../lib/assets";

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
              // text-sm at 320px: measured the actual available width
              // (272px, container padding subtracted) against the actual
              // rendered text width at each size -- text-lg and text-base
              // both still overflowed their own flex parent (which has
              // overflow hidden, so the overflow was silently CLIPPING
              // ~7-25px of the address instead of showing a scrollbar).
              // text-sm is the first size with real margin (~40px). No
              // break-all: a comfortable fit doesn't need it, and it's
              // safer to let a genuine unexpected overflow show than to
              // mid-word-break an email address.
              //
              // md:text-5xl jumped too early: at exactly 768px (the low
              // end of the md range) the container is only ~688px, and
              // text-5xl (48px) rendered the address at ~830px wide --
              // same silent-clipping failure, this time ~54-80px off
              // screen. Holding at text-3xl through the whole md range and
              // only jumping to text-5xl at lg (1024px, real room) fixes
              // it without needing another in-between size step.
              className="group mt-8 inline-flex flex-wrap items-center gap-3 font-display text-sm font-semibold text-cream transition-colors hover:text-gold sm:text-3xl lg:text-5xl"
            >
              {links.email}
              <ArrowRight
                size={32}
                className="hidden transition-transform duration-300 group-hover:translate-x-2 sm:block"
              />
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8">
              <a
                href={links.scheduler}
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
        <NumberedSteps steps={nextSteps} gap="gap-3" />
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
                Something come up with a booking, a supplier, or a trip in
                progress? Support gets to it faster than the general inbox.
              </p>
            </div>
            <a
              href={`mailto:${links.supportEmail}`}
              // support@paradoxtravelnetwork.com is longer than the hero
              // hello@ address and was missed in the earlier narrow-width
              // pass -- text-lg with no mobile downsize overflowed the
              // document at 320px. Same fix as the hero email: small
              // enough font for real margin, icon hidden below sm instead
              // of adding width it doesn't have room for.
              className="link-underline flex shrink-0 items-center gap-2 text-sm sm:text-lg"
            >
              {links.supportEmail}
              <ArrowRight size={16} className="hidden sm:block" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
