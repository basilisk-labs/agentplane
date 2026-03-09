---
id: "202603091449-X1DE8S"
title: "Apply design v2 and homepage content refresh to preview surface"
result_summary: "Applied the v2 design/editorial guidance, upgraded the preview homepage to the richer acquisition layout, and aligned the design checker with the new surface model."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T14:50:27.708Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T15:00:26.186Z"
  updated_by: "REVIEWER"
  note: "Verified: DESIGN.md and EDITORIAL.md now use the v2 category-first contracts, /home-preview was remapped to the richer v2 acquisition surface while / stays a placeholder, and docs/site plus routing checks all pass."
commit:
  hash: "eac7f09ee3dc7a28191816c925679597ed95056b"
  message: "✅ 73NE1Q close: Refined /home-preview into a more typographic, minimal preview surface with tabbed prod... (202603091443-73NE1Q) [frontend]"
comments:
  -
    author: "CODER"
    body: "Start: apply the v2 design/editorial contracts and map the homepage patch onto the preview surface while preserving the root placeholder."
  -
    author: "CODER"
    body: "Verified: updated the site design and editorial contracts to v2 and remapped the provided homepage patch onto the /home-preview surface without changing the root placeholder."
events:
  -
    type: "status"
    at: "2026-03-09T14:50:34.459Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: apply the v2 design/editorial contracts and map the homepage patch onto the preview surface while preserving the root placeholder."
  -
    type: "verify"
    at: "2026-03-09T15:00:26.186Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: DESIGN.md and EDITORIAL.md now use the v2 category-first contracts, /home-preview was remapped to the richer v2 acquisition surface while / stays a placeholder, and docs/site plus routing checks all pass."
  -
    type: "status"
    at: "2026-03-09T15:00:37.001Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: updated the site design and editorial contracts to v2 and remapped the provided homepage patch onto the /home-preview surface without changing the root placeholder."
doc_version: 3
doc_updated_at: "2026-03-09T15:00:37.001Z"
doc_updated_by: "CODER"
description: "Update DESIGN.md and EDITORIAL.md to the new category-first design and messaging contracts, refresh website/CONTENT.md and homepage content data, and map the homepage implementation patch onto the /home-preview surface while leaving the root / placeholder unchanged."
id_source: "generated"
---
## Summary

Apply design v2 and homepage content refresh to preview surface

Update DESIGN.md and EDITORIAL.md to the new category-first design and messaging contracts, refresh website/CONTENT.md and homepage content data, and map the homepage implementation patch onto the /home-preview surface while leaving the root / placeholder unchanged.

## Scope

- In scope: Update DESIGN.md and EDITORIAL.md to the new category-first design and messaging contracts, refresh website/CONTENT.md and homepage content data, and map the homepage implementation patch onto the /home-preview surface while leaving the root / placeholder unchanged.
- Out of scope: unrelated refactors not required for "Apply design v2 and homepage content refresh to preview surface".

## Plan

1. Replace the current DESIGN.md and EDITORIAL.md with the v2 category-first design and messaging contracts from the provided patches.
2. Refresh website/CONTENT.md and website/src/data/homepage-content.ts to match the new homepage content and visual direction contract.
3. Map the provided homepage implementation patch onto /home-preview by updating website/src/pages/home-preview.tsx and website/src/pages/home-preview.module.css, while keeping the root / placeholder unchanged.
4. Run docs/site and policy verification, then record verification and close the task if the preview surface and docs contracts are consistent.

## Verify Steps

1. Run bun run docs:site:check. Expected: the website build, typecheck, and design checks pass with the preview homepage updates.
2. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing still passes after the DESIGN.md and EDITORIAL.md changes.
3. Run agentplane doctor. Expected: errors=0 and no new warnings caused by the docs/frontend batch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T15:00:26.186Z — VERIFY — ok

By: REVIEWER

Note: Verified: DESIGN.md and EDITORIAL.md now use the v2 category-first contracts, /home-preview was remapped to the richer v2 acquisition surface while / stays a placeholder, and docs/site plus routing checks all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T14:50:34.459Z, excerpt_hash=sha256:380ca8a00a9a88e3850698c1b74fcff124aa5d836a29e720dece77a821164fb0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
