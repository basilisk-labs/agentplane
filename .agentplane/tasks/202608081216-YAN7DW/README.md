---
id: "202608081216-YAN7DW"
title: "Parallelize release qualification without weakening gates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release-performance"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run e2e:v0.7.1:check"
  - "bun run test:critical"
  - "bun run format:check"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T12:17:11.125Z"
  updated_by: "ORCHESTRATOR"
  note: "User explicitly approved pausing the active v0.7.5 verification and implementing no-quality-loss release acceleration before restarting the release."
verification:
  state: "needs_rework"
  updated_at: "2026-08-08T12:39:23.968Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Unsupported declared check: node --test scripts/qualification/release-qualification.test.mjs"
  attempts: 2
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement bounded release-qualification concurrency with isolated provider fixtures and unchanged quality gates."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 44a20df62970. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e98b2f655c04. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-08T12:17:22.983Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement bounded release-qualification concurrency with isolated provider fixtures and unchanged quality gates."
  -
    type: "status"
    at: "2026-08-08T12:30:47.296Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 44a20df62970. CLI accepted one state-bound external-agent semantic result."
    commit: "44a20df62970908b1d043e9c8bdd9da7ded611c3"
  -
    type: "verify"
    at: "2026-08-08T12:34:31.801Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Unsupported declared check: bunx vitest run scripts/bench/capture-agent-efficiency-candidate.test.mjs"
  -
    type: "status"
    at: "2026-08-08T12:39:17.746Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e98b2f655c04. CLI accepted one state-bound external-agent semantic result."
    commit: "e98b2f655c04712c51f1b482106d1a045a51a55b"
  -
    type: "verify"
    at: "2026-08-08T12:39:23.968Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Unsupported declared check: node --test scripts/qualification/release-qualification.test.mjs"
doc_version: 3
doc_updated_at: "2026-08-08T12:40:01.775Z"
doc_updated_by: "SUPERVISOR"
description: "Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds."
sections:
  Summary: |-
    Parallelize release qualification without weakening gates

    Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
  Scope: |-
    - In scope: Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
    - Out of scope: unrelated refactors not required for "Parallelize release qualification without weakening gates".
  Plan: |-
    1. Establish a timing and behavior baseline for the qualification runner and provider replay capture.
    2. Add bounded concurrency for independent work while preserving manifest dependency ordering, per-run repository isolation, deterministic output ordering, and fail-closed behavior.
    3. Add focused regression tests for concurrency limits, dependency barriers, failure propagation, and evidence determinism.
    4. Run targeted tests, format, and ci:contract; compare serial and concurrent pilot behavior.
    5. Integrate the verified change into the v0.7.5 candidate, invalidate the paused old-SHA verification, and restart the full release gate.

    Scope limit: qualification runner, provider replay capture, their focused tests, and required generated documentation only. No quality threshold, scenario count, provider episode count, retry policy, publish authority, or hosted gate may be weakened.
  Verify Steps: |-
    1. Run `bun run e2e:v0.7.1:check`. Expected: qualification contract tests pass and the full gate command resolves every required variable in dry-run mode.
    2. Run `bun run test:critical`. Expected: the critical CLI suite passes, including candidate capture concurrency, stop-on-first-failure, evidence cleanup, and existing RF-04 contracts.
    3. Run `bun run format:check`. Expected: formatting passes.
    4. Run `bun run ci:contract`. Expected: repository contracts, lint, architecture, clone, knip, and coverage thresholds pass.
    5. The subsequent v0.7.5 release gate must execute the full 50-run/55-episode provider matrix on the exact integrated candidate SHA; no provider evidence from the pre-change SHA may be reused.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-08T12:34:31.801Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Unsupported declared check: bunx vitest run scripts/bench/capture-agent-efficiency-candidate.test.mjs
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T12:30:47.296Z, excerpt_hash=sha256:1c6dd78aa74d21c9fea2d5488d2cb1746ff3350caa20674cfc62d87e84021bb7

    Details:

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/tasks/202608081216-YAN7DW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608081216-YAN7DW declared verification

    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608081216-YAN7DW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608081216-YAN7DW declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608081216-YAN7DW-parallelize-release-qualification/.agentplane/tasks/202608081216-YAN7DW/blueprint/resolved-snapshot.json
    - old_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
    - current_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608081216-YAN7DW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608081216-YAN7DW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T12:39:23.968Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Unsupported declared check: node --test scripts/qualification/release-qualification.test.mjs
    Attempts: 2

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T12:39:17.746Z, excerpt_hash=sha256:d4c1e7abe40d89ceafcb23b71203a483a6f3ce14597ea1726ebd22a853e65cad

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608081216-YAN7DW-parallelize-release-qualification/.agentplane/tasks/202608081216-YAN7DW/blueprint/resolved-snapshot.json
    - old_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
    - current_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608081216-YAN7DW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608081216-YAN7DW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c603521981291f6487f926240137c3cba7cd8fc6"
    version: 1
