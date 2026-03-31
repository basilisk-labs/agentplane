---
id: "202603311331-7GA03B"
title: "N3.5 Delete obsolete transition branches and rerun lifecycle contract suites unchanged"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-CMRND8"
  - "202603311331-NERBXG"
  - "202603311331-SZBKHW"
tags:
  - "code"
  - "refactor"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T16:45:59.527Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T16:51:45.576Z"
  updated_by: "CODER"
  note: "Shared transition command helper now owns applyTaskMutation/executor/warning plumbing for start, block, and task set-status. Focused eslint, build, task unit suites, lifecycle CLI contracts, and block-finish contracts passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove remaining duplicated lifecycle transition plumbing now that the shared executor owns status/comment commit flows."
events:
  -
    type: "status"
    at: "2026-03-31T16:46:44.414Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove remaining duplicated lifecycle transition plumbing now that the shared executor owns status/comment commit flows."
  -
    type: "verify"
    at: "2026-03-31T16:51:45.576Z"
    author: "CODER"
    state: "ok"
    note: "Shared transition command helper now owns applyTaskMutation/executor/warning plumbing for start, block, and task set-status. Focused eslint, build, task unit suites, lifecycle CLI contracts, and block-finish contracts passed."
doc_version: 3
doc_updated_at: "2026-03-31T16:51:45.578Z"
doc_updated_by: "CODER"
description: "Implement N3.5 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: old duplicated transition logic is removed and the safety net still passes. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N3.5 Delete obsolete transition branches and rerun lifecycle contract suites unchanged
    
    Implement N3.5 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: old duplicated transition logic is removed and the safety net still passes. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N3.5 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: old duplicated transition logic is removed and the safety net still passes. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N3.5 Delete obsolete transition branches and rerun lifecycle contract suites unchanged".
  Plan: |-
    1. Audit affected task command modules and lifecycle CLI tests and isolate the narrowest change set that satisfies N3.5.
    2. Implement delete obsolete transition branches and rerun lifecycle contract suites unchanged with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering affected task command modules and lifecycle CLI tests. Expected: the behavior targeted by N3.5 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-7GA03B. Expected: scope stays anchored to affected task command modules and lifecycle CLI tests plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: old duplicated transition logic is removed and the safety net still passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T16:51:45.576Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared transition command helper now owns applyTaskMutation/executor/warning plumbing for start, block, and task set-status. Focused eslint, build, task unit suites, lifecycle CLI contracts, and block-finish contracts passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:46:44.428Z, excerpt_hash=sha256:729fc45c028cbd774f4c4f2718f536daea9ad940c4c5b3a938c08c3dc4d27756
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N3.5 Delete obsolete transition branches and rerun lifecycle contract suites unchanged

Implement N3.5 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: old duplicated transition logic is removed and the safety net still passes. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N3.5 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: old duplicated transition logic is removed and the safety net still passes. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N3.5 Delete obsolete transition branches and rerun lifecycle contract suites unchanged".

## Plan

1. Audit affected task command modules and lifecycle CLI tests and isolate the narrowest change set that satisfies N3.5.
2. Implement delete obsolete transition branches and rerun lifecycle contract suites unchanged with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering affected task command modules and lifecycle CLI tests. Expected: the behavior targeted by N3.5 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-7GA03B. Expected: scope stays anchored to affected task command modules and lifecycle CLI tests plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: old duplicated transition logic is removed and the safety net still passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T16:51:45.576Z — VERIFY — ok

By: CODER

Note: Shared transition command helper now owns applyTaskMutation/executor/warning plumbing for start, block, and task set-status. Focused eslint, build, task unit suites, lifecycle CLI contracts, and block-finish contracts passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:46:44.428Z, excerpt_hash=sha256:729fc45c028cbd774f4c4f2718f536daea9ad940c4c5b3a938c08c3dc4d27756

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
