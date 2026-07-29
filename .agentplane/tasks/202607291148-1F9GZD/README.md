---
id: "202607291148-1F9GZD"
title: "Formalize SHA-bound qualification packets for evaluator review"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "v0.7"
verify:
  - "bun run ci:contract"
  - "bun run test:fast -- packages/agentplane/src/commands/evaluator"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T11:49:29.041Z"
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
    at: "2026-07-29T11:49:50.493Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-29T11:49:50.493Z"
doc_updated_by: "CODER"
description: "Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9."
sections:
  Summary: |-
    Formalize SHA-bound qualification packets for evaluator review

    Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
  Scope: |-
    - In scope: Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
    - Out of scope: unrelated refactors not required for "Formalize SHA-bound qualification packets for evaluator review".
  Plan: "1. Reproduce the beta.1 evaluator rework against a metadata-only qualification task and define the single reviewed-SHA contract. 2. Extend the CLI evidence builder to generate a deterministic qualification packet containing verified check records, per-leaf dependency closure and lifecycle evidence, and RF-04 baseline-versus-current metric values. 3. Freeze that packet into the evaluator work order and make metadata-only qualification reviews target the packet commit rather than a stale source-only SHA. 4. Add focused regression tests for packet contents, SHA binding, closure completeness, and metric comparison. 5. Run focused evaluator tests and ci:contract; keep the change limited to CLI evidence and review routing."
  Verify Steps: "1. Add focused tests that prepare a metadata-only qualification task with structured verification details and assert that the frozen evaluator work order contains one SHA-bound qualification packet, accepted verification evidence, per-leaf dependency closure, and RF-04 baseline-versus-current metrics. 2. Add a regression that fails if a packet is bound to a stale reviewed SHA or has incomplete dependency lifecycle evidence. 3. Run bun run test:fast -- packages/agentplane/src/commands/evaluator and the new targeted test files. Expected: all pass. 4. Run bun run ci:contract. Expected: full repository contract passes. 5. Inspect the packet schema and evaluator prompt evidence list. Expected: an EVALUATOR can cite only frozen packet evidence and can evaluate a metadata-only qualification change at its actual reviewed SHA."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Formalize SHA-bound qualification packets for evaluator review

Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.

## Scope

- In scope: Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
- Out of scope: unrelated refactors not required for "Formalize SHA-bound qualification packets for evaluator review".

## Plan

1. Reproduce the beta.1 evaluator rework against a metadata-only qualification task and define the single reviewed-SHA contract. 2. Extend the CLI evidence builder to generate a deterministic qualification packet containing verified check records, per-leaf dependency closure and lifecycle evidence, and RF-04 baseline-versus-current metric values. 3. Freeze that packet into the evaluator work order and make metadata-only qualification reviews target the packet commit rather than a stale source-only SHA. 4. Add focused regression tests for packet contents, SHA binding, closure completeness, and metric comparison. 5. Run focused evaluator tests and ci:contract; keep the change limited to CLI evidence and review routing.

## Verify Steps

1. Add focused tests that prepare a metadata-only qualification task with structured verification details and assert that the frozen evaluator work order contains one SHA-bound qualification packet, accepted verification evidence, per-leaf dependency closure, and RF-04 baseline-versus-current metrics. 2. Add a regression that fails if a packet is bound to a stale reviewed SHA or has incomplete dependency lifecycle evidence. 3. Run bun run test:fast -- packages/agentplane/src/commands/evaluator and the new targeted test files. Expected: all pass. 4. Run bun run ci:contract. Expected: full repository contract passes. 5. Inspect the packet schema and evaluator prompt evidence list. Expected: an EVALUATOR can cite only frozen packet evidence and can evaluate a metadata-only qualification change at its actual reviewed SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
