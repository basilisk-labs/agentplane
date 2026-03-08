---
id: "202603080540-NZX99N"
title: "P0: split local quality gates into fast and full tracks"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
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
doc_updated_at: "2026-03-08T05:40:02.867Z"
doc_updated_by: "CODER"
description: "Reduce developer push cost by separating mandatory fast local checks from full local CI while preserving release-grade verification paths."
id_source: "generated"
---
## Summary

P0: split local quality gates into fast and full tracks

Reduce developer push cost by separating mandatory fast local checks from full local CI while preserving release-grade verification paths.

## Scope

- In scope: Reduce developer push cost by separating mandatory fast local checks from full local CI while preserving release-grade verification paths..
- Out of scope: unrelated refactors not required for "P0: split local quality gates into fast and full tracks".

## Plan

1. Implement the change for "P0: split local quality gates into fast and full tracks".
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
