---
id: "202605282032-G4EWJG"
title: "Guard commit implementation decomposition"
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
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T20:32:45.164Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T20:37:33.408Z"
  updated_by: "CODER"
  note: "Guard commit decomposition verified locally."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T20:38:16.727Z"
  updated_by: "EVALUATOR"
  note: "Guard commit implementation decomposition preserves behavior while reducing commit.ts from 556 to 200 lines."
  evaluated_sha: "f0ef4fb03c3dbd03ecfc8172da8fee34b0e66de7"
  blueprint_digest: "045083bdc837f95d4444d995f9b17645221b17711f80a9a552e7cc26361a0746"
  evidence_refs:
    - ".agentplane/tasks/202605282032-G4EWJG/README.md"
    - ".agentplane/tasks/202605282032-G4EWJG/quality/20260528-203816727-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282032-G4EWJG/quality/20260528-203816727-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282032-G4EWJG/quality/20260528-203816727-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282032-G4EWJG/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/guard/impl/commit.ts"
    - "packages/agentplane/src/commands/guard/impl/commit-close.ts"
    - "packages/agentplane/src/commands/guard/impl/commit-runner.ts"
  findings:
    - "Extracted close-tail commit handling into commit-close.ts and lock-aware git commit execution into commit-runner.ts; local guard tests, typecheck, lint, format, hotspot check, and the ap commit smoke path passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose guard commit implementation into focused helper modules while preserving behavior and verifying with targeted guard checks."
events:
  -
    type: "status"
    at: "2026-05-28T20:32:57.890Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose guard commit implementation into focused helper modules while preserving behavior and verifying with targeted guard checks."
  -
    type: "verify"
    at: "2026-05-28T20:37:33.408Z"
    author: "CODER"
    state: "ok"
    note: "Guard commit decomposition verified locally."
doc_version: 3
doc_updated_at: "2026-05-28T20:37:33.434Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks."
sections:
  Summary: |-
    Guard commit implementation decomposition

    Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks.
    - Out of scope: unrelated refactors not required for "Guard commit implementation decomposition".
  Plan: |-
    1. Inspect commit guard implementation and tests to identify cohesive extraction boundaries.
    2. Extract commit message/path/status helpers from commit.ts into narrowly named sibling modules under commands/guard/impl while preserving existing imports and behavior.
    3. Keep commit.ts as orchestration glue and reduce it below the hotspot warning threshold if safely possible.
    4. Run targeted guard tests, typecheck, lint:core, format:changed, and hotspot-report check.
    5. Publish PR, record verification/evaluator evidence, and integrate only after hosted checks are green.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T20:37:33.408Z — VERIFY — ok

    By: CODER

    Note: Guard commit decomposition verified locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:32:57.890Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282032-G4EWJG-guard-commit-decomposition/.agentplane/tasks/202605282032-G4EWJG/blueprint/resolved-snapshot.json
    - old_digest: 045083bdc837f95d4444d995f9b17645221b17711f80a9a552e7cc26361a0746
    - current_digest: 045083bdc837f95d4444d995f9b17645221b17711f80a9a552e7cc26361a0746
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282032-G4EWJG

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 5 files, 73 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 47 to 46.
      Impact: commit.ts now delegates close-tail commit flow and lock-aware git commit execution to focused modules; guard behavior is unchanged.
      Resolution: Proceed to PR and hosted checks.
id_source: "generated"
---
## Summary

Guard commit implementation decomposition

Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks.

## Scope

- In scope: Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks.
- Out of scope: unrelated refactors not required for "Guard commit implementation decomposition".

## Plan

1. Inspect commit guard implementation and tests to identify cohesive extraction boundaries.
2. Extract commit message/path/status helpers from commit.ts into narrowly named sibling modules under commands/guard/impl while preserving existing imports and behavior.
3. Keep commit.ts as orchestration glue and reduce it below the hotspot warning threshold if safely possible.
4. Run targeted guard tests, typecheck, lint:core, format:changed, and hotspot-report check.
5. Publish PR, record verification/evaluator evidence, and integrate only after hosted checks are green.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T20:37:33.408Z — VERIFY — ok

By: CODER

Note: Guard commit decomposition verified locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:32:57.890Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282032-G4EWJG-guard-commit-decomposition/.agentplane/tasks/202605282032-G4EWJG/blueprint/resolved-snapshot.json
- old_digest: 045083bdc837f95d4444d995f9b17645221b17711f80a9a552e7cc26361a0746
- current_digest: 045083bdc837f95d4444d995f9b17645221b17711f80a9a552e7cc26361a0746
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282032-G4EWJG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 5 files, 73 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 47 to 46.
  Impact: commit.ts now delegates close-tail commit flow and lock-aware git commit execution to focused modules; guard behavior is unchanged.
  Resolution: Proceed to PR and hosted checks.
