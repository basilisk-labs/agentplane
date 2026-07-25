---
id: "202607251303-G00JP8"
title: "Stabilize parallel full-fast runner and integration tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-07-25T13:06:13.097Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-25T13:05:53.127Z"
doc_updated_by: "PLANNER"
description: "Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence."
sections:
  Summary: |-
    Stabilize parallel full-fast runner and integration tests

    Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
  Scope: |-
    - In scope: Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
    - Out of scope: unrelated refactors not required for "Stabilize parallel full-fast runner and integration tests".
  Plan: |-
    1. Add a non-mutating active-claim preflight before mutable supervisor-history capture so an already live owner deterministically wins with the formal busy error; retain existing history-anchor, atomic link, stale recovery, and fail-closed behavior for absent or stale claims, with a deterministic regression.
    2. Replace lock-directory polling races in the three mutex concurrency tests with explicit callback-ready and release barriers; do not modify the production queue mutex.
    3. Move the Bun compiled CLI smoke out of the parallel agentplane test project into the serialized cli-smoke route, keep it in release-critical coverage, and wire PR CI so it runs only after the package build without adding an auto-build fallback.
    4. Run focused repeated stress checks, the full fast, critical, platform-critical, and release-critical suites, static gates, independent evaluation, hosted checks, and integrate through the branch_pr queue.
  Verify Steps: |-
    1. Acquire a second runner claim while a live non-stale claim exists and supervisor history is concurrently unstable. Expected: the CLI returns E_USAGE with active_run_authority=supervisor_active_run_claim before any provider starts; absent and stale claim paths retain fail-closed history-anchor checks.
    2. Run the active-claim concurrency and history-safety suites repeatedly. Expected: both replay scenarios deterministically reject the competing run and all safety regressions pass.
    3. Stress the integration queue mutex tests in queue-state.test.ts, queue-mutex.test.ts, and git-mutation.test.ts. Expected: callback-ready barriers remove release initialization races without changing production mutex behavior.
    4. Run the Bun compiled CLI smoke only in the serialized cli-smoke route after building agentplane, then run vitest:projects:check and test:release:critical. Expected: the smoke never depends on a mutable shared dist during test:fast and remains mandatory in PR release verification.
    5. Run bun run test:fast, bun run test:critical, bun run test:platform-critical, bun run knip:check, bun run typecheck, bun run format:changed, bun run lint:core, bun run hotspots:check, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass and no temporary runner or queue-lock artifacts remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize parallel full-fast runner and integration tests

Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.

## Scope

- In scope: Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
- Out of scope: unrelated refactors not required for "Stabilize parallel full-fast runner and integration tests".

## Plan

1. Add a non-mutating active-claim preflight before mutable supervisor-history capture so an already live owner deterministically wins with the formal busy error; retain existing history-anchor, atomic link, stale recovery, and fail-closed behavior for absent or stale claims, with a deterministic regression.
2. Replace lock-directory polling races in the three mutex concurrency tests with explicit callback-ready and release barriers; do not modify the production queue mutex.
3. Move the Bun compiled CLI smoke out of the parallel agentplane test project into the serialized cli-smoke route, keep it in release-critical coverage, and wire PR CI so it runs only after the package build without adding an auto-build fallback.
4. Run focused repeated stress checks, the full fast, critical, platform-critical, and release-critical suites, static gates, independent evaluation, hosted checks, and integrate through the branch_pr queue.

## Verify Steps

1. Acquire a second runner claim while a live non-stale claim exists and supervisor history is concurrently unstable. Expected: the CLI returns E_USAGE with active_run_authority=supervisor_active_run_claim before any provider starts; absent and stale claim paths retain fail-closed history-anchor checks.
2. Run the active-claim concurrency and history-safety suites repeatedly. Expected: both replay scenarios deterministically reject the competing run and all safety regressions pass.
3. Stress the integration queue mutex tests in queue-state.test.ts, queue-mutex.test.ts, and git-mutation.test.ts. Expected: callback-ready barriers remove release initialization races without changing production mutex behavior.
4. Run the Bun compiled CLI smoke only in the serialized cli-smoke route after building agentplane, then run vitest:projects:check and test:release:critical. Expected: the smoke never depends on a mutable shared dist during test:fast and remains mandatory in PR release verification.
5. Run bun run test:fast, bun run test:critical, bun run test:platform-critical, bun run knip:check, bun run typecheck, bun run format:changed, bun run lint:core, bun run hotspots:check, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass and no temporary runner or queue-lock artifacts remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
