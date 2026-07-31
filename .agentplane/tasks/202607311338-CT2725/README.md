---
id: "202607311338-CT2725"
title: "Preserve typed executor stops with unverified receipts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
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
  state: "approved"
  updated_at: "2026-07-31T13:44:48.861Z"
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
    at: "2026-07-31T13:40:50.476Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-31T13:45:12.332Z"
doc_updated_by: "CODER"
description: "When a successful runner process returns a valid but containment-unverified receipt together with a typed non-success semantic result, preserve the real blocker, context request, or semantic failure without treating completed work as verified; add regression coverage, resolve INC-20260731-01, and unblock the 0.7.0-rc.1 gate."
sections:
  Summary: |-
    Resolve successful runner receipt observation race

    Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
  Scope: |-
    - In scope: Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
    - Out of scope: unrelated refactors not required for "Resolve successful runner receipt observation race".
  Plan: |-
    1. Use the preserved RF-23 live artifact to distinguish receipt integrity from containment verification and reproduce the false runner_receipt_unobserved classification.
    2. Reorder direct executor observation so a present non-rejected receipt can carry typed blocked, needs_context, or failed stops, while completed execution still requires observed_success or explicit unverified authority.
    3. Add focused unit and outer-supervisor regression coverage, including missing/rejected receipt and completed-unverified safeguards.
    4. Run focused and critical gates, then resolve INC-20260731-01 through the canonical incident workflow with source/asset parity.
    5. Record independent verification and evaluator evidence, integrate the repair, then rerun RC.1 qualification.
  Verify Steps: |-
    1. Inspect the preserved RF-23 live artifact. Expected: process, scope, Git, artifacts, protected-filesystem observation, and phase-tool audit pass; containment alone leaves the receipt unverified, while the typed result is blocked and the pre-fix outer stop is runner_receipt_unobserved.
    2. Run `bunx vitest run packages/agentplane/src/commands/task/direct-task-supervisor-observation.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts`. Expected: blocked, needs_context, and failed results with present unverified receipts preserve their typed stop without provider replay; completed-unverified, missing, and rejected receipts remain terminal and cannot authorize progress.
    3. Run `bun run test:critical`. Expected: all critical CLI chunks pass and provider execution remains at-most-once.
    4. Run `agentplane incidents collect 202607311338-CT2725 --check` and `bun run release:incidents:check`. Expected: INC-20260731-01 is resolved with task/commit evidence, source and packaged incident assets stay identical, and the release incident gate passes.
    5. Review the final diff and task evidence. Expected: changes remain bounded to semantic-stop observation ordering, focused tests, incident records, and this task artifact; RC.1 can be rerun from the merged SHA.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The preserved RF-23 receipt is structurally valid but intentionally unverified only because POSIX process-group supervision cannot prove containment of descendants that create a new session; the same run contains an accepted supervisor-owned report_blocker audit and a typed blocked semantic result.
      Impact: The outer supervisor reported runner_receipt_unobserved before inspecting the non-success semantic result, hiding the actionable blocker even though no completed work or lifecycle progress should be authorized.
      Resolution: Require a present non-rejected receipt, then surface blocked, needs_context, and failed semantic stops before the observed-success gate; keep completed-unverified, missing, and rejected receipts unable to authorize progress.
extensions:
  workflow_route_baseline:
    start_head_sha: "7f9c6ff8e11c0bbe7dcf9c26beb44240cac5310e"
    version: 1
id_source: "generated"
---
## Summary

Resolve successful runner receipt observation race

Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.

## Scope

- In scope: Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
- Out of scope: unrelated refactors not required for "Resolve successful runner receipt observation race".

## Plan

1. Use the preserved RF-23 live artifact to distinguish receipt integrity from containment verification and reproduce the false runner_receipt_unobserved classification.
2. Reorder direct executor observation so a present non-rejected receipt can carry typed blocked, needs_context, or failed stops, while completed execution still requires observed_success or explicit unverified authority.
3. Add focused unit and outer-supervisor regression coverage, including missing/rejected receipt and completed-unverified safeguards.
4. Run focused and critical gates, then resolve INC-20260731-01 through the canonical incident workflow with source/asset parity.
5. Record independent verification and evaluator evidence, integrate the repair, then rerun RC.1 qualification.

## Verify Steps

1. Inspect the preserved RF-23 live artifact. Expected: process, scope, Git, artifacts, protected-filesystem observation, and phase-tool audit pass; containment alone leaves the receipt unverified, while the typed result is blocked and the pre-fix outer stop is runner_receipt_unobserved.
2. Run `bunx vitest run packages/agentplane/src/commands/task/direct-task-supervisor-observation.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts`. Expected: blocked, needs_context, and failed results with present unverified receipts preserve their typed stop without provider replay; completed-unverified, missing, and rejected receipts remain terminal and cannot authorize progress.
3. Run `bun run test:critical`. Expected: all critical CLI chunks pass and provider execution remains at-most-once.
4. Run `agentplane incidents collect 202607311338-CT2725 --check` and `bun run release:incidents:check`. Expected: INC-20260731-01 is resolved with task/commit evidence, source and packaged incident assets stay identical, and the release incident gate passes.
5. Review the final diff and task evidence. Expected: changes remain bounded to semantic-stop observation ordering, focused tests, incident records, and this task artifact; RC.1 can be rerun from the merged SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The preserved RF-23 receipt is structurally valid but intentionally unverified only because POSIX process-group supervision cannot prove containment of descendants that create a new session; the same run contains an accepted supervisor-owned report_blocker audit and a typed blocked semantic result.
  Impact: The outer supervisor reported runner_receipt_unobserved before inspecting the non-success semantic result, hiding the actionable blocker even though no completed work or lifecycle progress should be authorized.
  Resolution: Require a present non-rejected receipt, then surface blocked, needs_context, and failed semantic stops before the observed-success gate; keep completed-unverified, missing, and rejected receipts unable to authorize progress.
