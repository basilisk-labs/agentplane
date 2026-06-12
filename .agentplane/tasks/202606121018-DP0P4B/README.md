---
id: "202606121018-DP0P4B"
title: "Add score-aware loop decisions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202606121018-SFZBAW"
  - "202606121018-WQSARQ"
tags:
  - "code"
  - "decision"
  - "loops"
  - "metrics"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:49.918Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T11:23:23.093Z"
  updated_by: "CODER"
  note: "Score-aware loop decisions implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a dry-run smoke showing score fields in decision.json."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement score-aware loop decisions on agentplane-loops as the branch-local trunk. Force override is intentional because v0.2 work is proceeding on agentplane-loops instead of the standard main-based branch_pr route."
events:
  -
    type: "status"
    at: "2026-06-12T11:19:39.599Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement score-aware loop decisions on agentplane-loops as the branch-local trunk. Force override is intentional because v0.2 work is proceeding on agentplane-loops instead of the standard main-based branch_pr route."
  -
    type: "verify"
    at: "2026-06-12T11:23:23.093Z"
    author: "CODER"
    state: "ok"
    note: "Score-aware loop decisions implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a dry-run smoke showing score fields in decision.json."
doc_version: 3
doc_updated_at: "2026-06-12T11:23:24.467Z"
doc_updated_by: "CODER"
description: "Extend loop decision records and transition preparation with metric scores, score deltas, failed contracts, and progress evidence so retries stop when evidence shows no useful improvement."
sections:
  Summary: |-
    Add score-aware loop decisions

    Extend loop decision records and transition preparation with metric scores, score deltas, failed contracts, and progress evidence so retries stop when evidence shows no useful improvement.
  Scope: |-
    - In scope: Extend loop decision records and transition preparation with metric scores, score deltas, failed contracts, and progress evidence so retries stop when evidence shows no useful improvement.
    - Out of scope: unrelated refactors not required for "Add score-aware loop decisions".
  Plan: |-
    1. Extend LoopDecisionRecord with scores, score_delta, failed_contracts, progress_evidence, and next_step_reason fields.
    2. Use aggregated metrics and per-step evidence to prepare retry/finish/human_review/block decisions without changing non-dry-run safety boundaries.
    3. Add no-progress stop behavior: repeated failed checks with no score improvement should route to human_review or block instead of blind retry.
    4. Keep transitions auditable by recording which metric or contract drove the decision.
    5. Add tests for improving retry, stalled retry, failed contract, and pass-to-finish decision cases.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: decision records include scores/deltas/failed contracts and route correctly for pass, retry, no-progress, and human-review cases.
    2. Run `bun run --filter=agentplane build`. Expected: decision record type changes compile across command/artifact code.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy remains valid.
    4. Inspect generated `decision.json` from a representative dry-run/fixture. Expected: decision rationale is machine-readable and cites metric/contract refs, not only prose.
    5. Confirm non-dry-run loop execution still fails closed unless separately enabled by a future approved task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T11:23:23.093Z — VERIFY — ok

    By: CODER

    Note: Score-aware loop decisions implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a dry-run smoke showing score fields in decision.json.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T11:19:39.599Z, excerpt_hash=sha256:29f2fb10ff10162ba636be7913d509c0ca04b5d93d4c3d59122d2b78a222a0da

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-DP0P4B/blueprint/resolved-snapshot.json
    - old_digest: 864bd8b3888624e31d711182ac1e03215c2c58140e95dec7fe15c8c6f68b6246
    - current_digest: 864bd8b3888624e31d711182ac1e03215c2c58140e95dec7fe15c8c6f68b6246
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121018-DP0P4B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121018-DP0P4B --agent CODER --slug add-score-aware-loop-decisions --worktree
    - diagnostic_command: agentplane work resume 202606121018-DP0P4B
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: LoopDecisionRecord now includes scores, scoreDelta, failedContracts, progressEvidence, and nextStepReason.
      Impact: Retry/decision work can cite machine-readable metric and contract evidence instead of only prose.
      Resolution: Dry-run decisions aggregate available metrics without inventing scores; missing required signals remain explicit and keep human review required.
id_source: "generated"
---
## Summary

Add score-aware loop decisions

Extend loop decision records and transition preparation with metric scores, score deltas, failed contracts, and progress evidence so retries stop when evidence shows no useful improvement.

## Scope

- In scope: Extend loop decision records and transition preparation with metric scores, score deltas, failed contracts, and progress evidence so retries stop when evidence shows no useful improvement.
- Out of scope: unrelated refactors not required for "Add score-aware loop decisions".

## Plan

1. Extend LoopDecisionRecord with scores, score_delta, failed_contracts, progress_evidence, and next_step_reason fields.
2. Use aggregated metrics and per-step evidence to prepare retry/finish/human_review/block decisions without changing non-dry-run safety boundaries.
3. Add no-progress stop behavior: repeated failed checks with no score improvement should route to human_review or block instead of blind retry.
4. Keep transitions auditable by recording which metric or contract drove the decision.
5. Add tests for improving retry, stalled retry, failed contract, and pass-to-finish decision cases.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: decision records include scores/deltas/failed contracts and route correctly for pass, retry, no-progress, and human-review cases.
2. Run `bun run --filter=agentplane build`. Expected: decision record type changes compile across command/artifact code.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy remains valid.
4. Inspect generated `decision.json` from a representative dry-run/fixture. Expected: decision rationale is machine-readable and cites metric/contract refs, not only prose.
5. Confirm non-dry-run loop execution still fails closed unless separately enabled by a future approved task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T11:23:23.093Z — VERIFY — ok

By: CODER

Note: Score-aware loop decisions implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a dry-run smoke showing score fields in decision.json.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T11:19:39.599Z, excerpt_hash=sha256:29f2fb10ff10162ba636be7913d509c0ca04b5d93d4c3d59122d2b78a222a0da

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-DP0P4B/blueprint/resolved-snapshot.json
- old_digest: 864bd8b3888624e31d711182ac1e03215c2c58140e95dec7fe15c8c6f68b6246
- current_digest: 864bd8b3888624e31d711182ac1e03215c2c58140e95dec7fe15c8c6f68b6246
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121018-DP0P4B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121018-DP0P4B --agent CODER --slug add-score-aware-loop-decisions --worktree
- diagnostic_command: agentplane work resume 202606121018-DP0P4B
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: LoopDecisionRecord now includes scores, scoreDelta, failedContracts, progressEvidence, and nextStepReason.
  Impact: Retry/decision work can cite machine-readable metric and contract evidence instead of only prose.
  Resolution: Dry-run decisions aggregate available metrics without inventing scores; missing required signals remain explicit and keep human review required.
