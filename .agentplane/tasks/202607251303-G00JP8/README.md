---
id: "202607251303-G00JP8"
title: "Stabilize parallel full-fast runner and integration tests"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
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
  state: "ok"
  updated_at: "2026-07-25T13:48:00.968Z"
  updated_by: "TESTER"
  note: "Implementation commit 002c1dce9 satisfies all five Verify Steps; targeted, stress, full, static, doctor, routing, and independent reviews pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-25T13:48:46.388Z"
  updated_by: "HUMAN"
  note: "Independent semantic and test-infrastructure reviews confirm implementation commit 002c1dce9 satisfies the approved reliability contract without widening production mutex behavior or weakening runner safety."
  evaluated_sha: "002c1dce9c088812b823707bc98571ba8cc2961a"
  blueprint_digest: "b5afd45f237612970c5f7e42075dea40b1de8f21fcff2a54b12960f48f07521f"
  evidence_refs:
    - ".agentplane/tasks/202607251303-G00JP8/README.md"
    - ".agentplane/tasks/202607251303-G00JP8/quality/20260725-134846388-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607251303-G00JP8/quality/20260725-134846388-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607251303-G00JP8/quality/20260725-134846388-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607251303-G00JP8/blueprint/resolved-snapshot.json"
    - "implementation commit 002c1dce9 and git diff main...002c1dce9"
    - "packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts: live claim precedence regression"
    - "focused final matrix: 9 files, 77 tests passed; post-review stress: 20/20 per concurrency category"
    - "test:fast: 453 files, 3048 tests passed; platform-critical 91, critical 72, release-critical 16"
    - "format:changed, git diff --check, typecheck, lint:core, knip:check, hotspots:check, doctor, policy routing: passed"
  findings:
    - "Live or unverifiable active claims now return the formal E_USAGE authority before mutable history capture; stale and absent paths still capture and verify history anchors, and atomic claim publication continues to prevent double ownership."
    - "All three mutex tests use callback-ready barriers that propagate early holder rejection and release/await holders in finally blocks; production mutex code is unchanged."
    - "The cold-path benchmark passes no-bootstrap and stale-dist-read environment only to child processes, an explicit stub asserts both values, and compiled smoke remains on the actual built dist/cli.js."
    - "Task Plan, Verify Steps, findings, implementation, and verification evidence are aligned; targeted, stress, full-fast, critical, release-critical, static, doctor, and routing checks pass."
commit:
  hash: "7b380df643e2d6430049e6922f5996c8568057c3"
  message: "🐛 G00JP8 task: pre-merge closure"
comments:
  -
    author: "CODER"
    body: "Start: stabilize the diagnosed runner claim precedence and test isolation races before resuming RF08 integration."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-07-25T13:48:00.968Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation commit 002c1dce9 satisfies all five Verify Steps; targeted, stress, full, static, doctor, routing, and independent reviews pass."
  -
    type: "status"
    at: "2026-07-25T13:49:09.952Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T13:49:58.543Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T13:49:58.544Z"
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

    ### 2026-07-25T13:48:00.968Z — VERIFY — ok

    By: TESTER

    Note: Implementation commit 002c1dce9 satisfies all five Verify Steps; targeted, stress, full, static, doctor, routing, and independent reviews pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T13:46:27.452Z, excerpt_hash=sha256:e8e922fcae19e2f6c8bfc79a6952e56ba825b958fde913fe33b044afbd0edde4

    Details:

    Evidence: focused final matrix 9 files/77 tests; post-review mutex and active-claim stress 20/20 plus benchmark/compiled-smoke stress 20/20, cumulative 70/70 per category; platform-critical 6 files/91 tests; critical-cli 11 chunks/72 tests; release-critical 4 files/16 tests; test:fast 453 files/3048 tests. format:changed, diff check, typecheck, lint:core, knip:check, hotspots:check, doctor (OK; historical archive warnings only), and policy routing pass. No active-run claim, recovery lease, integration queue lock, or Git mutation lock remains in the task worktree. Independent semantic and test-infrastructure reviews both returned PASS.

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
    - diagnostic_command: none
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

    - Observation: Three unrelated timing surfaces shared one integration symptom: live claim authority was evaluated after mutable history, mutex tests observed lock creation before callback readiness, and the cold-path benchmark could auto-bootstrap and rewrite shared dist.
      Impact: RF08 and subsequent v0.7 work could be blocked by misleading E_IO diagnostics and nondeterministic full-fast failures despite correct product behavior.
      Resolution: Implementation commit 002c1dce9 moves live-claim preflight ahead of history only for non-stale owners, preserves fail-closed stale and absent paths, uses callback-ready/finally barriers in tests, and makes the benchmark child read-only with explicit environment coverage while compiled smoke still validates real dist.
extensions:
  implementation_commit:
    hash: "002c1dce9c088812b823707bc98571ba8cc2961a"
    message: "🐛 G00JP8 reliability: stabilize concurrent runner and full-fast tests"
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

### 2026-07-25T13:48:00.968Z — VERIFY — ok

By: TESTER

Note: Implementation commit 002c1dce9 satisfies all five Verify Steps; targeted, stress, full, static, doctor, routing, and independent reviews pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T13:46:27.452Z, excerpt_hash=sha256:e8e922fcae19e2f6c8bfc79a6952e56ba825b958fde913fe33b044afbd0edde4

Details:

Evidence: focused final matrix 9 files/77 tests; post-review mutex and active-claim stress 20/20 plus benchmark/compiled-smoke stress 20/20, cumulative 70/70 per category; platform-critical 6 files/91 tests; critical-cli 11 chunks/72 tests; release-critical 4 files/16 tests; test:fast 453 files/3048 tests. format:changed, diff check, typecheck, lint:core, knip:check, hotspots:check, doctor (OK; historical archive warnings only), and policy routing pass. No active-run claim, recovery lease, integration queue lock, or Git mutation lock remains in the task worktree. Independent semantic and test-infrastructure reviews both returned PASS.

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
- diagnostic_command: none
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

- Observation: Three unrelated timing surfaces shared one integration symptom: live claim authority was evaluated after mutable history, mutex tests observed lock creation before callback readiness, and the cold-path benchmark could auto-bootstrap and rewrite shared dist.
  Impact: RF08 and subsequent v0.7 work could be blocked by misleading E_IO diagnostics and nondeterministic full-fast failures despite correct product behavior.
  Resolution: Implementation commit 002c1dce9 moves live-claim preflight ahead of history only for non-stale owners, preserves fail-closed stale and absent paths, uses callback-ready/finally barriers in tests, and makes the benchmark child read-only with explicit environment coverage while compiled smoke still validates real dist.
