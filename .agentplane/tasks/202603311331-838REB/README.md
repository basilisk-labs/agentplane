---
id: "202603311331-838REB"
title: "N2.1 Introduce a shared bulk-write helper"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-Y8QMNA"
tags:
  - "code"
  - "refactor"
  - "backend"
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
doc_updated_at: "2026-03-31T13:31:20.255Z"
doc_updated_by: "PLANNER"
description: "Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N2.1 Introduce a shared bulk-write helper
    
    Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N2.1 Introduce a shared bulk-write helper".
  Plan: |-
    1. Audit task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` and isolate the narrowest change set that satisfies N2.1.
    2. Implement introduce a shared bulk-write helper with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`. Expected: the behavior targeted by N2.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-838REB. Expected: scope stays anchored to task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`.
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

N2.1 Introduce a shared bulk-write helper

Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N2.1 Introduce a shared bulk-write helper".

## Plan

1. Audit task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` and isolate the narrowest change set that satisfies N2.1.
2. Implement introduce a shared bulk-write helper with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`. Expected: the behavior targeted by N2.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-838REB. Expected: scope stays anchored to task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
