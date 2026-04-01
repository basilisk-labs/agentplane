---
id: "202603311332-QS4K75"
title: "N5.5 Split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern"
result_summary: "integrate: squash task/202603311332-QS4K75/split-task-run-lifecycle"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311331-7GA03B"
tags:
  - "code"
  - "refactor"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T20:45:12.446Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T20:51:53.848Z"
  updated_by: "CODER"
  note: "Split runner/usecases/task-run-lifecycle.ts into shared/cancel/replay modules while preserving lifecycle contracts; eslint plus task-run-lifecycle and run-cli task query suites stayed green."
commit:
  hash: "6d870f3579278b7bc04f0ad4a6e2dce8cc2d7302"
  message: "📝 QS4K75 task: refresh pr artifacts after helpers"
comments:
  -
    author: "CODER"
    body: "Start: split runner/usecases/task-run-lifecycle.ts into shared, cancel, and replay modules while preserving lifecycle event ordering, execute-mode gating, and public import surface."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-QS4K75/pr."
events:
  -
    type: "status"
    at: "2026-03-31T20:46:34.115Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split runner/usecases/task-run-lifecycle.ts into shared, cancel, and replay modules while preserving lifecycle event ordering, execute-mode gating, and public import surface."
  -
    type: "verify"
    at: "2026-03-31T20:51:53.848Z"
    author: "CODER"
    state: "ok"
    note: "Split runner/usecases/task-run-lifecycle.ts into shared/cancel/replay modules while preserving lifecycle contracts; eslint plus task-run-lifecycle and run-cli task query suites stayed green."
  -
    type: "status"
    at: "2026-03-31T20:53:37.306Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-QS4K75/pr."
doc_version: 3
doc_updated_at: "2026-03-31T20:53:37.311Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N5.5 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.5 Split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern
    
    Implement N5.5 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.5 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.5 Split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.5.
    2. Implement split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.5 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-QS4K75. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T20:51:53.848Z — VERIFY — ok
    
    By: CODER
    
    Note: Split runner/usecases/task-run-lifecycle.ts into shared/cancel/replay modules while preserving lifecycle contracts; eslint plus task-run-lifecycle and run-cli task query suites stayed green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T20:46:34.132Z, excerpt_hash=sha256:a54c398271e291f3863fd0b1559b73ad5695d0381fd943386743c915e79fa07c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N5.5 Split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern

Implement N5.5 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.5 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.5 Split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.5.
2. Implement split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.5 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-QS4K75. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T20:51:53.848Z — VERIFY — ok

By: CODER

Note: Split runner/usecases/task-run-lifecycle.ts into shared/cancel/replay modules while preserving lifecycle contracts; eslint plus task-run-lifecycle and run-cli task query suites stayed green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T20:46:34.132Z, excerpt_hash=sha256:a54c398271e291f3863fd0b1559b73ad5695d0381fd943386743c915e79fa07c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
