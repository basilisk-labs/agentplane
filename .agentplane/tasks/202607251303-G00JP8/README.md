---
id: "202607251303-G00JP8"
title: "Stabilize parallel full-fast runner and integration tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "concurrency"
  - "quality"
  - "release-blocker"
  - "reliability"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run knip:check && bun run typecheck && bun run lint:core && bun run hotspots:check"
  - "bun run test:fast"
  - "bun run test:platform-critical && bun run test:critical"
  - "bun run test:project -- agentplane packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-history-safe.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/release/bun-compiled-cli-smoke-script.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T13:34:18.801Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-25T13:10:23.500Z"
  updated_by: "TESTER"
  note: "Implementation evidence is not present yet; the lifecycle-only PR head cannot satisfy the task Verify Steps."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: stabilize the diagnosed runner claim precedence and test isolation races before resuming RF08 integration."
events:
  -
    type: "status"
    at: "2026-07-25T13:08:41.267Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilize the diagnosed runner claim precedence and test isolation races before resuming RF08 integration."
  -
    type: "verify"
    at: "2026-07-25T13:10:23.500Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Implementation evidence is not present yet; the lifecycle-only PR head cannot satisfy the task Verify Steps."
doc_version: 3
doc_updated_at: "2026-07-25T13:46:27.452Z"
doc_updated_by: "CODER"
description: "Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence."
sections:
  Summary: |-
    Stabilize parallel full-fast runner and integration tests

    Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
  Scope: |-
    - In scope: Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
    - Out of scope: unrelated refactors not required for "Stabilize parallel full-fast runner and integration tests".
  Plan: |-
    1. Add a non-mutating live-claim preflight before mutable supervisor-history capture so an already live or unverifiable owner deterministically returns the formal busy error; preserve existing history anchors, atomic publication, stale recovery, and fail-closed behavior for absent or stale claims, with direct regression coverage.
    2. Replace lock-directory polling in the three mutex concurrency tests with explicit callback-ready and release barriers that propagate early holder failures and always release holders in finally blocks; do not modify production mutex behavior.
    3. Keep the compiled CLI smoke on the real built dist entry and prevent the parallel cold-path benchmark test from invoking repo-local auto-bootstrap or mutating shared dist; assert the two isolation environment variables through a measured stub CLI.
    4. Run focused and repeated stress checks, full fast, critical, platform-critical, and release-critical suites, static gates, independent evaluation, hosted checks, and integrate through the branch_pr queue.
  Verify Steps: |-
    1. Acquire a second runner claim while a live non-stale claim exists and supervisor history is concurrently unstable. Expected: the CLI returns E_USAGE with active_run_authority=supervisor_active_run_claim before any provider starts; absent and stale claim paths retain fail-closed history-anchor checks.
    2. Run the active-claim concurrency and history-safety suites repeatedly. Expected: both replay scenarios deterministically reject the competing run and all safety regressions pass.
    3. Stress the integration queue mutex tests in queue-state.test.ts, queue-mutex.test.ts, and git-mutation.test.ts. Expected: callback-ready barriers remove release initialization races without changing production mutex behavior.
    4. Stress measure-cli-cold-path-script.test.ts together with bun-compiled-cli-smoke-script.test.ts at two workers. Expected: the benchmark disables repo-local auto-bootstrap for its child process, never rebuilds or removes shared dist during test:fast, and the smoke continues to validate the actual built dist/cli.js.
    5. Run bun run test:fast, bun run test:critical, bun run test:platform-critical, bun run test:release:critical, bun run knip:check, bun run typecheck, bun run format:changed, bun run lint:core, bun run hotspots:check, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass and no temporary runner or queue-lock artifacts remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T13:10:23.500Z — VERIFY — needs_rework

    By: TESTER

    Note: Implementation evidence is not present yet; the lifecycle-only PR head cannot satisfy the task Verify Steps.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T13:08:41.267Z, excerpt_hash=sha256:4d6b321804e10c938fe6c24af0a3a09aff34df2a3c42beff356d52394a960fe9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251303-G00JP8-stabilize-parallel-full-fast-runner-and-integrat/.agentplane/tasks/202607251303-G00JP8/blueprint/resolved-snapshot.json
    - old_digest: b5afd45f237612970c5f7e42075dea40b1de8f21fcff2a54b12960f48f07521f
    - current_digest: b5afd45f237612970c5f7e42075dea40b1de8f21fcff2a54b12960f48f07521f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607251303-G00JP8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607251303-G00JP8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: A live active-run claim was checked only after mutable supervisor-history capture; three mutex tests exposed lock creation before their release callback was ready; the cold-path benchmark could auto-bootstrap through the repo-local wrapper and rebuild shared dist during parallel test:fast.
      Impact: Competing runs could report misleading E_IO instead of the formal busy authority, mutex tests could fail nondeterministically, and compiled smoke could observe a transiently missing dist/cli.js.
      Resolution: Added the live-claim preflight while preserving stale/absent fail-closed guards, replaced polling with callback-ready/finally barriers, and disabled benchmark child auto-bootstrap while keeping compiled smoke on the actual built dist. Focused, stress, full, static, doctor, routing, and two independent reviews pass.
