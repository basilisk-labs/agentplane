---
id: "202603090922-WBBHY9"
title: "Plan 0.3.5 patch stabilization hotspots"
result_summary: "Created the 0.3.5 stabilization task graph covering task-doc contract, docs-shell enforcement, patch-critical tests, and external backend CI."
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T09:23:06.503Z"
  updated_by: "ORCHESTRATOR"
  note: "The 0.3.5 stabilization graph is explicit and ordered by release-risk reduction."
verification:
  state: "ok"
  updated_at: "2026-03-09T09:23:51.691Z"
  updated_by: "PLANNER"
  note: "Created four executable follow-up tasks in the intended order: 5S4YK5 for the task-doc contract, CPZQW7 for docs-shell hardening, 7VYWJH for test contour decomposition, and TQ2ASN for backend CI strengthening."
commit:
  hash: "b532ffc9a6a587e575ba53c7086715b9b1f2c8ed"
  message: "✅ NDRJZC close: Refined the docs shell so documentation pages have larger horizontal gutters, no decora... (202603090907-NDRJZC) [docs]"
comments:
  -
    author: "PLANNER"
    body: "Verified: the 0.3.5 stabilization graph now exists as four executable tasks ordered by release-risk reduction."
events:
  -
    type: "verify"
    at: "2026-03-09T09:23:51.691Z"
    author: "PLANNER"
    state: "ok"
    note: "Created four executable follow-up tasks in the intended order: 5S4YK5 for the task-doc contract, CPZQW7 for docs-shell hardening, 7VYWJH for test contour decomposition, and TQ2ASN for backend CI strengthening."
  -
    type: "status"
    at: "2026-03-09T09:25:14.880Z"
    author: "PLANNER"
    from: "TODO"
    to: "DONE"
    note: "Verified: the 0.3.5 stabilization graph now exists as four executable tasks ordered by release-risk reduction."
doc_version: 3
doc_updated_at: "2026-03-09T09:25:14.880Z"
doc_updated_by: "PLANNER"
description: "Decompose the main narrow points before the next patch release: finalize the task-doc contract, harden docs-shell enforcement, reduce patch-critical test risk, and tighten backend/CI regression surfaces."
id_source: "generated"
---
## Summary

Plan 0.3.5 patch stabilization hotspots

Decompose the main narrow points before the next patch release: finalize the task-doc contract, harden docs-shell enforcement, reduce patch-critical test risk, and tighten backend/CI regression surfaces.

## Scope

- In scope: Decompose the main narrow points before the next patch release: finalize the task-doc contract, harden docs-shell enforcement, reduce patch-critical test risk, and tighten backend/CI regression surfaces.
- Out of scope: unrelated refactors not required for "Plan 0.3.5 patch stabilization hotspots".

## Plan

1. Create atomic tasks for the four release-risk hotspots: task-doc contract, docs-shell enforcement, patch-critical tests, and external backend matrix. 2. Start with the task-doc contract and remove mixed v2/v3 runtime assumptions from config, help, and task lifecycle surfaces while preserving legacy read compatibility. 3. Continue in order through docs-shell hardening, test contour decomposition, and backend CI strengthening; each task must finish with verification, deterministic close commit, and push to main.

## Verify Steps

1. Review the created task graph. Expected: each hotspot is represented by a separate executable task with a narrow scope.
2. Complete the first task-doc contract batch. Expected: repo config, task templates, and CLI/docs surfaces agree on the active README v3 contract while legacy v2 remains read-compatible.
3. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Expected: both pass cleanly after the first batch.
4. Push main after each closed task. Expected: no local-only fixes remain stranded between batches.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T09:23:51.691Z — VERIFY — ok

By: PLANNER

Note: Created four executable follow-up tasks in the intended order: 5S4YK5 for the task-doc contract, CPZQW7 for docs-shell hardening, 7VYWJH for test contour decomposition, and TQ2ASN for backend CI strengthening.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T09:22:51.176Z, excerpt_hash=sha256:bdfdfaa2c23652614c3088e9c542b88de68230d5b8d833db8e4c7093a8a92be6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
