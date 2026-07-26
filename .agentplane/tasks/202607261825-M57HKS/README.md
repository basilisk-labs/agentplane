---
id: "202607261825-M57HKS"
title: "Stabilize task-run launch under concurrent active claims"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
doc_version: 3
doc_updated_at: "2026-07-26T18:27:35.440Z"
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
    1. Run the exact four-file runner matrix with `--pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000`. Expected: all active-claim concurrency, cancellation, and replay-security cases pass without timeout or unhandled directory-boundary errors.
    2. Run the affected runner matrix with `--no-file-parallelism`. Expected: the fix preserves behavior without relying on parallel scheduling.
    3. Inspect the recorded transition evidence. Expected: the first cause is fixed before fixture cleanup; no pending runner process accesses a removed temporary root.
    4. Run `bun run typecheck`, `bun run lifecycle:invariants`, `bun run guards:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: runner contracts and policy routing remain valid.
    5. Run `AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast`. Expected: full fast CI passes; if it fails, retain exact failure evidence and do not mark the task verified.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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

1. Run the exact four-file runner matrix with `--pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000`. Expected: all active-claim concurrency, cancellation, and replay-security cases pass without timeout or unhandled directory-boundary errors.
2. Run the affected runner matrix with `--no-file-parallelism`. Expected: the fix preserves behavior without relying on parallel scheduling.
3. Inspect the recorded transition evidence. Expected: the first cause is fixed before fixture cleanup; no pending runner process accesses a removed temporary root.
4. Run `bun run typecheck`, `bun run lifecycle:invariants`, `bun run guards:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: runner contracts and policy routing remain valid.
5. Run `AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast`. Expected: full fast CI passes; if it fails, retain exact failure evidence and do not mark the task verified.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
