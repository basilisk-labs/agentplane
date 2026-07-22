---
id: "202607221854-TE9ZJ5"
title: "Instrument preparation graph nodes and invalidation inputs"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
  - "202607221848-0ZAB1F"
  - "202607221852-9T0RT3"
  - "202607221854-PGPR3J"
  - "202607221854-RW8CJF"
tags:
  - "instrumentation"
  - "milestone-rc2"
  - "performance"
  - "preparation"
  - "refactor"
  - "rf-26"
  - "v0.7"
  - "wave-internals"
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
doc_updated_at: "2026-07-22T18:54:26.117Z"
doc_updated_by: "PLANNER"
description: "RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance."
sections:
  Summary: |-
    Instrument preparation graph nodes and invalidation inputs

    RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance.
  Scope: |-
    - In scope: preparation DAG trace model, node inputs/outputs, latency, bytes, fingerprint components, dependency edges, invalidation reasons, cacheability classification, and representative cold/warm scenario reports.
    - Out of scope: enabling caches before evidence identifies worthwhile nodes.
  Plan: |-
    1. Define a deterministic trace/result contract for preparation nodes.
    2. Instrument each expensive structured preparation boundary without timing semantic reasoning as cacheable work.
    3. Record fingerprint, dependency, bytes, latency, and invalidation inputs.
    4. Profile golden scenarios across cold/repeated/stale states.
    5. Select cache candidates only from measured cost and correctness constraints.
  Verify Steps: |-
    1. Run preparation traces for simple CLI, direct, branch_pr, and context scenarios. Expected: each node exposes latency, bytes, dependencies, fingerprint inputs, and invalidation reasons.
    2. Repeat unchanged and independently stale scenarios. Expected: trace identifies exactly which nodes could be reused or must invalidate.
    3. Inspect semantic decisions. Expected: they are marked non-cacheable unless provenance and invalidation are explicit.
    4. Compare trace overhead to baseline. Expected: bounded overhead and no changed functional outcome.
    5. Run focused trace tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert instrumentation hooks while preserving baseline artifacts and public behavior.
    - Remove only generated trace data, not task/context source data.
    - Re-run golden scenarios to confirm no functional dependency on instrumentation.
  Findings: ""
id_source: "generated"
---
## Summary

Instrument preparation graph nodes and invalidation inputs

RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance.

## Scope

- In scope: preparation DAG trace model, node inputs/outputs, latency, bytes, fingerprint components, dependency edges, invalidation reasons, cacheability classification, and representative cold/warm scenario reports.
- Out of scope: enabling caches before evidence identifies worthwhile nodes.

## Plan

1. Define a deterministic trace/result contract for preparation nodes.
2. Instrument each expensive structured preparation boundary without timing semantic reasoning as cacheable work.
3. Record fingerprint, dependency, bytes, latency, and invalidation inputs.
4. Profile golden scenarios across cold/repeated/stale states.
5. Select cache candidates only from measured cost and correctness constraints.

## Verify Steps

1. Run preparation traces for simple CLI, direct, branch_pr, and context scenarios. Expected: each node exposes latency, bytes, dependencies, fingerprint inputs, and invalidation reasons.
2. Repeat unchanged and independently stale scenarios. Expected: trace identifies exactly which nodes could be reused or must invalidate.
3. Inspect semantic decisions. Expected: they are marked non-cacheable unless provenance and invalidation are explicit.
4. Compare trace overhead to baseline. Expected: bounded overhead and no changed functional outcome.
5. Run focused trace tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert instrumentation hooks while preserving baseline artifacts and public behavior.
- Remove only generated trace data, not task/context source data.
- Re-run golden scenarios to confirm no functional dependency on instrumentation.

## Findings
