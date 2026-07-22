---
id: "202607221849-8YYZ9X"
title: "Execute and calibrate EVALUATOR episodes"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221849-TBTX8X"
tags:
  - "evaluator"
  - "milestone-alpha2"
  - "milestone-alpha3"
  - "quality"
  - "refactor"
  - "rf-12"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-07-22T18:49:09.638Z"
doc_updated_by: "PLANNER"
description: "RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios."
sections:
  Summary: |-
    Execute and calibrate EVALUATOR episodes

    RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios.
  Scope: |-
    - In scope: evaluator adapter invocation, result application, rework/blocked/human-review transitions, evidence-linked findings, stale-result rejection, no-write enforcement, calibration fixtures, and human escalation policy.
    - Out of scope: a general benchmarking product; full evaluation-platform work remains outside the 0.7 task-level safety primitive.
  Plan: |-
    1. Invoke EVALUATOR with the prepared read-only AgentWorkOrder and result schema.
    2. Validate/apply the result through the typed boundary.
    3. Convert rework into a bounded next semantic work order and blocked/human uncertainty into explicit steps.
    4. Build calibration fixtures covering false pass, false rework, missing evidence, context reconciliation, and ambiguous acceptance.
    5. Tune escalation policy without deterministic semantic heuristics.
  Verify Steps: |-
    1. Run pass, rework, blocked, and human-review fixtures. Expected: the verdict originates only in EvaluatorSgrResult and each transition preserves evidence provenance.
    2. Change evaluated SHA or task revision after invocation. Expected: apply rejects the stale result.
    3. Attempt an evaluator filesystem mutation. Expected: sandbox/receipt policy makes the episode unacceptable.
    4. Run calibration scenarios repeatedly. Expected: ambiguous or weak-evidence cases escalate; no router heuristic supplies a verdict.
    5. Run focused evaluator tests, workflow coverage, lifecycle invariants, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Execute and calibrate EVALUATOR episodes

RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios.

## Scope

- In scope: evaluator adapter invocation, result application, rework/blocked/human-review transitions, evidence-linked findings, stale-result rejection, no-write enforcement, calibration fixtures, and human escalation policy.
- Out of scope: a general benchmarking product; full evaluation-platform work remains outside the 0.7 task-level safety primitive.

## Plan

1. Invoke EVALUATOR with the prepared read-only AgentWorkOrder and result schema.
2. Validate/apply the result through the typed boundary.
3. Convert rework into a bounded next semantic work order and blocked/human uncertainty into explicit steps.
4. Build calibration fixtures covering false pass, false rework, missing evidence, context reconciliation, and ambiguous acceptance.
5. Tune escalation policy without deterministic semantic heuristics.

## Verify Steps

1. Run pass, rework, blocked, and human-review fixtures. Expected: the verdict originates only in EvaluatorSgrResult and each transition preserves evidence provenance.
2. Change evaluated SHA or task revision after invocation. Expected: apply rejects the stale result.
3. Attempt an evaluator filesystem mutation. Expected: sandbox/receipt policy makes the episode unacceptable.
4. Run calibration scenarios repeatedly. Expected: ambiguous or weak-evidence cases escalate; no router heuristic supplies a verdict.
5. Run focused evaluator tests, workflow coverage, lifecycle invariants, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
