---
id: "202606121018-SFZBAW"
title: "Add loop metrics and score aggregation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202606121018-5PS44M"
tags:
  - "code"
  - "evaluation"
  - "loops"
  - "metrics"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:45.533Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T11:15:46.257Z"
  updated_by: "CODER"
  note: "Loop metrics model and deterministic score aggregation implemented on agentplane-loops. Verified with focused loop tests, schema/example checks, package build, format check, and policy routing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement loop metrics and score aggregation on agentplane-loops as the branch-local trunk. Force override is intentional because v0.2 is continuing on agentplane-loops instead of the standard main-based branch_pr route."
events:
  -
    type: "status"
    at: "2026-06-12T11:07:55.144Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement loop metrics and score aggregation on agentplane-loops as the branch-local trunk. Force override is intentional because v0.2 is continuing on agentplane-loops instead of the standard main-based branch_pr route."
  -
    type: "verify"
    at: "2026-06-12T11:15:46.257Z"
    author: "CODER"
    state: "ok"
    note: "Loop metrics model and deterministic score aggregation implemented on agentplane-loops. Verified with focused loop tests, schema/example checks, package build, format check, and policy routing."
doc_version: 3
doc_updated_at: "2026-06-12T11:15:48.852Z"
doc_updated_by: "CODER"
description: "Add a LoopSpec metrics model and deterministic score aggregation so loop decisions can compare verification, scope, policy, and progress signals without depending only on free-form evaluator text."
sections:
  Summary: |-
    Add loop metrics and score aggregation

    Add a LoopSpec metrics model and deterministic score aggregation so loop decisions can compare verification, scope, policy, and progress signals without depending only on free-form evaluator text.
  Scope: |-
    - In scope: Add a LoopSpec metrics model and deterministic score aggregation so loop decisions can compare verification, scope, policy, and progress signals without depending only on free-form evaluator text.
    - Out of scope: unrelated refactors not required for "Add loop metrics and score aggregation".
  Plan: |-
    1. Add LoopMetric model entries for deterministic rule/check/evaluator/aggregate signals with id, source, weight, threshold, and required refs.
    2. Implement score aggregation helpers that return per-metric scores, weighted totals, failed thresholds, and explicit missing-signal diagnostics.
    3. Keep metric evaluation deterministic in this task; do not add an LLM judge as the only source of truth.
    4. Add examples for verification score, diff-scope score, policy-compliance score, and iteration-progress score.
    5. Wire metrics into planning/readback surfaces only where safe; score-aware transitions are handled by the dependent decision task.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: metric schema, aggregation, threshold failure, missing-signal, and weighting tests pass.
    2. Run `bun run --filter=agentplane build`. Expected: metric types compile and are available to later decision/evidence code.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    4. Inspect metric fixtures/examples. Expected: at least one deterministic fixture covers verification, scope, policy, and progress scoring without depending solely on LLM evaluator prose.
    5. Confirm legacy loop specs without metrics still validate or fail with an intentional compatibility decision recorded in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T11:15:46.257Z — VERIFY — ok

    By: CODER

    Note: Loop metrics model and deterministic score aggregation implemented on agentplane-loops. Verified with focused loop tests, schema/example checks, package build, format check, and policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T11:07:55.144Z, excerpt_hash=sha256:488263e3227e3dc2de4b7b5256478b646e4fb8c7ea7ea9b95b2f1dfda9757da4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-SFZBAW/blueprint/resolved-snapshot.json
    - old_digest: 8f3cc05a7052f2aaae758994fc60f68678a5481bb29838faf663c6be52dd93f7
    - current_digest: 8f3cc05a7052f2aaae758994fc60f68678a5481bb29838faf663c6be52dd93f7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121018-SFZBAW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121018-SFZBAW --agent CODER --slug add-loop-metrics-and-score-aggregation --worktree
    - diagnostic_command: agentplane work resume 202606121018-SFZBAW
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
    - Observation: Added LoopSpec metrics definitions, validation, representative tdd.fix metrics, and aggregateLoopMetricScores for weighted deterministic scoring.
      Impact: Later score-aware decision work can compare verification, scope, policy, and progress signals without relying only on evaluator prose.
      Resolution: Kept metrics optional and backward-compatible for legacy loop specs; missing required signals are explicit in aggregate output.
id_source: "generated"
---
## Summary

Add loop metrics and score aggregation

Add a LoopSpec metrics model and deterministic score aggregation so loop decisions can compare verification, scope, policy, and progress signals without depending only on free-form evaluator text.

## Scope

- In scope: Add a LoopSpec metrics model and deterministic score aggregation so loop decisions can compare verification, scope, policy, and progress signals without depending only on free-form evaluator text.
- Out of scope: unrelated refactors not required for "Add loop metrics and score aggregation".

## Plan

1. Add LoopMetric model entries for deterministic rule/check/evaluator/aggregate signals with id, source, weight, threshold, and required refs.
2. Implement score aggregation helpers that return per-metric scores, weighted totals, failed thresholds, and explicit missing-signal diagnostics.
3. Keep metric evaluation deterministic in this task; do not add an LLM judge as the only source of truth.
4. Add examples for verification score, diff-scope score, policy-compliance score, and iteration-progress score.
5. Wire metrics into planning/readback surfaces only where safe; score-aware transitions are handled by the dependent decision task.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: metric schema, aggregation, threshold failure, missing-signal, and weighting tests pass.
2. Run `bun run --filter=agentplane build`. Expected: metric types compile and are available to later decision/evidence code.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
4. Inspect metric fixtures/examples. Expected: at least one deterministic fixture covers verification, scope, policy, and progress scoring without depending solely on LLM evaluator prose.
5. Confirm legacy loop specs without metrics still validate or fail with an intentional compatibility decision recorded in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T11:15:46.257Z — VERIFY — ok

By: CODER

Note: Loop metrics model and deterministic score aggregation implemented on agentplane-loops. Verified with focused loop tests, schema/example checks, package build, format check, and policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T11:07:55.144Z, excerpt_hash=sha256:488263e3227e3dc2de4b7b5256478b646e4fb8c7ea7ea9b95b2f1dfda9757da4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-SFZBAW/blueprint/resolved-snapshot.json
- old_digest: 8f3cc05a7052f2aaae758994fc60f68678a5481bb29838faf663c6be52dd93f7
- current_digest: 8f3cc05a7052f2aaae758994fc60f68678a5481bb29838faf663c6be52dd93f7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121018-SFZBAW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121018-SFZBAW --agent CODER --slug add-loop-metrics-and-score-aggregation --worktree
- diagnostic_command: agentplane work resume 202606121018-SFZBAW
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

- Observation: Added LoopSpec metrics definitions, validation, representative tdd.fix metrics, and aggregateLoopMetricScores for weighted deterministic scoring.
  Impact: Later score-aware decision work can compare verification, scope, policy, and progress signals without relying only on evaluator prose.
  Resolution: Kept metrics optional and backward-compatible for legacy loop specs; missing required signals are explicit in aggregate output.
