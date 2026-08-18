import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { trackEvent } from "../lib/analytics";

const MAILERLITE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2581317/forms/196083067974059131/subscribe";

const inputClass =
  "rounded-lg border border-cream/20 bg-cream/95 px-3 py-2 text-sm text-ink placeholder:text-fog focus:outline-none focus:ring-2 focus:ring-gold";

type Props = {
  /** "card" (default) is a self-contained boxed form with its own heading —
   *  used in the footer. "inline" drops the heading/wrapper for pages that
   *  already have their own newsletter heading and copy above the form. */
  variant?: "card" | "inline";
};

export default function NewsletterForm({ variant = "card" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (company) return; // honeypot tripped, silently drop

    setStatus("loading");
    const body = new URLSearchParams({
      "fields[name]": name,
      "fields[email]": email,
      "ml-submit": "1",
      anticsrf: "true",
    });

    try {
      // MailerLite's subscribe endpoint sends `access-control-allow-origin: *`,
      // so the response is readable — no need for mode: "no-cors" (which would
      // hide real failures like a rejected or duplicate email behind a fake
      // "success").
      const res = await fetch(MAILERLITE_ENDPOINT, { method: "POST", body });
      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error("mailerlite rejected");
      trackEvent("newsletter_signup");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const honeypotField = (
    <input
      type="text"
      name="company"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      // Off-screen rather than display:none — bots that specifically check
      // for and skip display:none fields to evade honeypots still fill this.
      className="absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
      aria-hidden="true"
    />
  );

  if (status === "success") {
    if (variant === "inline") {
      return (
        <p className="mt-8 inline-flex items-center gap-2 text-cream">
          <CheckCircle2 size={18} /> You're on the list — talk soon.
        </p>
      );
    }
    return (
      <div className="rounded-2xl bg-cream/10 p-5 text-sm text-cream">
        <p className="font-semibold">You're on the list.</p>
        <p className="mt-1 text-cream/80">
          Watch your inbox for destination ideas and the occasional deal
          worth opening an email for.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        {honeypotField}
        <label htmlFor="newsletter-inline-name" className="sr-only">
          Name
        </label>
        <input
          id="newsletter-inline-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          className="rounded-full bg-cream px-5 py-3 text-ink outline-none placeholder:text-fog/60 focus:ring-2 focus:ring-gold sm:w-36"
        />
        <label htmlFor="newsletter-inline-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-inline-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className="flex-1 rounded-full bg-cream px-5 py-3 text-ink outline-none placeholder:text-fog/60 focus:ring-2 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn bg-gold text-ink hover:bg-cream disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Join the newsletter"}
        </button>
        {status === "error" && (
          <p className="absolute -bottom-6 left-0 text-xs text-clay-light">
            Something went wrong — please try again in a moment.
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="rounded-2xl bg-cream/10 p-5">
      <h3 className="font-display text-lg font-semibold text-cream">
        Get the Good Deals First
      </h3>
      <p className="mt-1 text-sm text-cream/80">
        Destination ideas, honest travel tips, and the occasional deal worth
        opening an email for. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        {honeypotField}
        <label htmlFor="newsletter-name" className="sr-only">
          Name
        </label>
        <input
          id="newsletter-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          className={inputClass}
        />
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-clay-light disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
          <Send size={14} />
        </button>
        {status === "error" && (
          <p className="text-xs text-clay-light">
            Something went wrong — please try again in a moment.
          </p>
        )}
      </form>
    </div>
  );
}
