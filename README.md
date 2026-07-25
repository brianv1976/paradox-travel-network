# Paradox Travel Network — Bolt.new build

A clean, modern rebuild of paradoxtravelnetwork.com: **Vite + React + TypeScript +
Tailwind**, with Framer Motion animation, a pure-three.js interactive globe,
animated reviews, an AI travel concierge, and a data-driven blog. Built to be
imported into [Bolt.new](https://bolt.new) and grown from there.

---

## Get it into Bolt.new (two ways)

### Option A — GitHub (recommended)
1. Push this folder to a new GitHub repo (public is easiest).
2. In Bolt.new, click the GitHub icon → **Import from URL** → paste the repo URL.
   (Or just prefix the repo URL with `bolt.new/` in your browser.)
3. Bolt loads the project and runs `npm install` automatically.

### Option B — Upload
1. Zip this folder (a ready-made `ptn-bolt.zip` was delivered alongside it).
2. In Bolt.new, start a project and drag the files in, or upload the zip.

Either way, Bolt reads `.bolt/prompt.md` so its AI already knows the brand rules.

---

## Run locally (optional)
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Finish the wiring (env vars — both optional)
Copy `.env.example` to `.env`:
- `VITE_FORM_ENDPOINT` — connect the contact + trip forms to a backend
  (Formspree, Web3Forms, or a Supabase function). Route trip-planning to
  **trips@paradoxtravelnetwork.com** and general contact to
  **hello@paradoxtravelnetwork.com**.
- `VITE_CONCIERGE_ENDPOINT` — optional LLM endpoint for the AI concierge. It
  already works without one via a built-in responder.

## Deploy
- **Bolt hosting:** click Deploy → get a `*.bolt.host` URL. Connect
  `paradoxtravelnetwork.com` under the hosting/domain settings (paste the DNS
  records Bolt shows into your registrar).
- **Or Netlify/Vercel:** `npm run build` and deploy the `dist/` folder.

---

## Where things live
| Want to change… | Edit |
|---|---|
| Brand colors | `tailwind.config.js` |
| Fonts | `index.html` + `tailwind.config.js` |
| Images & all external links | `src/lib/assets.ts` |
| Blog posts | `src/data/blog.ts` |
| Service pages | `src/data/services.ts` |
| Nav / footer / FAQ | `src/data/site.ts` |
| Reviews (⚠ replace placeholders) | `src/data/reviews.ts` |
| Global rules for Bolt's AI | `.bolt/prompt.md` |

## Before you go live — checklist
- [ ] Replace placeholder reviews in `src/data/reviews.ts` with real ones.
- [ ] Set `VITE_FORM_ENDPOINT` and test both forms.
- [ ] Download the brand images from the Webflow CDN into `/public/assets` and
      update `src/lib/assets.ts` (so the site no longer depends on Webflow).
- [ ] Review the starter Privacy / Terms / Accessibility pages.
- [ ] Point the domain, publish.

See **PTN-MASTER-SPEC.md** for the full content + brand reference (and the
Webflow rebuild fallback).
