# Paradox Travel Network — Current Website Master Spec

**Purpose:** compact architecture, brand, content, and rebuild reference for
`paradoxtravelnetwork.com`.

This file is not the deployment log. The website code is authoritative for
implemented behavior; SharePoint's website memory logs are authoritative for
current operating decisions, research, deployment state, and handover history.

_Last refreshed: August 24, 2026._

---

## 1. Business and site model

**Paradox Travel Network (PTN)** is a travel-advisor business based in the
**Dallas–Fort Worth** area and serving travelers nationwide.

The website intentionally supports two legitimate paths:

1. **Plan With Brian** — personal travel planning/advisor path.
2. **Book It Yourself** — curated partner links for visitors who prefer to
   research and book directly.

Neither path should be framed as the "wrong" way to travel. The site should
help visitors choose the amount of help they actually need.

Avoid broad promises such as "everything," "all trips," or unlimited coverage.
Describe representative trip types instead.

---

## 2. Brand

**Voice:** enthusiastic, straight-shooting, warm, confidently informal, with
occasional dry humor. Never generic brochure copy and never a hard-sales voice.

**Positioning:** Brian is the knowledgeable guide behind Paradox, not the
subject of every page or every social asset.

**Primary visual palette** is defined in `tailwind.config.js`:

| Token | Hex | Use |
|---|---|---|
| cream | `#F7F4EF` | main background |
| sand | `#ECE4D6` | section tint |
| ink | `#1B1A17` | primary text |
| ocean | `#0E4B46` | deep teal brand color |
| clay | `#CC6B3E` | warm accent |
| gold | `#C8A24C` | highlight accent |
| fog | `#6B6B62` | muted text |

**Fonts:** Fraunces for display/headings and Inter for body, loaded from Google
Fonts in `index.html`.

**Photography:** all production imagery is self-hosted in this repository.
Do not reintroduce a Webflow CDN dependency.

**Mascot/caricature:** supporting humor/content device, not the primary logo or
trust identity.

---

