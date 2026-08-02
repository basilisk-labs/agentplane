---
id: "202608022128-39YSZ1"
title: "Require fresh verification evidence in the route oracle"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "routing"
  - "v0.7.1"
  - "verification"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T21:28:49.951Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T22:21:48.541Z"
  updated_by: "TESTER"
  note: "Verified at 137ca290f: route freshness and CI hotspot rework pass all required local gates."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T22:22:57.137Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "137ca290fca0c71cc945a70bc959257d0775357b"
  blueprint_digest: "a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565"
  evidence_refs:
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608022128-39YSZ1/README.md"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608022128-39YSZ1/verification/20260802222148541-5b1e66c6e57ddfa7.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-222256830-recovery-context/evaluator-blueprint.json"
  findings:
    - "PASS: verification routing was extracted into a focused module, reducing route-decision-blockers.ts from 624 to 578 lines without changing the fail-closed contract."
    - "PASS: the semantic-commit invalidation scenario and DONE remote-truth fixture moved to a focused integration test, reducing the existing oversized test to 1104 lines and total oversized baseline to 11355."
    - "PASS: 13 route files / 58 tests, 12 critical chunks / 79 tests, typecheck, lint, Knip 539/539, policy routing, and hotspot checks all pass."
commit:
  hash: "b48e499b9d9155a04de61b267cd6c8d13c7d234a"
  message: "✅ 39YSZ1 task: record hosted rework evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: route oracle now requires a signed verification record for the current semantic target in both task-worktree and branch-snapshot contexts."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-02T21:29:21.323Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T21:57:25.276Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: route oracle now requires a signed verification record for the current semantic target in both task-worktree and branch-snapshot contexts."
  -
    type: "verify"
    at: "2026-08-02T21:58:21.634Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: route freshness, branch-snapshot evidence, static gates, and critical trust-boundary behavior all pass."
  -
    type: "verify"
    at: "2026-08-02T22:06:37.005Z"
    author: "TESTER"
    state: "ok"
    note: "Fresh verification at 090b377f5: 12 route files / 58 tests and 12 critical chunks / 79 tests passed; typecheck, lint:core, knip baseline 539/539, and policy routing passed."
  -
    type: "verify"
    at: "2026-08-02T22:07:36.285Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: stale-record short-circuit, route freshness, static gates, and critical behavior pass at 090b377f5."
  -
    type: "status"
    at: "2026-08-02T22:09:30.823Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-02T22:21:48.541Z"
    author: "TESTER"
    state: "ok"
    note: "Verified at 137ca290f: route freshness and CI hotspot rework pass all required local gates."
  -
    type: "status"
    at: "2026-08-02T22:24:13.757Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-02T22:24:13.758Z"
