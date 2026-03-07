---
id: "202603072032-V9VGT2"
title: "Switch stale-dist freshness to snapshot comparison"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603072032-1BC7VQ"
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
comments: []
doc_version: 2
doc_updated_at: "2026-03-07T20:32:43.290Z"
doc_updated_by: "CODER"
description: "Use build-manifest snapshots to treat rebuilt dirty runtime trees as fresh and keep strict blocking only when dist is actually behind the current source state."
id_source: "generated"
---
## Summary

Switch stale-dist freshness to snapshot comparison

Use build-manifest snapshots to treat rebuilt dirty runtime trees as fresh and keep strict blocking only when dist is actually behind the current source state.

## Scope

- In scope: Use build-manifest snapshots to treat rebuilt dirty runtime trees as fresh and keep strict blocking only when dist is actually behind the current source state..
- Out of scope: unrelated refactors not required for "Switch stale-dist freshness to snapshot comparison".

## Plan

1. Implement the change for "Switch stale-dist freshness to snapshot comparison".
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
