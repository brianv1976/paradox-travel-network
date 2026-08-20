# Paradox Travel Network

A clean, modern build of paradoxtravelnetwork.com: **Vite + React + TypeScript +
Tailwind**, with Framer Motion animation, a pure-three.js interactive globe,
an AI travel concierge, and a data-driven blog.

**Production architecture:** this GitHub repo (`brianv1976/paradox-travel-network`,
`main` branch) is the source of truth. **Netlify** watches it and auto-deploys
every push — no manual publish step. See `PTN-Services-and-Access-Map.md` in
the SharePoint handover folder for the full connected-services list.

> This project previously ran on Bolt.new (2026-06 through 2026-08-20). It was
> migrated off after Bolt's platform repeatedly auto-pushed its own stale state
> back to GitHub and silently reverted real work. The `.bolt/` directory is
> legacy and safe to ignore or remove — nothing in the live deploy path reads
> from it anymore.

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
Push to `main` — Netlify auto-builds (`npm run build`) and deploys. No manual
step. Domain DNS lives at Porkbun (registrar and DNS authority); Netlify's
domain settings show the exact records if that ever needs to change.

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

All images are self-hosted (no Webflow CDN dependency), and there are no
placeholder reviews on the site — see **PTN-MASTER-SPEC.md** for the full
content + brand reference, and **PTN-Services-and-Access-Map.md** /
**PTN-AI-Operating-Notes.md** for everything connected to this project
(hosting, DNS, CRM, SEO tooling, etc.) — all three live in the
`Website & Digital / Website AI Memory Logs and Handover` SharePoint folder.