## 3. Current public routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/book-it-yourself` | self-book partner hub |
| `/plan-my-trip` | advisor planning path, Tern intake + scheduling CTA |
| `/explore-travel` | travel-type hub |
| `/about` | About Brian / advisor approach |
| `/contact` | contact options |
| `/travel-tips` | Postcards from Paradox listing |
| `/travel-tips/:slug` | individual Postcards article |
| `/cruises` | cruise service guide |
| `/all-inclusive-resorts` | all-inclusive service guide |
| `/romance-travel` | romance / honeymoon guide |
| `/family-travel` | family travel guide |
| `/adventure-guided-travel` | adventure / guided travel guide |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/accessibility` | Accessibility Statement |
| `/404` and unmatched routes | not-found page |

There is **no Groups page**. Do not resurrect old hidden/retired pages without a
new business decision.

The Trips architecture remains intentionally empty until real supplier training,
pricing, imagery, deep-linking, and offer rules are ready. Do not publish fake or
placeholder trips simply to fill a layout.

A future **Tours** service page is planned as a distinct category from Adventure,
but it is not a current public route.

---

## 4. Lead and communication paths

There is no generic website form backend.

- **General contact:** `hello@paradoxtravelnetwork.com`
- **Existing-client support:** `support@paradoxtravelnetwork.com`
- **Trip intake:** external Tern-hosted form
- **Scheduling:** Calendly while the current scheduler remains active
- **Newsletter:** MailerLite via `NewsletterForm.tsx`

The planning form is hosted and managed in Tern, so the website should not
pretend to store the submitted trip details itself.

**Privacy rule:** never ask visitors to submit passport numbers, payment-card
details, medical records, or other confidential identity documents through the
website itself.

Tern Scheduler is a researched future replacement/consolidation option for
Calendly. Do not remove Calendly until the Tern scheduling path has actually
been configured and QA'd.

---

## 5. Self-book partners and tracked links

The current Book It Yourself hub includes:

- **Exoticca** — packaged trips
- **Virgin Voyages** — adult-focused cruises
- **Project Expedition** — tours, excursions, attractions, transfers, and
  multi-day trips
- **Viator** — tours and activities marketplace
- **Shore Excursions Group** — cruise port-day excursions

The canonical tracked URLs live in `src/lib/assets.ts`. **Do not casually edit
tracking query parameters.** Agent, agency, advisor, campaign, and affiliate
parameters are intentional.

Current service-page self-book pairings:

- Cruises → Virgin Voyages + Shore Excursions Group
- All-Inclusive → Viator + Exoticca
- Romance → Viator + Exoticca
- Family → Viator + Exoticca
- Adventure → Viator + Exoticca

Supplier copy is time-sensitive. Verify current first-party supplier terms before
claiming inclusions, cancellation terms, guarantees, inventory counts, or price
advantages.

---

## 6. Postcards from Paradox

`src/data/blog.ts` is the content source of truth.

Visitor-facing content types are:

- Destination Spotlight
- Travel News
- Travel Tip

Travel Tips can also carry secondary topic categories such as Packing, Airports,
Cruises, Resorts, Planning, and General.

Some articles include curated service-page genre relationships, CTA destinations,
and first-party sources. Do not fabricate a service relationship or citation just
to create more internal links.

Travel News may be explicitly time-sensitive and should be refreshed when facts
age. The build-generated sitemap uses article `dateModified` when available.

---

## 7. SEO and search architecture

Runtime SEO is handled by `src/hooks/useSeo.ts`.

Build-time route metadata is collected in `src/data/__seo_collect.mjs` and
written into static route HTML by `scripts/vite-plugin-prerender-seo.mjs`.

The build plugin also generates production `sitemap.xml`, keeping public route
SEO and the sitemap from drifting apart.

Canonical URLs use trailing slashes on non-root routes to match Netlify's clean
URL behavior.

Homepage structured data currently includes:

- `WebSite`
- `TravelAgency`

The locked `business.areaServed` schema list is exactly:

```text
United States
Dallas–Fort Worth Metroplex
Dallas
Fort Worth
```

Do not expand this with suburbs, counties, states, or a home address merely for
keyword coverage.

The repository contains the existing IndexNow key file. IndexNow can be used
after a future production release to notify participating search engines of
changed/new/deleted URLs. It does not guarantee indexing.

---

## 8. Accessibility and motion

The site works toward WCAG 2.1 AA and has ongoing accessibility auditing.

Current architecture includes:

- skip-to-main-content link;
- keyboard-aware mobile navigation;
- explicit accessible labels and status messages;
- larger mobile touch targets;
- reduced-motion handling across shared components;
- global Framer Motion `MotionConfig reducedMotion="user"` safety net;
- manual reduced-motion handling for timers, autoplay, custom animation loops,
  and behaviors MotionConfig cannot stop automatically.

**Carousel rule:** normal autoplay does **not** pause on mouse hover. It may pause
through the explicit Pause control, reduced-motion behavior, or when the browser
tab is hidden.

---

## 9. Performance and resilience

The site uses route-level code splitting.

The lazy-route loader contains a one-time stale-chunk reload safeguard for tabs
left open across deployments. A route-level ErrorBoundary provides a usable
reload action if a page still fails after that recovery path.

The Three.js globe:

- uses a lower-resolution generated Earth texture on smaller screens;
- caps pixel ratio;
- suspends rendering while offscreen or the tab is hidden;
- preserves the intended visual globe size on mobile;
- includes WebGL fallback and cleanup behavior.

The Book It Yourself photo stack also avoids unnecessary background animation
work when it is not useful.

---

## 10. Analytics and privacy-sensitive tracking

GA4 measurement ID is configured in `index.html`.

`AnalyticsTracker.tsx` records important site actions such as planning-path
clicks, self-book-path clicks, email/phone clicks, Tern intake starts, Calendly
scheduling clicks, and sponsored booking-partner clicks.

Do not send visitor names, email addresses, form values, trip details, or full
query-string URLs to Google Analytics.

The current Content Security Policy allows only the third-party origins needed
by the implemented site features. `public/_headers` and the CSP mirror in the
prerender plugin must stay synchronized.

The concierge currently has no Netlify `VITE_CONCIERGE_ENDPOINT`, so it uses its
built-in local responder rather than sending chats to an external AI endpoint.

---

## 11. Deployment

Production hosting is **Netlify**. GitHub `main` is watched by Netlify.

Netlify builds consume credits, so routine development uses skipped staging:

```text
work
→ commit/push with [skip netlify]
→ verify Netlify did not build
→ accumulate reviewed work
→ complete pre-release review / executable validation
→ one ordinary untagged commit
→ one production Netlify build
```

A later ordinary commit includes all previously skipped changes, so **an untagged
commit to `main` is a release action**.

See `DEPLOYMENT-WORKFLOW.md` and the SharePoint operating notes for the current
release baseline and staged-commit count.

DNS/registrar authority remains Porkbun. Hosting remains Netlify.

---

## 12. Important file map

| Area | Source |
|---|---|
| business identity, external links, assets | `src/lib/assets.ts` |
| services | `src/data/services.ts` |
| Postcards | `src/data/blog.ts` |
| navigation/footer/FAQ | `src/data/site.ts` |
| future trip data architecture | `src/data/trips.ts` |
| runtime SEO | `src/hooks/useSeo.ts` |
| build SEO route collection | `src/data/__seo_collect.mjs` |
| prerender + generated sitemap | `scripts/vite-plugin-prerender-seo.mjs` |
| analytics click tracking | `src/components/AnalyticsTracker.tsx` |
| security response headers | `public/_headers` |
| redirects / SPA fallback | `public/_redirects` |
| deployment procedure | `DEPLOYMENT-WORKFLOW.md` |

---

## 13. Historical systems

Bolt.new and Webflow are historical build systems, not current production
architecture.

The `.bolt/` directory remains only as legacy debris and is not read by the live
site or Netlify build. Old Webflow IDs/CDN URLs may still be useful as historical
recovery references in SharePoint/version history, but they should not be used
as current implementation instructions.
