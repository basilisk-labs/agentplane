---
id: "202607221852-1KWS8Y"
title: "Batch context freshness and incrementally update projections"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-07-30T08:42:47.429Z"
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
    at: "2026-07-30T08:43:03.409Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-30T08:43:03.409Z"
doc_updated_by: "CODER"
description: "RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild."
sections:
  Summary: |-
    Batch context freshness and incrementally update projections

    RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.
  Scope: |-
    - In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
    - Out of scope: semantic decisions or hidden stale reuse.
  Plan: "1. Version the SQLite projection schema to retain source identities and apply transactional per-source upsert/delete while keeping FTS rows synchronized. 2. Refactor reindex to capture each eligible file's stat, text, hash, and projection at most once; derive added, changed, removed, and unchanged sources without materializing the old corpus. 3. Return explicit no-op, incremental, and controlled full-rebuild receipts; force full rebuild for reset, integrity failure, projection-version mismatch, or index-scope changes. 4. Add deterministic tests for deduplication, no-change zero-write behavior, add/change/delete equivalence, corruption/version recovery, and FTS search continuity. 5. Add a reproducible scaled benchmark and record method, threshold, comparison, and residual scope; run focused checks, typecheck, critical CLI checks, hotspot, and Knip gates."
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
extensions:
  workflow_route_baseline:
    start_head_sha: "45b38ab477c3511ae7395f9b221495527888bf7e"
    version: 1
id_source: "generated"
---
## Summary

Batch context freshness and incrementally update projections

RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.

## Scope

- In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
- Out of scope: semantic decisions or hidden stale reuse.

## Plan

1. Version the SQLite projection schema to retain source identities and apply transactional per-source upsert/delete while keeping FTS rows synchronized. 2. Refactor reindex to capture each eligible file's stat, text, hash, and projection at most once; derive added, changed, removed, and unchanged sources without materializing the old corpus. 3. Return explicit no-op, incremental, and controlled full-rebuild receipts; force full rebuild for reset, integrity failure, projection-version mismatch, or index-scope changes. 4. Add deterministic tests for deduplication, no-change zero-write behavior, add/change/delete equivalence, corruption/version recovery, and FTS search continuity. 5. Add a reproducible scaled benchmark and record method, threshold, comparison, and residual scope; run focused checks, typecheck, critical CLI checks, hotspot, and Knip gates.

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
