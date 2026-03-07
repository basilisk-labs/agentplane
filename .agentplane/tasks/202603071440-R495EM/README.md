---
id: "202603071440-R495EM"
title: "Separate non-happy-path flags from default flows"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-VDK1TB"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:20:55.111Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: keep rare flags out of the default docs flow."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: move rare finish and upgrade flags out of the happy-path docs so the default agent flow stays short and obvious."
events:
  -
    type: "status"
    at: "2026-03-07T16:20:55.466Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: move rare finish and upgrade flags out of the happy-path docs so the default agent flow stays short and obvious."
doc_version: 2
doc_updated_at: "2026-03-07T16:20:55.466Z"
doc_updated_by: "DOCS"
description: "Move rare manual flags and exceptional recovery paths out of the main task flow into clearly separated sections."
id_source: "generated"
---
## Summary

Separate non-happy-path flags from default flows

Move rare manual flags and exceptional recovery paths out of the main task flow into clearly separated sections.

## Scope

- In scope: Move rare manual flags and exceptional recovery paths out of the main task flow into clearly separated sections..
- Out of scope: unrelated refactors not required for "Separate non-happy-path flags from default flows".

## Plan

1. Implement the change for "Separate non-happy-path flags from default flows".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
