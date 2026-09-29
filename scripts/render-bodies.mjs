/**
 * Post-build step (run after both `vite build` and `vite build --ssr
 * src/entry-server.tsx --outDir dist-ssr`): renders each route's actual page
 * body through React's server renderer and injects it into the matching
 * dist/<route>/index.html that vite-plugin-prerender-seo.mjs already wrote
 * with the correct <head> tags. Without this, every route ships an empty
 * `<div id="root"></div>` — a crawler that doesn't execute JavaScript would
 * see a title/description but no actual content.
 *
 * Reuses the same route list (loadRoutes) the head-tag plugin already
 * builds from, so this can never drift from what routes actually exist.
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadRoutes } from "./vite-plugin-prerender-seo.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

function canonicalPath(routePath) {
  return routePath === "/" ? "/" : routePath.endsWith("/") ? routePath : `${routePath}/`;
}

async function main() {
  const { renderRoute } = await import(`file://${path.join(ssrDir, "entry-server.js")}`);
  const routes = await loadRoutes(root);

  let rendered = 0;
  const failures = [];

  for (const route of routes) {
    const dir = route.path === "/" ? outDir : path.join(outDir, route.path.replace(/^\//, ""));
    const file = path.join(dir, "index.html");

    let bodyHtml;
    try {
      bodyHtml = await renderRoute(canonicalPath(route.path));
    } catch (err) {
      failures.push({ path: route.path, error: err.message });
      continue;
    }

    const html = await readFile(file, "utf-8");
    if (!html.includes('<div id="root"></div>')) {
      failures.push({ path: route.path, error: "no empty root div found to replace (already rendered, or template changed)" });
      continue;
    }
    await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`));
    rendered++;
  }

  await rm(ssrDir, { recursive: true, force: true });

  if (failures.length > 0) {
    console.error(`render-bodies: ${failures.length} route(s) failed to render:`);
    for (const f of failures) console.error(`  ${f.path}: ${f.error}`);
    process.exit(1);
  }

  console.log(`render-bodies: injected real page HTML into ${rendered} routes under ${path.relative(root, outDir)}/`);
}

main();
