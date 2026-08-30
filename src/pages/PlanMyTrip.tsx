import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Search,
  Phone,
  Scale,
  Sparkles,
} from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { links, assets } from "../lib/assets";
import { stagger, fadeUp, smooth } from "../lib/motion";

const valueCase = [
  {
    icon: Search,
    title: "What Planning With Brian Actually Means",
    body: [
      "When you ask me to help plan your trip, I'm not just running a quick search and sending you the first thing that looks decent.",
      "I'm trying to figure out what actually fits.",
      "For a resort trip, that might mean comparing location, beach, room category, dining, transfers, and package pricing. For a cruise, it might mean comparing cruise lines and ship styles to figure out which one actually suits the travelers and the trip.",
      "The more complicated or more involved the trip gets, the more that comparison work matters — and that's exactly where I'm building a growing share of my focus. Whatever the trip is, I'm comparing the real choices instead of handing you another page of search results.",
      "I'm not a coupon code, and the value of working with a travel advisor shouldn't come down to whether I can shave a few dollars off a price you found online.",
      "You're getting the research, the comparisons, the recommendations, the details, and an actual person who already knows your trip.",
      "That said, knowing where to look has its advantages.",
      "Sometimes, I can find a better deal than what you're seeing on your own. That might come from package pricing, supplier promotions, advisor-only offers, better room-category value, or simply comparing options most travelers would never know were worth checking.",
      "Sometimes the win is a lower price. Sometimes it's getting more for about the same money.",
      "Because the cheapest-looking price on the internet has a funny habit of becoming less impressive once you discover what it doesn't include.",
    ],
  },
  {
    icon: Phone,
    title: "You Get a Real Person in Your Corner",
    body: [
      "From the time we start planning until you return home, you have someone who knows your trip.",
      "If something changes, a flight gets moved, a supplier needs to be contacted, or you simply have a question, you aren't starting over with a customer-service maze and a hold-music playlist designed to test your character.",
      "I already know the reservation, the destination, and what we were trying to accomplish.",
      "That matters when everything goes smoothly, and it matters even more when it doesn't.",
    ],
  },
  {
    icon: Scale,
    title: "Better Value, Not Just a Lower Number",
    body: [
      "Will I always beat every price you can find online?",
      "No.",
      "Anyone promising that probably also has a bridge to sell you.",
      "But I do often find better pricing, better packages, or better overall value because I'm comparing multiple suppliers and promotions instead of relying on one website.",
      "And price is only part of the equation.",
      "A slightly cheaper room in the wrong location, a package missing transfers, a restrictive fare, or a resort that looks much better in photos than it does in reality can turn a “deal” into something else pretty quickly.",
      "My job is to look at the whole picture and help you make the smartest choice for your trip, not just chase the lowest number on a screen.",
    ],
  },
  {
    icon: Sparkles,
    title: "A Few Extra Touches",
    body: [
      "Before you travel, I may also reach out to your hotel, resort, or cruise line to ask about available amenities, upgrades, celebrations, or other extras.",
      "Those perks are never guaranteed, but I believe travel planning should feel more personal than receiving an automated confirmation email and being wished the very best by an inbox.",
      "Sometimes the little things work out.",
      "Sometimes they don't.",
      "But I'll ask.",
    ],
  },
];

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
        // Below md this box had no height cap at all -- aspect-[4/5] at a
        // 320px-wide phone renders a 400px-tall portrait, pushing the
        // headline to ~553px, almost the entire first screen (568px tall).
        // Capping it here mirrors the same md:max-h-[420px] pattern already
        // proven on this page for tablet. 240px still left the (long) H1
        // ending at 604px, past a 568px-tall screen -- 190px clears it with
        // a little margin.
        imageMobileMaxH="max-h-[190px]"
        imageSlot={
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={assets.halfBody}
              alt="Brian Voyles, travel advisor"
              // object-top, not object-center: at the tablet range (md,
              // max-h-[420px] capping a much taller aspect-[4/5] box),
              // center-cropping this photo cut off from the chin down --
              // his face was above the cropped window. Biasing to the top
              // keeps the face in frame at every crop height.
              className="h-full w-full object-cover object-top animate-kenburns"
            />
          </motion.div>
        }
      >
        <p className="text-lg leading-relaxed text-fog">
          I plan trips — simple or complicated. No trip gets a lesser version
          of me. Some are the kind where choosing the right product and
          itinerary matters even more, and that's where I'm putting a
          growing share of my focus.
        </p>
        <a href="#intake" className="btn-primary w-fit">
          Let's Get It Booked <ArrowRight size={16} />
        </a>
        <p className="text-sm text-fog">
          Based in Dallas–Fort Worth, working with travelers nationwide.
        </p>
      </PageHero>

      {/* The full value case — why plan with Brian instead of booking it
          yourself. Long-form by design; this is the page's actual sales
          case, not a teaser. */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="Why plan with Brian"
          title="The value isn't a discount code. It's everything around it."
        />
        <motion.div
          variants={reduce ? undefined : stagger(0.15)}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 flex flex-col gap-14"
        >
          {valueCase.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={reduce ? undefined : fadeUp}
                className="flex gap-5 md:gap-7"
              >
                <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean-dark">
                  <Icon size={22} />
                </span>
                <div className="max-w-2xl">
                  <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                    {v.title}
                  </h3>
                  <div className="mt-3 space-y-4 leading-relaxed text-fog">
                    {v.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

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
                animate={reduce ? undefined : { y: [0, 18, 0], x: [0, -12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-cream/10 blur-3xl"
                animate={reduce ? undefined : { y: [0, -16, 0], x: [0, 14, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.4 }}
                variants={reduce ? undefined : fadeUp}
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
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : 1.4, ease: smooth, delay: reduce ? 0 : 0.2 }}
              className="absolute inset-x-6 top-6 hidden h-px origin-left bg-ocean md:block"
            />
            <motion.div
              variants={reduce ? undefined : stagger(0.12)}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 md:grid-cols-3"
            >
              {nextSteps.map((s) => (
                <motion.div
                  key={s.n}
                  variants={reduce ? undefined : fadeUp}
                  className="flex flex-col gap-3"
                >
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
