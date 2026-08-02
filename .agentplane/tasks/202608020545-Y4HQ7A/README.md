---
id: "202608020545-Y4HQ7A"
title: "Freeze qualification metric policy and verification evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "Run TypeScript typecheck and release-critical tests. Expected: compiler and milestone lifecycle contracts pass without widening qualification-task source scope."
  - "Run evaluator evidence tests. Expected: qualification review freezes the verification record selected by the packet implementation SHA and rejects mismatched records."
  - "Run focused qualification-packet tests. Expected: diagnostic timing failures are explicitly non-blocking, unclassified failures remain blocking, and the packet exposes both sets."
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T05:46:12.534Z"
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
    at: "2026-08-02T05:46:59.630Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T05:46:59.630Z"
doc_updated_by: "CODER"
description: "Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only."
sections:
  Summary: |-
    Freeze qualification metric policy and verification evidence

    Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
  Scope: |-
    - In scope: Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
    - Out of scope: unrelated refactors not required for "Freeze qualification metric policy and verification evidence".
  Plan: "1. Reproduce both evaluator findings with focused tests: diagnostic RF-04 failures are not explicitly classified in the packet, and qualification verification records are filtered against the evidence commit instead of the packet implementation SHA. 2. Extend the RF-04 packet with a deterministic gate classification derived from the frozen comparison policy, preserving raw candidate verdicts and separating diagnostic from blocking failure IDs. 3. Make evaluator review resolve accepted verification records against the qualification packet implementation SHA while keeping the evidence commit as the reviewed artifact head. 4. Add positive and negative tests for both boundaries. 5. Run focused tests, TypeScript typecheck, release-critical checks, independent verification, evaluator review, and branch_pr integration. The rc.2 task remains evidence-only and consumes the merged fix afterward."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts`. Expected: packets preserve raw RF-04 failures, expose diagnostic versus blocking failure IDs, and reject unclassified blocking regressions.
    2. Run focused evaluator evidence tests covering qualification records. Expected: evaluator preparation freezes the packet-selected verification record against the qualified implementation SHA and still rejects mismatched records.
    3. Run the AgentPlane TypeScript typecheck and release-critical test suite. Expected: the native TypeScript 7 contract and milestone lifecycle gates pass.
    4. Inspect the resulting evaluator observed-checks fixture. Expected: `verification_records` is non-empty for a valid qualification packet, raw latency failures remain visible, and no publication eligibility is inferred from diagnostic metrics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "82905f817ef1ca58f17e3fb31ba55564435fb277"
    version: 1
id_source: "generated"
---
## Summary

Freeze qualification metric policy and verification evidence

Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.

## Scope

- In scope: Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
- Out of scope: unrelated refactors not required for "Freeze qualification metric policy and verification evidence".

## Plan

1. Reproduce both evaluator findings with focused tests: diagnostic RF-04 failures are not explicitly classified in the packet, and qualification verification records are filtered against the evidence commit instead of the packet implementation SHA. 2. Extend the RF-04 packet with a deterministic gate classification derived from the frozen comparison policy, preserving raw candidate verdicts and separating diagnostic from blocking failure IDs. 3. Make evaluator review resolve accepted verification records against the qualification packet implementation SHA while keeping the evidence commit as the reviewed artifact head. 4. Add positive and negative tests for both boundaries. 5. Run focused tests, TypeScript typecheck, release-critical checks, independent verification, evaluator review, and branch_pr integration. The rc.2 task remains evidence-only and consumes the merged fix afterward.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts`. Expected: packets preserve raw RF-04 failures, expose diagnostic versus blocking failure IDs, and reject unclassified blocking regressions.
2. Run focused evaluator evidence tests covering qualification records. Expected: evaluator preparation freezes the packet-selected verification record against the qualified implementation SHA and still rejects mismatched records.
3. Run the AgentPlane TypeScript typecheck and release-critical test suite. Expected: the native TypeScript 7 contract and milestone lifecycle gates pass.
4. Inspect the resulting evaluator observed-checks fixture. Expected: `verification_records` is non-empty for a valid qualification packet, raw latency failures remain visible, and no publication eligibility is inferred from diagnostic metrics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
