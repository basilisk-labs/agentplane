---
id: "202607221848-0ZAB1F"
title: "Introduce StateFingerprint and stale-state rejection"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221907-DK2CJF"
tags:
  - "fingerprint"
  - "milestone-alpha2"
  - "refactor"
  - "rf-06"
  - "v0.7"
  - "wave-contracts"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
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
doc_updated_at: "2026-07-22T18:48:45.533Z"
doc_updated_by: "PLANNER"
description: "RF-06a: define a reproducible fingerprint for task, Git, backend, policy, blueprint, knowledge, provider, and authority state; reject stale operations before side effects."
sections:
  Summary: |-
    Introduce StateFingerprint and stale-state rejection

    RF-06a: define a reproducible fingerprint for task, Git, backend, policy, blueprint, knowledge, provider, and authority state; reject stale operations before side effects.
  Scope: |-
    - In scope: StateFingerprint schema/types, digest inputs and canonicalization, freshness adapters, persisted provenance, stale-state errors, and fixture coverage for local/remote changes.
    - Out of scope: caching or executing workflow steps; those consume this contract in later tasks.
  Plan: |-
    1. Define canonical fingerprint components and optional/provider freshness semantics.
    2. Implement deterministic digest construction with explicit missing/unavailable states.
    3. Attach fingerprints to prepared operations and results.
    4. Recompute immediately before effects and reject mismatches with typed diagnostics.
    5. Cover task revision, Git HEAD/worktree, backend projection, policy, blueprint, knowledge, provider, and authority changes.
  Verify Steps: |-
    1. Build the same state twice. Expected: identical canonical fingerprint and component digests.
    2. Mutate each component independently in fixtures. Expected: only the corresponding digest changes and a prepared operation is rejected as stale.
    3. Simulate unavailable remote provider truth. Expected: the fingerprint records bounded uncertainty and policy decides whether execution may proceed.
    4. Run focused lifecycle tests, `bun run lifecycle:invariants`, and `bun run typecheck`.
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

Introduce StateFingerprint and stale-state rejection

RF-06a: define a reproducible fingerprint for task, Git, backend, policy, blueprint, knowledge, provider, and authority state; reject stale operations before side effects.

## Scope

- In scope: StateFingerprint schema/types, digest inputs and canonicalization, freshness adapters, persisted provenance, stale-state errors, and fixture coverage for local/remote changes.
- Out of scope: caching or executing workflow steps; those consume this contract in later tasks.

## Plan

1. Define canonical fingerprint components and optional/provider freshness semantics.
2. Implement deterministic digest construction with explicit missing/unavailable states.
3. Attach fingerprints to prepared operations and results.
4. Recompute immediately before effects and reject mismatches with typed diagnostics.
5. Cover task revision, Git HEAD/worktree, backend projection, policy, blueprint, knowledge, provider, and authority changes.

## Verify Steps

1. Build the same state twice. Expected: identical canonical fingerprint and component digests.
2. Mutate each component independently in fixtures. Expected: only the corresponding digest changes and a prepared operation is rejected as stale.
3. Simulate unavailable remote provider truth. Expected: the fingerprint records bounded uncertainty and policy decides whether execution may proceed.
4. Run focused lifecycle tests, `bun run lifecycle:invariants`, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
