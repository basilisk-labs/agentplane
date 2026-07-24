---
id: "202607221848-ER5H6N"
title: "Define digest-addressed KnowledgeRef contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607221848-0ZAB1F"
tags:
  - "context"
  - "knowledge"
  - "milestone-alpha2"
  - "refactor"
  - "rf-08"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T22:16:26.325Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the independent KnowledgeRef contract leaf for alpha.2 under the existing full v0.7 authorization."
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
    body: "Start: Define strict digest-addressed KnowledgeRef contracts, deterministic resolution and stale/missing receipts, then verify bounded runtime excerpts without creating a second context pack."
events:
  -
    type: "status"
    at: "2026-07-24T22:17:12.985Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Define strict digest-addressed KnowledgeRef contracts, deterministic resolution and stale/missing receipts, then verify bounded runtime excerpts without creating a second context pack."
doc_version: 3
doc_updated_at: "2026-07-24T22:17:12.985Z"
doc_updated_by: "CODER"
description: "RF-08: standardize reproducible references into the existing context knowledge plane with digest, reason, retrieval provenance, score, requirement, freshness, and bounded excerpts."
sections:
  Summary: |-
    Define digest-addressed KnowledgeRef contracts

    RF-08: standardize reproducible references into the existing context knowledge plane with digest, reason, retrieval provenance, score, requirement, freshness, and bounded excerpts.
  Scope: |-
    - In scope: KnowledgeRef schema/types/fixtures, resolver and digest/freshness validation, retrieval provenance, optional score, reason/required semantics, prepared excerpt metadata, and preservation of context-pack.md as a distinct assimilation artifact.
    - Out of scope: FTS implementation, semantic reranking, or a second wiki/CAS.
  Plan: |-
    1. Define the canonical ref grammar and versioned KnowledgeRef schema.
    2. Resolve refs through existing context show/storage adapters and validate digests/freshness.
    3. Add bounded excerpt and omission/missing receipts without copying durable knowledge into a new plane.
    4. Thread refs through prepared runtime contracts behind compatibility views.
    5. Add exact, stale, missing, alias, graph, and source fixtures.
  Verify Steps: |-
    1. Resolve each supported knowledge kind by canonical ref. Expected: the returned object matches the stored digest and source identity.
    2. Modify or remove a referenced item. Expected: stale and missing states are explicit and cannot be presented as fresh context.
    3. Build a runtime excerpt. Expected: it records reason, source span, digest, limits, and omitted/missing receipt while context-pack.md remains unchanged.
    4. Run `bun run schemas:check`, focused context contract tests, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Define digest-addressed KnowledgeRef contracts

RF-08: standardize reproducible references into the existing context knowledge plane with digest, reason, retrieval provenance, score, requirement, freshness, and bounded excerpts.

## Scope

- In scope: KnowledgeRef schema/types/fixtures, resolver and digest/freshness validation, retrieval provenance, optional score, reason/required semantics, prepared excerpt metadata, and preservation of context-pack.md as a distinct assimilation artifact.
- Out of scope: FTS implementation, semantic reranking, or a second wiki/CAS.

## Plan

1. Define the canonical ref grammar and versioned KnowledgeRef schema.
2. Resolve refs through existing context show/storage adapters and validate digests/freshness.
3. Add bounded excerpt and omission/missing receipts without copying durable knowledge into a new plane.
4. Thread refs through prepared runtime contracts behind compatibility views.
5. Add exact, stale, missing, alias, graph, and source fixtures.

## Verify Steps

1. Resolve each supported knowledge kind by canonical ref. Expected: the returned object matches the stored digest and source identity.
2. Modify or remove a referenced item. Expected: stale and missing states are explicit and cannot be presented as fresh context.
3. Build a runtime excerpt. Expected: it records reason, source span, digest, limits, and omitted/missing receipt while context-pack.md remains unchanged.
4. Run `bun run schemas:check`, focused context contract tests, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
