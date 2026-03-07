---
id: "202603071440-MJHV8H"
title: "Link doctor diagnostics to recovery guidance"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071440-C201X2"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:20:54.998Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: doctor should point directly to the recovery path."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make doctor diagnostics point directly to the new recovery guidance and exact upgrade commands for incomplete managed policy trees."
events:
  -
    type: "status"
    at: "2026-03-07T16:20:55.350Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make doctor diagnostics point directly to the new recovery guidance and exact upgrade commands for incomplete managed policy trees."
doc_version: 2
doc_updated_at: "2026-03-07T16:20:55.350Z"
doc_updated_by: "CODER"
description: "Make doctor diagnostics point directly to the recovery commands and docs for missing managed policy trees and related hybrid states."
id_source: "generated"
---
## Summary

Link doctor diagnostics to recovery guidance

Make doctor diagnostics point directly to the recovery commands and docs for missing managed policy trees and related hybrid states.

## Scope

- In scope: Make doctor diagnostics point directly to the recovery commands and docs for missing managed policy trees and related hybrid states..
- Out of scope: unrelated refactors not required for "Link doctor diagnostics to recovery guidance".

## Plan

1. Implement the change for "Link doctor diagnostics to recovery guidance".
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
