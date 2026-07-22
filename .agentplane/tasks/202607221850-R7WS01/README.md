---
id: "202607221850-R7WS01"
title: "Return typed runner lifecycle results"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
  - "202607221848-VC4VVS"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
tags:
  - "milestone-beta1"
  - "refactor"
  - "rf-25"
  - "runner"
  - "use-case"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
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
doc_updated_at: "2026-07-22T18:50:23.048Z"
doc_updated_by: "PLANNER"
description: "RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing."
sections:
  Summary: |-
    Return typed runner lifecycle results

    RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.
  Scope: |-
    - In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
    - Out of scope: automating the complete direct route, delivered by the next task.
  Plan: |-
    1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
    2. Separate rendering/exit mapping from use-case logic.
    3. Call runner phases in-process from the supervisor.
    4. Preserve documented human and JSON output through compatibility renderers.
    5. Add result/renderer parity, adapter error, cancellation, timeout, and stale-work-order tests.
  Verify Steps: |-
    1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
    2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
    3. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
    4. Run runner/supervisor/lifecycle tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: ""
id_source: "generated"
---
## Summary

Return typed runner lifecycle results

RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.

## Scope

- In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
- Out of scope: automating the complete direct route, delivered by the next task.

## Plan

1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
2. Separate rendering/exit mapping from use-case logic.
3. Call runner phases in-process from the supervisor.
4. Preserve documented human and JSON output through compatibility renderers.
5. Add result/renderer parity, adapter error, cancellation, timeout, and stale-work-order tests.

## Verify Steps

1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
3. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
4. Run runner/supervisor/lifecycle tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
