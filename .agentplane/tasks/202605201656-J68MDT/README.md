---
id: "202605201656-J68MDT"
title: "Fix done task next-action route"
result_summary: "Merged PR #3976 and closed release-blocking lifecycle tail."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T16:56:40.805Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T17:43:12.290Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for merged PR #3976 at e747ce59: review comments resolved, hosted PR checks passed, and release task check only awaits task closure."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T17:43:12.290Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for merged PR #3976 at e747ce59: review comments resolved, hosted PR checks passed, and release task check only awaits task closure."
  evaluated_sha: "e747ce59acdd641d7dfab547e8ea7b49f0931d02"
  blueprint_digest: "38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1"
  evidence_refs:
    - ".agentplane/tasks/202605201656-J68MDT/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "e747ce59acdd641d7dfab547e8ea7b49f0931d02"
  message: "🐛 J68MDT workflow: stop done task recovery routing"
comments:
  -
    author: "CODER"
    body: "Start: Fixing DONE task route decisions so closed branch_pr tasks do not suggest worktree recovery, with focused CLI regression coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3976 merged after review fix and green hosted checks; DONE routing is branch_pr/direct aware."
events:
  -
    type: "status"
    at: "2026-05-20T16:57:11.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fixing DONE task route decisions so closed branch_pr tasks do not suggest worktree recovery, with focused CLI regression coverage."
  -
    type: "verify"
    at: "2026-05-20T17:01:27.388Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass, 5 tests. Command: bunx eslint touched route-decision files; Result: pass. Command: bun run --filter=agentplane typecheck; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Scope: DONE task route decision regression and focused CLI behavior."
  -
    type: "verify"
    at: "2026-05-20T17:01:40.143Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for DONE task route decision fix. The change is limited to terminal route handling and regression coverage; focused cli-core route-decision tests, ESLint, agentplane typecheck, framework bootstrap, and policy routing passed."
  -
    type: "verify"
    at: "2026-05-20T17:02:23.005Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for implementation commit bf2f3e28a. Evidence: focused cli-core route-decision test passed, ESLint passed, agentplane typecheck passed, framework bootstrap completed through task verify-show, and policy routing passed."
  -
    type: "verify"
    at: "2026-05-20T17:20:12.706Z"
    author: "CODER"
    state: "ok"
    note: "Review fix verified: DONE next-action now returns branch cleanup only in branch_pr and direct-safe terminal route in direct mode; focused cli-core route-decision test, prettier, eslint, typecheck, and policy routing passed."
  -
    type: "verify"
    at: "2026-05-20T17:20:21.455Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Review fix accepted locally: branch_pr DONE tasks keep cleanup guidance, direct DONE tasks now return a direct-safe terminal action with null command; no branch_pr recovery blockers for DONE tasks."
  -
    type: "verify"
    at: "2026-05-20T17:43:12.290Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for merged PR #3976 at e747ce59: review comments resolved, hosted PR checks passed, and release task check only awaits task closure."
  -
    type: "status"
    at: "2026-05-20T17:43:23.298Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3976 merged after review fix and green hosted checks; DONE routing is branch_pr/direct aware."
