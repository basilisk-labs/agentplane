---
id: "202603081020-7DVJ2K"
title: "Resequence README v3 rollout around compatibility boundary"
result_summary: "README v3 rollout resequenced around the compatibility boundary."
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:21:22.356Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved dependency re-sequencing to avoid a broken README v2/v3 mixed-state on main."
verification:
  state: "ok"
  updated_at: "2026-03-08T10:22:13.251Z"
  updated_by: "PLANNER"
  note: "Resequenced the README v3 rollout so dual-read compatibility is ready before template defaults; task list and doctor both passed after dependency updates."
commit:
  hash: "15304c9314eb0b2cad564c5191919f9fb8d39518"
  message: "🧭 7DVJ2K task: resequence README v3 rollout"
comments:
  -
    author: "PLANNER"
    body: "Start: resequence the README v3 rollout so compatibility lands before new-task defaults and archive migration."
  -
    author: "PLANNER"
    body: "Verified: the README v3 rollout graph now gates template-default changes behind compatibility work and leaves no unsafe mixed-state on main."
events:
  -
    type: "status"
    at: "2026-03-08T10:21:29.175Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: resequence the README v3 rollout so compatibility lands before new-task defaults and archive migration."
  -
    type: "verify"
    at: "2026-03-08T10:22:13.251Z"
    author: "PLANNER"
    state: "ok"
    note: "Resequenced the README v3 rollout so dual-read compatibility is ready before template defaults; task list and doctor both passed after dependency updates."
  -
    type: "status"
    at: "2026-03-08T10:22:37.648Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the README v3 rollout graph now gates template-default changes behind compatibility work and leaves no unsafe mixed-state on main."
doc_version: 2
doc_updated_at: "2026-03-08T10:22:37.648Z"
doc_updated_by: "PLANNER"
description: "Adjust the README v3 migration task graph so dual-read compatibility lands before new templates become the default, avoiding a broken mixed-state on main."
id_source: "generated"
---
## Summary

Resequence README v3 rollout around compatibility boundary

Adjust the README v3 migration task graph so dual-read compatibility lands before new templates become the default, avoiding a broken mixed-state on main.

## Scope

- In scope: Adjust the README v3 migration task graph so dual-read compatibility lands before new templates become the default, avoiding a broken mixed-state on main..
- Out of scope: unrelated refactors not required for "Resequence README v3 rollout around compatibility boundary".

## Plan

1. Recompute the README v3 rollout so compatibility and migration primitives land before new templates become the default.
2. Update task dependencies to reflect that safe rollout order.
3. Verify the resulting graph has no cycles and clearly gates template changes behind compatibility work.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Review the README v3 rollout graph. Expected: compatibility tasks precede template-default changes.
2. Run task list after dependency updates. Expected: the graph remains acyclic and the README v3 tasks have explicit sequencing.
3. Confirm no runtime/template task is left ahead of the compatibility boundary. Expected: new-task defaults no longer land before dual-read support.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T10:22:13.251Z — VERIFY — ok

By: PLANNER

Note: Resequenced the README v3 rollout so dual-read compatibility is ready before template defaults; task list and doctor both passed after dependency updates.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:21:29.175Z, excerpt_hash=sha256:998b150ce57c3330b4208da2b2edd2ec115a6fced493ff4c966eb56f08337ff3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
