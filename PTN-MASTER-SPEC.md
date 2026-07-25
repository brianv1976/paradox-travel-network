# Paradox Travel Network — Master Spec & Rebuild Bible

**Purpose of this file:** one source of truth for the site — brand, content,
links, and structure. It doubles as (1) context Bolt's AI can read, and (2) an
insurance policy: everything needed to rebuild the site on Webflow (or anywhere)
if the Bolt build ever has to be abandoned.

_Last compiled: July 2026, from the live Webflow staging site + project brand kit._

---

## 1. Business

Paradox Travel Network (PTN) — **Brian Voyles**, owner & travel advisor, based in
the **Dallas–Fort Worth** area, serving DFW + nationwide. A hybrid **self-booking
+ concierge** travel advisory run as a deliberate side business.

Two core paths:
- **Book It Yourself** — curated affiliate/white-label booking links, no markup.
- **Let Brian Plan It** — personal inquiry + planning service.

Central sales argument: the *paradox of choice* — travelers average ~16 hours
planning one trip. PTN sells clarity, confidence, and coverage. **Never leads
with price.**

---

## 2. Brand

**Voice:** genuinely enthusiastic, straight shooter, dry self-aware humor, warm
but not soft, confidently informal. Never a "sales voice." Signature dry lines,
e.g. *"Geography remains stubbornly unimpressed by marketing adjectives."*

**Story:** origin references "life threw me a curveball that changed everything" —
kept intentionally vague on the site.

**Caricature / mascot:** a humor device ONLY — used for tips/humor content
(Postcards from Paradox, Travel Tips cards). The **real headshot/portrait** is
used for trust pages (home hero, About, Contact). Do not use the caricature as a
primary brand/logo mark.

**Palette (this build — set in `tailwind.config.js`):**
| Token | Hex | Use |
|---|---|---|
| cream | `#F7F4EF` | page background (the one confirmed brand color) |
| sand | `#ECE4D6` | section tint |
| ink | `#1B1A17` | text |
| ocean | `#0E4B46` | primary brand (deep teal) |
| clay | `#CC6B3E` | warm accent |
| gold | `#C8A24C` | highlights |
| fog | `#6B6B62` | muted body text |

> ⚠ Only `cream (#F7F4EF)` is confirmed from the original brand. Ocean/clay/gold
> are a deliberate, cohesive palette chosen for this rebuild. If you have the
> exact Webflow brand hexes (Brand Guidelines PDF in SharePoint), drop them into
> `tailwind.config.js` — one edit updates the whole site.

**Fonts:** Fraunces (display/headings) + Inter (body), via Google Fonts in
`index.html`.

---

## 3. Site map / routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | hero + globe, choose-path, explore, how-it-works, about teaser, reviews, postcards, FAQ, CTA |
| `/book-it-yourself` | Book It Yourself | affiliate hub (Exoticca, Viator, Shore Excursions) |
| `/plan-my-trip` | Plan My Trip | full trip-planning intake form + Calendly |
| `/about` | About Brian | story + approach |
| `/contact` | Contact | general inquiry form + Calendly |
| `/travel-tips` | Postcards from Paradox | blog listing + newsletter |
| `/travel-tips/:slug` | Blog article | 11 posts |
| `/cruises` | Service: Cruises | vendor: Shore Excursions Group only |
| `/all-inclusive-resorts` | Service: All-Inclusive | vendors: Viator + Exoticca |
| `/romance-travel` | Service: Romance/Honeymoon | vendors: Viator + Exoticca |
| `/family-travel` | Service: Family | vendors: Viator + Exoticca |
| `/adventure-guided-travel` | Service: Adventure | vendors: Viator + Exoticca |
| `/privacy` `/terms` `/accessibility` | Legal | starter content — review before publishing |
| `*` | 404 | |

> **No Groups page.** The old site had a hidden `/groups` page; it is intentionally
> **removed** from this build. Do not re-add hidden/unused pages.

Full verbatim page copy lives in the code data files (`src/data/*.ts`) and page
components (`src/pages/*.tsx`). Key headlines:
- Home H1: *"Planning a great trip is harder than booking one. That's what a travel advisor is for."* (eyebrow: TRAVEL BEYOND EXPECTATIONS)
- Plan My Trip H1: *"When it's too complicated to Google."*
- Book It Yourself H1: *"All Your Favorite Booking Sites. One Page."*
- About H1: *"A real person helping make the trip make sense."*

---

## 4. Forms

**Trip Planning Intake** (`/plan-my-trip`) fields: First name, Last name, Email,
Phone, Destination, Preferred dates, Number of travelers, Budget (range), Type of
trip, "What matters most", Anything else, required consent checkbox.
→ route submissions to **trips@paradoxtravelnetwork.com**.

**General Contact** (`/contact`) fields: Name, Email, Subject, Message.
→ route submissions to **hello@paradoxtravelnetwork.com**.

**Newsletter** (blog): email only.

Wiring: all go through `src/lib/form.ts` → set `VITE_FORM_ENDPOINT`.
Scheduling link (all CTAs): `https://calendly.com/paradoxtravelnetwork/30min`.

