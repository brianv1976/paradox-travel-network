import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

function fail(message) {
  console.error(`build-integrity: ${message}`);
  process.exitCode = 1;
}

async function mustExist(relativePath) {
  try {
    await access(path.join(dist, relativePath));
  } catch {
    fail(`missing dist/${relativePath}`);
    return false;
  }
  return true;
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    match[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
  );
}

function htmlPathFor(urlString) {
  const { pathname } = new URL(urlString);
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  return clean ? path.join(clean, "index.html") : "index.html";
}

for (const file of ["index.html", "sitemap.xml", "robots.txt", "_headers", "_redirects"]) {
  await mustExist(file);
}

let sitemap;
try {
  sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
} catch {
  sitemap = "";
}

const urls = sitemapUrls(sitemap);
if (urls.length === 0) {
  fail("sitemap.xml contains no URLs");
} else if (new Set(urls).size !== urls.length) {
  fail("sitemap.xml contains duplicate URLs");
}

if (!sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) {
  fail("sitemap.xml is missing the Google image-sitemap namespace");
}
for (const imageUrl of [
  "https://paradoxtravelnetwork.com/Web%20Logo.png",
  "https://paradoxtravelnetwork.com/assets/Headshot.png",
  "https://paradoxtravelnetwork.com/assets/portrait.webp",
]) {
  if (!sitemap.includes(`<image:loc>${imageUrl}</image:loc>`)) {
    fail(`sitemap.xml is missing first-party identity image ${imageUrl}`);
  }
}

for (const url of urls) {
  const relativeHtml = htmlPathFor(url);
  const fullHtml = path.join(dist, relativeHtml);
  try {
    const html = await readFile(fullHtml, "utf8");
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!new RegExp(`<link\\s+rel=["']canonical["']\\s+href=["']${escapedUrl}["']`, "i").test(html)) {
      fail(`${relativeHtml} does not declare its sitemap URL as canonical`);
    }
    if (!/<title>[^<]+<\/title>/i.test(html)) {
      fail(`${relativeHtml} is missing a non-empty title`);
    }
    if (!/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html)) {
      fail(`${relativeHtml} is missing a non-empty meta description`);
    }
    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) {
      fail(`${relativeHtml} is listed in the sitemap but marked noindex`);
    }
    if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*max-image-preview:large[^"']*["']/i.test(html)) {
      fail(`${relativeHtml} does not explicitly allow large image previews`);
    }
    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noimageindex/i.test(html)) {
      fail(`${relativeHtml} blocks image indexing`);
    }
    if (!html.includes('id="site-entity-structured-data"')) {
      fail(`${relativeHtml} is missing the canonical site entity graph`);
    }
    if (!html.includes('https://paradoxtravelnetwork.com/#organization') || !html.includes('"naics": "561510"')) {
      fail(`${relativeHtml} is missing the canonical Paradox Travel Network organization identifiers`);
    }
    if (!html.includes("https://paradoxtravelnetwork.com/assets/portrait.webp") ||
        !html.includes('https://paradoxtravelnetwork.com/#brian-voyles-portrait')) {
      fail(`${relativeHtml} is missing the canonical high-resolution owner portrait entity`);
    }
    if (new URL(url).pathname === "/about/") {
      if (
        !html.includes('"@type":"ProfilePage"') ||
        !html.includes("https://paradoxtravelnetwork.com/assets/portrait.webp") ||
        !html.includes('"width":1279') ||
        !html.includes('"height":1600')
      ) {
        fail(`${relativeHtml} is missing Brian Voyles ProfilePage/high-resolution portrait identity markup`);
      }
    }
  } catch (error) {
    fail(`sitemap URL ${url} has no readable prerendered file at dist/${relativeHtml}: ${error.message}`);
  }
}

try {
  const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
  if (!/^Sitemap:\s*https:\/\/paradoxtravelnetwork\.com\/sitemap\.xml\s*$/im.test(robots)) {
    fail("robots.txt does not point at the production sitemap");
  }
} catch {
  // Missing file is already reported above.
}

if (!process.exitCode) {
  console.log(`build-integrity: verified ${urls.length} sitemap routes, entity/image signals, high-resolution owner identity, large image previews, prerender metadata, and host-control files`);
}
