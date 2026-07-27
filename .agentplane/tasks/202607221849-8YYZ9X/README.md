---
id: "202607221849-8YYZ9X"
title: "Execute and calibrate EVALUATOR episodes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-07-27T15:39:29.453Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-27T15:40:35.719Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T15:40:35.719Z"
doc_updated_by: "CODER"
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
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T15:41:01.436Z"
        authorityDigest: "sha256:5e0af3b7002d7541010ab6fd5d314073627612e04c5537f7decc99a34eace50c"
        digest: "sha256:a77ead1fb848ed4f29fcad3ba6dfae657b9b6146ff3376bc0709001b5ba6d676"
        operationDigest: "sha256:1b1ad54abbd2f3dc6f1996c7f819dfa4d2a90a5a3a6d3ab372ad407e63009121"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:f895a0e405b3b1a8ff568566ab08bad61f1c57a3cffab8f4601541b48dff030d"
    grants:
      -
        actor: "USER"
        digest: "sha256:5e0af3b7002d7541010ab6fd5d314073627612e04c5537f7decc99a34eace50c"
        expiresAt: "2026-07-27T15:56:01.436Z"
        id: "authority-6a79b910-61ff-4d0c-8ade-44dc910205fa"
        issuedAt: "2026-07-27T15:41:01.436Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:1b1ad54abbd2f3dc6f1996c7f819dfa4d2a90a5a3a6d3ab372ad407e63009121"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f895a0e405b3b1a8ff568566ab08bad61f1c57a3cffab8f4601541b48dff030d"
        stateScopeDigest: "sha256:20a01e4c833c85b6d2cd63c6ca38a542039710cbc923772f5b3190f03d7e58f3"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "8c863087669ef21c562e8c230e851bc94a12e8a4"
    version: 1
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
