---
id: "202607240736-FCBKJQ"
title: "Align integration quality review targets for metadata-only tasks"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202607100436-D7QB76"
tags:
  - "code"
  - "evaluator"
  - "followup"
  - "integration-queue"
  - "metadata-only"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "/Users/densmirnov/.bun/bin/bunx vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts"
  - "/Users/densmirnov/.bun/bin/bun run test:critical"
  - "/Users/densmirnov/.bun/bin/bun run ci:contract"
  - "/Users/densmirnov/.bun/bin/bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T07:36:59.288Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-24T08:32:21.851Z"
  updated_by: "TESTER"
  note: "Focused 67/67 tests, critical CLI 71/71, ci:contract, lint, typecheck, formatting, and architecture checks passed on f5b90e983."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-24T08:35:45.091Z"
  updated_by: "EVALUATOR"
  note: "Quality-review target resolution is consistent across evaluator, route, and integration."
  evaluated_sha: "f5b90e98344d4ad2d9dadb89905f620ee7c3a892"
  blueprint_digest: "d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae"
  evidence_refs:
    - ".agentplane/tasks/202607240736-FCBKJQ/README.md"
    - ".agentplane/tasks/202607240736-FCBKJQ/quality/20260724-083545091-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607240736-FCBKJQ/quality/20260724-083545091-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607240736-FCBKJQ/quality/20260724-083545091-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607240736-FCBKJQ/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
    - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
    - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
    - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
    - "focused 67/67; critical 71/71; ci:contract; lint; typecheck; arch"
  findings:
    - "No blocking findings remain: evaluator and prepare use the same normalized primary-plus-included task set, route resolves the equivalent PR batch set, and integration fails closed when no target can be resolved."
    - "Real-Git regressions prove included-task metadata becomes the review target while included quality and PR artifact tails preserve the reviewed SHA."
commit:
  hash: "33dede6ac818ab2c7cafca175e4e2f044b86419a"
  message: "🧩 FCBKJQ task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: unify metadata-only quality-review target resolution across evaluator and integration without weakening stale-review safety."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-24T07:37:26.271Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify metadata-only quality-review target resolution across evaluator and integration without weakening stale-review safety."
  -
    type: "verify"
    at: "2026-07-24T08:04:49.304Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: shared review-target resolver, integration gate, DONE route, and stale-review rejection pass the complete declared contract."
  -
    type: "verify"
    at: "2026-07-24T08:32:21.851Z"
    author: "TESTER"
    state: "ok"
    note: "Focused 67/67 tests, critical CLI 71/71, ci:contract, lint, typecheck, formatting, and architecture checks passed on f5b90e983."
  -
    type: "status"
    at: "2026-07-24T08:36:32.019Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-24T08:37:59.711Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-24T08:37:59.712Z"
