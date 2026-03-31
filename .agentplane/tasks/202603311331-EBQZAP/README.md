---
id: "202603311331-EBQZAP"
title: "N3.1 Define the shared transition request/executor contract"
result_summary: "integrate: squash task/202603311331-EBQZAP/shared-transition-executor"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-03-31T16:11:33.052Z"
  updated_by: "CODER"
  note: "Added a shared status-transition executor contract in commands/task/shared so status validation, dependency readiness, deferred warnings, and canonical transition application are owned in one place; verified with focused shared-layer lint, workflow-transition-service/shared unit suites, and agentplane build."
commit:
  hash: "2d76077f72d7ecf2920796a7de4f8edea5a44ca9"
  message: "📝 EBQZAP task: finalize PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: define a shared transition executor under commands/task/shared so status validation, dependency checks, deferred warnings, and transition application stop being reassembled per command before the command-level migrations land."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-EBQZAP/pr."
events:
  -
    type: "status"
    at: "2026-03-31T16:07:23.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define a shared transition executor under commands/task/shared so status validation, dependency checks, deferred warnings, and transition application stop being reassembled per command before the command-level migrations land."
  -
    type: "verify"
    at: "2026-03-31T16:11:33.052Z"
    author: "CODER"
    state: "ok"
    note: "Added a shared status-transition executor contract in commands/task/shared so status validation, dependency readiness, deferred warnings, and canonical transition application are owned in one place; verified with focused shared-layer lint, workflow-transition-service/shared unit suites, and agentplane build."
  -
    type: "status"
    at: "2026-03-31T16:12:52.819Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-EBQZAP/pr."
doc_version: 3
doc_updated_at: "2026-03-31T16:12:52.822Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-03-31T16:11:33.052Z — VERIFY — ok
    
    By: CODER
    
    Note: Added a shared status-transition executor contract in commands/task/shared so status validation, dependency readiness, deferred warnings, and canonical transition application are owned in one place; verified with focused shared-layer lint, workflow-transition-service/shared unit suites, and agentplane build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:07:23.943Z, excerpt_hash=sha256:7376f7d7247deaf120ddc8c60977de5e64f9b8298900074ec3b005f791183c67
    
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
### 2026-03-31T16:11:33.052Z — VERIFY — ok

By: CODER

Note: Added a shared status-transition executor contract in commands/task/shared so status validation, dependency readiness, deferred warnings, and canonical transition application are owned in one place; verified with focused shared-layer lint, workflow-transition-service/shared unit suites, and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:07:23.943Z, excerpt_hash=sha256:7376f7d7247deaf120ddc8c60977de5e64f9b8298900074ec3b005f791183c67

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
