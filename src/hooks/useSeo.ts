import { useEffect } from "react";
import { assets, business, links } from "../lib/assets";

interface SeoOptions {
  /** Overrides the default og:image / twitter:image for this page. */
  image?: string;
  /** og:type — defaults to "website"; blog articles pass "article". Keep in
   *  sync with the same route's entry in src/data/__seo_collect.mjs so the
   *  prerendered and client-applied values never diverge. */
  ogType?: string;
  /** JSON-LD structured data object(s) to inject as <script type="application/ld+json">. */
  structuredData?: object | object[];
  /** Set true on pages (404, etc.) that should not be indexed. */
  noindex?: boolean;
}

const SITE_NAME = "Paradox Travel Network";
const DEFAULT_IMAGE = "/social-share.jpg";
const INDEX_ROBOTS = "index, follow, max-image-preview:large";

type JsonRecord = Record<string, unknown>;

function normalizeCanonicalPath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function absoluteUrl(value: string) {
  return new URL(value, `${window.location.origin}/`).href;
}

/**
 * Keep page-level JSON-LD connected to the canonical site entity graph that
 * is emitted in index.html. Some page components intentionally carry only a
 * compact provider/author object; after client-side navigation, those refs
 * should still resolve to the same PTN organization and Brian entities used
 * by the prerendered HTML instead of creating name-only duplicates.
 */
function canonicalizeSiteEntities(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalizeSiteEntities);
  if (!value || typeof value !== "object") return value;

  const node: JsonRecord = {};
  for (const [key, child] of Object.entries(value as JsonRecord)) {
    node[key] = canonicalizeSiteEntities(child);
  }

  const type = node["@type"];
  const name = node.name;
  const origin = window.location.origin;

  if (type === "WebSite" && name === business.name) {
    node["@id"] ??= `${origin}/#website`;
    node.publisher ??= { "@id": `${origin}/#organization` };
  }

  if (type === "TravelAgency" && name === business.name) {
    node["@id"] ??= `${origin}/#organization`;
    node.url ??= `${origin}/`;
    node.naics ??= business.naics;
    node.logo ??= {
      "@type": "ImageObject",
      "@id": `${origin}/#logo`,
      url: absoluteUrl(assets.logo),
      contentUrl: absoluteUrl(assets.logo),
    };
  }

  if (type === "Person" && name === business.owner) {
    node["@id"] ??= `${origin}/#brian-voyles`;
    node.url ??= `${origin}/about/`;
    node.sameAs ??= [links.ownerLinkedIn];
    node.image ??= absoluteUrl(assets.headshot);
    node.worksFor ??= { "@id": `${origin}/#organization` };
  }

  return node;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertLink(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

/**
 * Per-page SEO: title, description, canonical link, Open Graph/Twitter
 * cards, and optional JSON-LD structured data. The build-time prerender SEO
 * plugin writes matching route-specific metadata into static HTML for
 * crawlers and social scrapers; this hook keeps metadata correct after
 * client-side React Router navigation.
 */
export function useSeo(title: string, description?: string, options?: SeoOptions) {
  useEffect(() => {
    if (!title) return;

    document.title = title;
    // Netlify's clean-URL behavior resolves route directories to a trailing
    // slash (e.g. /plan-my-trip/). Keep canonical/OG URLs on that same final
    // URL even after React Router performs a client-side navigation without a
    // network redirect, so crawlers never see conflicting slash variants.
    const url = window.location.origin + normalizeCanonicalPath(window.location.pathname);
    const image = absoluteUrl(options?.image ?? DEFAULT_IMAGE);

    if (description) {
      upsertMeta("name", "description", description);
    } else {
      removeMeta("name", "description");
    }
    upsertLink("canonical", url);
    if (options?.noindex) {
      upsertMeta("name", "robots", "noindex, follow");
    } else {
      // Google uses this setting across Search, Images, Discover, Assistant,
      // and other Search surfaces to permit large first-party image previews.
      upsertMeta("name", "robots", INDEX_ROBOTS);
    }

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:type", options?.ogType ?? "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", image);
    if (description) {
      upsertMeta("property", "og:description", description);
    } else {
      removeMeta("property", "og:description");
    }

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:image", image);
    if (description) {
      upsertMeta("name", "twitter:description", description);
    } else {
      removeMeta("name", "twitter:description");
    }

    const scriptId = "seo-structured-data";
    document.getElementById(scriptId)?.remove();
    if (options?.structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(canonicalizeSiteEntities(options.structuredData));
      document.head.appendChild(script);
    }
  }, [title, description, options?.image, options?.ogType, options?.structuredData, options?.noindex]);
}
