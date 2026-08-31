import { useSeo } from "../hooks/useSeo";
import LegalLayout from "../components/LegalLayout";
import { links } from "../lib/assets";

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
        This site has no contact form. General questions go straight to{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark underline">
          {links.email}
        </a>{" "}
        as an email you send yourself, the same as emailing any other address.
      </p>
      <p>
        Trip-planning inquiries are submitted through a form hosted by Tern, a
        third-party travel CRM. That form asks for your name, contact
        information, and trip details, which are stored on Tern's platform and
        used to build and manage your trip file. Tern's privacy and security
        practices apply to information handled on its platform. You can review{" "}
        <a
          href="https://help.tern.travel/en/articles/8126635-data-privacy-and-security-in-tern"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-dark underline"
        >
          Tern's data privacy and security information
        </a>
        .
      </p>
      <p>
        The newsletter signup on this site collects your name and email
        address and sends them to MailerLite, our email newsletter provider,
        so we can send you the newsletter. You can unsubscribe at any time
        using the link in any newsletter email. MailerLite explains its data
        practices in its{" "}
        <a
          href="https://www.mailerlite.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-dark underline"
        >
          Privacy Policy
        </a>
        .
      </p>
      <p>
        If you choose the website's scheduling option, you are sent to a Tern
        scheduling page delivered through Nylas. Tern and Nylas may collect the
        contact and scheduling information you submit there. Tern's{" "}
        <a
          href="https://tern.travel/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-dark underline"
        >
          Privacy Policy
        </a>{" "}
        and Nylas's{" "}
        <a
          href="https://www.nylas.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-dark underline"
        >
          Privacy Policy
        </a>{" "}
        apply to their services.
      </p>
      <p>
        We do not ask for, and you should never submit, passport numbers,
        payment-card details, medical records, or other confidential identity
        documents through this website itself.
      </p>
      <p>
        This site uses Google Analytics to understand site usage, including
        page visits, session activity, approximate location, browser and
        device information, and clicks on important links. Google Analytics
        may use first-party cookies and identifiers such as a client ID to
        distinguish visits and sessions. Paradox does not intentionally send
        your name, email address, trip-form contents, or other directly
        identifying form data to Google Analytics. Google describes its default
        Analytics collection in its{" "}
        <a
          href="https://support.google.com/analytics/answer/11593727?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-dark underline"
        >
          Analytics Help documentation
        </a>
        .
      </p>
      <h2>How we use it</h2>
      <p>
        Trip-inquiry information is used to respond to your inquiry and help
        plan, advise on, or administer travel. Submitting the trip form starts a
        conversation; it is not a booking and does not create a charge.
        Newsletter information is used to send the newsletter. Scheduling
        information is used to arrange the call you requested.
      </p>
      <h2>Third-party booking partners</h2>
      <p>
        This site links to trusted independent providers such as Viator, Shore
        Excursions Group, and Exoticca. When you book with them, their own
        terms and privacy policies apply, and any payment is handled on their
        platforms, not here. Some links are affiliate links; a booking may earn
        Paradox Travel Network a commission at no additional cost to you.
      </p>
      <h2>Data retention &amp; contact</h2>
      <p>
        Trip-inquiry records may be retained in Tern for as long as reasonably
        needed to respond, plan or administer travel, maintain appropriate
        business records, or meet applicable obligations. Newsletter details
        are kept in MailerLite until you unsubscribe or ask us to remove them,
        subject to the provider's own retention practices. To ask what Paradox
        holds about you, or to request deletion where applicable, email{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean-dark underline">
          {links.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
