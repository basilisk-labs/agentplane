---
id: "202605221745-8W56N1"
title: "Add source confidence labels to agent route output"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605221726-8SA692"
tags:
  - "cli"
  - "code"
  - "github"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Confirm default route commands remain local-only and remote checks require an explicit flag."
  - "Confirm text output stays compact while JSON output exposes source_confidence per critical field."
  - "Run route-decision tests covering local, cached metadata, stale metadata, and remote-checked source confidence labels."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:45:14.504Z"
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
doc_updated_at: "2026-05-22T17:45:11.478Z"
doc_updated_by: "PLANNER"
description: "Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state."
sections:
  Summary: |-
    Add source confidence labels to agent route output

    Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.
  Scope: |-
    - In scope: Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.
    - Out of scope: unrelated refactors not required for "Add source confidence labels to agent route output".
  Plan: "Extend route and hosted lifecycle output with explicit source confidence labels. The goal is to reduce false certainty: agents should know whether a field came from local task metadata, local git, cached PR artifacts, or an explicit remote check."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Run route-decision tests covering local, cached metadata, stale metadata, and remote-checked source confidence labels.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm text output stays compact while JSON output exposes source_confidence per critical field.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm default route commands remain local-only and remote checks require an explicit flag.`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add source confidence labels to agent route output

Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.

## Scope

- In scope: Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.
- Out of scope: unrelated refactors not required for "Add source confidence labels to agent route output".

## Plan

Extend route and hosted lifecycle output with explicit source confidence labels. The goal is to reduce false certainty: agents should know whether a field came from local task metadata, local git, cached PR artifacts, or an explicit remote check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Run route-decision tests covering local, cached metadata, stale metadata, and remote-checked source confidence labels.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm text output stays compact while JSON output exposes source_confidence per critical field.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm default route commands remain local-only and remote checks require an explicit flag.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
