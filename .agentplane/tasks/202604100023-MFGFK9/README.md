---
id: "202604100023-MFGFK9"
title: "Expose task artifact drift in preflight when tracked status looks clean"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:24:56.704Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: surface hidden .agentplane/tasks drift in preflight so cross-task artifacts are visible even when tracked status looks clean."
events:
  -
    type: "status"
    at: "2026-04-10T00:25:07.545Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: surface hidden .agentplane/tasks drift in preflight so cross-task artifacts are visible even when tracked status looks clean."
doc_version: 3
doc_updated_at: "2026-04-10T00:25:07.551Z"
doc_updated_by: "CODER"
description: "Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides."
sections:
  Summary: |-
    Expose task artifact drift in preflight when tracked status looks clean
    
    Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
  Scope: |-
    - In scope: Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
    - Out of scope: unrelated refactors not required for "Expose task artifact drift in preflight when tracked status looks clean".
  Plan: "1. Extend preflight to inspect changed task-artifact paths under .agentplane/tasks using full porcelain status, not tracked-only status. 2. Report task-artifact drift explicitly in JSON and text output, with a next action that points to git status --short --untracked-files=all -- .agentplane/tasks when drift exists. 3. Add regression coverage for hidden untracked task artifact drift and for the clean case."
  Verify Steps: |-
    1. Create or simulate untracked task-artifact files under .agentplane/tasks for a different task id and run `agentplane preflight --json --mode quick`. Expected: the JSON report surfaces task artifact drift explicitly, including the affected task ids or paths.
    2. Run `agentplane preflight` in text mode under the same drift scenario. Expected: the human-readable output points to the task artifact drift and recommends `git status --short --untracked-files=all -- .agentplane/tasks`.
    3. Run the targeted CLI test file(s) covering preflight readiness. Expected: the new drift case and the clean case both pass without regressions.
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

Expose task artifact drift in preflight when tracked status looks clean

Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.

## Scope

- In scope: Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
- Out of scope: unrelated refactors not required for "Expose task artifact drift in preflight when tracked status looks clean".

## Plan

1. Extend preflight to inspect changed task-artifact paths under .agentplane/tasks using full porcelain status, not tracked-only status. 2. Report task-artifact drift explicitly in JSON and text output, with a next action that points to git status --short --untracked-files=all -- .agentplane/tasks when drift exists. 3. Add regression coverage for hidden untracked task artifact drift and for the clean case.

## Verify Steps

1. Create or simulate untracked task-artifact files under .agentplane/tasks for a different task id and run `agentplane preflight --json --mode quick`. Expected: the JSON report surfaces task artifact drift explicitly, including the affected task ids or paths.
2. Run `agentplane preflight` in text mode under the same drift scenario. Expected: the human-readable output points to the task artifact drift and recommends `git status --short --untracked-files=all -- .agentplane/tasks`.
3. Run the targeted CLI test file(s) covering preflight readiness. Expected: the new drift case and the clean case both pass without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
