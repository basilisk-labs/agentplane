---
id: "202607221852-J910P6"
title: "Separate indexed search text from preview snippets"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221908-MR9EA9"
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
doc_updated_at: "2026-07-22T18:52:06.215Z"
doc_updated_by: "PLANNER"
description: "RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files."
sections:
  Summary: |-
    Separate indexed search text from preview snippets

    RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.
  Scope: |-
    - In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
    - Out of scope: FTS query execution or incremental update logic.
  Plan: |-
    1. Version the projection schema with separate search and preview fields.
    2. Project each supported source format into meaningful bounded units without truncating searchable tails.
    3. Preserve canonical source refs, line/section/entity spans, and digests.
    4. Add migration/full-rebuild compatibility.
    5. Benchmark index size and projection latency on a scalable fixture corpus.
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
  Findings: ""
id_source: "generated"
---
## Summary

Separate indexed search text from preview snippets

RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.

## Scope

- In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
- Out of scope: FTS query execution or incremental update logic.

## Plan

1. Version the projection schema with separate search and preview fields.
2. Project each supported source format into meaningful bounded units without truncating searchable tails.
3. Preserve canonical source refs, line/section/entity spans, and digests.
4. Add migration/full-rebuild compatibility.
5. Benchmark index size and projection latency on a scalable fixture corpus.

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