doc_updated_by: "CODER"
description: "Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration."
sections:
  Summary: |-
    Require fresh verification evidence in the route oracle

    Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
  Scope: |-
    - In scope: Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
    - Out of scope: unrelated refactors not required for "Require fresh verification evidence in the route oracle".
  Plan: "1. Inspect the route decision path and the canonical verification-record helpers to define current-HEAD freshness without duplicating state logic. 2. Make task next-action require an accepted verification record bound to the current implementation HEAD before quality review or integration. 3. Add regression tests for a fresh record and for a new commit invalidating prior verification. 4. Run focused routing tests, typecheck, static analysis, and critical tests; record evaluator evidence and integrate through the protected GitHub PR route."
  Verify Steps: |-
    1. Run the route-decision and verification-record focused suites. Expected: a current signed verification record is accepted from the task worktree or committed task-branch snapshot, while a later semantic commit yields verification_required.
    2. Run typecheck, lint:core, knip:check, and the policy routing check. Expected: all static, dependency, and policy gates pass without increasing accepted baselines.
    3. Run test:critical. Expected: the critical CLI trust-boundary and efficiency suite passes without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T21:58:21.634Z — VERIFY — ok

    By: TESTER

    Note: Verified: route freshness, branch-snapshot evidence, static gates, and critical trust-boundary behavior all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T21:57:25.276Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
    Result: pass
    Evidence: 11 test files and 57 tests passed, including fresh-to-stale semantic commit and DONE branch snapshot regressions
    Scope: route oracle and verification freshness

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --maxWorkers=1 --fileParallelism=false
    Result: pass
    Evidence: 2 test files and 28 evaluator tests passed
    Scope: shared accepted verification record extraction and evaluator evidence

    Command: bun run typecheck; bun run lint:core; bun run knip:check; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: typecheck and lint passed, Knip baseline 539/539, policy routing OK
    Scope: static, dependency, and policy gates

    Command: bun run test:critical
    Result: pass
    Evidence: 12 chunks and 79 critical CLI tests passed
    Scope: critical CLI trust-boundary and efficiency regression suite

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
    - old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608022128-39YSZ1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T22:06:37.005Z — VERIFY — ok

    By: TESTER

    Note: Fresh verification at 090b377f5: 12 route files / 58 tests and 12 critical chunks / 79 tests passed; typecheck, lint:core, knip baseline 539/539, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T21:58:22.497Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
    - old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608022128-39YSZ1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T22:07:36.285Z — VERIFY — ok

    By: TESTER

    Note: Verified: stale-record short-circuit, route freshness, static gates, and critical behavior pass at 090b377f5.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T22:06:38.241Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
    Result: pass
    Evidence: 12 test files and 58 tests passed, including stale metadata short-circuit, semantic commit invalidation, fresh record acceptance, and branch snapshot recovery
    Scope: route oracle and verification freshness

    Command: bun run typecheck; bun run lint:core; bun run knip:check; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: typecheck and lint passed, Knip baseline 539/539, policy routing OK
    Scope: static, dependency, and policy gates

    Command: bun run test:critical
    Result: pass
    Evidence: 12 chunks and 79 critical CLI tests passed
    Scope: critical CLI trust-boundary and efficiency regression suite

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
    - old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608022128-39YSZ1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T22:21:48.541Z — VERIFY — ok

    By: TESTER

    Note: Verified at 137ca290f: route freshness and CI hotspot rework pass all required local gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T22:09:30.823Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
    Result: pass
    Evidence: 13 test files and 58 tests passed, including stale metadata short-circuit, semantic commit invalidation, fresh record acceptance, and branch snapshot recovery
    Scope: route oracle and verification freshness

    Command: bun run typecheck; bun run lint:core; bun run knip:check; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: typecheck and lint passed, Knip baseline 539/539, policy routing OK
    Scope: static, dependency, and policy gates

    Command: bun run hotspots:check
    Result: pass
    Evidence: route-decision-blockers.ts is 578 lines and oversized test baseline is 10 entries / 11355 lines
    Scope: CI hotspot and oversized-test budgets

    Command: bun run test:critical
    Result: pass
    Evidence: 12 chunks and 79 critical CLI tests passed
    Scope: critical CLI trust-boundary and efficiency regression suite

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
    - old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

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
    - Observation: Stale verification metadata is rejected before semantic Git resolution, a fresh record is accepted, branch-snapshot verification remains supported, and a later semantic commit returns verification_required.
      Impact: The route oracle no longer accepts stale verification evidence and avoids unnecessary Git-history work for stale record candidates.
      Resolution: Accepted with automated regression coverage and no observed failures in the required verification surface.

    - Observation: Stale verification metadata is rejected before semantic Git resolution; fresh and SHA-bounded branch-snapshot records retain their intended behavior.
      Impact: The route oracle rejects obsolete evidence without unnecessary Git-history resolution and preserves fail-closed verification freshness.
      Resolution: Accepted with deterministic unit, route, static, policy, and critical regression evidence.

    - Observation: The hosted hotspot failure is reproduced and resolved by separating verification routing and isolating the new integration scenario in its own test file.
      Impact: The change now satisfies both runtime module and oversized-test budgets without increasing either baseline.
      Resolution: Accepted with route, static, policy, hotspot, dependency, and critical regression evidence.
extensions:
  implementation_commit:
    hash: "137ca290fca0c71cc945a70bc959257d0775357b"
    message: "♻️ 39YSZ1 routing: keep route modules within size budget"
  workflow_route_baseline:
    start_head_sha: "be9304ea05e50ec3824ef085f0f70402474e318a"
    version: 1
id_source: "generated"
---
## Summary

Require fresh verification evidence in the route oracle

Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.

## Scope

- In scope: Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
- Out of scope: unrelated refactors not required for "Require fresh verification evidence in the route oracle".

## Plan

1. Inspect the route decision path and the canonical verification-record helpers to define current-HEAD freshness without duplicating state logic. 2. Make task next-action require an accepted verification record bound to the current implementation HEAD before quality review or integration. 3. Add regression tests for a fresh record and for a new commit invalidating prior verification. 4. Run focused routing tests, typecheck, static analysis, and critical tests; record evaluator evidence and integrate through the protected GitHub PR route.

## Verify Steps

