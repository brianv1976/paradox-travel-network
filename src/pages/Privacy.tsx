import { useSeo } from "../hooks/useSeo";
import LegalLayout from "../components/LegalLayout";
import { links } from "../lib/assets";

/**
 * NOTE: Reasonable starter policy that reflects the site's stated posture.
 * Have Brian review / adjust to his actual practices before publishing.
 */
export default function Privacy() {
  useSeo(
    "Privacy Policy | Paradox Travel Network",
    "How Paradox Travel Network collects, uses, and protects the information you share."
  );
  return (
    <LegalLayout eyebrow="Privacy" title="Privacy Policy" updated="July 2026">
      <p>
        Paradox Travel Network respects your privacy. This policy explains what
        we collect through this website and how it is used.
      </p>
      <h2>What we collect</h2>
      <p>
        The contact and trip-planning forms on this site are not yet connected
        to a backend. Right now, submitting a form does not send or store any
        information anywhere — nothing you type is transmitted, retained, or
        seen by anyone. Once form delivery is enabled, this policy will be
        updated first to name what is collected and how it is handled, and
        this section will describe that in detail. We do not ask for, and you
        should never submit, passport numbers, payment-card details, medical
        records, or other confidential identity documents through this site.
      </p>
      <h2>How we use it</h2>
      <p>
        When form delivery is active, information submitted through a form will
        be used only to respond to your inquiry and help plan or advise on
        travel. Submitting a form starts a conversation; it is not a booking and
        does not create a charge.
      </p>
      <h2>Third-party booking partners</h2>
      <p>
        This site links to trusted independent providers (such as Viator, Shore
        Excursions Group, and Exoticca). When you book with them, their own
        terms and privacy policies apply, and any payment is handled on their
        platforms — not here. Some links are affiliate links; a booking may earn
        Paradox Travel Network a commission at no additional cost to you.
      </p>
      <h2>Data retention &amp; contact</h2>
      <p>
        As of this writing, no inquiry details are retained through this
        website, since form delivery is not yet connected. Once it is, details
        will be kept only as long as needed to assist you. To ask what we
        hold, or to request deletion, email{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark underline">
          {links.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
