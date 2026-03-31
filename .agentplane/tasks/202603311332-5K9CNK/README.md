---
id: "202603311332-5K9CNK"
title: "N4.4 Move command handlers and task materialization callers onto the shared doc path"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311332-95GHP9"
  - "202603311332-V2JXFM"
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
doc_updated_at: "2026-03-31T13:32:35.141Z"
doc_updated_by: "PLANNER"
description: "Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.4 Move command handlers and task materialization callers onto the shared doc path
    
    Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.4 Move command handlers and task materialization callers onto the shared doc path".
  Plan: |-
    1. Audit `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers and isolate the narrowest change set that satisfies N4.4.
    2. Implement move command handlers and task materialization callers onto the shared doc path with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers. Expected: the behavior targeted by N4.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-5K9CNK. Expected: scope stays anchored to `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: these callers no longer rebuild doc mutation logic locally.
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

N4.4 Move command handlers and task materialization callers onto the shared doc path

Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.4 Move command handlers and task materialization callers onto the shared doc path".

## Plan

1. Audit `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers and isolate the narrowest change set that satisfies N4.4.
2. Implement move command handlers and task materialization callers onto the shared doc path with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers. Expected: the behavior targeted by N4.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-5K9CNK. Expected: scope stays anchored to `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: these callers no longer rebuild doc mutation logic locally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
