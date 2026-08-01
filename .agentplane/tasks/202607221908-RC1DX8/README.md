---
id: "202607221908-RC1DX8"
title: "Migrate runner and Hermes command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221850-R7WS01"
  - "202607221852-71SCSW"
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T02:58:19.788Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T11:00:09.576Z"
  updated_by: "TESTER"
  note: "PASS evidence refresh for implementation d227dc0acf705edf48b5f165b92b8a368496b5d7; deterministic SHA-bound records cover the runner and Hermes matrix plus all declared repository gates."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T11:01:33.495Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "d227dc0acf705edf48b5f165b92b8a368496b5d7"
  blueprint_digest: "589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2"
  evidence_refs:
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221908-RC1DX8/README.md"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-RC1DX8/verification/20260801110009576-ddea32e8d0d9c0fe.json"
    - ".agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json"
    - ".agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Hermes inspect-only supervision receives execution authority even when neither remote access nor step execution is requested."
commit:
  hash: "253943c427b60c81673f4442fbe7d277cb41a4e9"
  message: "🧪 RC1DX8 task: cover runner capability phases"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: migrated runner, Hermes, and local insights commands to phase-scoped CommandSession profiles; preserved typed in-process supervisor use cases and compatibility output."
events:
  -
    type: "status"
    at: "2026-08-01T02:58:47.800Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T03:19:35.108Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: migrated runner, Hermes, and local insights commands to phase-scoped CommandSession profiles; preserved typed in-process supervisor use cases and compatibility output."
  -
    type: "verify"
    at: "2026-08-01T03:21:53.917Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: runner/Hermes capability profiles, lazy preparation/execution boundaries, typed in-process supervision, and human/JSON/insights compatibility verified; focused 46/46, critical 12/12, typecheck, guards, lifecycle 8/8, architecture, format, lint, and Knip 545/545 passed."
  -
    type: "verify"
    at: "2026-08-01T10:53:56.140Z"
    author: "CODER"
    state: "ok"
    note: "PASS after integration rework at d227dc0acf705edf48b5f165b92b8a368496b5d7: task run dry-run selects RUNNER_PREPARATION_REQUIREMENTS without provider or git.mutate; execute retains RUNNER_EXECUTION_REQUIREMENTS. Focused runner/Hermes/direct/branch matrix 71/71, critical 12/12 chunks, guards, lifecycle 8/8, TypeScript 7 typecheck, core lint, architecture, schemas, Knip 545/545, and changed-file formatting passed."
  -
    type: "verify"
    at: "2026-08-01T11:00:09.576Z"
    author: "TESTER"
    state: "ok"
    note: "PASS evidence refresh for implementation d227dc0acf705edf48b5f165b92b8a368496b5d7; deterministic SHA-bound records cover the runner and Hermes matrix plus all declared repository gates."
