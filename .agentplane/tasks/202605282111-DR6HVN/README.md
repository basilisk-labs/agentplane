---
id: "202605282111-DR6HVN"
title: "Integrate queue command decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "integrate"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run format:changed"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts --config vitest.workspace.ts"
  - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T21:12:00.254Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T21:18:23.341Z"
  updated_by: "CODER"
  note: "Integrate queue command decomposition verified locally."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose integrate queue command handlers and helpers while preserving branch_pr merge-lane behavior."
events:
  -
    type: "status"
    at: "2026-05-28T21:12:29.803Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose integrate queue command handlers and helpers while preserving branch_pr merge-lane behavior."
  -
    type: "verify"
    at: "2026-05-28T21:18:23.341Z"
    author: "CODER"
    state: "ok"
    note: "Integrate queue command decomposition verified locally."
doc_version: 3
doc_updated_at: "2026-05-28T21:18:23.368Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/integrate-queue.command.ts into focused queue helper modules without changing branch_pr merge-lane behavior, hosted check waiting, stale lane recovery, or queue state transitions. Reduce the command file below the hotspot warning threshold when safe."
sections:
  Summary: |-
    Integrate queue command decomposition

    Decompose packages/agentplane/src/commands/integrate-queue.command.ts into focused queue helper modules without changing branch_pr merge-lane behavior, hosted check waiting, stale lane recovery, or queue state transitions. Reduce the command file below the hotspot warning threshold when safe.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/integrate-queue.command.ts into focused queue helper modules without changing branch_pr merge-lane behavior, hosted check waiting, stale lane recovery, or queue state transitions. Reduce the command file below the hotspot warning threshold when safe.
    - Out of scope: unrelated refactors not required for "Integrate queue command decomposition".
  Plan: |-
    1. Inspect integrate-queue.command.ts and related queue/recovery/PR integrate tests to identify extraction boundaries with no behavior change.
    2. Extract queue rendering/listing, stale-entry normalization, active-lane recovery, and run-next orchestration into focused sibling modules.
    3. Keep integrate-queue.command.ts as CLI handler wiring and preserve public command output, queue state transitions, hosted-check waiting, and recovery semantics.
    4. Run focused integrate queue/PR integration tests, typecheck, lint:core, format:changed, and hotspot-report check.
    5. Publish PR artifacts, record verification and evaluator evidence, wait for hosted checks, then merge through the branch_pr GitHub route.
  Verify Steps: |-
    1. Run focused behavior tests: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts --config vitest.workspace.ts. Expected: all selected tests pass and cover queue recovery, PR merge handoff, merge strategies, and protected-base integration behavior.
    2. Run bun run typecheck. Expected: TypeScript project build passes without new type errors.
    3. Run bun run lint:core. Expected: ESLint passes for core source.
    4. Run bun run format:changed. Expected: changed files are formatted.
    5. Run node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Expected: no oversized runtime/test errors; integrate-queue.command.ts is reduced below 400 lines if extraction remains behavior-preserving, otherwise any residual warning is recorded with rationale.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T21:18:23.341Z — VERIFY — ok

    By: CODER

    Note: Integrate queue command decomposition verified locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:12:29.803Z, excerpt_hash=sha256:8292d19ac622f82c1ce2467cf9e39f45c5b7ab88935781893b9647bd1644cd79

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282111-DR6HVN-integrate-queue-command-decomposition/.agentplane/tasks/202605282111-DR6HVN/blueprint/resolved-snapshot.json
    - old_digest: 8e6958ec00d74ac366879cc5750620983ece4e750a34cd373e1071e0df4c814a
    - current_digest: 8e6958ec00d74ac366879cc5750620983ece4e750a34cd373e1071e0df4c814a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282111-DR6HVN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 4 files, 31 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: ESLint completed. Command: bun run format:changed; Result: pass after formatting changed files; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 45 to 44 and integrate-queue.command.ts is 348 lines.
      Impact: integrate-queue.command.ts now owns CLI handler wiring while lane recovery, stale queue normalization, and doctor diagnostics live in focused modules.
      Resolution: Proceed to task PR, evaluator review, and hosted checks.
id_source: "generated"
---
## Summary

Integrate queue command decomposition

Decompose packages/agentplane/src/commands/integrate-queue.command.ts into focused queue helper modules without changing branch_pr merge-lane behavior, hosted check waiting, stale lane recovery, or queue state transitions. Reduce the command file below the hotspot warning threshold when safe.

## Scope

- In scope: Decompose packages/agentplane/src/commands/integrate-queue.command.ts into focused queue helper modules without changing branch_pr merge-lane behavior, hosted check waiting, stale lane recovery, or queue state transitions. Reduce the command file below the hotspot warning threshold when safe.
- Out of scope: unrelated refactors not required for "Integrate queue command decomposition".

## Plan

1. Inspect integrate-queue.command.ts and related queue/recovery/PR integrate tests to identify extraction boundaries with no behavior change.
2. Extract queue rendering/listing, stale-entry normalization, active-lane recovery, and run-next orchestration into focused sibling modules.
3. Keep integrate-queue.command.ts as CLI handler wiring and preserve public command output, queue state transitions, hosted-check waiting, and recovery semantics.
4. Run focused integrate queue/PR integration tests, typecheck, lint:core, format:changed, and hotspot-report check.
5. Publish PR artifacts, record verification and evaluator evidence, wait for hosted checks, then merge through the branch_pr GitHub route.

## Verify Steps

1. Run focused behavior tests: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts --config vitest.workspace.ts. Expected: all selected tests pass and cover queue recovery, PR merge handoff, merge strategies, and protected-base integration behavior.
2. Run bun run typecheck. Expected: TypeScript project build passes without new type errors.
3. Run bun run lint:core. Expected: ESLint passes for core source.
4. Run bun run format:changed. Expected: changed files are formatted.
5. Run node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Expected: no oversized runtime/test errors; integrate-queue.command.ts is reduced below 400 lines if extraction remains behavior-preserving, otherwise any residual warning is recorded with rationale.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T21:18:23.341Z — VERIFY — ok

By: CODER

Note: Integrate queue command decomposition verified locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:12:29.803Z, excerpt_hash=sha256:8292d19ac622f82c1ce2467cf9e39f45c5b7ab88935781893b9647bd1644cd79

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282111-DR6HVN-integrate-queue-command-decomposition/.agentplane/tasks/202605282111-DR6HVN/blueprint/resolved-snapshot.json
- old_digest: 8e6958ec00d74ac366879cc5750620983ece4e750a34cd373e1071e0df4c814a
- current_digest: 8e6958ec00d74ac366879cc5750620983ece4e750a34cd373e1071e0df4c814a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282111-DR6HVN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 4 files, 31 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: ESLint completed. Command: bun run format:changed; Result: pass after formatting changed files; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 45 to 44 and integrate-queue.command.ts is 348 lines.
  Impact: integrate-queue.command.ts now owns CLI handler wiring while lane recovery, stale queue normalization, and doctor diagnostics live in focused modules.
  Resolution: Proceed to task PR, evaluator review, and hosted checks.
