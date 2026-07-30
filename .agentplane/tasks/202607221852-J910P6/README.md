---
id: "202607221852-J910P6"
title: "Separate indexed search text from preview snippets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607300553-CR9VTJ"
tags:
  - "context"
  - "milestone-beta2"
  - "projection"
  - "refactor"
  - "rf-16"
  - "search"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T07:16:36.624Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved under the user-authorized v0.7 controlled-wave plan after source inspection: schema v2, rebuild compatibility, exact refs, bounded previews, and measurable projection budgets."
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
    body: "Start: implement projection schema v2 with full search text, bounded previews, exact source refs, and rebuild compatibility in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-30T07:16:50.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement projection schema v2 with full search text, bounded previews, exact source refs, and rebuild compatibility in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-30T07:25:15.644Z"
doc_updated_by: "CODER"
description: "RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files."
sections:
  Summary: |-
    Separate indexed search text from preview snippets

    RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.
  Scope: |-
    - In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
    - Out of scope: FTS query execution or incremental update logic.
  Plan: |-
    1. Introduce projection schema v2 with complete `search_text`, UTF-8-bounded `preview_text`, stable source refs, and persisted byte/latency metrics.
    2. Project markdown sections and plain-text windows without searchable-tail truncation; retain bounded file previews only for canonical whole-file refs.
    3. Project JSONL rows and structured JSON units with deterministic selectors or line spans, preserving canonical refs and item digests.
    4. Make search rank/match full `search_text` but render `preview_text`; recompute selector freshness from the current projected unit.
    5. Treat v1 SQLite/legacy projections as rebuild-required, add focused schema/projection/search tests plus a scalable fixture with explicit preview-size and projection-latency budgets.
  Verify Steps: |-
    1. Index a long markdown page with a unique tail term. Expected: the term is searchable in projection data while the preview remains bounded and points to the exact section/lines.
    2. Project JSONL and structured fixtures. Expected: row/entity boundaries and canonical refs are stable and reproducible.
    3. Compare old/new index size and build latency. Expected: measured results and explicit budgets, not an assumed improvement.
    4. Run focused projection/search tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: |-
    - Implemented projection schema v2: complete `search_text` is independent from UTF-8-bounded `preview_text`; SQLite FTS indexes `search_text`.
    - Projection units preserve markdown section and line refs, JSONL rows, and structured JSON line windows. Search freshness now recomputes the exact current projection unit.
    - v1 projections are rebuild-required; `agentplane context reindex` recreates the cache and emits source/search/preview byte metrics plus projection latency.
    - Explicit budgets verified on a scalable fixture: preview <= 20 lines and <= 2048 UTF-8 bytes per row; projection fixture completes in < 2000 ms.
    - Local evidence: typecheck, changed-file lint, focused projection/search/SQLite tests (25 tests) passed.
extensions:
  workflow_route_baseline:
    start_head_sha: "b8dbca7245172f6b85d5431960a90debbc274c9d"
    version: 1
id_source: "generated"
---
## Summary

Separate indexed search text from preview snippets

RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.

## Scope

- In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
- Out of scope: FTS query execution or incremental update logic.

## Plan

1. Introduce projection schema v2 with complete `search_text`, UTF-8-bounded `preview_text`, stable source refs, and persisted byte/latency metrics.
2. Project markdown sections and plain-text windows without searchable-tail truncation; retain bounded file previews only for canonical whole-file refs.
3. Project JSONL rows and structured JSON units with deterministic selectors or line spans, preserving canonical refs and item digests.
4. Make search rank/match full `search_text` but render `preview_text`; recompute selector freshness from the current projected unit.
5. Treat v1 SQLite/legacy projections as rebuild-required, add focused schema/projection/search tests plus a scalable fixture with explicit preview-size and projection-latency budgets.

## Verify Steps

1. Index a long markdown page with a unique tail term. Expected: the term is searchable in projection data while the preview remains bounded and points to the exact section/lines.
2. Project JSONL and structured fixtures. Expected: row/entity boundaries and canonical refs are stable and reproducible.
3. Compare old/new index size and build latency. Expected: measured results and explicit budgets, not an assumed improvement.
4. Run focused projection/search tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings

- Implemented projection schema v2: complete `search_text` is independent from UTF-8-bounded `preview_text`; SQLite FTS indexes `search_text`.
- Projection units preserve markdown section and line refs, JSONL rows, and structured JSON line windows. Search freshness now recomputes the exact current projection unit.
- v1 projections are rebuild-required; `agentplane context reindex` recreates the cache and emits source/search/preview byte metrics plus projection latency.
- Explicit budgets verified on a scalable fixture: preview <= 20 lines and <= 2048 UTF-8 bytes per row; projection fixture completes in < 2000 ms.
- Local evidence: typecheck, changed-file lint, focused projection/search/SQLite tests (25 tests) passed.
