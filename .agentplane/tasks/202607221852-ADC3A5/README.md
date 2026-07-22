---
id: "202607221852-ADC3A5"
title: "Query context projections with SQLite FTS5 and BM25"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
  - "202607221852-J910P6"
tags:
  - "context"
  - "fts5"
  - "milestone-beta2"
  - "performance"
  - "refactor"
  - "rf-14"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
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
doc_updated_at: "2026-07-22T18:52:09.037Z"
doc_updated_by: "PLANNER"
description: "RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback."
sections:
  Summary: |-
    Query context projections with SQLite FTS5 and BM25

    RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback.
  Scope: |-
    - In scope: SQLite search API, MATCH/BM25 ranking, path/scope/kind filters, stable pagination, snippets/highlights, canonical dedupe, adapter/strategy receipts, recall fixtures, and p95 benchmark.
    - Out of scope: semantic ranking; live filesystem scan remains only a missing/stale-index fallback.
  Plan: |-
    1. Add typed FTS query/filter/pagination APIs over the versioned projections.
    2. Route indexed context search through MATCH/BM25 and remove duplicate JS row plus filesystem scans.
    3. Keep a bounded explicit fallback for missing/stale/unindexed sources.
    4. Emit actual adapter, strategy, index digest, and fallback reasons.
    5. Build known-ref recall and scaled-corpus latency benchmarks.
  Verify Steps: |-
    1. Search the known-ref corpus. Expected: every target appears within its declared top-k and carries a stable canonical ref and snippet.
    2. Inspect indexed query execution. Expected: no full projection-row iteration or duplicate live result path.
    3. Remove or stale the index. Expected: JSON reports the bounded fallback and its reason.
    4. Compare p50/p95 against the 0.6.24 baseline on the same corpus. Expected: statistically supported improvement without recall regression.
    5. Run focused search/SQLite tests and typecheck.
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

Query context projections with SQLite FTS5 and BM25

RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback.

## Scope

- In scope: SQLite search API, MATCH/BM25 ranking, path/scope/kind filters, stable pagination, snippets/highlights, canonical dedupe, adapter/strategy receipts, recall fixtures, and p95 benchmark.
- Out of scope: semantic ranking; live filesystem scan remains only a missing/stale-index fallback.

## Plan

1. Add typed FTS query/filter/pagination APIs over the versioned projections.
2. Route indexed context search through MATCH/BM25 and remove duplicate JS row plus filesystem scans.
3. Keep a bounded explicit fallback for missing/stale/unindexed sources.
4. Emit actual adapter, strategy, index digest, and fallback reasons.
5. Build known-ref recall and scaled-corpus latency benchmarks.

## Verify Steps

1. Search the known-ref corpus. Expected: every target appears within its declared top-k and carries a stable canonical ref and snippet.
2. Inspect indexed query execution. Expected: no full projection-row iteration or duplicate live result path.
3. Remove or stale the index. Expected: JSON reports the bounded fallback and its reason.
4. Compare p50/p95 against the 0.6.24 baseline on the same corpus. Expected: statistically supported improvement without recall regression.
5. Run focused search/SQLite tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
