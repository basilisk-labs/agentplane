---
id: "202603311332-V2JXFM"
title: "N4.3 Unify doc concurrency and conflict semantics"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311332-ACCPE4"
  - "202603311332-95GHP9"
tags:
  - "code"
  - "refactor"
  - "backend"
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
doc_updated_at: "2026-03-31T13:32:34.228Z"
doc_updated_by: "PLANNER"
description: "Implement N4.3 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section conflicts and full-doc conflicts behave the same way across supported storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.3 Unify doc concurrency and conflict semantics
    
    Implement N4.3 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section conflicts and full-doc conflicts behave the same way across supported storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.3 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section conflicts and full-doc conflicts behave the same way across supported storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.3 Unify doc concurrency and conflict semantics".
  Plan: |-
    1. Audit core task store, local backend, command error mapping and isolate the narrowest change set that satisfies N4.3.
    2. Implement unify doc concurrency and conflict semantics with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering core task store, local backend, command error mapping. Expected: the behavior targeted by N4.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-V2JXFM. Expected: scope stays anchored to core task store, local backend, command error mapping plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: section conflicts and full-doc conflicts behave the same way across supported storage paths.
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

N4.3 Unify doc concurrency and conflict semantics

Implement N4.3 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section conflicts and full-doc conflicts behave the same way across supported storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.3 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section conflicts and full-doc conflicts behave the same way across supported storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.3 Unify doc concurrency and conflict semantics".

## Plan

1. Audit core task store, local backend, command error mapping and isolate the narrowest change set that satisfies N4.3.
2. Implement unify doc concurrency and conflict semantics with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering core task store, local backend, command error mapping. Expected: the behavior targeted by N4.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-V2JXFM. Expected: scope stays anchored to core task store, local backend, command error mapping plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: section conflicts and full-doc conflicts behave the same way across supported storage paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