id_source: "generated"
---
## Summary

Stabilize parallel full-fast runner and integration tests

Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.

## Scope

- In scope: Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
- Out of scope: unrelated refactors not required for "Stabilize parallel full-fast runner and integration tests".

## Plan

1. Add a non-mutating live-claim preflight before mutable supervisor-history capture so an already live or unverifiable owner deterministically returns the formal busy error; preserve existing history anchors, atomic publication, stale recovery, and fail-closed behavior for absent or stale claims, with direct regression coverage.
2. Replace lock-directory polling in the three mutex concurrency tests with explicit callback-ready and release barriers that propagate early holder failures and always release holders in finally blocks; do not modify production mutex behavior.
3. Keep the compiled CLI smoke on the real built dist entry and prevent the parallel cold-path benchmark test from invoking repo-local auto-bootstrap or mutating shared dist; assert the two isolation environment variables through a measured stub CLI.
4. Run focused and repeated stress checks, full fast, critical, platform-critical, and release-critical suites, static gates, independent evaluation, hosted checks, and integrate through the branch_pr queue.

## Verify Steps

1. Acquire a second runner claim while a live non-stale claim exists and supervisor history is concurrently unstable. Expected: the CLI returns E_USAGE with active_run_authority=supervisor_active_run_claim before any provider starts; absent and stale claim paths retain fail-closed history-anchor checks.
2. Run the active-claim concurrency and history-safety suites repeatedly. Expected: both replay scenarios deterministically reject the competing run and all safety regressions pass.
3. Stress the integration queue mutex tests in queue-state.test.ts, queue-mutex.test.ts, and git-mutation.test.ts. Expected: callback-ready barriers remove release initialization races without changing production mutex behavior.
4. Stress measure-cli-cold-path-script.test.ts together with bun-compiled-cli-smoke-script.test.ts at two workers. Expected: the benchmark disables repo-local auto-bootstrap for its child process, never rebuilds or removes shared dist during test:fast, and the smoke continues to validate the actual built dist/cli.js.
5. Run bun run test:fast, bun run test:critical, bun run test:platform-critical, bun run test:release:critical, bun run knip:check, bun run typecheck, bun run format:changed, bun run lint:core, bun run hotspots:check, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass and no temporary runner or queue-lock artifacts remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T13:10:23.500Z — VERIFY — needs_rework

By: TESTER

Note: Implementation evidence is not present yet; the lifecycle-only PR head cannot satisfy the task Verify Steps.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T13:08:41.267Z, excerpt_hash=sha256:4d6b321804e10c938fe6c24af0a3a09aff34df2a3c42beff356d52394a960fe9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251303-G00JP8-stabilize-parallel-full-fast-runner-and-integrat/.agentplane/tasks/202607251303-G00JP8/blueprint/resolved-snapshot.json
- old_digest: b5afd45f237612970c5f7e42075dea40b1de8f21fcff2a54b12960f48f07521f
- current_digest: b5afd45f237612970c5f7e42075dea40b1de8f21fcff2a54b12960f48f07521f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607251303-G00JP8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607251303-G00JP8
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

- Observation: A live active-run claim was checked only after mutable supervisor-history capture; three mutex tests exposed lock creation before their release callback was ready; the cold-path benchmark could auto-bootstrap through the repo-local wrapper and rebuild shared dist during parallel test:fast.
  Impact: Competing runs could report misleading E_IO instead of the formal busy authority, mutex tests could fail nondeterministically, and compiled smoke could observe a transiently missing dist/cli.js.
  Resolution: Added the live-claim preflight while preserving stale/absent fail-closed guards, replaced polling with callback-ready/finally barriers, and disabled benchmark child auto-bootstrap while keeping compiled smoke on the actual built dist. Focused, stress, full, static, doctor, routing, and two independent reviews pass.
