---
id: "202605311543-6N3TMM"
title: "Split implementation and closure commit metadata"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "release"
  - "task-model"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:49.158Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:31.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:31.121Z"
doc_updated_by: "CODER"
description: "Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings."
sections:
  Summary: |-
    Split implementation and closure commit metadata

    Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.
  Scope: |-
    - In scope: Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.
    - Out of scope: unrelated refactors not required for "Split implementation and closure commit metadata".
  Plan: |-
    1. Audit current task metadata fields and finish/evaluator consumers for commit semantics.
    2. Introduce separate implementation and closure evidence commit fields or an equivalent backward-compatible representation.
    3. Update finish, release checks, task README rendering, and migration/readback behavior.
    4. Verify old tasks remain readable and release checks distinguish the two commit meanings.
  Verify Steps: |-
    PLANNER fallback scaffold for "Split implementation and closure commit metadata". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Split implementation and closure commit metadata". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split implementation and closure commit metadata

Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.

## Scope

- In scope: Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.
- Out of scope: unrelated refactors not required for "Split implementation and closure commit metadata".

## Plan

1. Audit current task metadata fields and finish/evaluator consumers for commit semantics.
2. Introduce separate implementation and closure evidence commit fields or an equivalent backward-compatible representation.
3. Update finish, release checks, task README rendering, and migration/readback behavior.
4. Verify old tasks remain readable and release checks distinguish the two commit meanings.

## Verify Steps

PLANNER fallback scaffold for "Split implementation and closure commit metadata". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Split implementation and closure commit metadata". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
