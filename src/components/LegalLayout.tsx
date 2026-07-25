import type { ReactNode } from "react";
import PageHero from "./PageHero";

/**
 * Shared shell for legal/policy pages. Prose content passed as children.
 */
export default function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title}>
        <p className="text-sm text-fog">Last updated: {updated}</p>
      </PageHero>
      <section className="container-px pb-24">
        <div className="prose-legal mx-auto max-w-3xl space-y-6 text-ink/85 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:leading-relaxed">
          {children}
        </div>
      </section>
    </>
  );
}
