import { useEffect } from "react";

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

function normalizeCanonicalPath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function absoluteUrl(value: string) {
  return /^https?:\/\//i.test(value) ? value : window.location.origin + value;
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
      removeMeta("name", "robots");
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
      script.textContent = JSON.stringify(options.structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, options?.image, options?.ogType, options?.structuredData, options?.noindex]);
}
