---
id: "202603100659-2N9623"
title: "Refine docs layout and navigation labels"
result_summary: "Centered docs shell with plain sidebar labels"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T07:01:19.037Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-10T07:14:13.769Z"
  updated_by: "REVIEWER"
  note: "Docs build passed and scoped diff is clean"
commit:
  hash: "2c35be7f4b8104dbcfb1cc5684b9858467fd1137"
  message: "✨ website: refine docs shell layout"
comments:
  -
    author: "CODER"
    body: "Start: remove docs sidebar icons and simplify the centered two-column docs shell spacing and borders."
  -
    author: "REVIEWER"
    body: "Verified: docs sidebar labels are plain, and the docs shell now centers as a balanced two-column layout with simplified borders."
events:
  -
    type: "status"
    at: "2026-03-10T07:01:22.855Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove docs sidebar icons and simplify the centered two-column docs shell spacing and borders."
  -
    type: "verify"
    at: "2026-03-10T07:14:13.769Z"
    author: "REVIEWER"
    state: "ok"
    note: "Docs build passed and scoped diff is clean"
  -
    type: "status"
    at: "2026-03-10T07:19:10.743Z"
    author: "REVIEWER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs sidebar labels are plain, and the docs shell now centers as a balanced two-column layout with simplified borders."
doc_version: 3
doc_updated_at: "2026-03-10T07:19:10.743Z"
doc_updated_by: "REVIEWER"
description: "Remove sidebar icons and simplify centered two-column documentation layout with balanced gutters."
id_source: "generated"
---
## Summary

Adjust the documentation site layout so the docs shell reads as a centered two-column surface with cleaner spacing and plain section labels.

## Scope

- Remove decorative icons from docs sidebar category labels.
- Simplify docs shell gutters and borders for a centered two-column layout.
- Keep homepage and blog styling out of scope unless required by shared docs CSS selectors.

## Plan

1. Remove icon glyphs from docs sidebar category labels.
2. Rework docs-shell spacing so sidebar and content sit in a centered two-column frame with balanced outer gutters.
3. Reduce extra borders and decorative chrome to a simpler divider model.
4. Build the docs site to confirm the layout change compiles cleanly.

## Verify Steps

1. Run `agentplane task verify-show 202603100659-2N9623` and confirm the contract matches the intended scope.
2. Run `bun run --cwd website build` and expect a successful production docs build.
3. Inspect the resulting diff to confirm only the approved docs-site files and task artifacts changed.

## Verification

- Command: `agentplane task verify-show 202603100659-2N9623`
  Result: pass
  Evidence: Verify contract matched the approved scope: sidebar labels, docs-shell layout, and diff review.
  Scope: task acceptance contract.
- Command: `bun run --cwd website build`
  Result: pass
  Evidence: Docusaurus completed client/server compilation and generated static files in `website/build`.
  Scope: docs-site production build and SSR safety for the modified layout path.
- Command: `git status --short`
  Result: pass
  Evidence: only scoped website files plus the task artifact directory were modified before finish.
  Scope: drift check for approved files.
- Command: `git diff --stat -- website/sidebars.ts website/src/css/custom.css website/src/theme/DocRoot/Layout/index.tsx .agentplane/tasks/202603100659-2N9623/README.md`
  Result: pass
  Evidence: diff remained inside approved docs-site files and the task artifact.
  Scope: change-scope verification.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T07:14:13.769Z — VERIFY — ok

By: REVIEWER

Note: Docs build passed and scoped diff is clean

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T07:14:13.501Z, excerpt_hash=sha256:451243f89fcbb8b6ae8ee4290ac2b2713e8254b6996399ad4a9632595dd51ee5

Details:

Command: `bun run --cwd website build`
Result: pass
Evidence: generated static files in `website/build` after fixing the provider regression in the docs layout wrapper.
Scope: docs-site production build, SSR path, and modified shell layout.

Command: `git status --short` + `git diff --stat -- website/sidebars.ts website/src/css/custom.css website/src/theme/DocRoot/Layout/index.tsx .agentplane/tasks/202603100659-2N9623/README.md`
Result: pass
Evidence: only approved docs-site files and the task artifact changed.
Scope: drift and scope verification.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the sidebar label changes and docs-shell CSS/theme overrides, then rerun `pnpm --dir website build` to confirm the previous layout is restored.

## Findings

- Verification command updated from `pnpm --dir website build` to `bun run --cwd website build` because the repository declares `packageManager: bun@1.3.6`, and `pnpm` rejects the workspace.
- The first custom `DocRoot/Layout` implementation caused an SSR failure (`useDocsSidebar` outside `DocsSidebarProvider`) during static generation. The fix was to wrap `@theme-original/DocRoot/Layout` and style the resulting shell externally instead of reimplementing the provider-sensitive layout component.
