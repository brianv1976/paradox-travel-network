// Build-time only: collects per-route SEO metadata from the same data
// modules the app itself uses (services.ts, blog.ts, assets.ts), so the
// prerendered static HTML can never drift from what useSeo() sets at
// runtime. Bundled and imported from scripts/prerender-seo.mjs — not part
// of the shipped app bundle.
import { services } from "./services.ts";
import { publishedPosts, getPostImage } from "./blog.ts";
import { assets, business, links } from "../lib/assets.ts";

// Keep the site origin slash-free here. Route helpers add exactly one slash
// where needed, so a future SITE_URL override such as `https://example.com/`
// cannot create `//about/` canonicals, sitemap URLs, or image URLs.
const SITE_URL = (process.env.SITE_URL || "https://paradoxtravelnetwork.com").replace(/\/+$/, "");
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const OWNER_ID = `${SITE_URL}/#brian-voyles`;
const LOGO_ID = `${SITE_URL}/#logo`;
const HEADSHOT_ID = `${SITE_URL}/#brian-voyles-headshot`;

function canonicalUrl(pathname) {
  if (pathname === "/") return `${SITE_URL}/`;
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${SITE_URL}${path}`;
}

function absoluteUrl(value) {
  return new URL(value, `${SITE_URL}/`).href;
}

function organizationSchema() {
  return {
    "@type": "TravelAgency",
    "@id": ORGANIZATION_ID,
    name: business.name,
    url: canonicalUrl("/"),
    description: business.description,
    slogan: business.tagline,
    naics: business.naics,
    email: links.email,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: absoluteUrl(assets.logo),
      contentUrl: absoluteUrl(assets.logo),
    },
    location: { "@type": "Place", name: business.region },
    areaServed: business.areaServed,
    founder: { "@type": "Person", "@id": OWNER_ID },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: links.email,
    },
  };
}

function ownerSchema() {
  return {
    "@type": "Person",
    "@id": OWNER_ID,
    name: business.owner,
    jobTitle: business.role,
    url: canonicalUrl("/about"),
    description:
      "Owner and travel advisor at Paradox Travel Network, based in Dallas–Fort Worth and serving travelers nationwide.",
    image: {
      "@type": "ImageObject",
      "@id": HEADSHOT_ID,
      url: absoluteUrl(assets.headshot),
      contentUrl: absoluteUrl(assets.headshot),
      caption: "Brian Voyles, owner and travel advisor at Paradox Travel Network",
    },
    sameAs: [links.ownerLinkedIn],
    worksFor: { "@type": "TravelAgency", "@id": ORGANIZATION_ID },
  };
}

const staticPages = [
  {
    path: "/",
    title: "DFW Travel Advisor Serving Nationwide | Paradox Travel Network",
    description:
      "Based in Dallas-Fort Worth and serving travelers nationwide, Brian Voyles personally plans and books cruises, resorts, honeymoons, family trips, and more - or book through trusted travel partners.",
    images: [assets.logo, assets.headshot, assets.portrait],
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: business.name,
          url: canonicalUrl("/"),
          publisher: { "@id": ORGANIZATION_ID },
        },
        organizationSchema(),
        ownerSchema(),
      ],
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
    image: assets.headshot,
    images: [assets.headshot, assets.portrait],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${canonicalUrl("/about")}#profile-page`,
      url: canonicalUrl("/about"),
      name: "About Brian Voyles | Paradox Travel Network",
      isPartOf: { "@id": WEBSITE_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": HEADSHOT_ID,
        url: absoluteUrl(assets.headshot),
        contentUrl: absoluteUrl(assets.headshot),
        caption: "Brian Voyles, owner and travel advisor at Paradox Travel Network",
      },
      mainEntity: {
        ...ownerSchema(),
        image: [absoluteUrl(assets.headshot), absoluteUrl(assets.portrait)],
      },
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
    path: "/explore-travel",
    title: "Explore Travel Types | Paradox Travel Network",
    description:
      "Browse cruises, all-inclusive resorts, honeymoons, family trips, adventure travel, and custom vacations — with real planning guidance for each, from a Dallas–Fort Worth travel advisor serving travelers nationwide.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: canonicalUrl(`/${s.slug}`),
        name: s.navLabel,
      })),
    },
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
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.navLabel,
    description: s.metaDescription,
    provider: { "@type": "TravelAgency", "@id": ORGANIZATION_ID, name: business.name },
    areaServed: business.areaServed,
  },
}));

const blogPages = publishedPosts.map((p) => {
  const image = getPostImage(p);
  const url = canonicalUrl(`/travel-tips/${p.slug}`);
  return {
    path: `/travel-tips/${p.slug}`,
    title: `${p.title} | Postcards from Paradox`,
    description: p.seoDescription,
    image,
    ogType: "article",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.seoDescription,
      image: absoluteUrl(image),
      author: {
        "@type": "Person",
        "@id": OWNER_ID,
        name: p.author,
        url: canonicalUrl("/about"),
      },
      datePublished: p.date,
      dateModified: p.updatedDate ?? p.date,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      publisher: {
        "@type": "TravelAgency",
        "@id": ORGANIZATION_ID,
        name: business.name,
        logo: {
          "@type": "ImageObject",
          "@id": LOGO_ID,
          url: absoluteUrl(assets.logo),
          contentUrl: absoluteUrl(assets.logo),
        },
      },
    },
  };
});

export const routes = [...staticPages, ...servicePages, ...blogPages];