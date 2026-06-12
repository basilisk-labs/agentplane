---
id: "202606121018-DP0P4B"
title: "Add score-aware loop decisions"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-06-12T10:21:07.141Z"
doc_updated_by: "PLANNER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
