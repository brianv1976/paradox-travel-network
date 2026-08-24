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
  console.log(`build-integrity: verified ${urls.length} sitemap routes, prerender metadata, and host-control files`);
}
