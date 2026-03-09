---
id: "202603091625-YR0ZNN"
title: "Repair docs shell layout and sidebar markers"
result_summary: "Documentation shell repaired without touching homepage surfaces."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T16:25:32.595Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T16:30:36.658Z"
  updated_by: "REVIEWER"
  note: "Docs shell repaired: sidebar markers hidden, layout top-aligned, side gutters restored, main prose column widened; bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor all passed."
commit:
  hash: "7333252cbab0d969568bdba5a27a896218bb556b"
  message: "🩹 YR0ZNN docs: repair docs shell layout"
comments:
  -
    author: "CODER"
    body: "Start: repair the docs-shell grid, remove sidebar section icons, widen the main docs column, and restore sane side gutters without touching the preview homepage."
  -
    author: "CODER"
    body: "Verified: docs shell markers removed, layout top-aligned, gutters restored, main prose width widened."
events:
  -
    type: "status"
    at: "2026-03-09T16:25:34.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the docs-shell grid, remove sidebar section icons, widen the main docs column, and restore sane side gutters without touching the preview homepage."
  -
    type: "verify"
    at: "2026-03-09T16:30:36.658Z"
    author: "REVIEWER"
    state: "ok"
    note: "Docs shell repaired: sidebar markers hidden, layout top-aligned, side gutters restored, main prose column widened; bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor all passed."
  -
    type: "status"
    at: "2026-03-09T16:30:57.947Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs shell markers removed, layout top-aligned, gutters restored, main prose width widened."
doc_version: 3
doc_updated_at: "2026-03-09T16:30:57.947Z"
doc_updated_by: "CODER"
description: "Fix the docs shell after the last spacing change: widen the main docs column, restore healthy side gutters, top-align the content area, and remove sidebar section icons without touching the preview homepage."
id_source: "generated"
---
## Summary

Repair docs shell layout and sidebar markers

Fix the docs shell after the last spacing change: widen the main docs column, restore healthy side gutters, top-align the content area, and remove sidebar section icons without touching the preview homepage.

## Scope

- In scope: Fix the docs shell after the last spacing change: widen the main docs column, restore healthy side gutters, top-align the content area, and remove sidebar section icons without touching the preview homepage.
- Out of scope: unrelated refactors not required for "Repair docs shell layout and sidebar markers".

## Plan

1. Repair the docs-shell grid in website/src/css/custom.css so the content column is top-aligned, wider, and no longer constrained by the broken 100% flex override.
2. Restore healthier left and right gutters while keeping the docs content narrower than the navbar.
3. Remove the visible sidebar section icons/markers and keep only text plus the expand caret.
4. Run docs/site, routing, and doctor checks; then commit and finish the task with traceable evidence.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: docs site typecheck, build, and design checks all pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing returns `OK`.
3. Run `agentplane doctor`. Expected: `errors=0` and `warnings=0`.
4. Inspect the docs shell. Expected: no left-side section icons, sidebar content aligns to the top, side gutters are visible, and the main prose column is wider than before without stretching to navbar width.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T16:30:36.658Z — VERIFY — ok

By: REVIEWER

Note: Docs shell repaired: sidebar markers hidden, layout top-aligned, side gutters restored, main prose column widened; bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T16:29:52.975Z, excerpt_hash=sha256:aa87323828d897dd0bd9b29007289d41a6bb7305f227075be0ee7d3f95d75d03

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
