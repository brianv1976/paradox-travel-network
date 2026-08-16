import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, CheckCircle2, ShieldAlert } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { submitForm } from "../lib/form";
import { useHoneypot } from "../components/Honeypot";
import { links, assets } from "../lib/assets";
import { stagger, fadeUp, smooth } from "../lib/motion";

// Fields lift and glow on focus so the active one is unmistakable.
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-ink outline-none transition-all duration-300 ease-smooth focus:-translate-y-0.5 focus:border-ocean focus:shadow-soft focus:ring-2 focus:ring-ocean/20 hover:border-ink/25 placeholder:text-fog/60";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

const tripTypes = [
  "Cruise",
  "All-Inclusive Resort",
  "Honeymoon / Romance",
  "Family Vacation",
  "Adventure / Guided",
  "Group Travel",
  "Not sure yet",
];

const budgets = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

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

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  destination: "",
  dates: "",
  travelers: "",
  budget: "",
  tripType: "",
  priorities: "",
  notes: "",
};

const formAvailable = Boolean(import.meta.env.VITE_FORM_ENDPOINT);

export default function PlanMyTrip() {
  useSeo(
    "Plan My Trip | DFW Travel Advisor Serving Nationwide",
    "Tell a Dallas–Fort Worth-based travel advisor serving travelers nationwide about your trip, budget, dates, and style to begin personalized vacation planning."
  );

  const reduce = useReducedMotion();
  const [data, setData] = useState(empty);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "unavailable" | "error"
  >("idle");
  const honeypot = useHoneypot();

  const set = (k: keyof typeof empty) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    const result = await submitForm("Trip Planning Intake", { ...data, consent, _hp: honeypot.value });
    setStatus(result);
    if (result !== "error") window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {status === "sent" ? (
          <Reveal className="mx-auto max-w-2xl rounded-[2rem] border border-ocean/20 bg-cream p-10 text-center shadow-soft">
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="mx-auto flex h-16 w-16 items-center justify-center"
            >
              <CheckCircle2 className="text-ocean" size={48} />
            </motion.div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">
              Thanks — your trip details are in.
            </h2>
            <p className="mt-3 text-fog">
              Brian received your trip details and will follow up after reviewing
              them. Want to discuss it sooner?
            </p>
            <a
              href={links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              <CalendarClock size={16} /> Choose a Time
            </a>
          </Reveal>
        ) : !formAvailable || status === "unavailable" ? (
          <Reveal className="mx-auto max-w-2xl rounded-[2rem] border border-clay-deep/20 bg-cream p-10 text-center shadow-soft">
            <h2 className="font-display text-3xl font-semibold text-ink">
              This form isn't connected yet.
            </h2>
            <p className="mt-3 text-fog">
              Nothing you type here would be sent. Please email{" "}
              <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark hover:text-clay-deep">
                {links.email}
              </a>{" "}
              directly, or schedule a call below.
            </p>
            <a
              href={links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              <CalendarClock size={16} /> Choose a Time
            </a>
          </Reveal>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal variant="rise">
              <SectionHeading
                eyebrow="Trip planning inquiry"
                title="Share the useful details."
              />
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-clay/10 p-4 text-sm text-clay-deep">
                <ShieldAlert size={18} className="mt-0.5 shrink-0" />
                <span>
                  Do not send passport numbers, payment-card details, medical
                  records, or confidential identity documents through this form.
                </span>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                {honeypot.field}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="trip-first-name" className={labelClass}>First name</label>
                    <input
                      id="trip-first-name"
                      name="firstName"
                      required
                      className={inputClass}
                      value={data.firstName}
                      onChange={set("firstName")}
                    />
                  </div>
                  <div>
                    <label htmlFor="trip-last-name" className={labelClass}>Last name</label>
                    <input
                      id="trip-last-name"
                      name="lastName"
                      required
                      className={inputClass}
                      value={data.lastName}
                      onChange={set("lastName")}
                    />
                  </div>
                  <div>
                    <label htmlFor="trip-email" className={labelClass}>Email</label>
                    <input
                      id="trip-email"
                      name="email"
                      required
                      type="email"
                      className={inputClass}
                      value={data.email}
                      onChange={set("email")}
                    />
                  </div>
                  <div>
                    <label htmlFor="trip-phone" className={labelClass}>Phone</label>
                    <input
                      id="trip-phone"
                      name="phone"
                      type="tel"
                      className={inputClass}
                      value={data.phone}
                      onChange={set("phone")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="trip-destination" className={labelClass}>
                    Where are you thinking about going?
                  </label>
                  <input
                    id="trip-destination"
                    name="destination"
                    className={inputClass}
                    placeholder="Destination ideas, or “not sure yet”"
                    value={data.destination}
                    onChange={set("destination")}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="trip-dates" className={labelClass}>Preferred travel dates</label>
                    <input
                      id="trip-dates"
                      name="dates"
                      className={inputClass}
                      placeholder="Month, season, or exact dates"
                      value={data.dates}
                      onChange={set("dates")}
                    />
                  </div>
                  <div>
                    <label htmlFor="trip-travelers" className={labelClass}>Number of travelers</label>
                    <input
                      id="trip-travelers"
                      name="travelers"
                      className={inputClass}
                      placeholder="Adults, kids, ages"
                      value={data.travelers}
                      onChange={set("travelers")}
                    />
                  </div>
                  <div>
                    <label htmlFor="trip-budget" className={labelClass}>Estimated trip budget</label>
                    <select
                      id="trip-budget"
                      name="budget"
                      className={inputClass}
                      value={data.budget}
                      onChange={set("budget")}
                    >
                      <option value="">Select a range</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="trip-type" className={labelClass}>Type of trip</label>
                    <select
                      id="trip-type"
                      name="tripType"
                      className={inputClass}
                      value={data.tripType}
                      onChange={set("tripType")}
                    >
                      <option value="">Select a type</option>
                      {tripTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="trip-priorities" className={labelClass}>
                    What matters most for this trip?
                  </label>
                  <textarea
                    id="trip-priorities"
                    name="priorities"
                    rows={3}
                    className={inputClass}
                    placeholder="Pace, must-dos, dealbreakers, the vibe you're after"
                    value={data.priorities}
                    onChange={set("priorities")}
                  />
                </div>

                <div>
                  <label htmlFor="trip-notes" className={labelClass}>Anything else?</label>
                  <textarea
                    id="trip-notes"
                    name="notes"
                    rows={2}
                    className={inputClass}
                    value={data.notes}
                    onChange={set("notes")}
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-fog">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-ocean"
                  />
                  <span>
                    I understand this form starts a conversation and is not a
                    booking confirmation. I will not submit payment information,
                    passport numbers, or confidential documents.
                  </span>
                </label>

                {status === "error" && (
                  <p className="text-sm text-clay-deep">
                    Something went wrong while sending the form. Please email{" "}
                    <a
                      href={`mailto:${links.email}`}
                      className="font-semibold underline"
                    >
                      {links.email}
                    </a>{" "}
                    instead.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || !consent}
                  className="btn-primary disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send Trip Details"}
                  <ArrowRight size={16} />
                </button>

                <p className="text-sm text-fog">
                  Most planning is free. If a trip carries a fee, you'll know
                  the number upfront, before any work starts.
                </p>
              </form>
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
        )}
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
