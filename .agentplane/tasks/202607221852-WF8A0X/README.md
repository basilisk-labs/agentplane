---
id: "202607221852-WF8A0X"
title: "Create CURATOR-gated post-task knowledge proposals"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221848-1HWR0R"
  - "202607221850-8HBF4J"
  - "202607221852-9T0RT3"
tags:
  - "context"
  - "curator"
  - "knowledge"
  - "milestone-beta2"
  - "refactor"
  - "rf-20"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run task-state:check"
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
doc_updated_at: "2026-07-22T18:52:25.915Z"
doc_updated_by: "PLANNER"
description: "RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks."
sections:
  Summary: |-
    Create CURATOR-gated post-task knowledge proposals

    RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.
  Scope: |-
    - In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
    - Out of scope: automatic wiki writes or publishing transient implementation details.
  Plan: |-
    1. Define proposal schema and source-backed deterministic candidate signals.
    2. Filter transient/noisy items and attach exact task/PR/diff/evaluator refs.
    3. Run duplicate and consolidation checks against current knowledge.
    4. Create a separate CURATOR work order/task only for selected proposals.
    5. Apply durable updates through the existing transactional context path and record provenance.
  Verify Steps: |-
    1. Complete fixtures containing durable and transient changes. Expected: only source-backed durable candidates are proposed; no wiki file changes automatically.
    2. Submit duplicate and conflicting proposals. Expected: dedupe/consolidation evidence precedes CURATOR selection.
    3. Select a proposal. Expected: a separate exact-id CURATOR task/work order owns semantic publication.
    4. Trace a published item. Expected: source refs, task/PR decision, CURATOR result, and apply receipt are complete.
    5. Run proposal/context/task-state tests.
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

Create CURATOR-gated post-task knowledge proposals

RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.

## Scope

- In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
- Out of scope: automatic wiki writes or publishing transient implementation details.

## Plan

1. Define proposal schema and source-backed deterministic candidate signals.
2. Filter transient/noisy items and attach exact task/PR/diff/evaluator refs.
3. Run duplicate and consolidation checks against current knowledge.
4. Create a separate CURATOR work order/task only for selected proposals.
5. Apply durable updates through the existing transactional context path and record provenance.

## Verify Steps

1. Complete fixtures containing durable and transient changes. Expected: only source-backed durable candidates are proposed; no wiki file changes automatically.
2. Submit duplicate and conflicting proposals. Expected: dedupe/consolidation evidence precedes CURATOR selection.
3. Select a proposal. Expected: a separate exact-id CURATOR task/work order owns semantic publication.
4. Trace a published item. Expected: source refs, task/PR decision, CURATOR result, and apply receipt are complete.
5. Run proposal/context/task-state tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