doc_updated_by: "CODER"
description: "Reuse the evaluator metadata-only review target contract in integration preparation so the route oracle and integration queue agree, while preserving rejection after semantic or new independently reviewable task-local changes."
sections:
  Summary: |-
    Align integration quality review targets for metadata-only tasks

    Reuse the evaluator metadata-only review target contract in integration preparation so the route oracle and integration queue agree, while preserving rejection after semantic or new independently reviewable task-local changes.
  Scope: |-
    - In scope: one shared quality-review target resolver for evaluator and integration preparation; configured workflow artifact paths; metadata-only reviewed work units followed by managed README/quality/pr/blueprint artifacts; route/integration agreement; focused regression coverage.
    - Safety invariant: semantic code changes or a new independently reviewable task-local work unit after the recorded review must require a new EVALUATOR review.
    - Out of scope: weakening the quality gate, manual merge bypasses, unrelated evaluator/integration refactors, alpha.1 benchmark reruns, provider calls.
  Plan: |-
    1. Extract the evaluator metadata-only SHA selection algorithm into a shared resolver using the configured workflow directory and an optional previous reviewed SHA.
    2. Use the shared resolver in evaluator recording and integration preparation so both compute the same review target; keep route-oracle behavior aligned with the quality gate.
    3. Add regressions for a reviewed metadata work unit with managed closure artifacts, more than twenty managed commits, semantic change after review, and a new independently reviewable metadata unit after review.
    4. Run focused tests, critical tests, contract checks, and typecheck; record independent EVALUATOR evidence.
    5. Publish the task PR, complete pre-merge closure, integrate through the queue, verify hosted close, and clean the task worktree/branches.
  Verify Steps: |-
    1. Run `/Users/densmirnov/.bun/bin/bunx vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: evaluator, finish, route oracle, and integration preparation agree on metadata-only review targets; all focused tests pass.
    2. Inspect regression coverage. Expected: managed task-artifact tails, including a tail longer than twenty commits, preserve the reviewed SHA; semantic changes and a new independently reviewable task-local work unit invalidate the old review.
    3. Run `/Users/densmirnov/.bun/bin/bun run test:critical`. Expected: all critical lifecycle and quality gates pass.
    4. Run `/Users/densmirnov/.bun/bin/bun run ci:contract`. Expected: repository contract checks pass.
    5. Run `/Users/densmirnov/.bun/bin/bun run typecheck`. Expected: TypeScript compilation passes without errors.
    6. From the alpha.1 base checkout after this fix merges, recompute `agentplane task next-action 202607221907-DK2CJF --remote --explain` and enqueue its existing PR through the integration queue. Expected: the prior stale-review mismatch no longer occurs.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-24T08:04:49.304Z — VERIFY — ok

    By: TESTER

    Note: Verified: shared review-target resolver, integration gate, DONE route, and stale-review rejection pass the complete declared contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T07:56:12.237Z, excerpt_hash=sha256:c94986d169560bb562da6d8cfb60bf47c669da41171a21014a8399361bf4d6ec

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607240736-FCBKJQ-align-integration-quality-review-targets-for-met/.agentplane/tasks/202607240736-FCBKJQ/blueprint/resolved-snapshot.json
    - old_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
    - current_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607240736-FCBKJQ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607240736-FCBKJQ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-24T08:32:21.851Z — VERIFY — ok

    By: TESTER

    Note: Focused 67/67 tests, critical CLI 71/71, ci:contract, lint, typecheck, formatting, and architecture checks passed on f5b90e983.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T08:04:49.608Z, excerpt_hash=sha256:c94986d169560bb562da6d8cfb60bf47c669da41171a21014a8399361bf4d6ec

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607240736-FCBKJQ-align-integration-quality-review-targets-for-met/.agentplane/tasks/202607240736-FCBKJQ/blueprint/resolved-snapshot.json
    - old_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
    - current_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607240736-FCBKJQ

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
  Rollback Plan: "Revert the shared resolver and integration call-site commit, restore the previous evaluator-local resolver, and rerun the focused quality-review target tests plus `bun run test:critical` to confirm the old behavior is restored without partial API drift."
  Findings: |-
    - Observation: Focused 58/58 tests, critical CLI 71/71 tests, ci:contract, format check, lint, and typecheck passed on the published implementation tree.
      Impact: Evaluator, route oracle, and integration queue now agree for metadata-only reviewed work while semantic or independently reviewable metadata advances remain blocked.
      Resolution: Accept implementation for independent semantic evaluation and pre-merge closure.

    - Observation: Evaluator, route, and integrate now resolve the same primary-plus-included task set; unresolved targets fail closed at integration.
      Impact: A metadata-only batch review can no longer be accepted stale or enter an evaluator loop.
      Resolution: Added canonical batch task-set wiring and real-Git regressions for included metadata and derived artifact tails.
extensions:
  implementation_commit:
    hash: "f5b90e98344d4ad2d9dadb89905f620ee7c3a892"
    message: "🚧 FCBKJQ task: align evaluator batch review target"
id_source: "generated"
---
## Summary

Align integration quality review targets for metadata-only tasks

Reuse the evaluator metadata-only review target contract in integration preparation so the route oracle and integration queue agree, while preserving rejection after semantic or new independently reviewable task-local changes.

## Scope

- In scope: one shared quality-review target resolver for evaluator and integration preparation; configured workflow artifact paths; metadata-only reviewed work units followed by managed README/quality/pr/blueprint artifacts; route/integration agreement; focused regression coverage.
- Safety invariant: semantic code changes or a new independently reviewable task-local work unit after the recorded review must require a new EVALUATOR review.
- Out of scope: weakening the quality gate, manual merge bypasses, unrelated evaluator/integration refactors, alpha.1 benchmark reruns, provider calls.

## Plan

1. Extract the evaluator metadata-only SHA selection algorithm into a shared resolver using the configured workflow directory and an optional previous reviewed SHA.
2. Use the shared resolver in evaluator recording and integration preparation so both compute the same review target; keep route-oracle behavior aligned with the quality gate.
3. Add regressions for a reviewed metadata work unit with managed closure artifacts, more than twenty managed commits, semantic change after review, and a new independently reviewable metadata unit after review.
4. Run focused tests, critical tests, contract checks, and typecheck; record independent EVALUATOR evidence.
5. Publish the task PR, complete pre-merge closure, integrate through the queue, verify hosted close, and clean the task worktree/branches.

## Verify Steps

1. Run `/Users/densmirnov/.bun/bin/bunx vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: evaluator, finish, route oracle, and integration preparation agree on metadata-only review targets; all focused tests pass.
2. Inspect regression coverage. Expected: managed task-artifact tails, including a tail longer than twenty commits, preserve the reviewed SHA; semantic changes and a new independently reviewable task-local work unit invalidate the old review.
3. Run `/Users/densmirnov/.bun/bin/bun run test:critical`. Expected: all critical lifecycle and quality gates pass.
4. Run `/Users/densmirnov/.bun/bin/bun run ci:contract`. Expected: repository contract checks pass.
5. Run `/Users/densmirnov/.bun/bin/bun run typecheck`. Expected: TypeScript compilation passes without errors.
6. From the alpha.1 base checkout after this fix merges, recompute `agentplane task next-action 202607221907-DK2CJF --remote --explain` and enqueue its existing PR through the integration queue. Expected: the prior stale-review mismatch no longer occurs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-24T08:04:49.304Z — VERIFY — ok

