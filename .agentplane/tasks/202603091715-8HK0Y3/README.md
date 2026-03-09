---
id: "202603091715-8HK0Y3"
title: "Fix docs shell sidebar alignment and content width"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T17:16:35.143Z"
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
    body: "Start: repair the docs shell layout so the sidebar aligns to the top, section labels render without icons, and the content column uses the remaining width with normal gutters."
events:
  -
    type: "status"
    at: "2026-03-09T17:16:45.347Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the docs shell layout so the sidebar aligns to the top, section labels render without icons, and the content column uses the remaining width with normal gutters."
doc_version: 3
doc_updated_at: "2026-03-09T17:16:45.347Z"
doc_updated_by: "CODER"
description: "Make the documentation sidebar align to the top, remove icons before section labels, increase the left gutter, and let the main docs content occupy the remaining page width with a normal right gutter."
id_source: "generated"
---
## Summary

Fix docs shell sidebar alignment and content width

Make the documentation sidebar align to the top, remove icons before section labels, increase the left gutter, and let the main docs content occupy the remaining page width with a normal right gutter.

## Scope

- In scope: Make the documentation sidebar align to the top, remove icons before section labels, increase the left gutter, and let the main docs content occupy the remaining page width with a normal right gutter.
- Out of scope: unrelated refactors not required for "Fix docs shell sidebar alignment and content width".

## Plan

1. Normalize docs-shell layout contract so the sidebar viewport sticks from the top clearance without extra internal offset.
2. Remove section-leading sidebar icons/pseudo-markers while preserving readable navigation and collapse behavior.
3. Expand left sidebar field and let the main docs column consume the remaining width with a normal right gutter.
4. Run docs site checks and doctor, then verify and finish the task.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
