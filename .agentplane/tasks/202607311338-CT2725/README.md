---
id: "202607311338-CT2725"
title: "Resolve successful runner receipt observation race"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202607221852-ECBY56"
tags:
  - "code"
  - "incident"
  - "milestone-rc1"
  - "receipt"
  - "runner"
  - "supervisor"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run release:incidents:check"
  - "bun run test:critical"
  - "bunx vitest run packages/agentplane/src/commands/task/direct-task-supervisor-observation.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts"
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
doc_updated_at: "2026-07-31T13:39:35.419Z"
doc_updated_by: "PLANNER"
description: "Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate."
sections:
  Summary: |-
    Resolve successful runner receipt observation race

    Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
  Scope: |-
    - In scope: Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
    - Out of scope: unrelated refactors not required for "Resolve successful runner receipt observation race".
  Plan: |-
    1. Reproduce the outer-supervisor false runner_receipt_unobserved outcome at the lifecycle/receipt boundary and identify the exact stale or missing observation transition.
    2. Implement the narrowest durable receipt reconciliation that accepts only the matching run/task receipt and never replays the provider.
    3. Add deterministic positive and adversarial regression coverage for matching, missing, mismatched, unverified, and rejected receipts.
    4. Run focused coverage and the critical suite, then resolve INC-20260731-01 through the canonical incident workflow with source/asset parity.
    5. Record independent verification and evaluator evidence, integrate the repair, then rerun the RC.1 qualification gate.
  Verify Steps: |-
    1. Reproduce the incident with a successful EXECUTOR whose matching observed-success receipt is durably persisted before the outer supervisor observes completion. Expected: the pre-fix path returns runner_receipt_unobserved without a provider retry.
    2. Run `bunx vitest run packages/agentplane/src/commands/task/direct-task-supervisor-observation.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts`. Expected: a matching persisted receipt is reconciled exactly once, while missing, mismatched, unverified without authority, and rejected receipts remain terminal.
    3. Run `bun run test:critical`. Expected: all critical CLI chunks pass and provider execution remains at-most-once.
    4. Run `agentplane incidents collect 202607311338-CT2725 --check` and `bun run release:incidents:check`. Expected: INC-20260731-01 is resolved with task/commit evidence, source and packaged incident assets stay identical, and the release incident gate passes.
    5. Review the final diff and task evidence. Expected: changes remain bounded to receipt observation/reconciliation, focused tests, incident records, and this task artifact; RC.1 can be rerun from the merged SHA.
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

Resolve successful runner receipt observation race

Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.

## Scope

- In scope: Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
- Out of scope: unrelated refactors not required for "Resolve successful runner receipt observation race".

## Plan

1. Reproduce the outer-supervisor false runner_receipt_unobserved outcome at the lifecycle/receipt boundary and identify the exact stale or missing observation transition.
2. Implement the narrowest durable receipt reconciliation that accepts only the matching run/task receipt and never replays the provider.
3. Add deterministic positive and adversarial regression coverage for matching, missing, mismatched, unverified, and rejected receipts.
4. Run focused coverage and the critical suite, then resolve INC-20260731-01 through the canonical incident workflow with source/asset parity.
5. Record independent verification and evaluator evidence, integrate the repair, then rerun the RC.1 qualification gate.

## Verify Steps

1. Reproduce the incident with a successful EXECUTOR whose matching observed-success receipt is durably persisted before the outer supervisor observes completion. Expected: the pre-fix path returns runner_receipt_unobserved without a provider retry.
2. Run `bunx vitest run packages/agentplane/src/commands/task/direct-task-supervisor-observation.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts`. Expected: a matching persisted receipt is reconciled exactly once, while missing, mismatched, unverified without authority, and rejected receipts remain terminal.
3. Run `bun run test:critical`. Expected: all critical CLI chunks pass and provider execution remains at-most-once.
4. Run `agentplane incidents collect 202607311338-CT2725 --check` and `bun run release:incidents:check`. Expected: INC-20260731-01 is resolved with task/commit evidence, source and packaged incident assets stay identical, and the release incident gate passes.
5. Review the final diff and task evidence. Expected: changes remain bounded to receipt observation/reconciliation, focused tests, incident records, and this task artifact; RC.1 can be rerun from the merged SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
