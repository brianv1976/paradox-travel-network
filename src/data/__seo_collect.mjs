// Build-time only: collects per-route SEO metadata from the same data
// modules the app itself uses (services.ts, blog.ts, assets.ts), so the
// prerendered static HTML can never drift from what useSeo() sets at
// runtime. Bundled and imported from scripts/prerender-seo.mjs — not part
// of the shipped app bundle.
import { services } from "./services.ts";
import { publishedPosts } from "./blog.ts";
import { business } from "../lib/assets.ts";

const staticPages = [
  {
    path: "/",
    title: "DFW Travel Advisor Serving Nationwide | Paradox Travel Network",
    description:
      "Based in Dallas-Fort Worth and serving travelers nationwide, Brian Voyles personally plans and books cruises, resorts, honeymoons, family trips, and more - or book through trusted travel partners.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: business.name,
      location: { "@type": "Place", name: business.region },
      areaServed: ["United States", business.region],
      founder: { "@type": "Person", name: business.owner },
    },
  },
  {
    path: "/book-it-yourself",
    title: "Book Travel Yourself | Paradox Travel Network",
    description:
      "Book complete trips, shore excursions, tours, activities, attractions, transfers, and adventures through trusted travel partners.",
  },
  {
    path: "/plan-my-trip",
    title: "Plan My Trip | DFW Travel Advisor Serving Nationwide",
    description:
      "Tell a Dallas–Fort Worth-based travel advisor serving travelers nationwide about your trip, budget, dates, and style to begin personalized vacation planning.",
  },
  {
    path: "/about",
    title: "About Brian Voyles | Dallas–Fort Worth Travel Advisor",
    description:
      "Meet Brian Voyles, owner of Paradox Travel Network — based in Dallas–Fort Worth, personally planning trips for travelers nationwide.",
    image: "/assets/portrait.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: business.owner,
      jobTitle: business.role,
      worksFor: { "@type": "TravelAgency", name: business.name },
    },
  },
  {
    path: "/contact",
    title: "Contact a DFW Travel Advisor Serving Nationwide | Paradox Travel Network",
    description:
      "Contact Brian Voyles, a Dallas–Fort Worth-based travel advisor serving travelers nationwide, to ask a travel question, discuss a vacation, or find the right planning path.",
  },
  {
    path: "/travel-tips",
    title: "Postcards from Paradox | Destination Spotlights, Travel News & Tips",
    description:
      "Destination spotlights, travel news, and practical tips from Paradox Travel Network — plus an occasional newsletter with useful reminders.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Paradox Travel Network",
    description:
      "How Paradox Travel Network collects, uses, and protects the information you share.",
  },
  {
    path: "/terms",
    title: "Terms of Use | Paradox Travel Network",
    description: "The terms that govern use of the Paradox Travel Network website.",
  },
  {
    path: "/accessibility",
    title: "Accessibility | Paradox Travel Network",
    description:
      "Paradox Travel Network's commitment to an accessible, usable website for everyone.",
  },
];

const servicePages = services.map((s) => ({
  path: `/${s.slug}`,
  title: s.metaTitle,
  description: s.metaDescription,
  image: s.image,
}));

const blogPages = publishedPosts.map((p) => ({
  path: `/travel-tips/${p.slug}`,
  title: `${p.title} | Postcards from Paradox`,
  description: p.seoDescription,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.seoDescription,
    author: { "@type": "Person", name: p.author },
    datePublished: p.date,
    dateModified: p.updatedDate ?? p.date,
  },
}));

export const routes = [...staticPages, ...servicePages, ...blogPages];
