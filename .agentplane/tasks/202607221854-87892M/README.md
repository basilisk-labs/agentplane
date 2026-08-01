---
id: "202607221854-87892M"
title: "Add fingerprinted preparation caches"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
  state: "approved"
  updated_at: "2026-08-01T15:51:47.980Z"
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
  -
    author: "CODER"
    body: "Benchmark verdict: no-go. Exact stdout remained unchanged, semantic/authority/provider results were never cached, and the complete prototype was removed because it failed the complexity threshold."
events:
  -
    type: "status"
    at: "2026-08-01T15:52:24.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "comment"
    at: "2026-08-01T16:38:49.110Z"
    author: "CODER"
    body: "Benchmark verdict: no-go. Exact stdout remained unchanged, semantic/authority/provider results were never cached, and the complete prototype was removed because it failed the complexity threshold."
doc_version: 3
doc_updated_at: "2026-08-01T16:38:49.110Z"
doc_updated_by: "CODER"
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
  Findings: |-
    - Observation: The exact persistent Git snapshot cache improved warm task next-action latency by 3.94% across 25 external-process pairs, while a cold miss added 4.67%; command-local task snapshot coalescing improved 1.18%.
      Impact: Neither candidate meets the declared 5% end-to-end threshold, so retaining the persistent cache would add invalidation, corruption, retention, and cross-process locking state without enough user-visible benefit.
      Resolution: Reject and remove both prototypes; retain the benchmark artifact and route the next optimization toward parallel observation of independent Git inputs without persistent state.
extensions:
  workflow_route_baseline:
    start_head_sha: "451a8a6e980f9f2724bce718e807a8675fd89eeb"
    version: 1
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

- Observation: The exact persistent Git snapshot cache improved warm task next-action latency by 3.94% across 25 external-process pairs, while a cold miss added 4.67%; command-local task snapshot coalescing improved 1.18%.
  Impact: Neither candidate meets the declared 5% end-to-end threshold, so retaining the persistent cache would add invalidation, corruption, retention, and cross-process locking state without enough user-visible benefit.
  Resolution: Reject and remove both prototypes; retain the benchmark artifact and route the next optimization toward parallel observation of independent Git inputs without persistent state.
