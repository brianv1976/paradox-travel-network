import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface Props {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function CTASection({
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: Props) {
  return (
    <section className="container-px py-24 md:py-32">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-ocean px-8 py-16 text-cream shadow-lift md:px-16 md:py-24">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-clay/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative flex max-w-2xl flex-col gap-5">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-semibold leading-[1.08] md:text-5xl">
            {title}
          </h2>
          {body && (
            <p className="text-lg leading-relaxed text-cream/80">{body}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-4">
            <Link to={primaryTo} className="btn bg-clay text-cream hover:bg-clay-dark">
              {primaryLabel}
              <ArrowRight size={16} />
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link
                to={secondaryTo}
                className="btn border border-cream/30 text-cream hover:bg-cream/10"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
