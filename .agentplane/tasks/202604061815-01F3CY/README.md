---
id: "202604061815-01F3CY"
title: "Optimize hosted merge sync with local PR meta fast-path"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-06T18:31:27.336Z"
doc_updated_by: "CODER"
description: "Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown."
sections:
  Summary: |-
    Optimize hosted merge sync with local PR meta fast-path
    
    Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown.
  Scope: |-
    - In scope: Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown.
    - Out of scope: unrelated refactors not required for "Optimize hosted merge sync with local PR meta fast-path".
  Plan: "1. Inspect hosted-merge-sync and task normalize call sites to define a local-fast-path contract based on pr/meta.json. 2. Implement reconciliation that trusts local MERGED pr metadata first and only queries GitHub when merge state is unknown. 3. Add regression coverage for local-meta reconciliation and preserve the existing GitHub fallback path. 4. Verify with targeted tests and CLI normalization coverage, then publish/integrate through branch_pr lifecycle."
  Verify Steps: |-
    1. Run unit coverage for hosted merge sync logic. Expected: local MERGED pr/meta reconciliation passes and existing GitHub fallback behavior stays green.
    2. Run CLI normalization coverage for --sync-hosted-merges. Expected: task normalize can reconcile from local pr/meta without requiring a live gh lookup when merge metadata is already present.
    3. Run lint on touched source and test files. Expected: no new lint violations in the modified scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The local fast-path can trust pr/meta.json only for merge state, commit hash, base, and head SHA; it cannot reconstruct the hosted PR number because TaskPrMeta does not persist it.
    - Behavior choice: when a task still lacks result_summary, local MERGED metadata now reconciles it with the neutral summary "Merged and reconciled from local PR metadata." and keeps GitHub lookup only for cases where merge state is still unknown.
id_source: "generated"
---
## Summary

Optimize hosted merge sync with local PR meta fast-path

Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown.

## Scope

- In scope: Use local pr/meta.json as the primary reconciliation source for task normalize --sync-hosted-merges and fall back to GitHub only when merge state is still unknown.
- Out of scope: unrelated refactors not required for "Optimize hosted merge sync with local PR meta fast-path".

## Plan

1. Inspect hosted-merge-sync and task normalize call sites to define a local-fast-path contract based on pr/meta.json. 2. Implement reconciliation that trusts local MERGED pr metadata first and only queries GitHub when merge state is unknown. 3. Add regression coverage for local-meta reconciliation and preserve the existing GitHub fallback path. 4. Verify with targeted tests and CLI normalization coverage, then publish/integrate through branch_pr lifecycle.

## Verify Steps

1. Run unit coverage for hosted merge sync logic. Expected: local MERGED pr/meta reconciliation passes and existing GitHub fallback behavior stays green.
2. Run CLI normalization coverage for --sync-hosted-merges. Expected: task normalize can reconcile from local pr/meta without requiring a live gh lookup when merge metadata is already present.
3. Run lint on touched source and test files. Expected: no new lint violations in the modified scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The local fast-path can trust pr/meta.json only for merge state, commit hash, base, and head SHA; it cannot reconstruct the hosted PR number because TaskPrMeta does not persist it.
- Behavior choice: when a task still lacks result_summary, local MERGED metadata now reconciles it with the neutral summary "Merged and reconciled from local PR metadata." and keeps GitHub lookup only for cases where merge state is still unknown.
