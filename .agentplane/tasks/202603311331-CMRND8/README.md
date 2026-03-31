---
id: "202603311331-CMRND8"
title: "N3.2 Move `task start`, `task block`, and `task set-status` onto the executor"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-EBQZAP"
tags:
  - "code"
  - "refactor"
  - "workflow"
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
doc_updated_at: "2026-03-31T13:31:25.787Z"
doc_updated_by: "PLANNER"
description: "Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N3.2 Move `task start`, `task block`, and `task set-status` onto the executor
    
    Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N3.2 Move `task start`, `task block`, and `task set-status` onto the executor".
  Plan: |-
    1. Audit `task/start.ts`, `task/block.ts`, `task/set-status.ts` and isolate the narrowest change set that satisfies N3.2.
    2. Implement move `task start`, `task block`, and `task set-status` onto the executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/start.ts`, `task/block.ts`, `task/set-status.ts`. Expected: the behavior targeted by N3.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-CMRND8. Expected: scope stays anchored to `task/start.ts`, `task/block.ts`, `task/set-status.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those handlers become thin command-specific wrappers around the shared transition contract.
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

N3.2 Move `task start`, `task block`, and `task set-status` onto the executor

Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N3.2 Move `task start`, `task block`, and `task set-status` onto the executor".

## Plan

1. Audit `task/start.ts`, `task/block.ts`, `task/set-status.ts` and isolate the narrowest change set that satisfies N3.2.
2. Implement move `task start`, `task block`, and `task set-status` onto the executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/start.ts`, `task/block.ts`, `task/set-status.ts`. Expected: the behavior targeted by N3.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-CMRND8. Expected: scope stays anchored to `task/start.ts`, `task/block.ts`, `task/set-status.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those handlers become thin command-specific wrappers around the shared transition contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
