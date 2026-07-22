---
id: "202607221852-YP9QCH"
title: "Build source-driven canonical reconciliation candidates"
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
  - "assimilation"
  - "context"
  - "milestone-beta2"
  - "reconciliation"
  - "refactor"
  - "rf-17"
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
doc_updated_at: "2026-07-22T18:52:14.643Z"
doc_updated_by: "PLANNER"
description: "RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest."
sections:
  Summary: |-
    Build source-driven canonical reconciliation candidates

    RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest.
  Scope: |-
    - In scope: source-derived query terms, candidate fusion from FTS/aliases/graph/page families, deterministic scoring/reasons, bounded additional search, index digest, full-catalog compatibility, and entity-resolution fixture metrics.
    - Out of scope: deciding semantic identity in CLI; CURATOR remains authoritative.
  Plan: |-
    1. Extract deterministic candidate queries from source spans and structured terms.
    2. Gather FTS, alias, graph-neighbour, and page-family candidates.
    3. Score/dedupe with explicit reasons and bind to the index digest.
    4. Provide bounded additional search when evidence is insufficient.
    5. Compare fixture resolution coverage and eliminate alphabetical bias.
  Verify Steps: |-
    1. Rebuild candidates twice from the same source/index. Expected: identical ordering, reasons, scores, refs, and digest.
    2. Use fixtures whose correct entity is beyond the old first-50 slice. Expected: the source-driven candidate set includes it without scanning an arbitrary alphabetical prefix.
    3. Inspect semantic application. Expected: CLI supplies candidates/evidence only; CURATOR supplies the identity decision and rationale.
    4. Run reconciliation/context tests and report fixture accuracy.
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

Build source-driven canonical reconciliation candidates

RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest.

## Scope

- In scope: source-derived query terms, candidate fusion from FTS/aliases/graph/page families, deterministic scoring/reasons, bounded additional search, index digest, full-catalog compatibility, and entity-resolution fixture metrics.
- Out of scope: deciding semantic identity in CLI; CURATOR remains authoritative.

## Plan

1. Extract deterministic candidate queries from source spans and structured terms.
2. Gather FTS, alias, graph-neighbour, and page-family candidates.
3. Score/dedupe with explicit reasons and bind to the index digest.
4. Provide bounded additional search when evidence is insufficient.
5. Compare fixture resolution coverage and eliminate alphabetical bias.

## Verify Steps

1. Rebuild candidates twice from the same source/index. Expected: identical ordering, reasons, scores, refs, and digest.
2. Use fixtures whose correct entity is beyond the old first-50 slice. Expected: the source-driven candidate set includes it without scanning an arbitrary alphabetical prefix.
3. Inspect semantic application. Expected: CLI supplies candidates/evidence only; CURATOR supplies the identity decision and rationale.
4. Run reconciliation/context tests and report fixture accuracy.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
