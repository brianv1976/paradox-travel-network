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
      <h2>Affiliate relationships</h2>
      <p>
        Some outbound links are affiliate or referral links. A booking made
        through them may earn a commission at no additional cost to you. This does
        not change the price you pay the provider.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean underline">
          {links.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
