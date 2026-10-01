# Paradox Travel Network — Agent Instructions

**Updated:** 2026-10-01 1:18 PM CDT
**By:** ChatGPT HQ — GPT-5.6 Sol  
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

Follow the current SharePoint bootstrap rules in `Paradox Travel Network/README_FIRST.md`.

For a **fresh** Website / Visibility implementation session, the normal minimum is:

1. `Paradox Travel Network/README_FIRST.md`
2. `Paradox Travel Network/Website & Digital/PTN_WEBSITE_CURRENT_STATE.md`
3. `Paradox Travel Network/AI & Planning/Specialist Handoffs/PTN_HANDOFF_WEBSITE.md`

Load an ACTIVE task or another domain authority only when Brian is resuming that exact task or the current task genuinely depends on it. Do **not** load the Registry, router, Company Core, Recent Changes, collaboration logs, unrelated Current States, or historical handovers merely to get caught up.

Within the same continuous coding session, reuse already-loaded README/Current State context. Do not repeat the cold start merely because Brian gives another substantial Website instruction.

## Local workspace / OneDrive safety

Before any recursive local command, confirm the working directory is the exact `paradox-travel-network` repo/worktree or another explicitly scoped task folder.

- Recursive commands such as `rg`, `grep`, `find`, PowerShell recursion, directory walks, broad globs, or local indexing must stay inside that scoped directory.
- Never run recursive discovery from the parent Paradox workspace, OneDrive/SharePoint sync root, Documents, user profile, drive root, or another broad ancestor.
- Do not use Brian's locally synced OneDrive/SharePoint tree to discover or search PTN brain files. Use the connected SharePoint app and the deterministic paths in `README_FIRST.md`.
- Never trigger Files On-Demand hydration/download of cloud-only OneDrive/SharePoint content merely to search or inspect it.
- If a command unexpectedly starts OneDrive downloading/hydrating files or shows a cloud-download prompt, stop/cancel that command immediately, treat it as a scope violation, and correct the working directory/search target before continuing.
- Read-only commands are still subject to this boundary because they can cause network downloads and local side effects.

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
