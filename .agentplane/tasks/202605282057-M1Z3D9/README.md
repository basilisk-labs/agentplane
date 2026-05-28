---
id: "202605282057-M1Z3D9"
title: "Task finish execution decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "refactor"
  - "task-lifecycle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T20:57:28.705Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T21:03:19.406Z"
  updated_by: "CODER"
  note: "Task finish execution decomposition verified locally."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose task finish execution orchestration while preserving finish behavior and close-tail gates."
events:
  -
    type: "status"
    at: "2026-05-28T20:57:50.941Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose task finish execution orchestration while preserving finish behavior and close-tail gates."
  -
    type: "verify"
    at: "2026-05-28T21:03:19.406Z"
    author: "CODER"
    state: "ok"
    note: "Task finish execution decomposition verified locally."
doc_version: 3
doc_updated_at: "2026-05-28T21:03:19.433Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI."
sections:
  Summary: |-
    Task finish execution decomposition

    Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI.
    - Out of scope: unrelated refactors not required for "Task finish execution decomposition".
  Plan: |-
    1. Inspect finish-execute.ts, finish shared modules, and focused finish tests to identify low-risk extraction boundaries.
    2. Extract cohesive helper code from finish-execute.ts into sibling task modules, preserving public command behavior and existing diagnostics.
    3. Keep finish-execute.ts as the high-level finish orchestration surface and reduce it below the hotspot warning threshold if safe.
    4. Run focused finish/close-tail tests, typecheck, lint:core, format:changed, and hotspot-report check.
    5. Publish PR, record verification/evaluator evidence, wait for hosted checks, then integrate via GitHub PR route.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T21:03:19.406Z — VERIFY — ok

    By: CODER

    Note: Task finish execution decomposition verified locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:57:50.941Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282057-M1Z3D9-finish-execution-decomposition/.agentplane/tasks/202605282057-M1Z3D9/blueprint/resolved-snapshot.json
    - old_digest: f847d972b46cff3d62c15342a6f0a83060536391419b1bd1967e4617a38c39b8
    - current_digest: f847d972b46cff3d62c15342a6f0a83060536391419b1bd1967e4617a38c39b8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282057-M1Z3D9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 4 files, 52 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 46 to 45.
      Impact: finish-execute.ts now keeps orchestration while loading/incidents, commit-info resolution, and close-tail preflight/finalization live in focused modules.
      Resolution: Proceed to PR and hosted checks.
id_source: "generated"
---
## Summary

Task finish execution decomposition

Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI.

## Scope

- In scope: Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI.
- Out of scope: unrelated refactors not required for "Task finish execution decomposition".

## Plan

1. Inspect finish-execute.ts, finish shared modules, and focused finish tests to identify low-risk extraction boundaries.
2. Extract cohesive helper code from finish-execute.ts into sibling task modules, preserving public command behavior and existing diagnostics.
3. Keep finish-execute.ts as the high-level finish orchestration surface and reduce it below the hotspot warning threshold if safe.
4. Run focused finish/close-tail tests, typecheck, lint:core, format:changed, and hotspot-report check.
5. Publish PR, record verification/evaluator evidence, wait for hosted checks, then integrate via GitHub PR route.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T21:03:19.406Z — VERIFY — ok

By: CODER

Note: Task finish execution decomposition verified locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:57:50.941Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282057-M1Z3D9-finish-execution-decomposition/.agentplane/tasks/202605282057-M1Z3D9/blueprint/resolved-snapshot.json
- old_digest: f847d972b46cff3d62c15342a6f0a83060536391419b1bd1967e4617a38c39b8
- current_digest: f847d972b46cff3d62c15342a6f0a83060536391419b1bd1967e4617a38c39b8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282057-M1Z3D9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 4 files, 52 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 46 to 45.
  Impact: finish-execute.ts now keeps orchestration while loading/incidents, commit-info resolution, and close-tail preflight/finalization live in focused modules.
  Resolution: Proceed to PR and hosted checks.
