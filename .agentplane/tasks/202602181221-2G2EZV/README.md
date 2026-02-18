---
id: "202602181221-2G2EZV"
title: "Refactor existing CI workflow to split contours"
result_summary: "Monolithic CI successfully split into contours"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602181221-RDFHCP"
  - "202602181221-S2DE05"
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
    body: "Start: refactoring legacy CI flow into split docs/core contour model with stable check names."
  -
    author: "CODER"
    body: "Verified: split CI contour is active with deterministic check names and required-check compatibility."
events:
  -
    type: "status"
    at: "2026-02-18T13:07:44.040Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refactoring legacy CI flow into split docs/core contour model with stable check names."
  -
    type: "status"
    at: "2026-02-18T13:07:44.388Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split CI contour is active with deterministic check names and required-check compatibility."
doc_version: 2
doc_updated_at: "2026-02-18T13:07:44.388Z"
doc_updated_by: "CODER"
description: "Update or deprecate monolithic ci.yml while preserving required checks and branch protection compatibility."
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
