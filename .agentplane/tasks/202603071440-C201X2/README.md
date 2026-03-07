---
id: "202603071440-C201X2"
title: "Add recovery doc for upgraded legacy projects"
result_summary: "Added a recovery runbook for upgraded legacy projects."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-WCAH98"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:57:55.337Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add a shortest-path recovery doc for mixed upgrade state."
verification:
  state: "ok"
  updated_at: "2026-03-07T15:00:37.142Z"
  updated_by: "REVIEWER"
  note: "Verified: the new legacy-upgrade recovery doc explains mixed gateway/policy state, the shortest recovery commands, and the managed ownership contract."
commit:
  hash: "d336a63eccb2cb36737cc79dbaa62ae7622b84cf"
  message: "📝 C201X2 docs: add recovery and direct-finish guidance"
comments:
  -
    author: "DOCS"
    body: "Start: document the shortest recovery path for legacy projects that ended up with a new gateway and an incomplete managed policy tree after upgrade."
  -
    author: "DOCS"
    body: "Verified: legacy upgrade recovery is now documented as a shortest-path runbook for mixed gateway and managed policy states."
events:
  -
    type: "status"
    at: "2026-03-07T14:57:55.700Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the shortest recovery path for legacy projects that ended up with a new gateway and an incomplete managed policy tree after upgrade."
  -
    type: "verify"
    at: "2026-03-07T15:00:37.142Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: the new legacy-upgrade recovery doc explains mixed gateway/policy state, the shortest recovery commands, and the managed ownership contract."
  -
    type: "status"
    at: "2026-03-07T15:00:37.737Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: legacy upgrade recovery is now documented as a shortest-path runbook for mixed gateway and managed policy states."
doc_version: 2
doc_updated_at: "2026-03-07T15:00:37.737Z"
doc_updated_by: "DOCS"
description: "Document the shortest recovery path for old projects that have mixed gateway and managed policy state after upgrade."
id_source: "generated"
---
## Summary

Add recovery doc for upgraded legacy projects

Document the shortest recovery path for old projects that have mixed gateway and managed policy state after upgrade.

## Scope

- In scope: Document the shortest recovery path for old projects that have mixed gateway and managed policy state after upgrade..
- Out of scope: unrelated refactors not required for "Add recovery doc for upgraded legacy projects".

## Plan

1. Implement the change for "Add recovery doc for upgraded legacy projects".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T15:00:37.142Z — VERIFY — ok

By: REVIEWER

Note: Verified: the new legacy-upgrade recovery doc explains mixed gateway/policy state, the shortest recovery commands, and the managed ownership contract.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:57:55.700Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
