---
id: "202603311332-75NADP"
title: "N4.5 Lock doc-path parity with tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311332-95GHP9"
  - "202603311332-V2JXFM"
  - "202603311332-5K9CNK"
tags:
  - "code"
  - "refactor"
  - "backend"
  - "tests"
  - "task-doc"
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
doc_version: 3
doc_updated_at: "2026-03-31T13:32:36.075Z"
doc_updated_by: "PLANNER"
description: "Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.5 Lock doc-path parity with tests
    
    Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.5 Lock doc-path parity with tests".
  Plan: |-
    1. Audit command tests, backend tests, core task-store tests and isolate the narrowest change set that satisfies N4.5.
    2. Implement lock doc-path parity with tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering command tests, backend tests, core task-store tests. Expected: the behavior targeted by N4.5 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-75NADP. Expected: scope stays anchored to command tests, backend tests, core task-store tests plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: doc set/show/plan/verify flows prove parity across local and non-local paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N4.5 Lock doc-path parity with tests

Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.5 Lock doc-path parity with tests".

## Plan

1. Audit command tests, backend tests, core task-store tests and isolate the narrowest change set that satisfies N4.5.
2. Implement lock doc-path parity with tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering command tests, backend tests, core task-store tests. Expected: the behavior targeted by N4.5 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-75NADP. Expected: scope stays anchored to command tests, backend tests, core task-store tests plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: doc set/show/plan/verify flows prove parity across local and non-local paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
