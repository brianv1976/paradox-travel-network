import { useSeo } from "../hooks/useSeo";
import LegalLayout from "../components/LegalLayout";
import { links } from "../lib/assets";

export default function Accessibility() {
  useSeo(
    "Accessibility | Paradox Travel Network",
    "Paradox Travel Network's commitment to an accessible, usable website for everyone."
  );
  return (
    <LegalLayout
      eyebrow="Accessibility"
      title="Accessibility Statement"
      updated="July 2026"
    >
      <p>
        Paradox Travel Network wants this site to be usable by as many people as
        possible, including travelers who rely on assistive technology.
      </p>
      <h2>What we aim for</h2>
      <p>
        We work toward the WCAG 2.1 AA guidelines: readable color contrast,
        keyboard-navigable menus and forms, descriptive links and labels, and
        respect for reduced-motion preferences. Animations across the site are
        disabled automatically when your device requests reduced motion.
      </p>
      <h2>Ongoing work</h2>
      <p>
        Accessibility is never finished. If you encounter a barrier or something
        that is hard to use, please tell us — your feedback directly improves the
        site.
      </p>
      <h2>Contact</h2>
      <p>
        Email{" "}
        <a href={`mailto:${links.email}`} className="font-semibold text-ocean underline">
          {links.email}
        </a>{" "}
        with the page and the issue, and we'll work to fix it.
      </p>
    </LegalLayout>
  );
}
