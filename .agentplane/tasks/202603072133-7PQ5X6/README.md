---
id: "202603072133-7PQ5X6"
title: "Repair historical task commit metadata"
result_summary: "Historical task archive metadata repaired; doctor now reports only info-class historical summaries for legacy unknown hashes and non-actionable close references."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603072133-4XZFXD"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T21:51:15.659Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T22:16:28.646Z"
  updated_by: "CODER"
  note: "Deterministic historical hash remaps applied for 3 README records; 12 legacy DONE tasks backfilled with batch-derived implementation hashes; task export regenerated; doctor now returns OK with warnings=0 and only historical info summaries; doctor.command tests and lint passed."
commit:
  hash: "5e76031f3b122eeb93ff8e0d5f70f6cf910792de"
  message: "🩺 7PQ5X6 tasks: repair historical commit archive metadata"
comments:
  -
    author: "CODER"
    body: "Start: implement deterministic historical commit remaps where provable, refine doctor historical-archive semantics, refresh tasks export, and verify the archive checks end in the intended state."
  -
    author: "CODER"
    body: "Verified: deterministic historical hash remaps and legacy batch backfills are in place; archive checks now reduce to info-only historical summaries and doctor no longer reports warning/error findings for old task metadata."
events:
  -
    type: "status"
    at: "2026-03-07T21:51:21.755Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement deterministic historical commit remaps where provable, refine doctor historical-archive semantics, refresh tasks export, and verify the archive checks end in the intended state."
  -
    type: "verify"
    at: "2026-03-07T22:16:28.646Z"
    author: "CODER"
    state: "ok"
    note: "Deterministic historical hash remaps applied for 3 README records; 12 legacy DONE tasks backfilled with batch-derived implementation hashes; task export regenerated; doctor now returns OK with warnings=0 and only historical info summaries; doctor.command tests and lint passed."
  -
    type: "status"
    at: "2026-03-07T22:17:38.763Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: deterministic historical hash remaps and legacy batch backfills are in place; archive checks now reduce to info-only historical summaries and doctor no longer reports warning/error findings for old task metadata."
doc_version: 3
doc_updated_at: "2026-03-07T22:17:38.763Z"
doc_updated_by: "CODER"
description: "Implement a safe repair path for historical DONE-task commit metadata, apply it to the archive, and reduce doctor noise so checks reflect real current-state problems."
id_source: "generated"
---
## Summary

Repair historical task commit metadata

Implement a safe repair path for historical DONE-task commit metadata, apply it to the archive, and reduce doctor noise so checks reflect real current-state problems.

## Scope

- In scope: Implement a safe repair path for historical DONE-task commit metadata, apply it to the archive, and reduce doctor noise so checks reflect real current-state problems..
- Out of scope: unrelated refactors not required for "Repair historical task commit metadata".

## Plan

1. Implement the change for "Repair historical task commit metadata".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Verify Steps

1. Run targeted doctor tests for historical commit classification. 2. Run the repair path in dry-run/apply form and confirm only deterministic remaps are applied. 3. Run agentplane task export and agentplane task lint if applicable. 4. Run agentplane doctor and confirm historical archive noise is reduced to the intended level. 5. Run node .agentplane/policy/check-routing.mjs if policy/gateway text changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T22:16:28.646Z — VERIFY — ok

By: CODER

Note: Deterministic historical hash remaps applied for 3 README records; 12 legacy DONE tasks backfilled with batch-derived implementation hashes; task export regenerated; doctor now returns OK with warnings=0 and only historical info summaries; doctor.command tests and lint passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T21:51:21.755Z, excerpt_hash=sha256:186ab9825ae46d001992b525b88b664b3338268153222624624b2bc94e9ccaa0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the repair utility/doctor changes and restore pre-repair archive files if any deterministic remap or historical-case exemption proves incorrect.

## Findings

Known repair set before implementation: exact remaps for 202602060332-0Y7RGM, 202602060332-KYXD2V, and 202602070515-FWH57M. Doctor semantics target: legacy backfill unknown hashes become non-warning historical info; meta/no-op close references stop warning; any remaining genuinely suspicious historical cases stay visible.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
