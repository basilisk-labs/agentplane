---
id: "202608031426-0BY4B4"
title: "Make integration handoff and hosted-close finalization converge"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "integration-queue"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
blueprint_request: "code.branch_pr"
verify:
  - "Focused integration queue and route reconciliation tests pass."
  - "Merged plus hosted-close plus cleanup converges to terminal done without manual queue release."
  - "Open PR with unresolved review remains fail-closed and is not auto-finalized."
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T14:26:26.214Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T14:45:26.565Z"
  updated_by: "CODER"
  note: |-
    Command: bun run ci:local:fast; focused Vitest route/queue suite; built CLI next-action against PR 4756 state.
    Result: PASS. 533 files / 3767 tests passed; 12/12 critical CLI chunks passed; focused 7 files / 99 tests passed; typecheck, lint, format, policy routing, diff, hotspot, and build gates passed.
    Evidence: implementation commit cd4b21269; actual PR 4756 route returned terminal.done with evidence_missing=none; retry tests prove unresolved review becomes queued and --wait retries without manual release.
    Scope: integration queue retry classification, finalize-time queue normalization, base synchronization proof, hosted-close terminal route, and regression tests only.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T14:26:49.765Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-08-03T14:45:26.565Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run ci:local:fast; focused Vitest route/queue suite; built CLI next-action against PR 4756 state.
      Result: PASS. 533 files / 3767 tests passed; 12/12 critical CLI chunks passed; focused 7 files / 99 tests passed; typecheck, lint, format, policy routing, diff, hotspot, and build gates passed.
      Evidence: implementation commit cd4b21269; actual PR 4756 route returned terminal.done with evidence_missing=none; retry tests prove unresolved review becomes queued and --wait retries without manual release.
      Scope: integration queue retry classification, finalize-time queue normalization, base synchronization proof, hosted-close terminal route, and regression tests only.
doc_version: 3
doc_updated_at: "2026-08-03T14:45:27.392Z"
doc_updated_by: "CODER"
description: "Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state."
sections:
  Summary: |-
    Make integration handoff and hosted-close finalization converge

    Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state.
  Scope: |-
    - In scope: Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state.
    - Out of scope: unrelated refactors not required for "Make integration handoff and hosted-close finalization converge".
  Plan: |-
    1. Reproduce and trace the queue handoff, run-next reclaim, hosted-close, cleanup, and route projection states using PR 4756 evidence and focused fixtures.
    2. Define one authoritative convergence rule: unresolved or ambiguous remote state stays fail-closed; merged PR plus recorded hosted-close and clean/finalized local state reconciles the queue to done and returns terminal.
    3. Implement reconciliation in the smallest control-plane layer shared by queue commands and next-action projection; avoid command-specific duplicate state machines.
    4. Add regression tests for handoff recovery after review resolution, automatic done after merge/hosted-close/cleanup, idempotent repeated cleanup, and unresolved-review fail-closed behavior.
    5. Run focused tests, typecheck/lint and the required repository guards; record structured verification and independent evaluator evidence before integration.
  Verify Steps: |-
    1. Run focused integration queue and route reconciliation tests. Expected: handoff recovery, hosted-close finalization, idempotent cleanup, and fail-closed review cases pass.
    2. Exercise a branch_pr fixture where review resolution is followed by merge, hosted-close, and cleanup. Expected: run-next reclaims eligible handoff automatically, queue becomes done, and next-action returns terminal without manual queue release.
    3. Exercise unresolved, failed, and ambiguous hosted states. Expected: no automatic completion or unsafe replay occurs.
    4. Run typecheck, lint, policy routing, diff, hotspot, and task trust-ratchet guards for the touched code.
    5. Record verification with Command, Result, Evidence, and Scope; run an independent evaluator against the implementation commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T14:45:26.565Z — VERIFY — ok

    By: CODER

    Note: Command: bun run ci:local:fast; focused Vitest route/queue suite; built CLI next-action against PR 4756 state.
    Result: PASS. 533 files / 3767 tests passed; 12/12 critical CLI chunks passed; focused 7 files / 99 tests passed; typecheck, lint, format, policy routing, diff, hotspot, and build gates passed.
    Evidence: implementation commit cd4b21269; actual PR 4756 route returned terminal.done with evidence_missing=none; retry tests prove unresolved review becomes queued and --wait retries without manual release.
    Scope: integration queue retry classification, finalize-time queue normalization, base synchronization proof, hosted-close terminal route, and regression tests only.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T14:26:49.765Z, excerpt_hash=sha256:29e54a205d4ec1284808f0a739882be15fcd1b76de6f45d4844f995dc4619439

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608031426-0BY4B4-make-integration-handoff-and-hosted-close-finali/.agentplane/tasks/202608031426-0BY4B4/blueprint/resolved-snapshot.json
    - old_digest: d0446cd16c1a55460e73253958b70aa078d944122d23c6b37691a6dd27a7ba10
    - current_digest: d0446cd16c1a55460e73253958b70aa078d944122d23c6b37691a6dd27a7ba10
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608031426-0BY4B4

    DecisionContextRef:
    - operator_action: provider_action
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
    - Observation: Retryable unresolved review gates were persisted as ambiguous handoff, while hosted-close routing ignored already-clean synchronized state.
      Impact: Operators had to release queue entries manually and could receive an infinite cleanup-finalize route after successful hosted close.
      Resolution: Classify only the pre-merge unresolved-review gate as retryable queued state, keep unknown failures fail-closed, normalize terminal queue entries during finalize, and require synchronized base before terminal routing.
