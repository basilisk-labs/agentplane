---
id: "202603071710-W5BWB6"
title: "Extend onboarding smoke scenarios"
status: "TODO"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603071710-ZCVMEZ"
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
doc_updated_at: "2026-03-07T17:10:13.725Z"
doc_updated_by: "TESTER"
description: "Add scenario checks for legacy upgrade recovery, framework-checkout handoff, direct lifecycle, and branch_pr flow."
id_source: "generated"
---
## Summary

Extend onboarding smoke scenarios

Add scenario checks for legacy upgrade recovery, framework-checkout handoff, direct lifecycle, and branch_pr flow.

## Scope

- In scope: Add scenario checks for legacy upgrade recovery, framework-checkout handoff, direct lifecycle, and branch_pr flow..
- Out of scope: unrelated refactors not required for "Extend onboarding smoke scenarios".

## Plan

1. Implement the change for "Extend onboarding smoke scenarios".
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
