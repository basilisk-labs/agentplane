---
id: "202603311332-AR77BP"
title: "N6.1 Extract reusable backend/task builders for command and workflow tests"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-81NZD4"
  - "202603311331-7GA03B"
  - "202603311332-75NADP"
tags:
  - "code"
  - "refactor"
  - "tests"
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
doc_updated_at: "2026-03-31T13:32:41.602Z"
doc_updated_by: "PLANNER"
description: "Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N6.1 Extract reusable backend/task builders for command and workflow tests
    
    Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N6.1 Extract reusable backend/task builders for command and workflow tests".
  Plan: |-
    1. Audit workflow tests, task command unit tests, backend tests and isolate the narrowest change set that satisfies N6.1.
    2. Implement extract reusable backend/task builders for command and workflow tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering workflow tests, task command unit tests, backend tests. Expected: the behavior targeted by N6.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-AR77BP. Expected: scope stays anchored to workflow tests, task command unit tests, backend tests plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit.
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

N6.1 Extract reusable backend/task builders for command and workflow tests

Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N6.1 Extract reusable backend/task builders for command and workflow tests".

## Plan

1. Audit workflow tests, task command unit tests, backend tests and isolate the narrowest change set that satisfies N6.1.
2. Implement extract reusable backend/task builders for command and workflow tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering workflow tests, task command unit tests, backend tests. Expected: the behavior targeted by N6.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-AR77BP. Expected: scope stays anchored to workflow tests, task command unit tests, backend tests plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
