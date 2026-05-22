---
id: "202605221744-XBKXEW"
title: "Add active work selector for agents"
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
  - "performance"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "Confirm selector output includes next action, owner, dependency readiness, blocker count, and source freshness without printing historical DONE tasks."
  - "Run a focused cold-path or projection-cache performance check for the selector."
  - "Run targeted tests for active work selector ordering and filters."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:44:58.141Z"
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
doc_updated_at: "2026-05-22T17:44:55.129Z"
doc_updated_by: "PLANNER"
description: "Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog."
sections:
  Summary: |-
    Add active work selector for agents

    Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
  Scope: |-
    - In scope: Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
    - Out of scope: unrelated refactors not required for "Add active work selector for agents".
  Plan: "Build a compact active work selector for agents on top of the active task route summary. It should make the safest next task/action obvious, preserve explicit filters, and keep full historical listing behind the existing explicit path."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Run targeted tests for active work selector ordering and filters.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm selector output includes next action, owner, dependency readiness, blocker count, and source freshness without printing historical DONE tasks.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Run a focused cold-path or projection-cache performance check for the selector.`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add active work selector for agents

Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.

## Scope

- In scope: Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
- Out of scope: unrelated refactors not required for "Add active work selector for agents".

## Plan

Build a compact active work selector for agents on top of the active task route summary. It should make the safest next task/action obvious, preserve explicit filters, and keep full historical listing behind the existing explicit path.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Run targeted tests for active work selector ordering and filters.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm selector output includes next action, owner, dependency readiness, blocker count, and source freshness without printing historical DONE tasks.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Run a focused cold-path or projection-cache performance check for the selector.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
