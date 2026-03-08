---
id: "202603081006-CT5BE1"
title: "Add dual-read compatibility for task README v2 and v3"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081006-BD4X83"
  - "202603081006-9Y3YGR"
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-08T10:06:37.170Z"
doc_updated_by: "CODER"
description: "Teach task readers and lifecycle commands to understand both legacy v2 and new v3 task README formats without breaking old projects."
id_source: "generated"
---
## Summary

Add dual-read compatibility for task README v2 and v3

Teach task readers and lifecycle commands to understand both legacy v2 and new v3 task README formats without breaking old projects.

## Scope

- In scope: Teach task readers and lifecycle commands to understand both legacy v2 and new v3 task README formats without breaking old projects..
- Out of scope: unrelated refactors not required for "Add dual-read compatibility for task README v2 and v3".

## Plan

1. Implement the change for "Add dual-read compatibility for task README v2 and v3".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
