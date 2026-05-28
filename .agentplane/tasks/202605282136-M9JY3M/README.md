---
id: "202605282136-M9JY3M"
title: "Task run command decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "refactor"
  - "task-runner"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run format:changed"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts --config vitest.workspace.ts"
  - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T21:36:41.365Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T21:40:30.192Z"
  updated_by: "CODER"
  note: "Task run command decomposition verified locally."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T21:40:51.687Z"
  updated_by: "EVALUATOR"
  note: "Task run command decomposition preserves runner CLI behavior while reducing task/run.command.ts below the hotspot threshold."
  evaluated_sha: "efabaea85dab384a44002a3350aa7298857dd583"
  blueprint_digest: "edeff3ec03f169e4ee95a77bbac0cd33f436ed9469364a1b55848e207cca6a33"
  evidence_refs:
    - ".agentplane/tasks/202605282136-M9JY3M/README.md"
    - ".agentplane/tasks/202605282136-M9JY3M/quality/20260528-214051687-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282136-M9JY3M/quality/20260528-214051687-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282136-M9JY3M/quality/20260528-214051687-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282136-M9JY3M/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/run.command.ts"
    - "packages/agentplane/src/commands/task/run-render.ts"
    - "packages/agentplane/src/commands/task/run-parse.ts"
  findings:
    - "Extracted task-run payload rendering, log loading, and integer parsing into focused helper modules. Focused task-run tests passed, plus typecheck, lint, format, and hotspot check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose task run command helpers while preserving runner lifecycle and output behavior."
events:
  -
    type: "status"
    at: "2026-05-28T21:36:56.439Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose task run command helpers while preserving runner lifecycle and output behavior."
  -
    type: "verify"
    at: "2026-05-28T21:40:30.192Z"
    author: "CODER"
    state: "ok"
    note: "Task run command decomposition verified locally."
doc_version: 3
doc_updated_at: "2026-05-28T21:40:30.218Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/task/run.command.ts into focused task-run CLI helper modules without changing runner lifecycle, status, inspect, logs, wait, or JSON/text output behavior. Reduce the command file below the hotspot warning threshold when safe."
sections:
  Summary: |-
    Task run command decomposition

    Decompose packages/agentplane/src/commands/task/run.command.ts into focused task-run CLI helper modules without changing runner lifecycle, status, inspect, logs, wait, or JSON/text output behavior. Reduce the command file below the hotspot warning threshold when safe.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/task/run.command.ts into focused task-run CLI helper modules without changing runner lifecycle, status, inspect, logs, wait, or JSON/text output behavior. Reduce the command file below the hotspot warning threshold when safe.
    - Out of scope: unrelated refactors not required for "Task run command decomposition".
  Plan: |-
    1. Inspect task/run.command.ts and task-run runner usecases to identify behavior-preserving extraction boundaries for CLI specs, rendering, log loading, and handler orchestration.
    2. Extract render/status/inspect/log helpers into focused sibling modules while keeping public task run command specs and handler exports stable.
    3. Preserve runner lifecycle semantics, wait behavior, process liveness reporting, JSON/text output, and error handling.
    4. Run focused task-run tests, typecheck, lint:core, format:changed, and hotspot-report check.
    5. Publish PR artifacts, record verification/evaluator evidence, wait for hosted checks, and merge through the GitHub branch_pr route.
  Verify Steps: |-
    1. Run focused task-run behavior tests: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts --config vitest.workspace.ts. Expected: all selected tests pass and cover task run CLI behavior, lifecycle transitions, and scenario materialization.
    2. Run bun run typecheck. Expected: TypeScript project build passes without new type errors.
    3. Run bun run lint:core. Expected: ESLint passes for core source.
    4. Run bun run format:changed. Expected: changed files are formatted.
    5. Run node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Expected: no oversized runtime/test errors; task/run.command.ts is reduced below 400 lines if extraction remains behavior-preserving, otherwise any residual warning is recorded with rationale.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T21:40:30.192Z — VERIFY — ok

    By: CODER

    Note: Task run command decomposition verified locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:36:56.439Z, excerpt_hash=sha256:e60aaba55deb332118151eeba18b955864cc1b7c1292639b5a63aa422f42e5e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282136-M9JY3M-task-run-command-decomposition/.agentplane/tasks/202605282136-M9JY3M/blueprint/resolved-snapshot.json
    - old_digest: edeff3ec03f169e4ee95a77bbac0cd33f436ed9469364a1b55848e207cca6a33
    - current_digest: edeff3ec03f169e4ee95a77bbac0cd33f436ed9469364a1b55848e207cca6a33
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282136-M9JY3M

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 3 files, 11 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: ESLint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 43 to 42 and task/run.command.ts is 389 lines.
      Impact: task/run.command.ts now keeps specs and command handlers while task-run payload rendering, log loading, and integer parsing live in focused helper modules.
      Resolution: Proceed to PR, evaluator review, and hosted checks.
