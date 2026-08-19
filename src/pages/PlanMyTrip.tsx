import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, ClipboardList } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { links, assets } from "../lib/assets";
import { stagger, fadeUp, smooth } from "../lib/motion";

const TERN_INTAKE_URL =
  "https://app.tern.travel/public/forms/cYqOChO8qaDXeYhB7blD0w/responses/new";

const nextSteps = [
  {
    n: "1",
    title: "The inquiry is reviewed",
    body: "Brian looks at the dates, travelers, budget, trip type, and priorities.",
  },
  {
    n: "2",
    title: "The unclear parts get clarified",
    body: "A follow-up may be needed before meaningful options can be compared.",
  },
  {
    n: "3",
    title: "Planning moves forward",
    body: "Nothing is booked until details and next steps are actually confirmed.",
  },
];

export default function PlanMyTrip() {
  useSeo(
    "Plan My Trip | DFW Travel Advisor Serving Nationwide",
    "Tell a Dallas–Fort Worth-based travel advisor serving travelers nationwide about your trip, budget, dates, and style to begin personalized vacation planning."
  );

  const reduce = useReducedMotion();

  return (
    <>
      <PageHero
        eyebrow="Book it right the first time."
        title="Let Me Be Your Personal Travel Assistant — Even on the Fly."
        imageAspect="aspect-[4/5]"
        imageSlot={
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={assets.halfBody}
              alt="Brian Voyles, travel advisor"
              className="h-full w-full object-cover object-center animate-kenburns"
            />
          </motion.div>
        }
      >
        <p className="text-lg leading-relaxed text-fog">
          Think of it like having your own personal assistant — no trip too
          small. I'll help you navigate the planning, give you honest advice,
          and flag the hidden costs before they turn into surprises. From
          finding the right deal to booking the trip that's actually right
          for you, it's real, one-on-one attention — I take the time to find
          out what you really want, then make it happen.
        </p>
        <a href="#intake" className="btn-primary w-fit">
          Let's Get It Booked <ArrowRight size={16} />
        </a>
        <p className="text-sm text-fog">
          Based in Dallas–Fort Worth, working with travelers nationwide.
        </p>
      </PageHero>

      <section id="intake" className="container-px py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal variant="rise">
            <SectionHeading
              eyebrow="Trip planning inquiry"
              title="Start with the trip intake form."
            />
            <p className="mt-4 max-w-xl leading-relaxed text-fog">
              Share dates, travelers, budget, and what matters most for the
              trip. It opens in a new tab, takes a few minutes, and starts a
              conversation — not a booking or a charge.
            </p>
            <a
              href={TERN_INTAKE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-fit"
            >
              <ClipboardList size={16} /> Start the Trip Inquiry
            </a>
            <p className="mt-4 max-w-xl text-sm text-fog">
              Prefer email? Reach Brian directly at{" "}
              <a
                href={`mailto:${links.email}`}
                className="font-semibold text-ocean-dark hover:text-clay-deep"
              >
                {links.email}
              </a>
              . Do not send passport numbers, payment-card details, or
              confidential documents by form or email.
            </p>
          </Reveal>

          {/* Sidebar: schedule a call */}
          <aside className="lg:pt-16">
            <div className="sticky top-24 overflow-hidden rounded-[2rem] bg-ocean-dark p-8 text-cream transition-transform duration-300 hover:-translate-y-1">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
                animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-cream/10 blur-3xl"
                animate={{ y: [0, -16, 0], x: [0, 14, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                className="relative"
              >
                <CalendarClock className="text-gold" />
                <h3 className="mt-4 text-xl font-semibold">
                  Prefer to talk it through first?
                </h3>
                <p className="mt-3 leading-relaxed text-cream">
                  Use the call to discuss trip ideas, destination questions,
                  dates, budget, and the type of planning help you may need.
                </p>
                <a
                  href={links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-6 w-full bg-gold text-ink hover:bg-cream"
                >
                  Schedule a Trip Planning Call
                </a>
              </motion.div>
            </div>
          </aside>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-sand/60">
        <div className="container-px py-20 md:py-28">
          <SectionHeading eyebrow="What happens next" title="Let Brian plan it." />
          <div className="relative mt-12">
            <div className="absolute inset-x-6 top-6 hidden h-px bg-ink/10 md:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: smooth, delay: 0.2 }}
              className="absolute inset-x-6 top-6 hidden h-px origin-left bg-ocean md:block"
            />
            <motion.div
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 md:grid-cols-3"
            >
              {nextSteps.map((s) => (
                <motion.div key={s.n} variants={fadeUp} className="flex flex-col gap-3">
                  <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean-dark font-display text-xl font-semibold text-cream">
                    {s.n}
                  </span>
                  <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="leading-relaxed text-fog">{s.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
