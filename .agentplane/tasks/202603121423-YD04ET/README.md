---
id: "202603121423-YD04ET"
title: "Narrow stale-dist guard for test-only churn"
result_summary: "narrow stale-dist for test-only churn"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T14:44:58.024Z"
  updated_by: "ORCHESTRATOR"
  note: "Proceed with a narrow stale-dist contract change only."
verification:
  state: "ok"
  updated_at: "2026-03-12T14:49:58.030Z"
  updated_by: "CODER"
  note: "Stale-dist now ignores test-only source churn in both snapshot and legacy paths; targeted regressions, lint, and both package builds passed."
commit:
  hash: "d8eee276d7a1e9c68779abbfed51535b840cf083"
  message: "🚧 YD04ET task: narrow stale-dist for test-only churn"
comments:
  -
    author: "CODER"
    body: "Start: narrow stale-dist detection so test-only churn no longer blocks mutating commands."
  -
    author: "CODER"
    body: "Verified: stale-dist now ignores test-only churn in both snapshot-backed and legacy manifest paths while real runtime drift still blocks."
events:
  -
    type: "status"
    at: "2026-03-12T14:45:05.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrow stale-dist detection so test-only churn no longer blocks mutating commands."
  -
    type: "verify"
    at: "2026-03-12T14:49:58.030Z"
    author: "CODER"
    state: "ok"
    note: "Stale-dist now ignores test-only source churn in both snapshot and legacy paths; targeted regressions, lint, and both package builds passed."
  -
    type: "status"
    at: "2026-03-12T14:50:34.358Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale-dist now ignores test-only churn in both snapshot-backed and legacy manifest paths while real runtime drift still blocks."
doc_version: 3
doc_updated_at: "2026-03-12T14:50:34.358Z"
doc_updated_by: "CODER"
description: "Treat test-only watched source changes as non-runtime so task-local mutators are not blocked by stale-dist when dist output itself is unaffected."
id_source: "generated"
---
## Summary

Narrow stale-dist guard for test-only churn

Treat test-only watched source changes as non-runtime so task-local mutators are not blocked by stale-dist when dist output itself is unaffected.

## Scope

- In scope: Treat test-only watched source changes as non-runtime so task-local mutators are not blocked by stale-dist when dist output itself is unaffected.
- Out of scope: unrelated refactors not required for "Narrow stale-dist guard for test-only churn".

## Plan

1. Separate runtime-affecting watched paths from test-only churn in stale-dist detection instead of widening mutating command bypasses.
2. Update stale-dist policy/tests so read-only commands still warn, mutating commands still block on true runtime drift, and test-only changes stop forcing needless rebuilds.
3. Verify with focused stale-dist/runtime tests plus both package builds, then record the narrowed contract in task findings.

## Verify Steps

1. Run stale-dist/runtime-focused regressions for policy classification and changed-path handling. Expected: test-only churn no longer triggers strict stale-dist blocking, while runtime-affecting changes still do.
2. Run lint on touched stale-dist/runtime files and tests. Expected: no new lint violations.
3. Build @agentplaneorg/core and agentplane after the policy/runtime change. Expected: both builds succeed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T14:49:58.030Z — VERIFY — ok

By: CODER

Note: Stale-dist now ignores test-only source churn in both snapshot and legacy paths; targeted regressions, lint, and both package builds passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T14:49:49.461Z, excerpt_hash=sha256:866870f66076ddaa975fd246a45d633b746f521ae7d18a8457489baf08c12550

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Root cause: stale-dist watched the whole `src` tree, but both git diff/status fallback and snapshot comparison treated `src/*.test.*` the same as runtime source.
2. Runtime snapshots now filter test-only files and `src/**/__snapshots__/**`, and the legacy git-based fallback applies the same filter to repo-root-relative changed paths.
3. Added regressions for both snapshot-backed and legacy manifests so test-only churn stays green while real runtime/bin drift still blocks.
