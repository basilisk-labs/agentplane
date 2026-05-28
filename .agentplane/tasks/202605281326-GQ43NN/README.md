---
id: "202605281326-GQ43NN"
title: "Handle context verify-task non-context skip"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T13:26:30.757Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T13:32:51.911Z"
  updated_by: "CODER"
  note: "Verified explicit non-applicable skip for non-context context verify-task."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement explicit context verify-task non-applicable skip handling for ordinary non-context tasks, add regression coverage, and verify with targeted tests plus policy/doctor gates."
events:
  -
    type: "status"
    at: "2026-05-28T13:27:17.242Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement explicit context verify-task non-applicable skip handling for ordinary non-context tasks, add regression coverage, and verify with targeted tests plus policy/doctor gates."
  -
    type: "verify"
    at: "2026-05-28T13:32:51.911Z"
    author: "CODER"
    state: "ok"
    note: "Verified explicit non-applicable skip for non-context context verify-task."
doc_version: 3
doc_updated_at: "2026-05-28T13:32:52.005Z"
doc_updated_by: "CODER"
description: "Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests."
sections:
  Summary: |-
    Handle context verify-task non-context skip

    Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests.
  Scope: |-
    - In scope: Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests.
    - Out of scope: unrelated refactors not required for "Handle context verify-task non-context skip".
  Plan: |-
    1. Inspect context verify-task command behavior for non-context tasks and existing context verification tests.
    2. Implement explicit non-applicable skip handling for tasks that are not task_kind=context so policy/doctor evidence can record a skip without presenting hidden success.
    3. Add focused regression coverage for ordinary task new / code task behavior and keep existing context-task failure behavior intact.
    4. Run targeted tests plus policy routing, doctor, and task verify-show; record any explicit skips in task verification.
  Verify Steps: |-
    1. Run focused regression tests for context verify-task non-context behavior. Expected: non-context tasks produce an explicit non-applicable skip result, while malformed context tasks still fail validation.
    2. Run the relevant context verify-task/maximum-assimilation test subset. Expected: existing context-task validation remains green.
    3. Run policy/runtime gates: node .agentplane/policy/check-routing.mjs and ap doctor. Expected: both pass.
    4. Run ap task verify-show 202605281326-GQ43NN. Expected: declared task verification contract is visible and satisfied or any skip is recorded explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T13:32:51.911Z — VERIFY — ok

    By: CODER

    Note: Verified explicit non-applicable skip for non-context context verify-task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T13:27:17.242Z, excerpt_hash=sha256:f0cd55d010af445f6dc464218f66275631a1dffcec19f5bfff824d3f06c1b2a0

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts. Result: pass. Evidence: 1 file, 3 tests passed; ordinary task-new task reports skipped_not_applicable and malformed context task still fails validation. Scope: regression for context verify-task applicability.
    Command: bunx vitest run packages/agentplane/src/commands/context/verify-task.maximum-assimilation.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass. Evidence: 2 files, 23 tests passed. Scope: existing context-task and maximum-assimilation behavior.
    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy graph/routing budgets.
    Command: ap doctor. Result: pass. Evidence: doctor OK; errors=0 warnings=0. Scope: runtime and workflow health.
    Command: ap task verify-show 202605281326-GQ43NN. Result: pass. Evidence: Verify Steps and blueprint evidence displayed; snapshot current. Scope: task verification contract.
    Command: bunx prettier --check packages/agentplane/src/context/verify-task.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts. Result: pass. Evidence: all matched files use Prettier style. Scope: touched files formatting.
    Command: bunx eslint packages/agentplane/src/context/verify-task.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts. Result: pass. Evidence: ESLint exited 0. Scope: touched files lint.
    Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: final diff hygiene.
    Command: ap context verify-task 202605281326-GQ43NN. Result: pass as explicit skip. Evidence: skipped_not_applicable (task_kind=unknown; expected context). Scope: current ordinary task-new code task is not a context assimilation task.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281326-GQ43NN-handle-context-verify-task-non-context-skip/.agentplane/tasks/202605281326-GQ43NN/blueprint/resolved-snapshot.json
    - old_digest: 4b510f2c38efac6bf3c2410dfb06e06745700fd819b93c264606e6eaff1a0fff
    - current_digest: 4b510f2c38efac6bf3c2410dfb06e06745700fd819b93c264606e6eaff1a0fff
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281326-GQ43NN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Handle context verify-task non-context skip

Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests.

## Scope

- In scope: Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests.
- Out of scope: unrelated refactors not required for "Handle context verify-task non-context skip".

## Plan

1. Inspect context verify-task command behavior for non-context tasks and existing context verification tests.
2. Implement explicit non-applicable skip handling for tasks that are not task_kind=context so policy/doctor evidence can record a skip without presenting hidden success.
3. Add focused regression coverage for ordinary task new / code task behavior and keep existing context-task failure behavior intact.
4. Run targeted tests plus policy routing, doctor, and task verify-show; record any explicit skips in task verification.

## Verify Steps

1. Run focused regression tests for context verify-task non-context behavior. Expected: non-context tasks produce an explicit non-applicable skip result, while malformed context tasks still fail validation.
2. Run the relevant context verify-task/maximum-assimilation test subset. Expected: existing context-task validation remains green.
3. Run policy/runtime gates: node .agentplane/policy/check-routing.mjs and ap doctor. Expected: both pass.
4. Run ap task verify-show 202605281326-GQ43NN. Expected: declared task verification contract is visible and satisfied or any skip is recorded explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T13:32:51.911Z — VERIFY — ok

By: CODER

Note: Verified explicit non-applicable skip for non-context context verify-task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T13:27:17.242Z, excerpt_hash=sha256:f0cd55d010af445f6dc464218f66275631a1dffcec19f5bfff824d3f06c1b2a0

Details:

Command: bunx vitest run packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts. Result: pass. Evidence: 1 file, 3 tests passed; ordinary task-new task reports skipped_not_applicable and malformed context task still fails validation. Scope: regression for context verify-task applicability.
Command: bunx vitest run packages/agentplane/src/commands/context/verify-task.maximum-assimilation.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass. Evidence: 2 files, 23 tests passed. Scope: existing context-task and maximum-assimilation behavior.
Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy graph/routing budgets.
Command: ap doctor. Result: pass. Evidence: doctor OK; errors=0 warnings=0. Scope: runtime and workflow health.
Command: ap task verify-show 202605281326-GQ43NN. Result: pass. Evidence: Verify Steps and blueprint evidence displayed; snapshot current. Scope: task verification contract.
Command: bunx prettier --check packages/agentplane/src/context/verify-task.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts. Result: pass. Evidence: all matched files use Prettier style. Scope: touched files formatting.
Command: bunx eslint packages/agentplane/src/context/verify-task.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts. Result: pass. Evidence: ESLint exited 0. Scope: touched files lint.
Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: final diff hygiene.
Command: ap context verify-task 202605281326-GQ43NN. Result: pass as explicit skip. Evidence: skipped_not_applicable (task_kind=unknown; expected context). Scope: current ordinary task-new code task is not a context assimilation task.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281326-GQ43NN-handle-context-verify-task-non-context-skip/.agentplane/tasks/202605281326-GQ43NN/blueprint/resolved-snapshot.json
- old_digest: 4b510f2c38efac6bf3c2410dfb06e06745700fd819b93c264606e6eaff1a0fff
- current_digest: 4b510f2c38efac6bf3c2410dfb06e06745700fd819b93c264606e6eaff1a0fff
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281326-GQ43NN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
