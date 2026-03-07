---
id: "202603071710-A2MHWZ"
title: "Add runtime source diagnostics"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071710-CJMQZT"
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
doc_updated_at: "2026-03-07T17:10:11.357Z"
doc_updated_by: "CODER"
description: "Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots."
id_source: "generated"
---
## Summary

Add runtime source diagnostics

Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots.

## Scope

- In scope: Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots..
- Out of scope: unrelated refactors not required for "Add runtime source diagnostics".

## Plan

1. Implement the change for "Add runtime source diagnostics".
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
