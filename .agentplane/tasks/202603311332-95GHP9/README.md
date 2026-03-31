---
id: "202603311332-95GHP9"
title: "N4.2 Reuse shared doc mutation primitives inside the local backend and task store"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311332-ACCPE4"
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
doc_updated_at: "2026-03-31T13:32:33.312Z"
doc_updated_by: "PLANNER"
description: "Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.2 Reuse shared doc mutation primitives inside the local backend and task store
    
    Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.2 Reuse shared doc mutation primitives inside the local backend and task store".
  Plan: |-
    1. Audit `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` and isolate the narrowest change set that satisfies N4.2.
    2. Implement reuse shared doc mutation primitives inside the local backend and task store with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts`. Expected: the behavior targeted by N4.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-95GHP9. Expected: scope stays anchored to `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those modules stop carrying their own overlapping doc patch application logic.
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

N4.2 Reuse shared doc mutation primitives inside the local backend and task store

Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.2 Reuse shared doc mutation primitives inside the local backend and task store".

## Plan

1. Audit `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` and isolate the narrowest change set that satisfies N4.2.
2. Implement reuse shared doc mutation primitives inside the local backend and task store with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts`. Expected: the behavior targeted by N4.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-95GHP9. Expected: scope stays anchored to `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those modules stop carrying their own overlapping doc patch application logic.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
