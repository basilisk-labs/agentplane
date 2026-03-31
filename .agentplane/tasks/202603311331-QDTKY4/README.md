---
id: "202603311331-QDTKY4"
title: "N0.3 Add task README/doc mutation concurrency tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "backend"
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
doc_updated_at: "2026-03-31T13:31:13.829Z"
doc_updated_by: "PLANNER"
description: "Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N0.3 Add task README/doc mutation concurrency tests
    
    Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N0.3 Add task README/doc mutation concurrency tests".
  Plan: |-
    1. Audit section updates, full-doc replacement, expected-current conflict handling and isolate the narrowest change set that satisfies N0.3.
    2. Implement add task readme/doc mutation concurrency tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering section updates, full-doc replacement, expected-current conflict handling. Expected: the behavior targeted by N0.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-QDTKY4. Expected: scope stays anchored to section updates, full-doc replacement, expected-current conflict handling plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code.
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

N0.3 Add task README/doc mutation concurrency tests

Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N0.3 Add task README/doc mutation concurrency tests".

## Plan

1. Audit section updates, full-doc replacement, expected-current conflict handling and isolate the narrowest change set that satisfies N0.3.
2. Implement add task readme/doc mutation concurrency tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering section updates, full-doc replacement, expected-current conflict handling. Expected: the behavior targeted by N0.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-QDTKY4. Expected: scope stays anchored to section updates, full-doc replacement, expected-current conflict handling plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
