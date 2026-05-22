---
id: "202605221744-GF25D1"
title: "Add agent task brief command"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605221726-N6CQ5A"
tags:
  - "cli"
  - "code"
  - "context"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Confirm task brief avoids remote network lookups unless an explicit remote flag is used."
  - "Confirm task brief includes route decision, Verify Steps, blueprint evidence, blockers, and next command for branch_pr tasks."
  - "Run targeted CLI tests for task brief text and JSON output."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:44:17.206Z"
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
doc_updated_at: "2026-05-22T17:44:14.273Z"
doc_updated_by: "PLANNER"
description: "Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view."
sections:
  Summary: |-
    Add agent task brief command

    Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
  Scope: |-
    - In scope: Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
    - Out of scope: unrelated refactors not required for "Add agent task brief command".
  Plan: "Implement an agent-ready task brief command by reusing route-decision and Verify Steps/blueprint evidence surfaces. Keep default output compact and local-only; provide JSON output for agents and an explicit remote mode for hosted truth."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Run targeted CLI tests for task brief text and JSON output.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm task brief includes route decision, Verify Steps, blueprint evidence, blockers, and next command for branch_pr tasks.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm task brief avoids remote network lookups unless an explicit remote flag is used.`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add agent task brief command

Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.

## Scope

- In scope: Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
- Out of scope: unrelated refactors not required for "Add agent task brief command".

## Plan

Implement an agent-ready task brief command by reusing route-decision and Verify Steps/blueprint evidence surfaces. Keep default output compact and local-only; provide JSON output for agents and an explicit remote mode for hosted truth.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Run targeted CLI tests for task brief text and JSON output.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm task brief includes route decision, Verify Steps, blueprint evidence, blockers, and next command for branch_pr tasks.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm task brief avoids remote network lookups unless an explicit remote flag is used.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
