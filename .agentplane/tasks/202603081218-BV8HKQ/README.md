---
id: "202603081218-BV8HKQ"
title: "Plan broad pre-push optimization roadmap"
result_summary: "Created the broad pre-push optimization task graph with an immediate P0 focus on making the standard contour path-aware before splitting heavier buckets."
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:19:17.234Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:19:41.352Z"
  updated_by: "PLANNER"
  note: "Current scripts confirm that only fast CI is path-aware today; standard pre-push still falls through to the expensive blanket run in run-local-ci broad mode. The roadmap is now fixed as: path-aware standard contour first, then bucket broad suites by change scope, then sync developer docs."
commit:
  hash: "870ce59d76e3f88ecf4f6da5b26ae6b90fe8d837"
  message: "✅ ZWK4YX close: Added a regression scenario that validates the README v2 to v3 recovery path on a legac... (202603081006-ZWK4YX) [code]"
comments:
  -
    author: "PLANNER"
    body: "Start: lock the atomic roadmap for broad pre-push optimization so the next code task can target the highest-ROI bottleneck without widening scope."
  -
    author: "PLANNER"
    body: "Verified: documented the ordered broad pre-push optimization roadmap and fixed the first P0 implementation target."
events:
  -
    type: "status"
    at: "2026-03-08T12:19:22.679Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: lock the atomic roadmap for broad pre-push optimization so the next code task can target the highest-ROI bottleneck without widening scope."
  -
    type: "verify"
    at: "2026-03-08T12:19:41.352Z"
    author: "PLANNER"
    state: "ok"
    note: "Current scripts confirm that only fast CI is path-aware today; standard pre-push still falls through to the expensive blanket run in run-local-ci broad mode. The roadmap is now fixed as: path-aware standard contour first, then bucket broad suites by change scope, then sync developer docs."
  -
    type: "status"
    at: "2026-03-08T12:19:46.927Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: documented the ordered broad pre-push optimization roadmap and fixed the first P0 implementation target."
doc_version: 3
doc_updated_at: "2026-03-08T12:19:46.927Z"
doc_updated_by: "PLANNER"
description: "Define the next high-ROI steps for reducing standard pre-push wall-clock time without weakening required protections or release-grade coverage."
id_source: "generated"
---
## Summary

Plan broad pre-push optimization roadmap

Define the next high-ROI steps for reducing standard pre-push wall-clock time without weakening required protections or release-grade coverage.

## Scope

- In scope: Define the next high-ROI steps for reducing standard pre-push wall-clock time without weakening required protections or release-grade coverage..
- Out of scope: unrelated refactors not required for "Plan broad pre-push optimization roadmap".

## Plan

1. Inspect the current pre-push, local CI, and selection scripts to identify where the standard broad path still falls back to a blanket test sweep. 2. Convert that analysis into a short ordered roadmap with atomic tasks that preserve enforcement while reducing wall-clock time for narrow changes. 3. Record the chosen task graph and the immediate P0 starting point in the task README so implementation can proceed without reopening the design discussion.

## Verify Steps

1. Re-read the current pre-push and local CI routing scripts. Expected: identify exactly where standard pushes still fall back to the expensive blanket test sweep. 2. Compare the current changed-file selector against the remaining heavy steps. Expected: produce a task graph with clear boundaries between path-aware routing, bucket selection, and docs parity. 3. Review the final task graph against current scripts/package.json. Expected: the first implementation task can start without needing to reopen scope or add hidden dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:19:41.352Z — VERIFY — ok

By: PLANNER

Note: Current scripts confirm that only fast CI is path-aware today; standard pre-push still falls through to the expensive blanket run in run-local-ci broad mode. The roadmap is now fixed as: path-aware standard contour first, then bucket broad suites by change scope, then sync developer docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:19:22.679Z, excerpt_hash=sha256:ade996cdea9fd93201522a65959792683bbdb53d73b90a412159412f6f7dee62

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