doc_version: 3
doc_updated_at: "2026-08-01T11:00:10.344Z"
doc_updated_by: "CODER"
description: "RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers."
sections:
  Summary: |-
    Migrate runner and Hermes command boundaries

    RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers.
  Scope: |-
    - In scope: task run/bootstrap/status/insights and Hermes projection/supervision commands, runner/process/Git/policy/knowledge capability sets, typed results/errors, human/JSON renderers, and removal of internal AgentPlane subprocess parsing.
    - Out of scope: provider release operations and context/evaluator commands.
  Plan: |-
    1. Declare runner/Hermes capabilities by preparation and execution phase.
    2. Call shared WorkOrder, supervisor, runner receipt, and evaluator use cases in-process.
    3. Centralize output, error, metrics, and exit rendering.
    4. Remove shell route parsing and broad session construction.
    5. Run adapter, episode, supervision, snapshot, and capability tests.
  Verify Steps: |-
    1. Run direct and branch_pr runner/Hermes fixtures. Expected: typed in-process results, minimal capabilities, and no lifecycle command parsing.
    2. Render human/JSON/insights outputs. Expected: compatibility and provenance are preserved.
    3. Attempt cross-phase or undeclared provider/lifecycle access. Expected: typed denial.
    4. Run runner/Hermes tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T03:21:53.917Z — VERIFY — ok

    By: TESTER

    Note: PASS: runner/Hermes capability profiles, lazy preparation/execution boundaries, typed in-process supervision, and human/JSON/insights compatibility verified; focused 46/46, critical 12/12, typecheck, guards, lifecycle 8/8, architecture, format, lint, and Knip 545/545 passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:19:35.108Z, excerpt_hash=sha256:37018661039d255b8db6848f76a0c989406a2fc609faa7afbdaa318279087623

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-RC1DX8-migrate-runner-and-hermes-command-boundaries/.agentplane/tasks/202607221908-RC1DX8/blueprint/resolved-snapshot.json
    - old_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
    - current_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-RC1DX8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-RC1DX8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T10:53:56.140Z — VERIFY — ok

    By: CODER

    Note: PASS after integration rework at d227dc0acf705edf48b5f165b92b8a368496b5d7: task run dry-run selects RUNNER_PREPARATION_REQUIREMENTS without provider or git.mutate; execute retains RUNNER_EXECUTION_REQUIREMENTS. Focused runner/Hermes/direct/branch matrix 71/71, critical 12/12 chunks, guards, lifecycle 8/8, TypeScript 7 typecheck, core lint, architecture, schemas, Knip 545/545, and changed-file formatting passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:21:54.703Z, excerpt_hash=sha256:37018661039d255b8db6848f76a0c989406a2fc609faa7afbdaa318279087623

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-RC1DX8-migrate-runner-and-hermes-command-boundaries/.agentplane/tasks/202607221908-RC1DX8/blueprint/resolved-snapshot.json
    - old_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
    - current_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-RC1DX8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T11:00:09.576Z — VERIFY — ok

    By: TESTER

    Note: PASS evidence refresh for implementation d227dc0acf705edf48b5f165b92b8a368496b5d7; deterministic SHA-bound records cover the runner and Hermes matrix plus all declared repository gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T10:53:57.067Z, excerpt_hash=sha256:37018661039d255b8db6848f76a0c989406a2fc609faa7afbdaa318279087623

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/commands/insights packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-closeout.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/command-catalog/kernel.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: 9 files and 71 tests covering direct and branch_pr runner and Hermes fixtures, human and JSON output compatibility, parsed dry-run and execution capability selection, cross-phase denials, and provenance preservation.

    Command: bun run guards:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: Shared guards and trust-boundary ratchet.

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: All 8 lifecycle invariants.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: All 12 critical CLI test chunks.

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: TypeScript 7 build check across the workspace.

    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: Full core lint surface.

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: Dependency architecture checks with zero violations.

    Command: bun run schemas:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: Generated schema synchronization.

    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
    Scope: Knip baseline at 545 of 545.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-RC1DX8-migrate-runner-and-hermes-command-boundaries/.agentplane/tasks/202607221908-RC1DX8/blueprint/resolved-snapshot.json
    - old_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
    - current_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-RC1DX8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-RC1DX8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert runner/Hermes surfaces to explicit typed compatibility adapters without discarding receipts or work orders.
    - Do not restore raw shell route execution.
    - Re-run adapter and supervision fixtures.
  Findings: |-
    - Observation: The broad 683-test runner/Hermes matrix had one 2-second timeout in protected-filesystem FIFO replacement under concurrent suite load.
      Impact: No changed runner/Hermes command path failed; the timed-out filesystem test is unrelated to this diff.
      Resolution: The complete protected-filesystem file passed 11/11 in isolation, including the timed-out case in 34 ms; classified as suite-load flakiness.

    - Observation: Evaluator found dry-run and execution shared one declared capability profile and frozen evidence lacked phase-specific proof.
      Impact: Dry-run declared execution-only provider and Git mutation authority, violating least-capability phase boundaries.
      Resolution: Added parsed-phase conditional session selection, a preparation-only capability profile, denial and registry regressions, and reran deterministic supervisor and repository gates.
extensions:
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Migrate runner and Hermes command boundaries

RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers.

## Scope

- In scope: task run/bootstrap/status/insights and Hermes projection/supervision commands, runner/process/Git/policy/knowledge capability sets, typed results/errors, human/JSON renderers, and removal of internal AgentPlane subprocess parsing.
- Out of scope: provider release operations and context/evaluator commands.

## Plan

1. Declare runner/Hermes capabilities by preparation and execution phase.
2. Call shared WorkOrder, supervisor, runner receipt, and evaluator use cases in-process.
3. Centralize output, error, metrics, and exit rendering.
4. Remove shell route parsing and broad session construction.
5. Run adapter, episode, supervision, snapshot, and capability tests.

## Verify Steps

