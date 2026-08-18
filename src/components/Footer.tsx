import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { footerBlurb, footerLinks } from "../data/site";
import { assets, business, links } from "../lib/assets";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-ocean-dark text-cream">
      <div className="container-px grid gap-12 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="max-w-md">
          <span className="font-display text-2xl font-semibold tracking-tight">
            {business.name}
          </span>
          <p className="mt-4 text-cream/90">{footerBlurb}</p>
          <a
            href={`mailto:${links.email}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream transition-colors hover:text-cream/80"
          >
            <Mail size={16} />
            {links.email}
          </a>
          <div className="mt-6 flex max-w-sm items-center gap-3">
            <span className="flex shrink-0 items-center rounded-md bg-cream px-3 py-3">
              <img
                src={assets.worldviaLogo}
                alt="WorldVia Travel Network"
                className="h-12 w-auto"
              />
            </span>
            <p className="text-xs leading-relaxed text-cream/90">
              Paradox Travel Network is an independent agency affiliated with
              WorldVia Travel Network, a Travel Leaders Network Associate.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-cream/90 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-px flex flex-col items-start justify-between gap-2 py-6 text-sm text-cream/90 md:flex-row md:items-center">
          <span className="font-display italic text-cream">
            {business.tagline}
          </span>
          <span>
            © {business.year} {business.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
