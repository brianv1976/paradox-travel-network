import { useSeo } from "../hooks/useSeo";
import LegalLayout from "../components/LegalLayout";
import { links } from "../lib/assets";

/**
 * NOTE: Reasonable starter terms. Have Brian review before publishing.
 */
export default function Terms() {
  useSeo(
    "Terms of Use | Paradox Travel Network",
    "The terms that govern use of the Paradox Travel Network website."
  );
  return (
    <LegalLayout eyebrow="Terms" title="Terms of Use" updated="July 2026">
      <p>
        By using this website, you agree to these terms. If you do not agree,
        please do not use the site.
      </p>
      <h2>Advisory, not a guarantee</h2>
      <p>
        Paradox Travel Network provides travel planning and advisory services and
        curated links to trusted booking partners. Information on this site is for
        general guidance. Availability, pricing, itineraries, and provider
        policies can change at any time.
      </p>
      <h2>Inquiries and bookings</h2>
      <p>
        Submitting a form begins an inquiry and does not create a booking or a
        charge. Reservations and payments are completed directly through the
        selected provider, whose terms and cancellation policies apply.
      </p>
      <h2>Self-booking guidance</h2>
      <p>
        Some pages, including Book It Yourself, are built for travelers who
        book directly with the provider. When Paradox Travel Network answers
        questions or offers input about a trip you are booking yourself, that
        guidance is general information only. It is not a formal travel
        advisory engagement, a professional recommendation, or a guarantee of
        suitability, availability, pricing, or outcome. You are responsible
        for reviewing eligibility requirements, terms, and details directly
        with the provider, and for the decision to book.
      </p>
      <h2>Affiliate relationships</h2>
      <p>
        Some outbound links are affiliate or referral links. Paradox Travel
        Network may earn a commission when a booking is made through one of
        these links. Pricing is set by the provider, not by Paradox Travel
        Network.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark underline">
          {links.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
