import { useEffect } from "react";

interface SeoOptions {
  /** Overrides the default og:image / twitter:image for this page. */
  image?: string;
  /** JSON-LD structured data object(s) to inject as <script type="application/ld+json">. */
  structuredData?: object | object[];
}

const SITE_NAME = "Paradox Travel Network";
const DEFAULT_IMAGE = "/Web Logo.png";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
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
 * cards, and optional JSON-LD structured data. Client-side only — this
 * doesn't fix "server HTML shows the homepage's meta until JS runs" for
 * crawlers that don't execute JavaScript. That needs real prerendering/SSR,
 * a bigger architectural change tracked separately from this hook.
 */
export function useSeo(title: string, description?: string, options?: SeoOptions) {
  useEffect(() => {
    if (!title) return;

    document.title = title;
    const url = window.location.origin + window.location.pathname;
    const image = options?.image
      ? window.location.origin + options.image
      : window.location.origin + DEFAULT_IMAGE;

    if (description) upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", image);
    if (description) upsertMeta("property", "og:description", description);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:image", image);
    if (description) upsertMeta("name", "twitter:description", description);

    const scriptId = "seo-structured-data";
    document.getElementById(scriptId)?.remove();
    if (options?.structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(options.structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, options?.image, options?.structuredData]);
}
