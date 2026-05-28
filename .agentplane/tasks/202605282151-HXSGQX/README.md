---
id: "202605282151-HXSGQX"
title: "Task brief command decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "refactor"
  - "task-brief"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T21:51:58.166Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T21:57:37.467Z"
  updated_by: "CODER"
  note: "Verification passed. Commands: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts --config vitest.workspace.ts (2 files, 13 tests passed); bun run arch:deps (no dependency violations); bun run typecheck (passed); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 42 -> 41)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T21:57:59.641Z"
  updated_by: "EVALUATOR"
  note: "Task brief command decomposition preserves behavior and reduces hotspot pressure."
  evaluated_sha: "cffbded2866e0b3c9b6cbb06f85653bd2d3af9b7"
  blueprint_digest: "7e9060979838e9b97c2321bb399a9d48062a0b705ac3bcbfee59fa0afa5558f8"
  evidence_refs:
    - ".agentplane/tasks/202605282151-HXSGQX/README.md"
    - ".agentplane/tasks/202605282151-HXSGQX/quality/20260528-215759641-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282151-HXSGQX/quality/20260528-215759641-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282151-HXSGQX/quality/20260528-215759641-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282151-HXSGQX/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/brief.command.ts"
    - "packages/agentplane/src/commands/task/brief-model.ts"
    - "packages/agentplane/src/commands/task/brief-render.ts"
  findings:
    - "brief.command.ts now contains only CLI spec/handler wiring; brief-model.ts owns JSON contract assembly; brief-render.ts owns text output. Focused route-decision tests, arch:deps, typecheck, lint:core, format:changed, and hotspot report passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose task brief command into focused, acyclic helpers while preserving JSON/text output contracts."
events:
  -
    type: "status"
    at: "2026-05-28T21:52:17.073Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose task brief command into focused, acyclic helpers while preserving JSON/text output contracts."
  -
    type: "verify"
    at: "2026-05-28T21:57:37.467Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed. Commands: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts --config vitest.workspace.ts (2 files, 13 tests passed); bun run arch:deps (no dependency violations); bun run typecheck (passed); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 42 -> 41)."
doc_version: 3
doc_updated_at: "2026-05-28T21:57:37.492Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report."
sections:
  Summary: |-
    Task brief command decomposition

    Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report.
    - Out of scope: unrelated refactors not required for "Task brief command decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree from the route oracle for task brief command decomposition.
    2. Split brief command into acyclic helpers: keep CLI spec/handler in brief.command.ts, move brief model/build logic and text rendering helpers into focused modules.
    3. Preserve JSON and text output contracts for agentplane task brief.
    4. Run focused task brief CLI tests plus arch:deps, typecheck, lint:core, format:changed, and hotspot-report.
    5. Record verification/evaluator evidence, open PR, wait for hosted checks, merge through GitHub, close task lifecycle.
  Verify Steps: |-
    PLANNER fallback scaffold for "Task brief command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Task brief command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T21:57:37.467Z — VERIFY — ok

    By: CODER

    Note: Verification passed. Commands: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts --config vitest.workspace.ts (2 files, 13 tests passed); bun run arch:deps (no dependency violations); bun run typecheck (passed); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 42 -> 41).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:52:17.073Z, excerpt_hash=sha256:28ed65d6e28935d80cbdc77ef2933bc15e5ae53651ace6850ba96418bee447e8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282151-HXSGQX-task-brief-command-decomposition/.agentplane/tasks/202605282151-HXSGQX/blueprint/resolved-snapshot.json
    - old_digest: 7e9060979838e9b97c2321bb399a9d48062a0b705ac3bcbfee59fa0afa5558f8
    - current_digest: 7e9060979838e9b97c2321bb399a9d48062a0b705ac3bcbfee59fa0afa5558f8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282151-HXSGQX

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Split task brief command into brief-model and brief-render helpers; brief.command.ts is now 63 lines.
      Impact: Preserves task brief JSON/text behavior while removing one runtime hotspot from the warning list.
      Resolution: Focused tests and architecture/type/lint/format/hotspot gates passed.
id_source: "generated"
---
## Summary

Task brief command decomposition

Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report.

## Scope

- In scope: Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report.
- Out of scope: unrelated refactors not required for "Task brief command decomposition".

## Plan

Plan:
1. Start branch_pr worktree from the route oracle for task brief command decomposition.
2. Split brief command into acyclic helpers: keep CLI spec/handler in brief.command.ts, move brief model/build logic and text rendering helpers into focused modules.
3. Preserve JSON and text output contracts for agentplane task brief.
4. Run focused task brief CLI tests plus arch:deps, typecheck, lint:core, format:changed, and hotspot-report.
5. Record verification/evaluator evidence, open PR, wait for hosted checks, merge through GitHub, close task lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Task brief command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Task brief command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T21:57:37.467Z — VERIFY — ok

By: CODER

Note: Verification passed. Commands: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts --config vitest.workspace.ts (2 files, 13 tests passed); bun run arch:deps (no dependency violations); bun run typecheck (passed); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 42 -> 41).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:52:17.073Z, excerpt_hash=sha256:28ed65d6e28935d80cbdc77ef2933bc15e5ae53651ace6850ba96418bee447e8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282151-HXSGQX-task-brief-command-decomposition/.agentplane/tasks/202605282151-HXSGQX/blueprint/resolved-snapshot.json
- old_digest: 7e9060979838e9b97c2321bb399a9d48062a0b705ac3bcbfee59fa0afa5558f8
- current_digest: 7e9060979838e9b97c2321bb399a9d48062a0b705ac3bcbfee59fa0afa5558f8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282151-HXSGQX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Split task brief command into brief-model and brief-render helpers; brief.command.ts is now 63 lines.
  Impact: Preserves task brief JSON/text behavior while removing one runtime hotspot from the warning list.
  Resolution: Focused tests and architecture/type/lint/format/hotspot gates passed.
