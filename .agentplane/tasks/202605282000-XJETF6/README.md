---
id: "202605282000-XJETF6"
title: "Task runner execution usecase decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "code"
  - "refactor"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T20:00:57.674Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T20:04:39.875Z"
  updated_by: "CODER"
  note: "Task runner usecase decomposition verified: task-run.ts reduced from 566 to 388 lines, blueprint plan/snapshot helpers extracted, targeted runner blueprint/lifecycle tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose task runner execution usecase in the dedicated branch_pr worktree, preserving runner lifecycle behavior and verifying with targeted runner checks."
events:
  -
    type: "status"
    at: "2026-05-28T20:01:14.258Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose task runner execution usecase in the dedicated branch_pr worktree, preserving runner lifecycle behavior and verifying with targeted runner checks."
  -
    type: "verify"
    at: "2026-05-28T20:04:39.875Z"
    author: "CODER"
    state: "ok"
    note: "Task runner usecase decomposition verified: task-run.ts reduced from 566 to 388 lines, blueprint plan/snapshot helpers extracted, targeted runner blueprint/lifecycle tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed."
doc_version: 3
doc_updated_at: "2026-05-28T20:04:39.901Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files."
sections:
  Summary: |-
    Task runner execution usecase decomposition

    Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files.
    - Out of scope: unrelated refactors not required for "Task runner execution usecase decomposition".
  Plan: |-
    1. Inspect task-run.ts dependencies and runner tests to identify pure extraction boundaries.
    2. Extract result/manifest/status helpers into focused runner modules without changing TaskRunResult shape.
    3. Keep task-run.ts as the orchestration facade and reduce hotspot line count.
    4. Run targeted runner tests plus typecheck, lint/format, and hotspot threshold check.
    5. Open a branch_pr with evaluator evidence and hosted CI.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T20:04:39.875Z — VERIFY — ok

    By: CODER

    Note: Task runner usecase decomposition verified: task-run.ts reduced from 566 to 388 lines, blueprint plan/snapshot helpers extracted, targeted runner blueprint/lifecycle tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:01:14.258Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282000-XJETF6-task-runner-execution-usecase-decomposition/.agentplane/tasks/202605282000-XJETF6/blueprint/resolved-snapshot.json
    - old_digest: 000c32c7735bd834124cb44e81f34c1083fe2b6023c5efae60a4195bdc50a6c0
    - current_digest: 000c32c7735bd834124cb44e81f34c1083fe2b6023c5efae60a4195bdc50a6c0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282000-XJETF6

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Task runner execution usecase decomposition

Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files.

## Scope

- In scope: Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files.
- Out of scope: unrelated refactors not required for "Task runner execution usecase decomposition".

## Plan

1. Inspect task-run.ts dependencies and runner tests to identify pure extraction boundaries.
2. Extract result/manifest/status helpers into focused runner modules without changing TaskRunResult shape.
3. Keep task-run.ts as the orchestration facade and reduce hotspot line count.
4. Run targeted runner tests plus typecheck, lint/format, and hotspot threshold check.
5. Open a branch_pr with evaluator evidence and hosted CI.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T20:04:39.875Z — VERIFY — ok

By: CODER

Note: Task runner usecase decomposition verified: task-run.ts reduced from 566 to 388 lines, blueprint plan/snapshot helpers extracted, targeted runner blueprint/lifecycle tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:01:14.258Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282000-XJETF6-task-runner-execution-usecase-decomposition/.agentplane/tasks/202605282000-XJETF6/blueprint/resolved-snapshot.json
- old_digest: 000c32c7735bd834124cb44e81f34c1083fe2b6023c5efae60a4195bdc50a6c0
- current_digest: 000c32c7735bd834124cb44e81f34c1083fe2b6023c5efae60a4195bdc50a6c0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282000-XJETF6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
