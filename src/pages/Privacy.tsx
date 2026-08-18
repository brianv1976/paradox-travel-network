import { useSeo } from "../hooks/useSeo";
import LegalLayout from "../components/LegalLayout";
import { links } from "../lib/assets";

/**
 * NOTE: Reasonable starter policy that reflects the site's actual current
 * practices (no contact form, Tern-hosted trip form, MailerLite newsletter).
 * Have Brian review / adjust before publishing.
 */
export default function Privacy() {
  useSeo(
    "Privacy Policy | Paradox Travel Network",
    "How Paradox Travel Network collects, uses, and protects the information you share."
  );
  return (
    <LegalLayout eyebrow="Privacy" title="Privacy Policy" updated="August 2026">
      <p>
        Paradox Travel Network respects your privacy. This policy explains what
        we collect through this website and how it is used.
      </p>
      <h2>What we collect</h2>
      <p>
        This site has no contact form — general questions go straight to{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark underline">
          {links.email}
        </a>{" "}
        as an email you send yourself, the same as emailing any other address.
      </p>
      <p>
        Trip-planning inquiries are submitted through a form hosted by Tern, a
        third-party travel CRM. That form asks for your name, contact
        information, and trip details, which are stored on Tern's platform and
        used to build and manage your trip file. Tern's own privacy policy
        governs that data.
      </p>
      <p>
        The newsletter signup on this site collects your name and email
        address and sends them to MailerLite, our email newsletter provider,
        so we can send you the newsletter. You can unsubscribe at any time
        using the link in any newsletter email.
      </p>
      <p>
        We do not ask for, and you should never submit, passport numbers,
        payment-card details, medical records, or other confidential identity
        documents through this site.
      </p>
      <p>
        This site uses Google Analytics to understand overall traffic — which
        pages get visited, roughly where visitors come from, and which links
        (including the booking-partner and trip-form links above) get
        clicked. This is aggregate usage data, not tied to your name or
        contact information.
      </p>
      <h2>How we use it</h2>
      <p>
        Trip-inquiry information is used only to respond to your inquiry and
        help plan or advise on travel. Submitting the trip form starts a
        conversation; it is not a booking and does not create a charge.
        Newsletter information is used only to send the newsletter.
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
        Trip-inquiry details are kept in Tern only as long as needed to assist
        you. Newsletter details are kept in MailerLite until you unsubscribe or
        ask us to remove them. To ask what we hold, or to request deletion,
        email{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark underline">
          {links.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