doc_version: 3
doc_updated_at: "2026-05-20T17:43:23.298Z"
doc_updated_by: "INTEGRATOR"
description: "Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged."
sections:
  Summary: |-
    Fix done task next-action route

    Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.
  Scope: |-
    - In scope: Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.
    - Out of scope: unrelated refactors not required for "Fix done task next-action route".
  Plan: |-
    1. Reproduce the DONE-task next-action bug on a closed batch included task.
    2. Update route decision / next-action logic so DONE tasks return a terminal no-op route instead of worktree recovery blockers.
    3. Add focused regression coverage for DONE branch_pr tasks with missing PR branch metadata.
    4. Verify with focused route-decision/next-action tests, policy routing, and release task registry check.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T17:01:27.388Z — VERIFY — ok

    By: CODER

    Note: Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass, 5 tests. Command: bunx eslint touched route-decision files; Result: pass. Command: bun run --filter=agentplane typecheck; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Scope: DONE task route decision regression and focused CLI behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T16:57:11.137Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
    - old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201656-J68MDT

    ### 2026-05-20T17:01:40.143Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for DONE task route decision fix. The change is limited to terminal route handling and regression coverage; focused cli-core route-decision tests, ESLint, agentplane typecheck, framework bootstrap, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:01:27.437Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
    - old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201656-J68MDT

    ### 2026-05-20T17:02:23.005Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for implementation commit bf2f3e28a. Evidence: focused cli-core route-decision test passed, ESLint passed, agentplane typecheck passed, framework bootstrap completed through task verify-show, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:01:40.215Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
    - old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201656-J68MDT

    ### 2026-05-20T17:20:12.706Z — VERIFY — ok

    By: CODER

    Note: Review fix verified: DONE next-action now returns branch cleanup only in branch_pr and direct-safe terminal route in direct mode; focused cli-core route-decision test, prettier, eslint, typecheck, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:02:23.042Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
    - old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201656-J68MDT

    ### 2026-05-20T17:20:21.455Z — VERIFY — ok

    By: EVALUATOR

    Note: Review fix accepted locally: branch_pr DONE tasks keep cleanup guidance, direct DONE tasks now return a direct-safe terminal action with null command; no branch_pr recovery blockers for DONE tasks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:20:12.733Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
    - old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201656-J68MDT

    ### 2026-05-20T17:43:12.290Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for merged PR #3976 at e747ce59: review comments resolved, hosted PR checks passed, and release task check only awaits task closure.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:20:21.486Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
    - old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201656-J68MDT

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix done task next-action route

Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.

## Scope

- In scope: Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.
- Out of scope: unrelated refactors not required for "Fix done task next-action route".

## Plan

1. Reproduce the DONE-task next-action bug on a closed batch included task.
2. Update route decision / next-action logic so DONE tasks return a terminal no-op route instead of worktree recovery blockers.
3. Add focused regression coverage for DONE branch_pr tasks with missing PR branch metadata.
4. Verify with focused route-decision/next-action tests, policy routing, and release task registry check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T17:01:27.388Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass, 5 tests. Command: bunx eslint touched route-decision files; Result: pass. Command: bun run --filter=agentplane typecheck; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Scope: DONE task route decision regression and focused CLI behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T16:57:11.137Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
- old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201656-J68MDT

### 2026-05-20T17:01:40.143Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for DONE task route decision fix. The change is limited to terminal route handling and regression coverage; focused cli-core route-decision tests, ESLint, agentplane typecheck, framework bootstrap, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:01:27.437Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
- old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201656-J68MDT

### 2026-05-20T17:02:23.005Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for implementation commit bf2f3e28a. Evidence: focused cli-core route-decision test passed, ESLint passed, agentplane typecheck passed, framework bootstrap completed through task verify-show, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:01:40.215Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
- old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201656-J68MDT

### 2026-05-20T17:20:12.706Z — VERIFY — ok

By: CODER

Note: Review fix verified: DONE next-action now returns branch cleanup only in branch_pr and direct-safe terminal route in direct mode; focused cli-core route-decision test, prettier, eslint, typecheck, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:02:23.042Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
- old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201656-J68MDT

### 2026-05-20T17:20:21.455Z — VERIFY — ok

By: EVALUATOR

Note: Review fix accepted locally: branch_pr DONE tasks keep cleanup guidance, direct DONE tasks now return a direct-safe terminal action with null command; no branch_pr recovery blockers for DONE tasks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:20:12.733Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201656-J68MDT-done-next-action/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
- old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201656-J68MDT

### 2026-05-20T17:43:12.290Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for merged PR #3976 at e747ce59: review comments resolved, hosted PR checks passed, and release task check only awaits task closure.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T17:20:21.486Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201656-J68MDT/blueprint/resolved-snapshot.json
- old_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- current_digest: 38273f1ed23e94202d4316a91a1e63a558b7eccf0a157a989d5d511fbd1d76c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201656-J68MDT

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
