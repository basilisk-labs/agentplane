---
id: "202607221852-01ACZ9"
title: "Serve bounded knowledge requests during agent episodes"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221848-ER5H6N"
  - "202607221848-VC4VVS"
  - "202607221849-NWVCAG"
  - "202607221852-ABP0EX"
tags:
  - "context"
  - "knowledge-request"
  - "milestone-beta2"
  - "refactor"
  - "rf-22"
  - "runner"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
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
doc_updated_at: "2026-07-22T18:52:23.081Z"
doc_updated_by: "PLANNER"
description: "RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps."
sections:
  Summary: |-
    Serve bounded knowledge requests during agent episodes

    RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps.
  Scope: |-
    - In scope: KnowledgeRequest schema, run-bound audit, deterministic retrieval response, verified refs/excerpts, round/token budgets, blocking semantics, dedupe, repeated-unresolved escalation, and role-specific policy.
    - Out of scope: exposing unrestricted repository/lifecycle access or naming the contract ContextGapRequest.
  Plan: |-
    1. Define versioned request/response contracts and role policy.
    2. Bind requests to run/work-order identity, fingerprint, authority, rounds, and token budget.
    3. Execute deterministic retrieval with optional policy-gated escalation.
    4. Return verified refs/excerpts plus missing/omitted receipt.
    5. Convert repeated unresolved blocking requests into a typed blocker/human escalation.
  Verify Steps: |-
    1. Submit valid executor and evaluator requests. Expected: scoped digest-valid refs/excerpts and a complete run audit.
    2. Exceed round/token budget or request a forbidden scope. Expected: typed denial without broader repository authority.
    3. Repeat an unresolved blocking request. Expected: deduplicated evidence followed by blocker/escalation, not an infinite loop.
    4. Tamper with work-order id, fingerprint, or returned digest. Expected: validation rejects the request/response.
    5. Run schema, runner, and retrieval tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Serve bounded knowledge requests during agent episodes

RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps.

## Scope

- In scope: KnowledgeRequest schema, run-bound audit, deterministic retrieval response, verified refs/excerpts, round/token budgets, blocking semantics, dedupe, repeated-unresolved escalation, and role-specific policy.
- Out of scope: exposing unrestricted repository/lifecycle access or naming the contract ContextGapRequest.

## Plan

1. Define versioned request/response contracts and role policy.
2. Bind requests to run/work-order identity, fingerprint, authority, rounds, and token budget.
3. Execute deterministic retrieval with optional policy-gated escalation.
4. Return verified refs/excerpts plus missing/omitted receipt.
5. Convert repeated unresolved blocking requests into a typed blocker/human escalation.

## Verify Steps

1. Submit valid executor and evaluator requests. Expected: scoped digest-valid refs/excerpts and a complete run audit.
2. Exceed round/token budget or request a forbidden scope. Expected: typed denial without broader repository authority.
3. Repeat an unresolved blocking request. Expected: deduplicated evidence followed by blocker/escalation, not an infinite loop.
4. Tamper with work-order id, fingerprint, or returned digest. Expected: validation rejects the request/response.
5. Run schema, runner, and retrieval tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
