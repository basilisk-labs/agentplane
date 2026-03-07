---
id: "202603071710-EKJZW1"
title: "Clean up historical task archive noise"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071710-W5BWB6"
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
doc_updated_at: "2026-03-07T17:10:14.317Z"
doc_updated_by: "CODER"
description: "Reduce doctor noise from legacy task metadata and historical archive inconsistencies without hiding actionable current-state failures."
id_source: "generated"
---
## Summary

Clean up historical task archive noise

Reduce doctor noise from legacy task metadata and historical archive inconsistencies without hiding actionable current-state failures.

## Scope

- In scope: Reduce doctor noise from legacy task metadata and historical archive inconsistencies without hiding actionable current-state failures..
- Out of scope: unrelated refactors not required for "Clean up historical task archive noise".

## Plan

1. Implement the change for "Clean up historical task archive noise".
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
