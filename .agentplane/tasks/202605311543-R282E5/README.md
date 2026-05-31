---
id: "202605311543-R282E5"
title: "Make evaluator recovery batch-friendly"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "evaluator"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- evaluator"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:47.937Z"
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
    at: "2026-05-31T15:53:30.481Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:30.481Z"
doc_updated_by: "CODER"
description: "Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written."
sections:
  Summary: |-
    Make evaluator recovery batch-friendly

    Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.
  Scope: |-
    - In scope: Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.
    - Out of scope: unrelated refactors not required for "Make evaluator recovery batch-friendly".
  Plan: |-
    1. Reproduce multi-task evaluator sequencing where the first evaluator artifact dirties the subtree.
    2. Add a batch command or clearer next-step guidance for evaluator -> finish -> commit sequencing.
    3. Ensure partial failures leave an inspectable state with no hidden task mutation.
    4. Add regression tests for related-task closure flows.
  Verify Steps: |-
    PLANNER fallback scaffold for "Make evaluator recovery batch-friendly". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make evaluator recovery batch-friendly". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Make evaluator recovery batch-friendly

Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.

## Scope

- In scope: Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.
- Out of scope: unrelated refactors not required for "Make evaluator recovery batch-friendly".

## Plan

1. Reproduce multi-task evaluator sequencing where the first evaluator artifact dirties the subtree.
2. Add a batch command or clearer next-step guidance for evaluator -> finish -> commit sequencing.
3. Ensure partial failures leave an inspectable state with no hidden task mutation.
4. Add regression tests for related-task closure flows.

## Verify Steps

PLANNER fallback scaffold for "Make evaluator recovery batch-friendly". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make evaluator recovery batch-friendly". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