By: TESTER

Note: Verified: shared review-target resolver, integration gate, DONE route, and stale-review rejection pass the complete declared contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T07:56:12.237Z, excerpt_hash=sha256:c94986d169560bb562da6d8cfb60bf47c669da41171a21014a8399361bf4d6ec

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607240736-FCBKJQ-align-integration-quality-review-targets-for-met/.agentplane/tasks/202607240736-FCBKJQ/blueprint/resolved-snapshot.json
- old_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
- current_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607240736-FCBKJQ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607240736-FCBKJQ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-24T08:32:21.851Z — VERIFY — ok

By: TESTER

Note: Focused 67/67 tests, critical CLI 71/71, ci:contract, lint, typecheck, formatting, and architecture checks passed on f5b90e983.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T08:04:49.608Z, excerpt_hash=sha256:c94986d169560bb562da6d8cfb60bf47c669da41171a21014a8399361bf4d6ec

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607240736-FCBKJQ-align-integration-quality-review-targets-for-met/.agentplane/tasks/202607240736-FCBKJQ/blueprint/resolved-snapshot.json
- old_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
- current_digest: d4d3caabe5e9649e18cc5dc9fe287835b6e418cbf3717f82179b52181c0ec2ae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607240736-FCBKJQ

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

Revert the shared resolver and integration call-site commit, restore the previous evaluator-local resolver, and rerun the focused quality-review target tests plus `bun run test:critical` to confirm the old behavior is restored without partial API drift.

## Findings

- Observation: Focused 58/58 tests, critical CLI 71/71 tests, ci:contract, format check, lint, and typecheck passed on the published implementation tree.
  Impact: Evaluator, route oracle, and integration queue now agree for metadata-only reviewed work while semantic or independently reviewable metadata advances remain blocked.
  Resolution: Accept implementation for independent semantic evaluation and pre-merge closure.

- Observation: Evaluator, route, and integrate now resolve the same primary-plus-included task set; unresolved targets fail closed at integration.
  Impact: A metadata-only batch review can no longer be accepted stale or enter an evaluator loop.
  Resolution: Added canonical batch task-set wiring and real-Git regressions for included metadata and derived artifact tails.