1. Run direct and branch_pr runner/Hermes fixtures. Expected: typed in-process results, minimal capabilities, and no lifecycle command parsing.
2. Render human/JSON/insights outputs. Expected: compatibility and provenance are preserved.
3. Attempt cross-phase or undeclared provider/lifecycle access. Expected: typed denial.
4. Run runner/Hermes tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T03:21:53.917Z — VERIFY — ok

By: TESTER

Note: PASS: runner/Hermes capability profiles, lazy preparation/execution boundaries, typed in-process supervision, and human/JSON/insights compatibility verified; focused 46/46, critical 12/12, typecheck, guards, lifecycle 8/8, architecture, format, lint, and Knip 545/545 passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:19:35.108Z, excerpt_hash=sha256:37018661039d255b8db6848f76a0c989406a2fc609faa7afbdaa318279087623

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-RC1DX8-migrate-runner-and-hermes-command-boundaries/.agentplane/tasks/202607221908-RC1DX8/blueprint/resolved-snapshot.json
- old_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
- current_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-RC1DX8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-RC1DX8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T10:53:56.140Z — VERIFY — ok

By: CODER

Note: PASS after integration rework at d227dc0acf705edf48b5f165b92b8a368496b5d7: task run dry-run selects RUNNER_PREPARATION_REQUIREMENTS without provider or git.mutate; execute retains RUNNER_EXECUTION_REQUIREMENTS. Focused runner/Hermes/direct/branch matrix 71/71, critical 12/12 chunks, guards, lifecycle 8/8, TypeScript 7 typecheck, core lint, architecture, schemas, Knip 545/545, and changed-file formatting passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:21:54.703Z, excerpt_hash=sha256:37018661039d255b8db6848f76a0c989406a2fc609faa7afbdaa318279087623

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-RC1DX8-migrate-runner-and-hermes-command-boundaries/.agentplane/tasks/202607221908-RC1DX8/blueprint/resolved-snapshot.json
- old_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
- current_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-RC1DX8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T11:00:09.576Z — VERIFY — ok

By: TESTER

Note: PASS evidence refresh for implementation d227dc0acf705edf48b5f165b92b8a368496b5d7; deterministic SHA-bound records cover the runner and Hermes matrix plus all declared repository gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T10:53:57.067Z, excerpt_hash=sha256:37018661039d255b8db6848f76a0c989406a2fc609faa7afbdaa318279087623

Details:

Command: bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/commands/insights packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-closeout.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/command-catalog/kernel.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: 9 files and 71 tests covering direct and branch_pr runner and Hermes fixtures, human and JSON output compatibility, parsed dry-run and execution capability selection, cross-phase denials, and provenance preservation.

Command: bun run guards:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: Shared guards and trust-boundary ratchet.

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: All 8 lifecycle invariants.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: All 12 critical CLI test chunks.

Command: bun run typecheck
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: TypeScript 7 build check across the workspace.

Command: bun run lint:core
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: Full core lint surface.

Command: bun run arch:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: Dependency architecture checks with zero violations.

Command: bun run schemas:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: Generated schema synchronization.

Command: bun run knip:check
Result: pass
Evidence: .agentplane/cache/verification/202607221908-RC1DX8-d227dc0-checks.json
Scope: Knip baseline at 545 of 545.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-RC1DX8-migrate-runner-and-hermes-command-boundaries/.agentplane/tasks/202607221908-RC1DX8/blueprint/resolved-snapshot.json
- old_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
- current_digest: 589c28aae1c6769784dea459601bee9764aafd578985a5dc8c1e5a503a05acd2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-RC1DX8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-RC1DX8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert runner/Hermes surfaces to explicit typed compatibility adapters without discarding receipts or work orders.
- Do not restore raw shell route execution.
- Re-run adapter and supervision fixtures.

## Findings

- Observation: The broad 683-test runner/Hermes matrix had one 2-second timeout in protected-filesystem FIFO replacement under concurrent suite load.
  Impact: No changed runner/Hermes command path failed; the timed-out filesystem test is unrelated to this diff.
  Resolution: The complete protected-filesystem file passed 11/11 in isolation, including the timed-out case in 34 ms; classified as suite-load flakiness.

- Observation: Evaluator found dry-run and execution shared one declared capability profile and frozen evidence lacked phase-specific proof.
  Impact: Dry-run declared execution-only provider and Git mutation authority, violating least-capability phase boundaries.
  Resolution: Added parsed-phase conditional session selection, a preparation-only capability profile, denial and registry regressions, and reran deterministic supervisor and repository gates.
