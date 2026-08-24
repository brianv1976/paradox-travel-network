# Paradox Travel Network Deployment Workflow

Last updated: 2026-08-24

This repository is connected to Netlify production. Netlify build credits are finite, so routine GitHub commits must not trigger unnecessary production builds.

## Default rule: save work in GitHub without deploying

For intermediate work on `main`, use a commit message containing:

`[skip netlify]`

Netlify documents `[skip netlify]` and `[skip ci]` as commit-message controls that skip builds for commits received through the connected Git provider. Paradox uses `[skip netlify]` because the intent is explicit.

Examples:

- `Fix structured-data URL consistency [skip netlify]`
- `Stage search visibility improvements [skip netlify]`
- `Save audit fixes before final release [skip netlify]`

## Working procedure

1. Make and review a coherent set of changes.
2. Commit/push the set to GitHub with `[skip netlify]` in the commit message.
3. Confirm the GitHub commit landed on the intended branch.
4. Confirm Netlify did not replace the current production deploy.
5. Continue accumulating and reviewing work in GitHub.
6. Keep the SharePoint progress log and operating notes current so later AI sessions know which changes are saved but not live.

## Final production release

Only trigger a production build after the current work cycle has been exhausted as far as practical.

Before release:

1. Review every saved-but-not-live change since the last production deploy.
2. Run the normal build/type checks available for the project.
3. Confirm SEO, analytics, partner links, mobile behavior, and content changes are internally consistent.
4. Make one final commit **without** `[skip netlify]` or `[skip ci]`.
5. Let Netlify build that accumulated state once.
6. Verify the deploy reaches `ready` and `https://paradoxtravelnetwork.com` is serving the new release.
7. Recheck the important live routes, metadata, analytics hooks, and external links.
8. Submit changed/new canonical URLs to IndexNow after they are live when appropriate.
9. Update the SharePoint logs with the production commit SHA and Netlify deploy ID.

## Exceptions

An urgent production defect can justify an immediate normal commit/deploy. Cosmetic changes, research discoveries, copy refinements, SEO staging, analytics refinements, and non-urgent fixes do not.

## Important distinction

A skipped Netlify build does **not** mean the GitHub commit is temporary. The code is safely stored in repository history; it is simply not deployed. A later normal production commit builds the repository's accumulated current state.