1. Run the route-decision and verification-record focused suites. Expected: a current signed verification record is accepted from the task worktree or committed task-branch snapshot, while a later semantic commit yields verification_required.
2. Run typecheck, lint:core, knip:check, and the policy routing check. Expected: all static, dependency, and policy gates pass without increasing accepted baselines.
3. Run test:critical. Expected: the critical CLI trust-boundary and efficiency suite passes without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T21:58:21.634Z — VERIFY — ok

By: TESTER

Note: Verified: route freshness, branch-snapshot evidence, static gates, and critical trust-boundary behavior all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T21:57:25.276Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
Result: pass
Evidence: 11 test files and 57 tests passed, including fresh-to-stale semantic commit and DONE branch snapshot regressions
Scope: route oracle and verification freshness

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --maxWorkers=1 --fileParallelism=false
Result: pass
Evidence: 2 test files and 28 evaluator tests passed
Scope: shared accepted verification record extraction and evaluator evidence

Command: bun run typecheck; bun run lint:core; bun run knip:check; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: typecheck and lint passed, Knip baseline 539/539, policy routing OK
Scope: static, dependency, and policy gates

Command: bun run test:critical
Result: pass
Evidence: 12 chunks and 79 critical CLI tests passed
Scope: critical CLI trust-boundary and efficiency regression suite

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
- old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608022128-39YSZ1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T22:06:37.005Z — VERIFY — ok

By: TESTER

Note: Fresh verification at 090b377f5: 12 route files / 58 tests and 12 critical chunks / 79 tests passed; typecheck, lint:core, knip baseline 539/539, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T21:58:22.497Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
- old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608022128-39YSZ1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T22:07:36.285Z — VERIFY — ok

By: TESTER

Note: Verified: stale-record short-circuit, route freshness, static gates, and critical behavior pass at 090b377f5.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T22:06:38.241Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
Result: pass
Evidence: 12 test files and 58 tests passed, including stale metadata short-circuit, semantic commit invalidation, fresh record acceptance, and branch snapshot recovery
Scope: route oracle and verification freshness

Command: bun run typecheck; bun run lint:core; bun run knip:check; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: typecheck and lint passed, Knip baseline 539/539, policy routing OK
Scope: static, dependency, and policy gates

Command: bun run test:critical
Result: pass
Evidence: 12 chunks and 79 critical CLI tests passed
Scope: critical CLI trust-boundary and efficiency regression suite

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
- old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608022128-39YSZ1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T22:21:48.541Z — VERIFY — ok

By: TESTER

Note: Verified at 137ca290f: route freshness and CI hotspot rework pass all required local gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T22:09:30.823Z, excerpt_hash=sha256:42df10439030619fac720406369f65f3379d60cd19ee691903516856de8ceb77

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
Result: pass
Evidence: 13 test files and 58 tests passed, including stale metadata short-circuit, semantic commit invalidation, fresh record acceptance, and branch snapshot recovery
Scope: route oracle and verification freshness

Command: bun run typecheck; bun run lint:core; bun run knip:check; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: typecheck and lint passed, Knip baseline 539/539, policy routing OK
Scope: static, dependency, and policy gates

Command: bun run hotspots:check
Result: pass
Evidence: route-decision-blockers.ts is 578 lines and oversized test baseline is 10 entries / 11355 lines
Scope: CI hotspot and oversized-test budgets

Command: bun run test:critical
Result: pass
Evidence: 12 chunks and 79 critical CLI tests passed
Scope: critical CLI trust-boundary and efficiency regression suite

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022128-39YSZ1-require-fresh-verification-evidence-in-the-route/.agentplane/tasks/202608022128-39YSZ1/blueprint/resolved-snapshot.json
- old_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- current_digest: a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022128-39YSZ1

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

- Observation: Stale verification metadata is rejected before semantic Git resolution, a fresh record is accepted, branch-snapshot verification remains supported, and a later semantic commit returns verification_required.
  Impact: The route oracle no longer accepts stale verification evidence and avoids unnecessary Git-history work for stale record candidates.
  Resolution: Accepted with automated regression coverage and no observed failures in the required verification surface.

- Observation: Stale verification metadata is rejected before semantic Git resolution; fresh and SHA-bounded branch-snapshot records retain their intended behavior.
  Impact: The route oracle rejects obsolete evidence without unnecessary Git-history resolution and preserves fail-closed verification freshness.
  Resolution: Accepted with deterministic unit, route, static, policy, and critical regression evidence.

- Observation: The hosted hotspot failure is reproduced and resolved by separating verification routing and isolating the new integration scenario in its own test file.
  Impact: The change now satisfies both runtime module and oversized-test budgets without increasing either baseline.
  Resolution: Accepted with route, static, policy, hotspot, dependency, and critical regression evidence.
