---
id: "202603071440-X5MFK1"
title: "Align role help with bootstrap model"
result_summary: "Aligned role guidance to the canonical bootstrap model."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071440-WCAH98"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:55:25.984Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: role guidance should become bootstrap-delta output only."
verification:
  state: "ok"
  updated_at: "2026-03-07T14:55:36.239Z"
  updated_by: "REVIEWER"
  note: "Verified: role output now references the shared bootstrap path and limits itself to role-specific deltas rather than restating a parallel lifecycle narrative."
commit:
  hash: "aed6d519fbe50ff428d5fc81e8d6d2566dfa2e98"
  message: "✨ ZFZKKS docs: unify agent bootstrap surfaces"
comments:
  -
    author: "CODER"
    body: "Start: reduce role guidance to role-specific deltas so it stops competing with quickstart as a second startup narrative."
  -
    author: "CODER"
    body: "Verified: role guidance now extends the shared bootstrap contract with role-specific deltas instead of reintroducing a competing startup narrative."
events:
  -
    type: "status"
    at: "2026-03-07T14:55:26.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reduce role guidance to role-specific deltas so it stops competing with quickstart as a second startup narrative."
  -
    type: "verify"
    at: "2026-03-07T14:55:36.239Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: role output now references the shared bootstrap path and limits itself to role-specific deltas rather than restating a parallel lifecycle narrative."
  -
    type: "status"
    at: "2026-03-07T14:55:36.723Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: role guidance now extends the shared bootstrap contract with role-specific deltas instead of reintroducing a competing startup narrative."
doc_version: 2
doc_updated_at: "2026-03-07T14:55:36.723Z"
doc_updated_by: "CODER"
description: "Reduce role guidance drift by making role output reference the canonical bootstrap model instead of restating conflicting lifecycle instructions."
id_source: "generated"
---
## Summary

Align role help with the canonical bootstrap model instead of maintaining a parallel lifecycle narrative.

## Scope

Reduce duplicated lifecycle prose in role guidance and make role output point back to shared bootstrap guidance.

## Plan

1. Tighten role output to role-specific deltas. 2. Remove duplicate lifecycle narrative. 3. Keep direct and branch_pr specifics accurate.

## Risks

Over-trimming can make role help too sparse; under-trimming leaves drift intact.

## Verify Steps

1. Run role/command guide tests. 2. Inspect CODER and INTEGRATOR role output for drift against quickstart.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T14:55:36.239Z — VERIFY — ok

By: REVIEWER

Note: Verified: role output now references the shared bootstrap path and limits itself to role-specific deltas rather than restating a parallel lifecycle narrative.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:55:26.261Z, excerpt_hash=sha256:30d40a0851c3c0704a10dadc74c666a3ddfe4ec279cd5ae664c9117a506e9f1f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the prior role text if the new output stops being actionable or breaks CLI help expectations.
