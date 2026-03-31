---
id: "202603311332-EFWRER"
title: "N6.4 Delete obsolete bespoke helpers after migration"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311332-AR77BP"
  - "202603311332-ZRVSA6"
  - "202603311332-4ZRYZ6"
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
doc_updated_at: "2026-03-31T13:32:44.354Z"
doc_updated_by: "PLANNER"
description: "Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N6.4 Delete obsolete bespoke helpers after migration
    
    Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N6.4 Delete obsolete bespoke helpers after migration".
  Plan: |-
    1. Audit old test-only helper modules and local duplicate builders and isolate the narrowest change set that satisfies N6.4.
    2. Implement delete obsolete bespoke helpers after migration with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering old test-only helper modules and local duplicate builders. Expected: the behavior targeted by N6.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-EFWRER. Expected: scope stays anchored to old test-only helper modules and local duplicate builders plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the new shared testkit replaces the superseded helpers cleanly.
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

N6.4 Delete obsolete bespoke helpers after migration

Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N6.4 Delete obsolete bespoke helpers after migration".

## Plan

1. Audit old test-only helper modules and local duplicate builders and isolate the narrowest change set that satisfies N6.4.
2. Implement delete obsolete bespoke helpers after migration with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering old test-only helper modules and local duplicate builders. Expected: the behavior targeted by N6.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-EFWRER. Expected: scope stays anchored to old test-only helper modules and local duplicate builders plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the new shared testkit replaces the superseded helpers cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
