---
id: "202603311331-EBQZAP"
title: "N3.1 Define the shared transition request/executor contract"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-BVYTP3"
  - "202603311331-Y8QMNA"
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
doc_updated_at: "2026-03-31T13:31:24.867Z"
doc_updated_by: "PLANNER"
description: "Implement N3.1 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: one shared executor owns status validation, dependency checks, deferred warnings, and transition application. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N3.1 Define the shared transition request/executor contract
    
    Implement N3.1 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: one shared executor owns status validation, dependency checks, deferred warnings, and transition application. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N3.1 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: one shared executor owns status validation, dependency checks, deferred warnings, and transition application. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N3.1 Define the shared transition request/executor contract".
  Plan: |-
    1. Audit `commands/task/shared/*` and isolate the narrowest change set that satisfies N3.1.
    2. Implement define the shared transition request/executor contract with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `commands/task/shared/*`. Expected: the behavior targeted by N3.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-EBQZAP. Expected: scope stays anchored to `commands/task/shared/*` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: one shared executor owns status validation, dependency checks, deferred warnings, and transition application.
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

N3.1 Define the shared transition request/executor contract

Implement N3.1 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: one shared executor owns status validation, dependency checks, deferred warnings, and transition application. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N3.1 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: one shared executor owns status validation, dependency checks, deferred warnings, and transition application. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N3.1 Define the shared transition request/executor contract".

## Plan

1. Audit `commands/task/shared/*` and isolate the narrowest change set that satisfies N3.1.
2. Implement define the shared transition request/executor contract with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `commands/task/shared/*`. Expected: the behavior targeted by N3.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-EBQZAP. Expected: scope stays anchored to `commands/task/shared/*` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: one shared executor owns status validation, dependency checks, deferred warnings, and transition application.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
