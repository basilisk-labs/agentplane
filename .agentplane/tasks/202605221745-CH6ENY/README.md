---
id: "202605221745-CH6ENY"
title: "Expose batch ownership in agent context"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605221726-R90HC5"
  - "202605221726-WY8F98"
tags:
  - "cli"
  - "code"
  - "tasks"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Add tests for route or brief output when a task is part of a related batch worktree."
  - "Confirm primary task, included task ids, branch owner, and per-task verification states are visible in JSON output."
  - "Confirm text output gives one safe next action and does not instruct satellite tasks to open conflicting PRs."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:45:32.206Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-22T17:45:27.556Z"
doc_updated_by: "PLANNER"
description: "Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners."
sections:
  Summary: |-
    Expose batch ownership in agent context

    Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
  Scope: |-
    - In scope: Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
    - Out of scope: unrelated refactors not required for "Expose batch ownership in agent context".
  Plan: "Teach route/brief output about related task batch ownership. A satellite task should point agents to the primary task/worktree and its own verification duty, instead of encouraging duplicate branches, PRs, or close-tail actions."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Add tests for route or brief output when a task is part of a related batch worktree.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm primary task, included task ids, branch owner, and per-task verification states are visible in JSON output.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm text output gives one safe next action and does not instruct satellite tasks to open conflicting PRs.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Expose batch ownership in agent context

Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.

## Scope

- In scope: Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
- Out of scope: unrelated refactors not required for "Expose batch ownership in agent context".

## Plan

Teach route/brief output about related task batch ownership. A satellite task should point agents to the primary task/worktree and its own verification duty, instead of encouraging duplicate branches, PRs, or close-tail actions.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Add tests for route or brief output when a task is part of a related batch worktree.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm primary task, included task ids, branch owner, and per-task verification states are visible in JSON output.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm text output gives one safe next action and does not instruct satellite tasks to open conflicting PRs.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
