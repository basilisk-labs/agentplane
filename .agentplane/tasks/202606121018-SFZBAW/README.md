---
id: "202606121018-SFZBAW"
title: "Add loop metrics and score aggregation"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-06-12T10:20:47.913Z"
doc_updated_by: "PLANNER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
