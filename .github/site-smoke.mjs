import fs from "node:fs";
import { chromium } from "@playwright/test";

const BASE = "http://127.0.0.1:4173";
const sitemap = fs.readFileSync("dist/sitemap.xml", "utf8");
const canonicalPaths = [...sitemap.matchAll(/<loc>(https:\/\/paradoxtravelnetwork\.com[^<]*)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname)
  .filter((path, index, all) => all.indexOf(path) === index);

if (!canonicalPaths.length) throw new Error("No canonical routes found in dist/sitemap.xml");

const normalize = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

const routeSet = new Set(canonicalPaths.map(normalize));
const failures = [];
const notes = [];

function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

async function settle(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(250);
}

async function assertRendered(page, scope) {
  const state = await page.evaluate(() => {
    const main = document.querySelector("#main-content") || document.querySelector("main");
    const bodyText = document.body?.innerText?.trim() ?? "";
    const mainText = main?.textContent?.trim() ?? "";
    return {
      title: document.title,
      bodyTextLength: bodyText.length,
      mainTextLength: mainText.length,
      loadingVisible: bodyText.includes("Loading page…"),
      hasMain: Boolean(main),
      overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    };
  });

  if (!state.hasMain) fail(scope, "missing main content container");
  if (state.bodyTextLength < 100) fail(scope, `body is effectively blank (${state.bodyTextLength} chars)`);
  if (state.mainTextLength < 20) fail(scope, `main content is effectively blank (${state.mainTextLength} chars)`);
  if (state.loadingVisible) fail(scope, "route loading fallback remained visible after settle");
  if (!state.title.trim()) fail(scope, "document title is blank");
  if (state.overflow > 8) fail(scope, `horizontal overflow ${state.overflow}px`);
}

function attachFailureWatchers(page, scope) {
  page.on("pageerror", (error) => fail(scope, `pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (request.url().startsWith(BASE)) {
      fail(scope, `failed internal request ${request.url()} (${request.failure()?.errorText ?? "unknown"})`);
    }
  });
  page.on("response", (response) => {
    if (response.url().startsWith(BASE) && response.status() >= 400) {
      const kind = response.request().resourceType();
      if (["document", "script", "stylesheet", "image", "font"].includes(kind)) {
        fail(scope, `internal ${kind} returned ${response.status()}: ${response.url()}`);
      }
    }
  });
}

async function collectInternalRouteLinks(page) {
  return page.evaluate((base) => {
    const found = [];
    for (const anchor of document.querySelectorAll("a[href]")) {
      try {
        const url = new URL(anchor.href, base);
        if (url.origin === new URL(base).origin) found.push(url.pathname);
      } catch {}
    }
    return [...new Set(found)];
  }, BASE);
}

async function clickPath(page, targetPath) {
  const target = normalize(targetPath);
  return page.evaluate(({ base, target }) => {
    const normalizePath = (pathname) => pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const anchor = [...document.querySelectorAll("a[href]")].find((a) => {
      try {
        const url = new URL(a.href, base);
        return url.origin === new URL(base).origin && normalizePath(url.pathname) === target;
      } catch {
        return false;
      }
    });
    if (!anchor) return false;
    anchor.click();
    return true;
  }, { base: BASE, target });
}

const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();
    attachFailureWatchers(page, `global/${viewport.name}`);

    for (const path of canonicalPaths) {
      const scope = `${viewport.name} direct ${path}`;
      const response = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 20000 }).catch((error) => {
        fail(scope, `navigation failed: ${error.message}`);
        return null;
      });
      if (response && response.status() >= 400) fail(scope, `document returned HTTP ${response.status()}`);
      await settle(page);
      await assertRendered(page, scope);

      const reloadScope = `${viewport.name} reload ${path}`;
      const reload = await page.reload({ waitUntil: "domcontentloaded", timeout: 20000 }).catch((error) => {
        fail(reloadScope, `reload failed: ${error.message}`);
        return null;
      });
      if (reload && reload.status() >= 400) fail(reloadScope, `document returned HTTP ${reload.status()}`);
      await settle(page);
      await assertRendered(page, reloadScope);
    }

    await context.close();
  }

  // Build an actual-link graph from the rendered desktop site, then exercise a real
  // client-side click into every sitemap route that has at least one internal link.
  const graphContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const graphPage = await graphContext.newPage();
  attachFailureWatchers(graphPage, "navigation graph");
  const incoming = new Map();

  for (const source of canonicalPaths) {
    await graphPage.goto(`${BASE}${source}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await settle(graphPage);
    for (const rawTarget of await collectInternalRouteLinks(graphPage)) {
      const target = normalize(rawTarget);
      if (routeSet.has(target) && target !== normalize(source) && !incoming.has(target)) {
        incoming.set(target, source);
      }
    }
  }

  for (const target of routeSet) {
    const source = incoming.get(target);
    if (!source) {
      notes.push(`No rendered internal-link source found for ${target}; direct/reload tests still covered it.`);
      continue;
    }
    const scope = `client navigation ${source} -> ${target}`;
    await graphPage.goto(`${BASE}${source}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await settle(graphPage);
    const clicked = await clickPath(graphPage, target);
    if (!clicked) {
      fail(scope, "link disappeared before click");
      continue;
    }
    await graphPage.waitForURL((url) => normalize(url.pathname) === target, { timeout: 12000 }).catch((error) => fail(scope, `URL did not reach target: ${error.message}`));
    await settle(graphPage);
    await assertRendered(graphPage, scope);
  }

  // Postcards regression: click every article from the list using SPA navigation,
  // verify the JS context survives, then reload the article and verify again.
  await graphPage.goto(`${BASE}/travel-tips`, { waitUntil: "domcontentloaded", timeout: 20000 });
  await settle(graphPage);
  const articlePaths = (await collectInternalRouteLinks(graphPage))
    .map(normalize)
    .filter((path) => path.startsWith("/travel-tips/") && routeSet.has(path));

  if (!articlePaths.length) fail("Postcards regression", "no article links found on /travel-tips");

  for (const articlePath of [...new Set(articlePaths)]) {
    const scope = `Postcards click ${articlePath}`;
    await graphPage.goto(`${BASE}/travel-tips`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await settle(graphPage);
    await graphPage.evaluate(() => { window.__PTN_SMOKE_CONTEXT__ = "survived"; });
    const clicked = await clickPath(graphPage, articlePath);
    if (!clicked) {
      fail(scope, "article link not found");
      continue;
    }
    await graphPage.waitForURL((url) => normalize(url.pathname) === articlePath, { timeout: 12000 }).catch((error) => fail(scope, `URL did not reach article: ${error.message}`));
    await settle(graphPage);
    await assertRendered(graphPage, scope);
    const contextSurvived = await graphPage.evaluate(() => window.__PTN_SMOKE_CONTEXT__ === "survived");
    if (!contextSurvived) fail(scope, "article click caused a full document reload instead of SPA navigation");

    const reloadScope = `Postcards reload ${articlePath}`;
    await graphPage.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
    await settle(graphPage);
    await assertRendered(graphPage, reloadScope);
  }

  await graphContext.close();
} finally {
  await browser.close();
}

console.log(`\nSmoke-tested ${canonicalPaths.length} sitemap routes at mobile + desktop widths.`);
for (const note of notes) console.log(`NOTE: ${note}`);

if (failures.length) {
  console.error(`\nFAILURES (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nPASS: direct loads, reloads, internal route transitions, lazy chunks, renders, internal asset requests, and Postcards SPA article navigation all passed.");
