---
id: "202603091625-YR0ZNN"
title: "Repair docs shell layout and sidebar markers"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair the docs-shell grid, remove sidebar section icons, widen the main docs column, and restore sane side gutters without touching the preview homepage."
events:
  -
    type: "status"
    at: "2026-03-09T16:25:34.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the docs-shell grid, remove sidebar section icons, widen the main docs column, and restore sane side gutters without touching the preview homepage."
doc_version: 3
doc_updated_at: "2026-03-09T16:29:52.975Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
