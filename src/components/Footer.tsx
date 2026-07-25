import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { footerBlurb, footerLinks } from "../data/site";
import { business, links } from "../lib/assets";

export default function Footer() {
  return (
    <footer className="bg-ocean-dark text-cream">
      <div className="container-px grid gap-12 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="max-w-md">
          <span className="font-display text-2xl font-semibold tracking-tight">
            {business.name}
          </span>
          <p className="mt-4 text-cream/70">{footerBlurb}</p>
          <a
            href={`mailto:${links.email}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-cream"
          >
            <Mail size={16} />
            {links.email}
          </a>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-cream/75 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-px flex flex-col items-start justify-between gap-2 py-6 text-sm text-cream/60 md:flex-row md:items-center">
          <span className="font-display italic text-cream/80">
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
