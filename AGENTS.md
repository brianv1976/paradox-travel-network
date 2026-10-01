# Paradox Travel Network — Implementation Agent Instructions

**Updated:** 2026-10-01
**By:** ChatGPT HQ — GPT-5.6 Sol
**Status:** CURRENT

## Purpose

This file is the normal bootstrap for Claude, Codex, Work, and other scoped implementation agents working in this repository.

**Do not perform the PTN standing-specialist cold start.**
Do not load the global SharePoint `README_FIRST.md`, Website Current State, specialist inbox, Registry, router, Company Core, Recent Changes, collaboration logs, or historical handovers merely to orient yourself.

The owning PTN specialist/HQ is responsible for business context and routing. Your job is to implement the scoped task.

## Minimal startup

1. Read this file.
2. Use the exact task/instructions supplied by the owning specialist/HQ.
3. Inspect only the repo/code/system surfaces needed for that task.
4. Fetch an additional SharePoint authority only when the task explicitly names it or a missing fact blocks safe implementation.

If the task prompt already contains enough approved context, **do not read SharePoint at all**.

If critical business context is missing, ask for the exact pointer or fetch only the exact named file. Do not browse/search the PTN brain to become generally informed.

## Scope

Stay inside the assigned task. Do not turn a bug fix into an audit, cleanup, redesign, architecture project, or broad reconciliation unless explicitly authorized.

Authority for implementation:
1. Live production = what visitors currently receive.
2. GitHub `main` = current code implementation.
3. Exact PTN business authority supplied by the task = business rules/decisions.

Do not copy permanent PTN business knowledge into this repository.

## Local workspace / OneDrive safety

Before recursive local commands, confirm the working directory is the exact `paradox-travel-network` repo/worktree or another explicitly scoped task folder.

- Keep `rg`, `grep`, `find`, PowerShell recursion, directory walks, broad globs, and local indexing inside that scoped directory.
- Never recursively scan the parent Paradox workspace, OneDrive/SharePoint sync root, Documents, user profile, or drive root.
- Never use Brian's synced OneDrive/SharePoint tree to discover PTN brain files.
- Never trigger Files On-Demand hydration/download merely to search or inspect cloud-only files.
- If OneDrive starts downloading/hydrating unexpectedly, stop/cancel the command immediately and correct the scope before continuing.

Read-only commands are subject to the same boundary because they can still cause local/network side effects.

## Writes and approval

Scoped technical writes are allowed when the task is explicitly assigned/authorized by Brian or ChatGPT HQ.

Do not infer execution from screenshots, pasted commentary, examples, or discussion.

Fresh Brian approval is required for credentials/recovery secrets, material business-policy changes, pricing/fees, client commitments, bookings/payments/refunds, financial/legal commitments, domain ownership/transfers, destructive deletion of protected records, or material public changes to PTN offers/promises/positioning.

Do not touch unrelated credentials, environment variables, hosting settings, or external account settings.

## Validation and deployment

For reviewed website work, use the checks implicated by the change. Typical full validation is:

```bash
npm run typecheck
npm run build
npm run validate:build
```

Do not claim a fix is complete until the actual failure mode is tested.

Netlify watches `main`. Use `[skip netlify]` for intermediate GitHub commits that must not deploy. Routine deployment of already-approved validated work is allowed within the authorized task.

Do not create unrelated housekeeping commits.
