---
id: "202608022128-39YSZ1"
title: "Require fresh verification evidence in the route oracle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-08-02T21:58:21.634Z"
  updated_by: "TESTER"
  note: "Verified: route freshness, branch-snapshot evidence, static gates, and critical trust-boundary behavior all pass."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T21:59:12.381Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "f5f62509d93177b14c6b9f0bb363eb5fcfce71eb"
  blueprint_digest: "a3c05e79e256ce8659cc8f39bd14c64856f51f6c9cd48ccf24a057a1e7cd8565"
  evidence_refs:
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608022128-39YSZ1/README.md"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608022128-39YSZ1/verification/20260802215821634-c9b7b27a05a65af3.json"
    - ".agentplane/tasks/202608022128-39YSZ1/quality/20260802-215912183-recovery-context/evaluator-blueprint.json"
  findings:
    - "matchesCurrentVerification resolves semantic Git targets before rejecting records whose timestamp, verifier, note, scope, or digest cannot match the current verification state; long verification histories therefore add unnecessary route latency."
commit:
  hash: "f5f62509d93177b14c6b9f0bb363eb5fcfce71eb"
  message: "🐛 39YSZ1 routing: require fresh verification evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: route oracle now requires a signed verification record for the current semantic target in both task-worktree and branch-snapshot contexts."
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
doc_version: 3
doc_updated_at: "2026-08-02T21:58:22.497Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