id_source: "generated"
---
## Summary

Task run command decomposition

Decompose packages/agentplane/src/commands/task/run.command.ts into focused task-run CLI helper modules without changing runner lifecycle, status, inspect, logs, wait, or JSON/text output behavior. Reduce the command file below the hotspot warning threshold when safe.

## Scope

- In scope: Decompose packages/agentplane/src/commands/task/run.command.ts into focused task-run CLI helper modules without changing runner lifecycle, status, inspect, logs, wait, or JSON/text output behavior. Reduce the command file below the hotspot warning threshold when safe.
- Out of scope: unrelated refactors not required for "Task run command decomposition".

## Plan

1. Inspect task/run.command.ts and task-run runner usecases to identify behavior-preserving extraction boundaries for CLI specs, rendering, log loading, and handler orchestration.
2. Extract render/status/inspect/log helpers into focused sibling modules while keeping public task run command specs and handler exports stable.
3. Preserve runner lifecycle semantics, wait behavior, process liveness reporting, JSON/text output, and error handling.
4. Run focused task-run tests, typecheck, lint:core, format:changed, and hotspot-report check.
5. Publish PR artifacts, record verification/evaluator evidence, wait for hosted checks, and merge through the GitHub branch_pr route.

## Verify Steps

1. Run focused task-run behavior tests: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts --config vitest.workspace.ts. Expected: all selected tests pass and cover task run CLI behavior, lifecycle transitions, and scenario materialization.
2. Run bun run typecheck. Expected: TypeScript project build passes without new type errors.
3. Run bun run lint:core. Expected: ESLint passes for core source.
4. Run bun run format:changed. Expected: changed files are formatted.
5. Run node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Expected: no oversized runtime/test errors; task/run.command.ts is reduced below 400 lines if extraction remains behavior-preserving, otherwise any residual warning is recorded with rationale.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T21:40:30.192Z — VERIFY — ok

By: CODER

Note: Task run command decomposition verified locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:36:56.439Z, excerpt_hash=sha256:e60aaba55deb332118151eeba18b955864cc1b7c1292639b5a63aa422f42e5e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282136-M9JY3M-task-run-command-decomposition/.agentplane/tasks/202605282136-M9JY3M/blueprint/resolved-snapshot.json
- old_digest: edeff3ec03f169e4ee95a77bbac0cd33f436ed9469364a1b55848e207cca6a33
- current_digest: edeff3ec03f169e4ee95a77bbac0cd33f436ed9469364a1b55848e207cca6a33
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282136-M9JY3M

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 3 files, 11 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: ESLint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 43 to 42 and task/run.command.ts is 389 lines.
  Impact: task/run.command.ts now keeps specs and command handlers while task-run payload rendering, log loading, and integer parsing live in focused helper modules.
  Resolution: Proceed to PR, evaluator review, and hosted checks.
