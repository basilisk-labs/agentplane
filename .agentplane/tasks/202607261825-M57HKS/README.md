---
id: "202607261825-M57HKS"
title: "Stabilize task-run launch under concurrent active claims"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast"
  - "bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000 --reporter=dot"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T18:26:44.537Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-26T18:42:29.060Z"
  updated_by: "TESTER"
  note: "REWORK: full fast CI passed, but the branch has no runner implementation or regression-coverage change. This classifies the prior failure as schedule-sensitive only; it does not prove the prepared-to-running gate or fixture-cleanup ownership is repaired."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-26T18:27:35.440Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T18:42:29.060Z"
    author: "TESTER"
    state: "needs_rework"
    note: "REWORK: full fast CI passed, but the branch has no runner implementation or regression-coverage change. This classifies the prior failure as schedule-sensitive only; it does not prove the prepared-to-running gate or fixture-cleanup ownership is repaired."
doc_version: 3
doc_updated_at: "2026-07-26T19:39:20.810Z"
doc_updated_by: "CODER"
description: "Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI."
sections:
  Summary: |-
    Stabilize task-run launch under concurrent active claims

    Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI.
  Scope: |-
    - In scope: Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI.
    - Out of scope: unrelated refactors not required for "Stabilize task-run launch under concurrent active claims".
  Plan: |-
    1. Reproduce the four runner suites under the exact CI worker/timeouts and capture the active-claim, effect-journal, spawn/identity, and temporary-root cleanup order.
    2. Identify the first broken prepared-to-running transition; preserve active-claim authority and cancellation/replay semantics instead of masking it with sleeps or broader timeouts.
    3. Implement the smallest runner or test-harness lifecycle fix, keeping DX3 cleanup modules out of scope.
    4. Add focused regression coverage for concurrent retry/replay, cancellation, and cleanup ownership so pending promises cannot outlive temporary fixture roots.
    5. Verify the four-file concurrent runner matrix, typecheck, lifecycle invariants, guards, routing, and capacity-normalized full fast CI; record flake classification.
  Verify Steps: |-
    1. Run the exact five-file runner matrix:
    bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-process-identity-serialization.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000 --reporter=dot
    Expected: all active-claim concurrency, active-claim, cancellation, replay-security, and process-identity serialization cases pass without timeout, unhandled directory-boundary error, or terminal-state overwrite.
    2. Repeat the exact same five paths without file parallelism:
    bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-process-identity-serialization.test.ts --no-file-parallelism --testTimeout 60000 --hookTimeout 60000 --reporter=dot
    Expected: the fix preserves behavior without relying on parallel scheduling.
    3. Inspect recorded transition evidence. Expected: the run state and start event publish before bounded process-identity enrichment; a running state with no identity remains fail-closed for a competing claim; a delayed post-close identity observation is a no-op and preserves terminal state.
    4. Run bun run typecheck, bun run lifecycle:invariants, bun run guards:check, bun run hotspots:check, and node .agentplane/policy/check-routing.mjs. Expected: runner contracts, hotspot budgets, and policy routing remain valid.
    5. Run AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast. Expected: full fast CI passes; if it fails, retain exact failure evidence and do not mark the task verified.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T18:42:29.060Z — VERIFY — needs_rework

    By: TESTER

    Note: REWORK: full fast CI passed, but the branch has no runner implementation or regression-coverage change. This classifies the prior failure as schedule-sensitive only; it does not prove the prepared-to-running gate or fixture-cleanup ownership is repaired.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T18:27:35.440Z, excerpt_hash=sha256:c679f7db6bf4175c45c758889f9072de6978b266de141b064db6de578a0f3f8f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607261825-M57HKS-stabilize-task-run-launch-under-concurrent-activ/.agentplane/tasks/202607261825-M57HKS/blueprint/resolved-snapshot.json
    - old_digest: 81f6962516c9051bf46d270961671e2a36c6c9fd92195c13d3fff99f20d74c84
    - current_digest: 81f6962516c9051bf46d270961671e2a36c6c9fd92195c13d3fff99f20d74c84
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607261825-M57HKS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607261825-M57HKS
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
    - Observation: Command: AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast. Result: pass. Evidence: core Vitest 466 files / 3232 tests passed in 299.80s; critical-cli chunks 1-11 passed; exit 0. Focused four-file runner matrix previously passed 49/49. Scope: current task branch contains task/PR metadata only; git diff main...HEAD has no runner source or runner regression-test change.
      Impact: Residual risk: the previously reproduced concurrent active-claim/cancellation pre-spawn stall may recur under saturation, leaving state prepared; fixture teardown can still remove the temporary root before the pending execution settles, causing ENOENT cascade. A single green sampled full run cannot establish a fix.
      Resolution: Implement the smallest runner or test-harness lifecycle ownership fix plus deterministic regression coverage that proves pending executions are drained or cancelled before temporary-root removal; then repeat all declared verification steps.
