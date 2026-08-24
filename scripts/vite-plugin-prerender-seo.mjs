/**
 * Vite plugin: writes a route-specific index.html for every known public
 * route as part of `vite build` itself, so the FIRST HTML byte a crawler/
 * social-scraper sees already has the right <title>, meta description,
 * canonical, Open Graph/Twitter tags, and JSON-LD — not just the homepage's,
 * which is all a bare `dist/index.html` alone provides. React still mounts
 * and re-applies the same values client-side via useSeo() once JS runs
 * (redundant, harmless), so this changes nothing about how the app behaves —
 * it only changes what a non-JS request sees.
 *
 * This runs from the `closeBundle` hook so it's baked into `vite build`
 * itself rather than a separate `&& node scripts/...` step in package.json —
 * some hosts (confirmed: Bolt's Publish pipeline) invoke `vite build`
 * directly and never run a project's own `npm run build` script, which
 * silently skipped this entire step and meant every non-homepage route was
 * served the homepage's metadata in production. A plugin hook can't be
 * skipped that way since it's part of the one build command every host runs.
 *
 * This only helps IF the static host serves e.g. `dist/about/index.html` for
 * a request to `/about` (the standard "clean URL" convention most static
 * hosts, including Netlify/Vercel/GitHub Pages, support out of the box) —
 * paired with the public/_redirects SPA-fallback rule so unmatched routes
 * still fall back to the root index.html instead of a bare 404.
 *
 * SITE_URL: the base origin used for canonical/OG/sitemap URLs. Defaults to
 * the live branded domain; override with SITE_URL for local/staging builds.
 */
import { build } from "esbuild";
import { writeFile, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

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
  const charset = /<meta\s+charset=["'][^"']*["']\s*\/?>/i;
  return charset.test(html)
    ? html.replace(charset, (m) => `${m}\n    ${tag}`)
    : html.replace(/<head>/i, `<head>\n    ${tag}`);
}

async function loadRoutes(root) {
  const tmp = path.join(os.tmpdir(), `ptn-seo-data-${Date.now()}.mjs`);
  const result = await build({
    entryPoints: [path.join(root, "src/data/__seo_collect.mjs")],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });
  await writeFile(tmp, result.outputFiles[0].text);
  const mod = await import(`file://${tmp}`);
  await rm(tmp, { force: true });
  return mod.routes;
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function canonicalPath(routePath) {
  if (routePath === "/") return "/";
  return routePath.endsWith("/") ? routePath : `${routePath}/`;
}

function buildHead(template, siteUrl, { title, description, path: routePath, image, ogType, structuredData }) {
  // Netlify resolves these directory-style prerendered pages to a trailing
  // slash. Emit that final URL in canonical and Open Graph tags so the HTML
  // doesn't point search engines at a URL that immediately redirects.
  const url = siteUrl + canonicalPath(routePath);
  const resolvedImage = image || DEFAULT_IMAGE;
  const img = /^https?:\/\//.test(resolvedImage) ? resolvedImage : siteUrl + resolvedImage;
  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeAttr(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/>/s,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );

  const extraTags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:type" content="${ogType || "website"}" />`,
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
      `<script type="application/ld+json" id="seo-structured-data">${JSON.stringify(structuredData)}</script>`
    );
  }

  html = html.replace("</head>", `  ${extraTags.join("\n  ")}\n</head>`);
  return html;
}

export default function prerenderSeoPlugin() {
  let root;
  let outDir;
  return {
    name: "prerender-seo",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(root, config.build.outDir);
    },
    async closeBundle() {
      const siteUrl = process.env.SITE_URL || "https://paradoxtravelnetwork.com";
      const templatePath = path.join(outDir, "index.html");
      const template = injectCsp(await readFile(templatePath, "utf-8"));
      const routes = await loadRoutes(root);

      let written = 0;
      for (const route of routes) {
        const html = buildHead(template, siteUrl, route);
        const dir = route.path === "/" ? outDir : path.join(outDir, route.path.replace(/^\//, ""));
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, "index.html"), html);
        written++;
      }
      this.info(`prerender-seo: wrote ${written} route-specific index.html files under ${path.relative(root, outDir)}/`);
    },
  };
}