**Privacy rule (keep on forms):** never request passport numbers, payment-card
details, medical records, or confidential documents.

**Email usage:** `brian@` and `hello@` appear publicly (contact + service pages).
`trips@` is the planning-form destination. (`brian@` is also the vendor/back-office
address.)

---

## 5. Affiliate & tracking links — DO NOT EDIT PARAMS

| Partner | URL |
|---|---|
| Viator | `https://www.viator.com/?pid=P00003200&uid=U00747481&mcid=58086&currency=USD` |
| Shore Excursions Group | `https://www.shoreexcursionsgroup.com/?source=portal&id=1786436&data=brian@paradoxtravelnetwork.com` |
| Exoticca (white-label) | `https://exoticca.com/us?advisor_token=brian-voyles-019a21e0-2339-7046-a141-9ecdc021d5e3` |

These carry Brian's referral/tracking IDs (the `data=`, `id=`, `pid/uid/mcid`, and
`advisor_token` params). They are backend tracking, not visible to users — keep
them exactly. Vendor split: **Cruises → Shore Excursions Group only**;
All-Inclusive/Romance/Family/Adventure → **Viator + Exoticca**.

---

## 6. Brand images (currently Webflow CDN)

Base: `https://cdn.prod.website-files.com/6a5858ae0ba27f2df8e26b31/`
- Primary logo: `…b41_Paradox Travel Network - Primary Logo.svg`
- Headshot: `…b40_Brian Voyles - Approved Headshot.png`
- Portrait: `…b3f_Brian Voyles - Approved Portrait.jpg`
- Mascot whiteboard: `…b5d_Brian Mascot Scene - Travel Tips Whiteboard.png`
- Placeholders: Cruise `…b3b`, Resort `…b3c`, Beach `…b3e`, Planning `…b3d`,
  Adventure `…b56`, Local Escape `…b58`

All referenced from `src/lib/assets.ts`. **Before canceling Webflow,** download
these into `/public/assets` and update the paths so the site is self-contained.

---

## 7. Blog — Postcards from Paradox (11 posts)

All by Brian Voyles, ~2 min reads. Full text in `src/data/blog.ts`.

| Category | Title | slug |
|---|---|---|
| Packing | If the Suitcase Needs a Wrestling Match, You Packed Too Much | `if-the-suitcase-needs-a-wrestling-match` |
| Airports | A Six-Minute Connection Is Not an Itinerary. It Is a Dare. | `six-minute-connection-is-a-dare` |
| Airports | The Cheapest Flight Can Become the Most Expensive Bad Decision | `cheapest-flight-can-cost-more` |
| Cruises | Arrive Before Embarkation Day When the Schedule Matters | `arrive-before-cruise-embarkation-day` |
| Cruises | Your Cruise Cabin Is a Room and Also a Location Decision | `cruise-cabin-location-matters` |
| Resorts | All-Inclusive Does Not Mean Every Inclusion Matters to You | `all-inclusive-does-not-mean-everything-matters` |
| Resorts | The Resort Is Not Close Because the Brochure Used the Word Convenient | `check-resort-transfer-time` |
| Planning | Check Passport Rules Before the Countdown Becomes Emotional | `check-passport-rules-early` |
| Planning | A Family Hotel Room Is Not Bigger Because Everyone Is Optimistic | `family-room-layout-matters` |
| General | Do Not Schedule the Vacation Until It Feels Like Another Job | `do-not-overschedule-the-vacation` |
| General | Save the Documents Before the Airport Wi-Fi Begins Its Rebellion | `save-travel-documents-offline` |

(There was a 12th draft — "Group Travel Needs Deadlines…" — left out as the Groups
concept is retired.)

---

## 8. New capabilities in this build (vs. Webflow)

- **Interactive 3D globe** hero (pure three.js) with animated arcs + cursor parallax
- **Scroll-progress bar**, **infinite destination ticker**, **animated count-up stats**
- **Animated reviews carousel** (`src/data/reviews.ts` — replace placeholders)
- **AI travel concierge** chat widget — works out of the box; upgrade with `VITE_CONCIERGE_ENDPOINT`
- Smooth scrolling (Lenis), scroll-reveal motion throughout, full mobile nav
- Everything content-driven for easy edits; reduced-motion respected for accessibility

---

## 9. Webflow rebuild fallback (if ever needed)

- Staging site ID: `6a5858ae0ba27f2df8e26b31` · URL `https://paradox-travel-network-ea5f6c00f9dbf487.webflow.io`
- **Master/production site ID: `6a5438c02e17e172c6b5fd4d` — NEVER edit or publish to it.**
- CMS "Travel Tips" collection: `6a5858ae0ba27f2df8e26b49`
- Category option IDs — Packing `4b9d741ac17d3bdb0469d7771377f3d2`, Airports
  `c309037ae10490c78b2b8c22de367261`, Cruises `8ca6be639e9d3bb42e3d223c6294f4dc`,
  Resorts `496199d9bb87e6a2353c1d1fc1b1fa46`, Planning
  `f21fb8bfcecb2c019830a9d009e2d176`, General `df0158fb02217533cb11adf2afa5d7f6`
- Everything else needed to rebuild (all copy, links, images) is in this repo's
  data files and components.
