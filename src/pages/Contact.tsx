import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, CheckCircle2, Mail } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { submitForm } from "../lib/form";
import { useHoneypot } from "../components/Honeypot";
import { links } from "../lib/assets";

// Fields lift and glow on focus so the active one is unmistakable.
const inputClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-ink outline-none transition-all duration-300 ease-smooth focus:-translate-y-0.5 focus:border-ocean focus:shadow-soft focus:ring-2 focus:ring-ocean/20 hover:border-ink/25 placeholder:text-fog/60";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

const formAvailable = Boolean(import.meta.env.VITE_FORM_ENDPOINT);

export default function Contact() {
  useSeo(
    "Contact a DFW Travel Advisor Serving Nationwide | Paradox Travel Network",
    "Contact Brian Voyles, a Dallas–Fort Worth-based travel advisor serving travelers nationwide, to ask a travel question, discuss a vacation, or find the right planning path."
  );

  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "unavailable" | "error"
  >("idle");
  const honeypot = useHoneypot();

  const set = (k: keyof typeof data) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const result = await submitForm("General Contact Inquiry", { ...data, _hp: honeypot.value });
    setStatus(result);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Brian"
        title="Ask the question. Start the conversation."
      >
        <p className="text-lg leading-relaxed text-fog">
          Use the general contact form for questions that are not ready for the
          full trip-planning inquiry. For a specific trip, the planning form
          collects more useful details.
        </p>
        <a
          href={`mailto:${links.email}`}
          className="inline-flex w-fit items-center gap-2 font-semibold text-ocean-dark hover:text-clay-deep"
        >
          <Mail size={16} /> {links.email}
        </a>
        <p className="text-sm text-fog">
          Do not email payment-card details, passport numbers, medical records,
          or confidential identity documents.
        </p>
        <p className="text-sm text-fog">
          Based in Dallas–Fort Worth, working with travelers nationwide.
        </p>
      </PageHero>

      <section className="container-px py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {status === "sent" ? (
              <Reveal className="rounded-[2rem] border border-ocean/20 bg-cream p-10 text-center shadow-soft">
                <CheckCircle2 className="mx-auto text-ocean" size={44} />
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                  Thanks — message received.
                </h2>
                <p className="mt-3 text-fog">
                  Brian received your message and will review it. Want to choose a
                  time now?
                </p>
                <a
                  href={links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6"
                >
                  <CalendarClock size={16} /> Schedule a Call
                </a>
              </Reveal>
            ) : !formAvailable || status === "unavailable" ? (
              <Reveal className="rounded-[2rem] border border-clay-deep/20 bg-cream p-10 text-center shadow-soft">
                <h2 className="font-display text-2xl font-semibold text-ink">
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
                  <CalendarClock size={16} /> Schedule a Call
                </a>
              </Reveal>
            ) : (
              <>
                <SectionHeading
                  eyebrow="General inquiry"
                  title="Send a message."
                  intro="Submitting this form starts a conversation. It does not create a booking or charge."
                />
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  {honeypot.field}
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      className={inputClass}
                      value={data.name}
                      onChange={set("name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      required
                      type="email"
                      className={inputClass}
                      value={data.email}
                      onChange={set("email")}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className={labelClass}>Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      className={inputClass}
                      value={data.subject}
                      onChange={set("subject")}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className={labelClass}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      className={inputClass}
                      value={data.message}
                      onChange={set("message")}
                    />
                  </div>
                  <p className="text-xs text-fog">
                    Please review the{" "}
                    <Link to="/privacy" className="underline">
                      Privacy Policy
                    </Link>{" "}
                    before sending this form.
                  </p>
                  {status === "error" && (
                    <p className="text-sm text-clay-deep">
                      Something went wrong. Please email{" "}
                      <a
                        href={`mailto:${links.email}`}
                        className="font-semibold underline"
                      >
                        {links.email}
                      </a>{" "}
                      directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send Message"}
                    <ArrowRight size={16} />
                  </button>
                </form>
              </>
            )}
          </div>

          <aside className="lg:pt-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-[2rem] bg-ocean-dark p-8 text-cream">
                <CalendarClock className="text-gold" />
                <h3 className="mt-4 text-xl font-semibold">
                  Need to talk through a trip idea?
                </h3>
                <p className="mt-3 leading-relaxed text-cream">
                  Use the call for trip ideas, destination questions, logistics,
                  or figuring out which planning path makes sense.
                </p>
                <a
                  href={links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-6 w-full bg-gold text-ink hover:bg-cream"
                >
                  Schedule a Call
                </a>
              </div>
              <div className="rounded-[2rem] border border-ink/10 bg-cream p-8">
                <h3 className="text-xl font-semibold text-ink">
                  Already planning a trip?
                </h3>
                <p className="mt-3 leading-relaxed text-fog">
                  Dates, travelers, destination ideas, budget, and priorities
                  help Brian understand the request before following up.
                </p>
                <Link to="/plan-my-trip" className="link-underline mt-5">
                  Plan My Trip <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
