---
id: "202607221854-87892M"
title: "Add fingerprinted preparation caches"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221854-TE9ZJ5"
tags:
  - "cache"
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
  - "bun run ci:contract"
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
doc_updated_at: "2026-07-22T18:54:28.935Z"
doc_updated_by: "PLANNER"
description: "RF-26b: cache only measured expensive deterministic nodes by exact StateFingerprint/TTL with explicit hit, miss, and invalidation receipts; never serve stale task, Git, provider, policy, or knowledge state."
sections:
  Summary: |-
    Add fingerprinted preparation caches

    RF-26b: cache only measured expensive deterministic nodes by exact StateFingerprint/TTL with explicit hit, miss, and invalidation receipts; never serve stale task, Git, provider, policy, or knowledge state.
  Scope: |-
    - In scope: caches for selected measured nodes, exact keys/TTL, dependency invalidation, provider freshness policy, corruption fallback, receipts, bounded storage, warm/cold benchmarks, and stale-state negative tests.
    - Out of scope: caching semantic decisions without provenance/invalidation or adding a DAG whose benchmark does not justify complexity.
  Plan: |-
    1. Choose nodes whose measured cost and determinism justify caching.
    2. Define exact keys from fingerprint components plus TTL/freshness policy.
    3. Implement bounded cache storage and hit/miss/invalidation receipts.
    4. Fall back safely on corruption, missing provider truth, or version mismatch.
    5. Prove warm improvement and exhaustive stale-state rejection.
  Verify Steps: |-
    1. Repeat unchanged golden scenarios. Expected: selected nodes hit cache and warm preparation improves by the declared benchmark threshold.
    2. Change task, Git, backend, policy, blueprint, knowledge, provider, and authority inputs independently. Expected: every affected node misses/invalidates and no stale value reaches a work order.
    3. Corrupt or version-mismatch cache entries. Expected: controlled miss/rebuild with no functional failure or silent reuse.
    4. Inspect semantic result paths. Expected: no semantic decision is cached without explicit provenance and invalidation.
    5. Run cache tests, contract CI, typecheck, and cold/warm benchmarks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Disable and remove the selected cache adapters while retaining preparation instrumentation.
    - Purge only versioned cache entries through the bounded cache API.
    - Re-run cold-path correctness and compare to the pre-cache trace.
  Findings: ""
id_source: "generated"
---
## Summary

Add fingerprinted preparation caches

RF-26b: cache only measured expensive deterministic nodes by exact StateFingerprint/TTL with explicit hit, miss, and invalidation receipts; never serve stale task, Git, provider, policy, or knowledge state.

## Scope

- In scope: caches for selected measured nodes, exact keys/TTL, dependency invalidation, provider freshness policy, corruption fallback, receipts, bounded storage, warm/cold benchmarks, and stale-state negative tests.
- Out of scope: caching semantic decisions without provenance/invalidation or adding a DAG whose benchmark does not justify complexity.

## Plan

1. Choose nodes whose measured cost and determinism justify caching.
2. Define exact keys from fingerprint components plus TTL/freshness policy.
3. Implement bounded cache storage and hit/miss/invalidation receipts.
4. Fall back safely on corruption, missing provider truth, or version mismatch.
5. Prove warm improvement and exhaustive stale-state rejection.

## Verify Steps

1. Repeat unchanged golden scenarios. Expected: selected nodes hit cache and warm preparation improves by the declared benchmark threshold.
2. Change task, Git, backend, policy, blueprint, knowledge, provider, and authority inputs independently. Expected: every affected node misses/invalidates and no stale value reaches a work order.
3. Corrupt or version-mismatch cache entries. Expected: controlled miss/rebuild with no functional failure or silent reuse.
4. Inspect semantic result paths. Expected: no semantic decision is cached without explicit provenance and invalidation.
5. Run cache tests, contract CI, typecheck, and cold/warm benchmarks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Disable and remove the selected cache adapters while retaining preparation instrumentation.
- Purge only versioned cache entries through the bounded cache API.
- Re-run cold-path correctness and compare to the pre-cache trace.

## Findings