extensions:
  workflow_route_baseline:
    start_head_sha: "60557e837460d1855f0865983e4d4dbdc5caef2a"
    version: 1
id_source: "generated"
---
## Summary

Make integration handoff and hosted-close finalization converge

Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state.

## Scope

- In scope: Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state.
- Out of scope: unrelated refactors not required for "Make integration handoff and hosted-close finalization converge".

## Plan

1. Reproduce and trace the queue handoff, run-next reclaim, hosted-close, cleanup, and route projection states using PR 4756 evidence and focused fixtures.
2. Define one authoritative convergence rule: unresolved or ambiguous remote state stays fail-closed; merged PR plus recorded hosted-close and clean/finalized local state reconciles the queue to done and returns terminal.
3. Implement reconciliation in the smallest control-plane layer shared by queue commands and next-action projection; avoid command-specific duplicate state machines.
4. Add regression tests for handoff recovery after review resolution, automatic done after merge/hosted-close/cleanup, idempotent repeated cleanup, and unresolved-review fail-closed behavior.
5. Run focused tests, typecheck/lint and the required repository guards; record structured verification and independent evaluator evidence before integration.

## Verify Steps

1. Run focused integration queue and route reconciliation tests. Expected: handoff recovery, hosted-close finalization, idempotent cleanup, and fail-closed review cases pass.
2. Exercise a branch_pr fixture where review resolution is followed by merge, hosted-close, and cleanup. Expected: run-next reclaims eligible handoff automatically, queue becomes done, and next-action returns terminal without manual queue release.
3. Exercise unresolved, failed, and ambiguous hosted states. Expected: no automatic completion or unsafe replay occurs.
4. Run typecheck, lint, policy routing, diff, hotspot, and task trust-ratchet guards for the touched code.
5. Record verification with Command, Result, Evidence, and Scope; run an independent evaluator against the implementation commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T14:45:26.565Z — VERIFY — ok

By: CODER

Note: Command: bun run ci:local:fast; focused Vitest route/queue suite; built CLI next-action against PR 4756 state.
Result: PASS. 533 files / 3767 tests passed; 12/12 critical CLI chunks passed; focused 7 files / 99 tests passed; typecheck, lint, format, policy routing, diff, hotspot, and build gates passed.
Evidence: implementation commit cd4b21269; actual PR 4756 route returned terminal.done with evidence_missing=none; retry tests prove unresolved review becomes queued and --wait retries without manual release.
Scope: integration queue retry classification, finalize-time queue normalization, base synchronization proof, hosted-close terminal route, and regression tests only.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T14:26:49.765Z, excerpt_hash=sha256:29e54a205d4ec1284808f0a739882be15fcd1b76de6f45d4844f995dc4619439

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608031426-0BY4B4-make-integration-handoff-and-hosted-close-finali/.agentplane/tasks/202608031426-0BY4B4/blueprint/resolved-snapshot.json
- old_digest: d0446cd16c1a55460e73253958b70aa078d944122d23c6b37691a6dd27a7ba10
- current_digest: d0446cd16c1a55460e73253958b70aa078d944122d23c6b37691a6dd27a7ba10
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608031426-0BY4B4

DecisionContextRef:
- operator_action: provider_action
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

- Observation: Retryable unresolved review gates were persisted as ambiguous handoff, while hosted-close routing ignored already-clean synchronized state.
  Impact: Operators had to release queue entries manually and could receive an infinite cleanup-finalize route after successful hosted close.
  Resolution: Classify only the pre-merge unresolved-review gate as retryable queued state, keep unknown failures fail-closed, normalize terminal queue entries during finalize, and require synchronized base before terminal routing.
