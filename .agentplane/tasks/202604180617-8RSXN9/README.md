---
id: "202604180617-8RSXN9"
title: "Migrate task command paths onto backend capability facade"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-18T06:18:07.927Z"
doc_updated_by: "PLANNER"
description: "Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly."
sections:
  Summary: |-
    Migrate task command paths onto backend capability facade
    
    Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.
  Scope: |-
    - In scope: Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.
    - Out of scope: unrelated refactors not required for "Migrate task command paths onto backend capability facade".
  Plan: "1. Replace task show and related command helpers with capability-aware service calls. 2. Remove remaining direct backendId/local-backend checks in migrated task command paths. 3. Verify with focused task command tests plus lint:core."
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

Migrate task command paths onto backend capability facade

Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.

## Scope

- In scope: Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.
- Out of scope: unrelated refactors not required for "Migrate task command paths onto backend capability facade".

## Plan

1. Replace task show and related command helpers with capability-aware service calls. 2. Remove remaining direct backendId/local-backend checks in migrated task command paths. 3. Verify with focused task command tests plus lint:core.

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
