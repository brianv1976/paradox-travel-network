# Paradox Travel Network

Production website for **Paradox Travel Network** at `paradoxtravelnetwork.com`.

Current stack: **Vite + React + TypeScript + Tailwind**, with Framer Motion,
Three.js, React Router, Lenis, GA4 analytics, a local-first travel concierge,
Tern trip intake, Calendly scheduling, and MailerLite newsletter signup.

## Source of truth

This GitHub repository (`brianv1976/paradox-travel-network`, `main`) is the
website code source of truth. **Netlify** hosts production and watches `main`.
SharePoint contains the durable project memory, operating notes, research, and
handover records.

The site previously ran through Bolt.new. Bolt was decommissioned on
2026-08-20 and is **not** part of the current build or deployment path. The
`.bolt/` directory is legacy only.

## Run locally

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

The production build outputs to `dist/`. The Vite prerender SEO plugin writes
route-specific static HTML and generates the production sitemap during the
build.

## Forms and lead paths

There is no generic form backend on this site:

- **General questions** → `mailto:hello@paradoxtravelnetwork.com`
- **Existing-client support** → `mailto:support@paradoxtravelnetwork.com`
- **Trip planning** → Tern-hosted trip intake form
- **Scheduling** → Calendly while the current scheduler remains in use
- **Newsletter signup** → `NewsletterForm.tsx` posts directly to MailerLite

The concierge currently works without an external endpoint through its built-in
local responder. `VITE_CONCIERGE_ENDPOINT` is optional if a reviewed external
concierge service is added later.

## Deployment workflow

**Do not assume every push to `main` should deploy.** Netlify builds consume
credits, so intermediate work is intentionally accumulated in GitHub without
creating a production build.

Use this workflow:

1. Make and review a change.
2. Commit/push it to `main` with **`[skip netlify]`** in the commit message.
3. Confirm Netlify did not create a new deploy.
4. Continue accumulating reviewed changes the same way.
5. Before release, review the complete diff and run executable validation when
   available (`npm run typecheck` and `npm run build`).
6. Create **one ordinary commit without a skip tag** only when the complete
   batch is ready. That commit triggers the Netlify production build and
   includes all previously skipped changes.

A later ordinary commit deploys the accumulated skipped changes too, so an
untagged commit is a release action, not harmless housekeeping.

See `DEPLOYMENT-WORKFLOW.md` for the full procedure and the SharePoint
`PTN-AI-Operating-Notes.md` / progress log for the current release state.

Domain registration and DNS authority remain at Porkbun; hosting is Netlify.

## Where things live

| Want to change… | Edit |
|---|---|
| Brand colors | `tailwind.config.js` |
| Fonts | `index.html` + `tailwind.config.js` |
| Images, business data & external links | `src/lib/assets.ts` |
| Postcards / travel content | `src/data/blog.ts` |
| Service pages | `src/data/services.ts` |
| Nav / footer / FAQ | `src/data/site.ts` |
| Newsletter signup | `src/components/NewsletterForm.tsx` |
| Route SEO source used at build time | `src/data/__seo_collect.mjs` |
| Runtime SEO behavior | `src/hooks/useSeo.ts` |
| Prerender SEO + generated sitemap | `scripts/vite-plugin-prerender-seo.mjs` |
| Netlify response headers | `public/_headers` |
| Netlify redirects / SPA fallback | `public/_redirects` |

All production imagery is self-hosted in this repository. There are no
placeholder reviews. `PTN-MASTER-SPEC.md` is the compact architecture/brand
reference; the current operational truth and change history live in the
SharePoint website memory logs.
