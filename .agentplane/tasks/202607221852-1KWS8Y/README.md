---
id: "202607221852-1KWS8Y"
title: "Batch context freshness and incrementally update projections"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221852-ADC3A5"
  - "202607221852-J910P6"
tags:
  - "context"
  - "index"
  - "milestone-beta2"
  - "performance"
  - "refactor"
  - "rf-15"
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
doc_updated_at: "2026-07-22T18:52:11.837Z"
doc_updated_by: "PLANNER"
description: "RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild."
sections:
  Summary: |-
    Batch context freshness and incrementally update projections

    RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.
  Scope: |-
    - In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
    - Out of scope: semantic decisions or hidden stale reuse.
  Plan: |-
    1. Batch source freshness evaluation and parse each file at most once per query.
    2. Compute an explicit change set from source and projection digests.
    3. Apply transactional upserts/deletes while preserving unchanged rows.
    4. Add version migration and controlled full-rebuild fallback.
    5. Prove incremental/full equivalence and measure no-change/update costs.
  Verify Steps: |-
    1. Query repeated matches from one source. Expected: one stat/hash/parse operation and deduplicated canonical results.
    2. Run no-change reindex. Expected: zero corpus rewrite and a truthful no-op receipt.
    3. Modify, add, and delete sources. Expected: incremental results equal a clean full rebuild byte-for-byte after normalization.
    4. Corrupt the index or change projection version. Expected: controlled repair/full rebuild with no silent partial results.
    5. Run focused index tests and scaled benchmarks.
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

Batch context freshness and incrementally update projections

RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.

## Scope

- In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
- Out of scope: semantic decisions or hidden stale reuse.

## Plan

1. Batch source freshness evaluation and parse each file at most once per query.
2. Compute an explicit change set from source and projection digests.
3. Apply transactional upserts/deletes while preserving unchanged rows.
4. Add version migration and controlled full-rebuild fallback.
5. Prove incremental/full equivalence and measure no-change/update costs.

## Verify Steps

1. Query repeated matches from one source. Expected: one stat/hash/parse operation and deduplicated canonical results.
2. Run no-change reindex. Expected: zero corpus rewrite and a truthful no-op receipt.
3. Modify, add, and delete sources. Expected: incremental results equal a clean full rebuild byte-for-byte after normalization.
4. Corrupt the index or change projection version. Expected: controlled repair/full rebuild with no silent partial results.
5. Run focused index tests and scaled benchmarks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
