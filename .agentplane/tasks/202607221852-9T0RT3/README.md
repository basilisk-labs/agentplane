---
id: "202607221852-9T0RT3"
title: "Build deterministic task knowledge retrieval"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221848-ER5H6N"
  - "202607221848-VC4VVS"
  - "202607221852-1KWS8Y"
  - "202607221852-YP9QCH"
tags:
  - "context"
  - "milestone-beta2"
  - "refactor"
  - "retrieval"
  - "rf-19"
  - "v0.7"
  - "wave-retrieval"
  - "work-order"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
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
doc_updated_at: "2026-07-22T18:52:17.445Z"
doc_updated_by: "PLANNER"
description: "RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder."
sections:
  Summary: |-
    Build deterministic task knowledge retrieval

    RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder.
  Scope: |-
    - In scope: deterministic query planning, exact/FTS/alias/graph retrieval, scoring/reasons, budgets, prepared excerpts, missing/omitted receipt, work-order integration, relevance fixtures, and metrics.
    - Out of scope: always-on CURATOR or semantic reranking.
  Plan: |-
    1. Build structured retrieval intent from task/acceptance, affected paths/symbols, blueprint/tags, dependency outputs, and evaluator findings.
    2. Resolve through exact, FTS, alias, and graph adapters under explicit budgets.
    3. Select refs/excerpts deterministically with reasons and coverage/omission receipt.
    4. Embed results in AgentWorkOrder and fingerprint the knowledge projection.
    5. Compare retrieval hits/gaps and executor repo-discovery probes to baseline scenarios.
  Verify Steps: |-
    1. Run fixed task fixtures twice. Expected: identical queries, refs, excerpts, scores/reasons, budgets, and retrieval receipt.
    2. Exercise path, symbol, dependency, and prior-finding signals. Expected: each contributes only when present and is auditable.
    3. Remove required knowledge or exceed budget. Expected: an explicit missing/omitted receipt, never fabricated context.
    4. Compare executor broad-discovery probes and verified success to baseline. Expected: fewer redundant probes without quality regression.
    5. Run work-order/retrieval tests and typecheck.
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

Build deterministic task knowledge retrieval

RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder.

## Scope

- In scope: deterministic query planning, exact/FTS/alias/graph retrieval, scoring/reasons, budgets, prepared excerpts, missing/omitted receipt, work-order integration, relevance fixtures, and metrics.
- Out of scope: always-on CURATOR or semantic reranking.

## Plan

1. Build structured retrieval intent from task/acceptance, affected paths/symbols, blueprint/tags, dependency outputs, and evaluator findings.
2. Resolve through exact, FTS, alias, and graph adapters under explicit budgets.
3. Select refs/excerpts deterministically with reasons and coverage/omission receipt.
4. Embed results in AgentWorkOrder and fingerprint the knowledge projection.
5. Compare retrieval hits/gaps and executor repo-discovery probes to baseline scenarios.

## Verify Steps

1. Run fixed task fixtures twice. Expected: identical queries, refs, excerpts, scores/reasons, budgets, and retrieval receipt.
2. Exercise path, symbol, dependency, and prior-finding signals. Expected: each contributes only when present and is auditable.
3. Remove required knowledge or exceed budget. Expected: an explicit missing/omitted receipt, never fabricated context.
4. Compare executor broad-discovery probes and verified success to baseline. Expected: fewer redundant probes without quality regression.
5. Run work-order/retrieval tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
