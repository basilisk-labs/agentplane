---
id: "202603061128-WM5C4Y"
title: "Align homepage CTA strategy"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T11:28:39.290Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved homepage CTA alignment scope."
verification:
  state: "ok"
  updated_at: "2026-03-06T13:20:54.055Z"
  updated_by: "CODER"
  note: "Command: git diff -- website/src/pages/index.tsx website/src/pages/index.module.css; bun run --cwd website typecheck; bun run --cwd website build. Result: pass. Evidence: homepage keeps docs as the primary CTA and install as the secondary action while the refreshed layout still builds cleanly. Scope: homepage CTA hierarchy and supporting homepage presentation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adjust homepage CTA hierarchy to docs-first primary and install secondary."
events:
  -
    type: "status"
    at: "2026-03-06T11:28:39.272Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adjust homepage CTA hierarchy to docs-first primary and install secondary."
  -
    type: "verify"
    at: "2026-03-06T13:20:54.055Z"
    author: "CODER"
    state: "ok"
    note: "Command: git diff -- website/src/pages/index.tsx website/src/pages/index.module.css; bun run --cwd website typecheck; bun run --cwd website build. Result: pass. Evidence: homepage keeps docs as the primary CTA and install as the secondary action while the refreshed layout still builds cleanly. Scope: homepage CTA hierarchy and supporting homepage presentation."
doc_version: 2
doc_updated_at: "2026-03-06T13:20:54.056Z"
doc_updated_by: "CODER"
description: "Keep documentation as the primary homepage CTA and surface CLI installation as the secondary action on the public home page."
id_source: "generated"
---
## Summary

Align homepage CTA strategy

Keep documentation as the primary homepage CTA and surface CLI installation as the secondary action on the public home page.

## Scope

- In scope: website/src/pages/index.tsx and homepage copy/CTA adjustments needed for docs-first messaging.
- In scope: minimal homepage content refinement only.
- Out of scope: blog changes, navbar changes, docs CONTENT map changes, and unrelated repository files.

## Plan

1. Keep the primary homepage CTA pointed at docs.
2. Replace the current secondary CTA with an explicit installation action that supports warm users without making install the main path.
3. Adjust adjacent homepage copy so the install command and secondary CTA reinforce the same action model.
4. Run the required verification and record evidence.

## Risks

- The homepage can regress into install-first messaging if copy and CTA hierarchy diverge; mitigation: keep docs as primary and installation as explicit secondary.
- Existing repository drift is unrelated; mitigation: constrain edits to homepage files only.
- External npm link introduces a product handoff; mitigation: keep docs and install visible together rather than replacing docs with npm.

## Verify Steps

### Scope
Validate the homepage CTA hierarchy and build integrity after the docs-first adjustment.

### Checks
- Homepage file diff review.
- Website TypeScript check.
- Website production build.

### Evidence / Commands
- git diff -- website/src/pages/index.tsx
- bun run typecheck
- bun run build

### Pass criteria
- Primary CTA stays docs-first.
- Secondary CTA surfaces CLI installation.
- Homepage still builds successfully.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T13:20:54.055Z — VERIFY — ok

By: CODER

Note: Command: git diff -- website/src/pages/index.tsx website/src/pages/index.module.css; bun run --cwd website typecheck; bun run --cwd website build. Result: pass. Evidence: homepage keeps docs as the primary CTA and install as the secondary action while the refreshed layout still builds cleanly. Scope: homepage CTA hierarchy and supporting homepage presentation.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T11:28:39.298Z, excerpt_hash=sha256:59cd3fd74f7c1dd7109f2d28cbd7c59a9ce44b05f572a98260b7b39833fdbe36

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the homepage CTA changes in website/src/pages/index.tsx.
2. Re-run website typecheck and build to confirm the previous homepage state.
3. Leave unrelated repository changes untouched.
