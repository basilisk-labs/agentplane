---
id: "202607300627-SFQ30G"
title: "Repair the active beta.2 dependency path after beta.1 non-publication"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202607300553-CR9VTJ"
tags:
  - "docs"
  - "graph"
  - "milestone-beta2"
  - "v0.7"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T06:28:36.144Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved after replacing the generated fallback with concrete graph-closure checks."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: repair the remaining active beta.2 dependency edge while preserving the blocked legacy beta.1 history and successor decision."
events:
  -
    type: "status"
    at: "2026-07-30T06:28:03.609Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the remaining active beta.2 dependency edge while preserving the blocked legacy beta.1 history and successor decision."
doc_version: 3
doc_updated_at: "2026-07-30T06:28:35.862Z"
doc_updated_by: "PLANNER"
description: "Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it."
sections:
  Summary: |-
    Repair the active beta.2 dependency path after beta.1 non-publication

    Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it.
  Scope: |-
    - In scope: Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it.
    - Out of scope: unrelated refactors not required for "Repair the active beta.2 dependency path after beta.1 non-publication".
  Plan: "1. Audit active v0.7 task dependencies for references to the blocked legacy beta.1 gate. 2. Replace only the active beta.2 implementation edge in 202607221852-J910P6 from 202607221908-MR9EA9 to the merged successor 202607300553-CR9VTJ. 3. Keep 202607221908-MR9EA9 BLOCKED and do not alter historical evidence. 4. Verify that no active beta.2 task still depends on the legacy gate, then run routing and doctor checks. 5. Record task-local verification, evaluator review, PR checks, and merge through the normal branch_pr route."
  Verify Steps: |-
    1. Inspect .agentplane/tasks/202607221852-J910P6/README.md. Expected: its only beta.1 qualification dependency is 202607300553-CR9VTJ, not 202607221908-MR9EA9.
    2. Search active v0.7 task READMEs for 202607221908-MR9EA9. Expected: no active beta.2 task lists it in depends_on; the legacy task README alone records status BLOCKED.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes after the task-graph documentation change.
    4. Run agentplane doctor. Expected: workflow health passes; any documented historical warnings are outside this task.
    5. Record the dependency audit and both command results through agentplane verify. Expected: the successor decision is the only live beta.2 prerequisite and no provider action or product code change occurred.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "bc873942fc1487a828cdc2705bc1220b2bda14ce"
    version: 1
id_source: "generated"
---
## Summary

Repair the active beta.2 dependency path after beta.1 non-publication

Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it.

## Scope

- In scope: Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it.
- Out of scope: unrelated refactors not required for "Repair the active beta.2 dependency path after beta.1 non-publication".

## Plan

1. Audit active v0.7 task dependencies for references to the blocked legacy beta.1 gate. 2. Replace only the active beta.2 implementation edge in 202607221852-J910P6 from 202607221908-MR9EA9 to the merged successor 202607300553-CR9VTJ. 3. Keep 202607221908-MR9EA9 BLOCKED and do not alter historical evidence. 4. Verify that no active beta.2 task still depends on the legacy gate, then run routing and doctor checks. 5. Record task-local verification, evaluator review, PR checks, and merge through the normal branch_pr route.

## Verify Steps

1. Inspect .agentplane/tasks/202607221852-J910P6/README.md. Expected: its only beta.1 qualification dependency is 202607300553-CR9VTJ, not 202607221908-MR9EA9.
2. Search active v0.7 task READMEs for 202607221908-MR9EA9. Expected: no active beta.2 task lists it in depends_on; the legacy task README alone records status BLOCKED.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes after the task-graph documentation change.
4. Run agentplane doctor. Expected: workflow health passes; any documented historical warnings are outside this task.
5. Record the dependency audit and both command results through agentplane verify. Expected: the successor decision is the only live beta.2 prerequisite and no provider action or product code change occurred.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
