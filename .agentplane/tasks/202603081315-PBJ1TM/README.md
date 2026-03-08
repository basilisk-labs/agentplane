---
id: "202603081315-PBJ1TM"
title: "Plan patch-prep fixes for finish, README escaping, CLI bug report, version guard, and blog chronology"
status: "DOING"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T13:17:25.123Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: create and sequence the five patch-prep tasks before starting the first fix."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: recording the deterministic task sequence for the finish-hang, newline escaping, version diagnostics, CLI bug report, and blog chronology fixes."
events:
  -
    type: "status"
    at: "2026-03-08T13:17:25.315Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: recording the deterministic task sequence for the finish-hang, newline escaping, version diagnostics, CLI bug report, and blog chronology fixes."
doc_version: 3
doc_updated_at: "2026-03-08T13:17:25.315Z"
doc_updated_by: "PLANNER"
description: "Create and sequence the next patch-prep tasks covering finish close-commit hangs, literal newline rendering in task READMEs, a CLI bug report from observed failures, repo-expected CLI version handling, and chronological release post ordering."
id_source: "generated"
---
## Summary

- Problem: the next patch-prep fixes were not yet sequenced into a deterministic task graph.
- Target outcome: create and order the five follow-up tasks so code, docs, and analysis work can proceed without scope drift.
- Constraint: keep the sequence narrow enough to finish before the next patch release.

## Scope

### In scope
- Create the five patch-prep tasks.
- Set explicit dependencies between them.
- Record the sequencing decision and close this planner task.

### Out of scope
- Implement the fixes themselves.
- Broaden the patch-prep scope beyond the five requested items.

## Plan

1. Create the patch-prep tasks for finish hang, newline escaping, CLI bug report, repo-expected CLI version diagnostics, and blog chronology.
2. Set explicit dependencies so the fixes and analysis run in a deterministic order.
3. Verify the resulting task graph, record the sequencing decision, and close the planner task.

## Verify Steps

1. Run `agentplane task list`. Expected: the five new patch-prep tasks exist.
2. Inspect the new tasks for dependencies. Expected: the sequencing matches finish-hang -> newline escaping -> version diagnostics -> CLI bug report -> blog chronology.
3. Run `git status --short --untracked-files=no`. Expected: only the planner task documentation changes remain before commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the planner-task commit(s).
2. Confirm the previous task graph is restored before creating a new plan.

## Findings