extensions:
  workflow_route_baseline:
    start_head_sha: "ed2c279623dd429edd121a41e0fc0d8057bdab91"
    version: 1
id_source: "generated"
---
## Summary

Stabilize task-run launch under concurrent active claims

Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI.

## Scope

- In scope: Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI.
- Out of scope: unrelated refactors not required for "Stabilize task-run launch under concurrent active claims".

## Plan

1. Reproduce the four runner suites under the exact CI worker/timeouts and capture the active-claim, effect-journal, spawn/identity, and temporary-root cleanup order.
2. Identify the first broken prepared-to-running transition; preserve active-claim authority and cancellation/replay semantics instead of masking it with sleeps or broader timeouts.
3. Implement the smallest runner or test-harness lifecycle fix, keeping DX3 cleanup modules out of scope.
4. Add focused regression coverage for concurrent retry/replay, cancellation, and cleanup ownership so pending promises cannot outlive temporary fixture roots.
5. Verify the four-file concurrent runner matrix, typecheck, lifecycle invariants, guards, routing, and capacity-normalized full fast CI; record flake classification.

## Verify Steps

1. Run the exact five-file runner matrix:
bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-process-identity-serialization.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000 --reporter=dot
Expected: all active-claim concurrency, active-claim, cancellation, replay-security, and process-identity serialization cases pass without timeout, unhandled directory-boundary error, or terminal-state overwrite.
2. Repeat the exact same five paths without file parallelism:
bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-process-identity-serialization.test.ts --no-file-parallelism --testTimeout 60000 --hookTimeout 60000 --reporter=dot
Expected: the fix preserves behavior without relying on parallel scheduling.
3. Inspect recorded transition evidence. Expected: the run state and start event publish before bounded process-identity enrichment; a running state with no identity remains fail-closed for a competing claim; a delayed post-close identity observation is a no-op and preserves terminal state.
4. Run bun run typecheck, bun run lifecycle:invariants, bun run guards:check, bun run hotspots:check, and node .agentplane/policy/check-routing.mjs. Expected: runner contracts, hotspot budgets, and policy routing remain valid.
5. Run AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast. Expected: full fast CI passes; if it fails, retain exact failure evidence and do not mark the task verified.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T18:42:29.060Z — VERIFY — needs_rework

By: TESTER

Note: REWORK: full fast CI passed, but the branch has no runner implementation or regression-coverage change. This classifies the prior failure as schedule-sensitive only; it does not prove the prepared-to-running gate or fixture-cleanup ownership is repaired.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T18:27:35.440Z, excerpt_hash=sha256:c679f7db6bf4175c45c758889f9072de6978b266de141b064db6de578a0f3f8f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607261825-M57HKS-stabilize-task-run-launch-under-concurrent-activ/.agentplane/tasks/202607261825-M57HKS/blueprint/resolved-snapshot.json
- old_digest: 81f6962516c9051bf46d270961671e2a36c6c9fd92195c13d3fff99f20d74c84
- current_digest: 81f6962516c9051bf46d270961671e2a36c6c9fd92195c13d3fff99f20d74c84
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607261825-M57HKS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607261825-M57HKS
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

- Observation: Command: AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast. Result: pass. Evidence: core Vitest 466 files / 3232 tests passed in 299.80s; critical-cli chunks 1-11 passed; exit 0. Focused four-file runner matrix previously passed 49/49. Scope: current task branch contains task/PR metadata only; git diff main...HEAD has no runner source or runner regression-test change.
  Impact: Residual risk: the previously reproduced concurrent active-claim/cancellation pre-spawn stall may recur under saturation, leaving state prepared; fixture teardown can still remove the temporary root before the pending execution settles, causing ENOENT cascade. A single green sampled full run cannot establish a fix.
  Resolution: Implement the smallest runner or test-harness lifecycle ownership fix plus deterministic regression coverage that proves pending executions are drained or cancelled before temporary-root removal; then repeat all declared verification steps.
