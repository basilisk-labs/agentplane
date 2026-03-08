---
id: "202603081421-EJW1BT"
title: "Plan patch-prep fixes for task doc set, legacy migration timeout, init approvals, and blog release surface"
status: "DOING"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:21:56.473Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T14:23:06.541Z"
  updated_by: "PLANNER"
  note: "Verified: agentplane task list shows the new patch-prep task graph with the intended linear dependency order, the new tasks have narrow non-overlapping scopes, and 202603081422-5XXATM is the first ready implementation task."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: creating a narrow patch-prep task graph for the four approved fixes, with reliability tasks first and UX/blog cleanup after them so implementation stays deterministic and low-risk."
events:
  -
    type: "status"
    at: "2026-03-08T14:21:58.250Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: creating a narrow patch-prep task graph for the four approved fixes, with reliability tasks first and UX/blog cleanup after them so implementation stays deterministic and low-risk."
  -
    type: "verify"
    at: "2026-03-08T14:23:06.541Z"
    author: "PLANNER"
    state: "ok"
    note: "Verified: agentplane task list shows the new patch-prep task graph with the intended linear dependency order, the new tasks have narrow non-overlapping scopes, and 202603081422-5XXATM is the first ready implementation task."
doc_version: 3
doc_updated_at: "2026-03-08T14:23:06.543Z"
doc_updated_by: "PLANNER"
description: "Sequence a narrow pre-release package: harden task doc set success semantics, fix the legacy README migration test timeout mismatch, simplify init plan/verify approval prompts into profile-driven defaults, and adjust the custom blog release surface so the primary line starts at 0.3.0 and advances chronologically through 0.3.2."
id_source: "generated"
---
## Summary

- Problem: the next patch release still has four narrow but user-visible gaps across task docs, CI reliability, init UX, and the public release blog surface.
- Target outcome: define a deterministic execution graph that closes those gaps without reopening broader release scope.
- Constraint: keep the package narrow and sequenced so reliability fixes land before docs/UI polish.

## Scope

### In scope
- create executable tasks for the four approved fixes
- define dependency order and release boundary
- hand off implementation in ready sequence

### Out of scope
- new release versioning work
- global CLI auto-update behavior
- broader blog redesign

## Plan

1. Create four implementation tasks with concrete descriptions and tags.
2. Wire dependencies so reliability fixes precede UX/docs changes.
3. Start the first ready task and keep the remaining tasks queued in sequence.

## Verify Steps

1. Run `agentplane task list`. Expected: the new tasks exist and the dependency order is explicit.
2. Review the task descriptions. Expected: each task has a narrow, non-overlapping scope tied to the approved patch package.
3. Confirm one task is moved to `DOING` and the others remain `TODO/ready`. Expected: execution can proceed sequentially without ambiguity.

## Rollback Plan

1. Close or delete only the newly created planning tasks if the package is rejected before implementation starts.
2. Re-run `agentplane task list` to confirm the task graph returns to the previous clean state.

## Findings


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:23:06.541Z — VERIFY — ok

By: PLANNER

Note: Verified: agentplane task list shows the new patch-prep task graph with the intended linear dependency order, the new tasks have narrow non-overlapping scopes, and 202603081422-5XXATM is the first ready implementation task.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:21:58.250Z, excerpt_hash=sha256:148a67239e161c9a6083e750262d73c7ab53ca9b531cb6ae1d49b8b2a053321d

<!-- END VERIFICATION RESULTS -->
