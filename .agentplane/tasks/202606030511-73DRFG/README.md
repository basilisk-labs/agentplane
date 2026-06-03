---
id: "202606030511-73DRFG"
title: "Fix finish quality review target for artifact commits"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T05:12:05.060Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T05:44:18.487Z"
  updated_by: "CODER"
  note: "Verified: added finish auto-resolution for task-artifact --commit without --implementation-commit; focused Vitest suite passed 32 tests across 2 files, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-03T05:23:31.869Z"
  updated_by: "EVALUATOR"
  note: "Finish quality review target now uses --implementation-commit before artifact --commit, preventing artifact-only close commits from forcing stale evaluator loops."
  evaluated_sha: "462f15bf426c32b26c90f2d9e2ec417a9849bde7"
  blueprint_digest: "ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3"
  evidence_refs:
    - ".agentplane/tasks/202606030511-73DRFG/README.md"
    - ".agentplane/tasks/202606030511-73DRFG/quality/20260603-052331869-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606030511-73DRFG/quality/20260603-052331869-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606030511-73DRFG/quality/20260603-052331869-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
    - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
    - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "Regression coverage exercises artifact --commit with implementation --implementation-commit and a quality_review evaluated against the implementation SHA."
    - "Focused finish and quality-review gate tests passed, routing policy passed, and targeted formatting passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing finish quality review freshness so artifact-only task commits do not force evaluator review loops; scope is finish target selection plus focused regression tests."
events:
  -
    type: "status"
    at: "2026-06-03T05:12:38.834Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing finish quality review freshness so artifact-only task commits do not force evaluator review loops; scope is finish target selection plus focused regression tests."
  -
    type: "verify"
    at: "2026-06-03T05:17:30.179Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts passed 31 tests across 2 files; node .agentplane/policy/check-routing.mjs returned policy routing OK; targeted Prettier check passed."
  -
    type: "verify"
    at: "2026-06-03T05:22:57.790Z"
    author: "CODER"
    state: "ok"
    note: "Verified: implementation commit 63d2862a5 preserves focused test pass (31 tests across 2 files), policy routing OK, and targeted Prettier check pass after the finish quality-review target change."
  -
    type: "verify"
    at: "2026-06-03T05:44:18.487Z"
    author: "CODER"
    state: "ok"
    note: "Verified: added finish auto-resolution for task-artifact --commit without --implementation-commit; focused Vitest suite passed 32 tests across 2 files, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract."
doc_version: 3
doc_updated_at: "2026-06-03T05:44:18.522Z"
doc_updated_by: "CODER"
description: "Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop."
sections:
  Summary: |-
    Fix finish quality review target for artifact commits

    Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop.
  Scope: |-
    - In scope: Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop.
    - Out of scope: unrelated refactors not required for "Fix finish quality review target for artifact commits".
  Plan: |-
    1. Reproduce the lifecycle mismatch in a focused finish validation test: evaluator quality_review.evaluated_sha points at the implementation commit while --commit points at a later task-artifact-only closure commit.
    2. Update finish quality-review target selection so --implementation-commit takes precedence over --commit for EVALUATOR freshness checks.
    3. Auto-resolve the implementation commit from quality_review.evaluated_sha when --commit is a task-local artifact advance and --implementation-commit is absent.
    4. Keep existing stale-review behavior when --commit is not a task-local artifact advance.
    5. Verify with focused finish/evaluator tests, routing policy check, and task verify-show/verify evidence.
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: focused finish quality-gate tests pass, including explicit --implementation-commit and auto-resolved task-artifact --commit scenarios.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy budgets and gateway contracts pass.
    3. Run `agentplane task verify-show 202606030511-73DRFG`. Expected: task verification contract and blueprint evidence are readable and current.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T05:17:30.179Z — VERIFY — ok

    By: CODER

    Note: Verified: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts passed 31 tests across 2 files; node .agentplane/policy/check-routing.mjs returned policy routing OK; targeted Prettier check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:12:38.834Z, excerpt_hash=sha256:2b1b1c4d71afa61fef8f28529b2a35bb48d3a00e30e166f69d5b702093fb48ed

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
    - old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606030511-73DRFG

    ### 2026-06-03T05:22:57.790Z — VERIFY — ok

    By: CODER

    Note: Verified: implementation commit 63d2862a5 preserves focused test pass (31 tests across 2 files), policy routing OK, and targeted Prettier check pass after the finish quality-review target change.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:17:30.208Z, excerpt_hash=sha256:2b1b1c4d71afa61fef8f28529b2a35bb48d3a00e30e166f69d5b702093fb48ed

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
    - old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606030511-73DRFG

    ### 2026-06-03T05:44:18.487Z — VERIFY — ok

    By: CODER

    Note: Verified: added finish auto-resolution for task-artifact --commit without --implementation-commit; focused Vitest suite passed 32 tests across 2 files, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:22:57.823Z, excerpt_hash=sha256:e21a514301c0787a90ec3c9278f255c326a4f79239b5a2ebc59bc6eda64b877e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
    - old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606030511-73DRFG

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix finish quality review target for artifact commits

Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop.

## Scope

- In scope: Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop.
- Out of scope: unrelated refactors not required for "Fix finish quality review target for artifact commits".

## Plan

1. Reproduce the lifecycle mismatch in a focused finish validation test: evaluator quality_review.evaluated_sha points at the implementation commit while --commit points at a later task-artifact-only closure commit.
2. Update finish quality-review target selection so --implementation-commit takes precedence over --commit for EVALUATOR freshness checks.
3. Auto-resolve the implementation commit from quality_review.evaluated_sha when --commit is a task-local artifact advance and --implementation-commit is absent.
4. Keep existing stale-review behavior when --commit is not a task-local artifact advance.
5. Verify with focused finish/evaluator tests, routing policy check, and task verify-show/verify evidence.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: focused finish quality-gate tests pass, including explicit --implementation-commit and auto-resolved task-artifact --commit scenarios.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy budgets and gateway contracts pass.
3. Run `agentplane task verify-show 202606030511-73DRFG`. Expected: task verification contract and blueprint evidence are readable and current.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T05:17:30.179Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts passed 31 tests across 2 files; node .agentplane/policy/check-routing.mjs returned policy routing OK; targeted Prettier check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:12:38.834Z, excerpt_hash=sha256:2b1b1c4d71afa61fef8f28529b2a35bb48d3a00e30e166f69d5b702093fb48ed

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
- old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606030511-73DRFG

### 2026-06-03T05:22:57.790Z — VERIFY — ok

By: CODER

Note: Verified: implementation commit 63d2862a5 preserves focused test pass (31 tests across 2 files), policy routing OK, and targeted Prettier check pass after the finish quality-review target change.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:17:30.208Z, excerpt_hash=sha256:2b1b1c4d71afa61fef8f28529b2a35bb48d3a00e30e166f69d5b702093fb48ed

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
- old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606030511-73DRFG

### 2026-06-03T05:44:18.487Z — VERIFY — ok

By: CODER

Note: Verified: added finish auto-resolution for task-artifact --commit without --implementation-commit; focused Vitest suite passed 32 tests across 2 files, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:22:57.823Z, excerpt_hash=sha256:e21a514301c0787a90ec3c9278f255c326a4f79239b5a2ebc59bc6eda64b877e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
- old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606030511-73DRFG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
