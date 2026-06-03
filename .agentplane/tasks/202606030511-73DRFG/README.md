---
id: "202606030511-73DRFG"
title: "Fix finish quality review target for artifact commits"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T05:12:05.060Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T05:53:47.853Z"
  updated_by: "CODER"
  note: "Verified: auto-resolve finish implementation commit handling is covered by focused tests; bunx vitest passed 33 tests across 3 files, policy routing OK, hotspot/baseline checks passed after moving regression coverage out of finish.validation, and targeted Prettier passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-03T05:46:59.027Z"
  updated_by: "EVALUATOR"
  note: "Finish now auto-resolves implementation provenance when --commit points at task-local artifacts and quality_review.evaluated_sha points at the reviewed implementation commit."
  evaluated_sha: "2f64b05d06691e49384b2d93afe20268aaf449be"
  blueprint_digest: "ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3"
  evidence_refs:
    - ".agentplane/tasks/202606030511-73DRFG/README.md"
    - ".agentplane/tasks/202606030511-73DRFG/quality/20260603-054659027-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606030511-73DRFG/quality/20260603-054659027-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606030511-73DRFG/quality/20260603-054659027-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/finish-execute-commit.ts"
    - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
    - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "The new regression test covers finish without --implementation-commit when the evidence commit advances only the active task artifact subtree."
    - "Existing explicit --implementation-commit precedence remains covered, and focused finish/quality-review tests pass."
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
  -
    type: "verify"
    at: "2026-06-03T05:48:53.863Z"
    author: "CODER"
    state: "ok"
    note: "Verified: current head ef6ae4d33 includes auto-resolved finish implementation commit handling and refreshed evaluator evidence; focused Vitest suite passed 32 tests, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract."
  -
    type: "verify"
    at: "2026-06-03T05:53:47.853Z"
    author: "CODER"
    state: "ok"
    note: "Verified: auto-resolve finish implementation commit handling is covered by focused tests; bunx vitest passed 33 tests across 3 files, policy routing OK, hotspot/baseline checks passed after moving regression coverage out of finish.validation, and targeted Prettier passed."
doc_version: 3
doc_updated_at: "2026-06-03T05:53:47.960Z"
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
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: focused finish quality-gate tests pass, including explicit --implementation-commit and auto-resolved task-artifact --commit scenarios.
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

    ### 2026-06-03T05:48:53.863Z — VERIFY — ok

    By: CODER

    Note: Verified: current head ef6ae4d33 includes auto-resolved finish implementation commit handling and refreshed evaluator evidence; focused Vitest suite passed 32 tests, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:44:18.522Z, excerpt_hash=sha256:e21a514301c0787a90ec3c9278f255c326a4f79239b5a2ebc59bc6eda64b877e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
    - old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606030511-73DRFG

    ### 2026-06-03T05:53:47.853Z — VERIFY — ok

    By: CODER

    Note: Verified: auto-resolve finish implementation commit handling is covered by focused tests; bunx vitest passed 33 tests across 3 files, policy routing OK, hotspot/baseline checks passed after moving regression coverage out of finish.validation, and targeted Prettier passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:48:53.900Z, excerpt_hash=sha256:1c2e1f27f615b990da7a16a6a590bb88b3642106021d68d0245722fca38d2003

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

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: focused finish quality-gate tests pass, including explicit --implementation-commit and auto-resolved task-artifact --commit scenarios.
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

### 2026-06-03T05:48:53.863Z — VERIFY — ok

By: CODER

Note: Verified: current head ef6ae4d33 includes auto-resolved finish implementation commit handling and refreshed evaluator evidence; focused Vitest suite passed 32 tests, policy routing OK, targeted Prettier passed, and task verify-show read back the updated contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:44:18.522Z, excerpt_hash=sha256:e21a514301c0787a90ec3c9278f255c326a4f79239b5a2ebc59bc6eda64b877e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030511-73DRFG-finish-quality-review-target/.agentplane/tasks/202606030511-73DRFG/blueprint/resolved-snapshot.json
- old_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- current_digest: ea1faec7231145a279085d65f921226d11b48d2ffcf985f8581eb96f787cfda3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606030511-73DRFG

### 2026-06-03T05:53:47.853Z — VERIFY — ok

By: CODER

Note: Verified: auto-resolve finish implementation commit handling is covered by focused tests; bunx vitest passed 33 tests across 3 files, policy routing OK, hotspot/baseline checks passed after moving regression coverage out of finish.validation, and targeted Prettier passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T05:48:53.900Z, excerpt_hash=sha256:1c2e1f27f615b990da7a16a6a590bb88b3642106021d68d0245722fca38d2003

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