id_source: "generated"
---
## Summary

Parallelize release qualification without weakening gates

Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.

## Scope

- In scope: Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
- Out of scope: unrelated refactors not required for "Parallelize release qualification without weakening gates".

## Plan

1. Establish a timing and behavior baseline for the qualification runner and provider replay capture.
2. Add bounded concurrency for independent work while preserving manifest dependency ordering, per-run repository isolation, deterministic output ordering, and fail-closed behavior.
3. Add focused regression tests for concurrency limits, dependency barriers, failure propagation, and evidence determinism.
4. Run targeted tests, format, and ci:contract; compare serial and concurrent pilot behavior.
5. Integrate the verified change into the v0.7.5 candidate, invalidate the paused old-SHA verification, and restart the full release gate.

Scope limit: qualification runner, provider replay capture, their focused tests, and required generated documentation only. No quality threshold, scenario count, provider episode count, retry policy, publish authority, or hosted gate may be weakened.

## Verify Steps

1. Run `bun run e2e:v0.7.1:check`. Expected: qualification contract tests pass and the full gate command resolves every required variable in dry-run mode.
2. Run `bun run test:critical`. Expected: the critical CLI suite passes, including candidate capture concurrency, stop-on-first-failure, evidence cleanup, and existing RF-04 contracts.
3. Run `bun run format:check`. Expected: formatting passes.
4. Run `bun run ci:contract`. Expected: repository contracts, lint, architecture, clone, knip, and coverage thresholds pass.
5. The subsequent v0.7.5 release gate must execute the full 50-run/55-episode provider matrix on the exact integrated candidate SHA; no provider evidence from the pre-change SHA may be reused.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-08T12:34:31.801Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Unsupported declared check: bunx vitest run scripts/bench/capture-agent-efficiency-candidate.test.mjs
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T12:30:47.296Z, excerpt_hash=sha256:1c6dd78aa74d21c9fea2d5488d2cb1746ff3350caa20674cfc62d87e84021bb7

Details:

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/tasks/202608081216-YAN7DW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608081216-YAN7DW declared verification

Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608081216-YAN7DW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608081216-YAN7DW declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608081216-YAN7DW-parallelize-release-qualification/.agentplane/tasks/202608081216-YAN7DW/blueprint/resolved-snapshot.json
- old_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
- current_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608081216-YAN7DW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608081216-YAN7DW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T12:39:23.968Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Unsupported declared check: node --test scripts/qualification/release-qualification.test.mjs
Attempts: 2

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T12:39:17.746Z, excerpt_hash=sha256:d4c1e7abe40d89ceafcb23b71203a483a6f3ce14597ea1726ebd22a853e65cad

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608081216-YAN7DW-parallelize-release-qualification/.agentplane/tasks/202608081216-YAN7DW/blueprint/resolved-snapshot.json
- old_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
- current_digest: bbaf4dbc8aee682941dbba86d4bff52b697512a1eafcd38eeff89c6b6df7b0b1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608081216-YAN7DW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608081216-YAN7DW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
