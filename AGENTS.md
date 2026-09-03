# Paradox Travel Network — Agent Instructions

**Updated:** 2026-09-03 5:15 PM CDT
**By:** ChatGPT HQ — Codex  
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

1. `Paradox Travel Network/README_FIRST.md`
2. `Paradox Travel Network/PTN_BRAIN_REGISTRY.csv`
3. `Paradox Travel Network/PTN_AI_START_HERE.md`
4. `Paradox Travel Network/PTN_COMPANY_CORE_CONTEXT.md`
5. `Paradox Travel Network/Website & Digital/PTN_WEBSITE_CURRENT_STATE.md`
6. `Paradox Travel Network/Website & Digital/PTN_WEBSITE_COLLABORATION_HUB.md`
7. `Paradox Travel Network/PTN_RECENT_CHANGES.md` when recent changes matter
8. Add only the additional domain state required by the task:
   - Brand: `Brand Assets/PTN_BRAND_CURRENT_STATE.md`
   - Marketing: `Marketing & Social/PTN_MARKETING_CURRENT_STATE.md`
   - Suppliers: `Supplier & Vendor Management/PTN_SUPPLIERS_CURRENT_STATE.md`
   - Business: `AI & Planning/PTN_BUSINESS_CURRENT_STATE.md`
   - Client workflow: `General Master Business/PTN_CLIENT_WORKFLOW_CURRENT_STATE.md`

The Company Core gives shared business awareness; website/domain files provide deeper authority. Do **not** read all historical logs by default. Follow the routing rules in `PTN_AI_START_HERE.md`.

For an active ChatGPT/Claude/Codex handoff, use the relevant file in `AI & Planning/Active Task States/` if one exists.

## Write authorization

Read-only inspection, auditing, research, and verification are allowed when the task calls for them.

**Brian has delegated standing operational authority to ChatGPT HQ for necessary Paradox website, GitHub, and Netlify technical implementation that carries out approved business direction, architecture, maintenance, security, or bug-fix work.** HQ does not need repeated per-action Brian approval inside that delegated scope.

Claude, Codex, and other implementation agents may perform scoped writes when the task is explicitly directed or authorized by ChatGPT HQ or Brian. They may not self-authorize unrelated changes or expand scope merely because they have write-capable tools.

Fresh Brian approval is still required for material business-policy changes, pricing/fees, client commitments, bookings/payments/refunds, financial or legal commitments, credentials/recovery secrets, domain ownership/transfers, destructive deletion of protected records, or public changes that materially alter Paradox's offers, promises, positioning, or client-facing commitments.

A commit using **`[skip netlify]` is still a GitHub write**, but it is permitted when the underlying task is within HQ's standing delegated authority or has direct Brian approval.

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

Intermediate reviewed commits to `main` should include **`[skip netlify]`** when the work is not yet ready for production.

Production deployment is allowed when ChatGPT HQ or Brian has authorized the scoped implementation and the required validation has passed. Routine deployment of already-approved code/content is not a separate Brian-approval event under HQ's standing delegation.

Do not create an ordinary untagged commit to `main` as housekeeping. A later ordinary commit will deploy all accumulated skipped changes.

Do not alter tracking/referral query parameters, analytics IDs, or production integrations unless the task explicitly requires it and the change is verified.

## Keep this file small

This file is a router and operating guide, not the Paradox knowledge base. Durable business knowledge belongs in SharePoint. Exact implementation belongs in GitHub.
