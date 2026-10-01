# Paradox Travel Network — Implementation Agent Instructions

**Updated:** 2026-10-01
**By:** ChatGPT HQ Work — Codex
**Status:** CURRENT

## Purpose

This file is the normal bootstrap for Claude, Codex, Work, and other scoped implementation agents working in this repository.

**Do not perform the PTN standing-specialist cold start.**
Do not load the global SharePoint `README_FIRST.md`, Website Current State, specialist inbox, Registry, router, Company Core, Recent Changes, collaboration logs, or historical handovers merely to orient yourself.

The owning PTN specialist/HQ is responsible for business context and routing. Your job is to implement the scoped task.

## Minimal startup

1. Read this file.
2. Use the exact task/instructions supplied by the owning specialist/HQ.
3. Validate the mandatory launch packet below before discovery, writes, install, or build. Inspect only the repo/code/system surfaces needed for that task.
4. Fetch only exact named necessary authorities. If a missing fact blocks implementation, request its exact pointer from the owner; do not discover context broadly.

If the task prompt already contains enough approved context, **do not read SharePoint at all**.

If critical business context is missing, ask for the exact pointer or fetch only the exact named file. Do not browse/search the PTN brain to become generally informed.

### Mandatory implementation launch packet

Every standing specialist invoking Claude/Codex/Work must supply all fields below. The specialist validates before launch; the implementation agent validates before any discovery, write, install, or build.

- **Owner / return owner:** named standing specialist and exact inbox/report destination.
- **Objective / exact task:** bounded result and concrete actions.
- **Exact repository / system locator:** owner/repository or exact system URL/identifier, plus required connected apps. "Open the repo" or "check SharePoint" is invalid.
- **Branch / revision:** explicit branch/ref for repository work; explicit "not applicable" with reason for non-repository work.
- **Execution location:** absolute working directory when local execution is required; otherwise explicit connector-only execution. No parent-folder discovery.
- **Bootstrap location:** exact repo-root path at the named repository/ref (`AGENTS.md`, plus `CLAUDE.md` for Claude), or exact supplied non-repo bootstrap. "Read AGENTS.md" alone is invalid.
- **Exact additional sources:** complete SharePoint paths/repo-relative paths/system locators and purpose, or explicit "none"; no generic brain tour.
- **Allowed actions:** read/write/install/build/commit/deploy permissions by system and path.
- **Do-not-touch boundaries:** protected and unrelated surfaces.
- **Approval gates:** concrete stop conditions, preserving Brian's standing gates.
- **Validation:** exact commands and checks, expected success/failure behavior.
- **Completion criteria:** evidence required and conditions that remain incomplete.
- **Return report:** changed targets, revision/commit, checks with actual outcomes, deploy state, blockers, and next action to the return owner.

Missing, ambiguous, contradictory, or discovery-dependent fields fail validation. Return only the specific missing field(s) to the owner; do not compensate with broad retrieval or local discovery. An exact named source may create a concrete dependency; retrieve only that exact dependency if within allowed scope, otherwise return it to the owner. Never include secrets.

Implementation startup is repository-local instructions + validated packet + only exact named necessary authorities. An explicit exact-authority read does not authorize the standing-specialist cold start. The owner verifies and promotes durable truth and removes the inbox item; an implementation agent does not remove it unless expressly assigned that cleanup.

### Approved website development checkout

Repository: `brianv1976/paradox-travel-network`; starting branch: `main`; approved Windows working directory: `C:\Dev\paradox-travel-network`.

Clone from the exact GitHub repository into that directory, or use an existing checkout there only after verifying its exact Git origin, branch/revision, and worktree status. Preserve existing uncommitted work; never reset/overwrite it to obtain a clean checkout. Do not use the OneDrive/SharePoint-synced repo for active development and do not delete or retire it.

Before install/search/build, verify the resolved checkout is outside sync (including junction/symlink targets) and confine every command to that checkout. Reject recursive commands from any parent workspace, synced tree, user profile, or drive root before execution. Do not test this guard by actually scanning a forbidden directory.

In that exact checkout, inspect `package.json`/`package-lock.json` for the install contract; normally run `npm ci`, then `npm run typecheck`, `npm run build`, and `npm run validate:build`. Record origin/ref, resolved directory, install/check outcomes, and any hydration event. Unexpected Files On-Demand hydration requires immediate cancellation and a failed workspace check.

A cloud/Linux runtime cannot create or verify Brian's Windows checkout. Do not translate the Windows path into a Linux directory and claim success, silently substitute another checkout, or claim hydration-free Windows validation from remote checks. Report Windows setup/build validation as OPEN until an agent on Brian's Windows computer verifies it.

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
