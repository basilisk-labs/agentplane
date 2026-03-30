---
id: "202603301856-6G2YVG"
title: "Extend the task index schema to store the exact summary projection needed by read-heavy commands"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-VXFT03"
tags:
  - "code"
  - "refactor"
  - "backend"
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
doc_updated_at: "2026-03-30T18:57:00.410Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 2 / R2.1 from REFACTOR.md. the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records."
sections:
  Summary: |-
    Extend the task index schema to store the exact summary projection needed by read-heavy commands
    
    Implement Epic 2 / R2.1 from REFACTOR.md. the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.
  Scope: |-
    - In scope: Implement Epic 2 / R2.1 from REFACTOR.md. the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.
    - Out of scope: unrelated refactors not required for "Extend the task index schema to store the exact summary projection needed by read-heavy commands".
  Plan: |-
    1. Audit the current implementation and tests around task index schema and index reader/writer modules to isolate the exact behavior gap for R2.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering task index schema and index reader/writer modules. Expected: the behavior described by R2.1 is observable and stable.
    2. Inspect the final diff for 202603301856-6G2YVG. Expected: scope stays limited to task index schema and index reader/writer modules plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.
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

Extend the task index schema to store the exact summary projection needed by read-heavy commands

Implement Epic 2 / R2.1 from REFACTOR.md. the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.

## Scope

- In scope: Implement Epic 2 / R2.1 from REFACTOR.md. the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.
- Out of scope: unrelated refactors not required for "Extend the task index schema to store the exact summary projection needed by read-heavy commands".

## Plan

1. Audit the current implementation and tests around task index schema and index reader/writer modules to isolate the exact behavior gap for R2.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering task index schema and index reader/writer modules. Expected: the behavior described by R2.1 is observable and stable.
2. Inspect the final diff for 202603301856-6G2YVG. Expected: scope stays limited to task index schema and index reader/writer modules plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
