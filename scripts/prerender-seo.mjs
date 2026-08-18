/**
 * Post-build step: writes a route-specific index.html for every known public
 * route, so the FIRST HTML byte a crawler/social-scraper sees already has the
 * right <title>, meta description, canonical, Open Graph/Twitter tags, and
 * JSON-LD — not just the homepage's, which is all `dist/index.html` alone
 * provides. React still mounts and re-applies the same values client-side
 * via useSeo() once JS runs (redundant, harmless), so this changes nothing
 * about how the app behaves — it only changes what a non-JS request sees.
 *
 * This only helps IF the static host serves e.g. `dist/about/index.html` for
 * a request to `/about` (the standard "clean URL" convention most static
 * hosts, including Netlify/Vercel/GitHub Pages, support out of the box).
 * Whether Bolt's static hosting does this has NOT been independently
 * confirmed as of writing — verify with a raw curl against the live URL
 * after deploying, and if Bolt always falls back to the SPA's index.html
 * regardless, this step is inert (harmless, but not doing anything) until
 * Bolt's hosting supports it or the project moves to a host that does.
 *
 * SITE_URL: the base origin used for canonical/OG/sitemap URLs. Defaults to
 * the live branded domain; override with SITE_URL for local/staging builds.
 */
import { build } from "esbuild";
import { writeFile, mkdir, readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SITE_URL = process.env.SITE_URL || "https://paradoxtravelnetwork.com";
const SITE_NAME = "Paradox Travel Network";
const DEFAULT_IMAGE = "/social-share.jpg";

/**
 * Content-Security-Policy, mirrored from public/_headers.
 *
 * Injected into the built HTML (not into the source index.html) so it applies
 * even if the static host ignores _headers, while leaving `vite dev` — which
 * serves the source index.html and needs an unrestricted HMR websocket —
 * completely unaffected.
 *
 * `frame-ancestors` is deliberately absent: browsers ignore it in a meta tag,
 * so the anti-framing protection is carried by _headers alone.
 *
 * Keep this in sync with public/_headers when adding a third-party origin.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://assets.mailerlite.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

function injectCsp(html) {
  if (html.includes('http-equiv="Content-Security-Policy"')) return html;
  const tag = `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`;
  // Insert after <meta charset> so the charset declaration stays within the
  // first bytes of <head>, where the parser expects it.
  const charset = /<meta\s+charset=["'][^"']*["']\s*\/?>/i;
  return charset.test(html)
    ? html.replace(charset, (m) => `${m}\n    ${tag}`)
    : html.replace(/<head>/i, `<head>\n    ${tag}`);
}

async function loadData() {
  const tmp = path.join(os.tmpdir(), `ptn-seo-data-${Date.now()}.mjs`);
  const result = await build({
    entryPoints: [path.join(ROOT, "src/data/__seo_collect.mjs")],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });
  await writeFile(tmp, result.outputFiles[0].text);
  const mod = await import(`file://${tmp}`);
  await rm(tmp, { force: true });
  return mod;
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function buildHead(template, { title, description, path: routePath, image, structuredData }) {
  const url = SITE_URL + routePath;
  const resolvedImage = image || DEFAULT_IMAGE;
  const img = /^https?:\/\//.test(resolvedImage) ? resolvedImage : SITE_URL + resolvedImage;
  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeAttr(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/>/s,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );

  const extraTags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  ];
  if (structuredData) {
    extraTags.push(
      `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`
    );
  }

  html = html.replace("</head>", `  ${extraTags.join("\n  ")}\n</head>`);
  return html;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error("dist/ not found — run `vite build` first.");
    process.exit(1);
  }
  const template = injectCsp(await readFile(path.join(DIST, "index.html"), "utf-8"));
  const { routes } = await loadData();

  let written = 0;
  for (const route of routes) {
    const html = buildHead(template, route);
    const outDir =
      route.path === "/" ? DIST : path.join(DIST, route.path.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
    written++;
  }
  console.log(`prerender-seo: wrote ${written} route-specific index.html files under dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
