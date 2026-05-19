---
id: "202605190724-B8T0EP"
title: "Release AgentPlane v0.6.3"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T07:24:13.403Z"
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
    author: "INTEGRATOR"
    body: "Start: prepare and publish AgentPlane v0.6.3 after registry cleanup."
events:
  -
    type: "status"
    at: "2026-05-19T07:24:16.996Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare and publish AgentPlane v0.6.3 after registry cleanup."
doc_version: 3
doc_updated_at: "2026-05-19T07:24:16.996Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare and publish the next patch release after task registry cleanup."
sections:
  Summary: |-
    Release AgentPlane v0.6.3

    Prepare and publish the next patch release after task registry cleanup.
  Scope: |-
    - In scope: Prepare and publish the next patch release after task registry cleanup.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.3".
  Plan: |-
    1. Confirm v0.6.3 version/tag availability and release preconditions on main.
    2. Prepare the v0.6.3 release candidate in branch_pr workflow, including version/notes/artifacts.
    3. Run release prepublish checks and GitHub PR checks.
    4. Merge the candidate to main, dispatch/publish the release, then verify GitHub release and npm packages.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Release AgentPlane v0.6.3

Prepare and publish the next patch release after task registry cleanup.

## Scope

- In scope: Prepare and publish the next patch release after task registry cleanup.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.3".

## Plan

1. Confirm v0.6.3 version/tag availability and release preconditions on main.
2. Prepare the v0.6.3 release candidate in branch_pr workflow, including version/notes/artifacts.
3. Run release prepublish checks and GitHub PR checks.
4. Merge the candidate to main, dispatch/publish the release, then verify GitHub release and npm packages.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
