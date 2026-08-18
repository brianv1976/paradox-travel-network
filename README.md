# Paradox Travel Network — Bolt.new build

A clean, modern rebuild of paradoxtravelnetwork.com: **Vite + React + TypeScript +
Tailwind**, with Framer Motion animation, a pure-three.js interactive globe,
an AI travel concierge, and a data-driven blog. Built to be imported into
[Bolt.new](https://bolt.new) and grown from there.

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

## How forms work
There's no generic form backend — each channel goes straight to where it needs
to be:
- **General questions** → `mailto:hello@paradoxtravelnetwork.com` (Contact page).
- **Existing-client support** → `mailto:support@paradoxtravelnetwork.com`.
- **Trip planning** → links out to a Tern-hosted intake form (`PlanMyTrip.tsx`),
  which creates the trip in Tern's CRM directly.
- **Newsletter signup** → `NewsletterForm.tsx` posts directly to MailerLite's
  subscribe API (see `src/lib/assets.ts` for the endpoint/form IDs).

## Finish the wiring (env vars — optional)
Copy `.env.example` to `.env`:
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
| Newsletter signup form | `src/components/NewsletterForm.tsx` |
| Global rules for Bolt's AI | `.bolt/prompt.md` |

## Before you go live — checklist
- [ ] Review the starter Privacy / Terms / Accessibility pages.
- [ ] Point the domain, publish.

All images are self-hosted (no Webflow CDN dependency), and there are no
placeholder reviews on the site — see **PTN-MASTER-SPEC.md** for the full
content + brand reference.
