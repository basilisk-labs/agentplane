---
id: "202605131043-2GMHKQ"
title: "Move generated projections under .agentplane/generated"
status: "TODO"
priority: "med"
owner: "PLANNER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-05-13T10:45:19.568Z"
doc_updated_by: "PLANNER"
description: "Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior."
sections:
  Summary: |-
    Move generated projections under .agentplane/generated
    
    Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.
  Scope: |-
    - In scope: Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.
    - Out of scope: unrelated refactors not required for "Move generated projections under .agentplane/generated".
  Plan: |-
    1. Audit every current generated task navigation output and its cleanup marker/manifest behavior.
    2. Move new generated navigation under .agentplane/generated/tasks/ while keeping compatibility reads/cleanup for legacy .agentplane/index.md, .agentplane/tasks.md, and .agentplane/by-* outputs.
    3. Model the Obsidian surface as a task-wiki/navigation output adapter rather than a separate storage model.
    4. Update docs, CLI help, tests, and cleanup coverage for the new generated path.
  Verify Steps: |-
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

Move generated projections under .agentplane/generated

Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.

## Scope

- In scope: Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.
- Out of scope: unrelated refactors not required for "Move generated projections under .agentplane/generated".

## Plan

1. Audit every current generated task navigation output and its cleanup marker/manifest behavior.
2. Move new generated navigation under .agentplane/generated/tasks/ while keeping compatibility reads/cleanup for legacy .agentplane/index.md, .agentplane/tasks.md, and .agentplane/by-* outputs.
3. Model the Obsidian surface as a task-wiki/navigation output adapter rather than a separate storage model.
4. Update docs, CLI help, tests, and cleanup coverage for the new generated path.

## Verify Steps

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
