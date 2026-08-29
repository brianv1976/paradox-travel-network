# Paradox Travel Network — Agent Instructions

**Updated:** 2026-08-29 6:18 PM CDT  
**By:** ChatGPT — GPT-5.6 Sol  
**Status:** CURRENT

## Repository

This is the production website repository for **Paradox Travel Network** at `paradoxtravelnetwork.com`.

Stack: Vite, React, TypeScript, Tailwind, Framer Motion, Three.js, React Router, Lenis, GA4, Netlify Functions.

## Authority

Use the right source for the right kind of truth:

1. **Live production** is authoritative for what visitors are actually receiving.
2. **GitHub `main`** is authoritative for current website/code implementation.
3. **Paradox SharePoint CURRENT_STATE files** are authoritative for business rules, positioning, brand, marketing, suppliers, client workflow, and operating decisions.
4. Historical logs, handovers, and superseded SharePoint files are reference only unless investigating history.

Do not copy permanent business knowledge into this repository just to make an agent remember it.

## SharePoint context for coding work

Before substantial website work, use the connected Paradox SharePoint knowledge system when available:

1. `Paradox Travel Network/PTN_AI_START_HERE.md`
2. `Paradox Travel Network/Website & Digital/PTN_WEBSITE_CURRENT_STATE.md`
3. `Paradox Travel Network/PTN_RECENT_CHANGES.md` when recent changes matter
4. Add only the domain state required by the task:
   - Brand: `Brand Assets/PTN_BRAND_CURRENT_STATE.md`
   - Marketing: `Marketing & Social/PTN_MARKETING_CURRENT_STATE.md`
   - Suppliers: `Supplier & Vendor Management/PTN_SUPPLIERS_CURRENT_STATE.md`
   - Business: `AI & Planning/PTN_BUSINESS_CURRENT_STATE.md`
   - Client workflow: `General Master Business/PTN_CLIENT_WORKFLOW_CURRENT_STATE.md`

Do **not** read all historical logs by default. Follow the routing rules in `PTN_AI_START_HERE.md`.

For an active ChatGPT/Claude/Codex handoff, use the relevant file in `AI & Planning/Active Task States/` if one exists.

## Write authorization

Read-only inspection, auditing, research, and verification are allowed when the task calls for them.

**Any write to the website, GitHub repository, or Netlify requires Brian's explicit permission for that specific action.** This includes source edits, file creation/deletion, commits to any branch, merges, configuration changes, redirects, environment/integration changes, and Netlify changes.

A prior approval does not automatically carry forward to a later write. Permission to audit, inspect, research, or recommend changes is not permission to implement them. A commit using **`[skip netlify]` is still a GitHub write and still requires explicit authorization**.

Production deployment is a separate action and requires fresh explicit approval even when the underlying code changes were already authorized.

## Build and validation

Install dependencies when needed:

```bash
npm install
```

For reviewed work:

```bash
npm run typecheck
npm run build
npm run validate:build
```

Use `npm run dev` for local development.

Do not claim a bug is fixed until the actual failure mode has been tested, especially responsive/mobile behavior.

## Deployment

Netlify watches `main`.

Intermediate reviewed commits to `main` must include **`[skip netlify]`** in the commit message so they do not trigger a production build.

**Production deployment requires Brian's explicit approval.** Do not create an ordinary untagged commit to `main` as housekeeping. A later ordinary commit will deploy all accumulated skipped changes.

Do not alter tracking/referral query parameters, analytics IDs, or production integrations unless the task explicitly requires it and the change is verified.

## Keep this file small

This file is a router and operating guide, not the Paradox knowledge base. Durable business knowledge belongs in SharePoint. Exact implementation belongs in GitHub.
