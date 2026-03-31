---
id: "202603311331-Y8QMNA"
title: "N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands"
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
doc_updated_at: "2026-03-31T13:31:12.912Z"
doc_updated_by: "PLANNER"
description: "Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands
    
    Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands".
  Plan: |-
    1. Audit `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` and isolate the narrowest change set that satisfies N0.2.
    2. Implement add local-backend vs non-local-backend parity tests for task mutation commands with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set`. Expected: the behavior targeted by N0.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-Y8QMNA. Expected: scope stays anchored to `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the same high-level mutation contract is asserted against both storage paths.
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

N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands

Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands".

## Plan

1. Audit `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` and isolate the narrowest change set that satisfies N0.2.
2. Implement add local-backend vs non-local-backend parity tests for task mutation commands with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set`. Expected: the behavior targeted by N0.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-Y8QMNA. Expected: scope stays anchored to `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the same high-level mutation contract is asserted against both storage paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
