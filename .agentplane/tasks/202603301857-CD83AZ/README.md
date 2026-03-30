---
id: "202603301857-CD83AZ"
title: "Implement a real local-backend `listProjectionTasks()` fast path"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-6G2YVG"
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
doc_updated_at: "2026-03-30T18:57:01.147Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 2 / R2.2 from REFACTOR.md. summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation."
sections:
  Summary: |-
    Implement a real local-backend `listProjectionTasks()` fast path
    
    Implement Epic 2 / R2.2 from REFACTOR.md. summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.
  Scope: |-
    - In scope: Implement Epic 2 / R2.2 from REFACTOR.md. summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.
    - Out of scope: unrelated refactors not required for "Implement a real local-backend `listProjectionTasks()` fast path".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/backends/task-backend/local-backend.ts` to isolate the exact behavior gap for R2.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/backends/task-backend/local-backend.ts`. Expected: the behavior described by R2.2 is observable and stable.
    2. Inspect the final diff for 202603301857-CD83AZ. Expected: scope stays limited to `packages/agentplane/src/backends/task-backend/local-backend.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.
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

Implement a real local-backend `listProjectionTasks()` fast path

Implement Epic 2 / R2.2 from REFACTOR.md. summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.

## Scope

- In scope: Implement Epic 2 / R2.2 from REFACTOR.md. summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.
- Out of scope: unrelated refactors not required for "Implement a real local-backend `listProjectionTasks()` fast path".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/backends/task-backend/local-backend.ts` to isolate the exact behavior gap for R2.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/backends/task-backend/local-backend.ts`. Expected: the behavior described by R2.2 is observable and stable.
2. Inspect the final diff for 202603301857-CD83AZ. Expected: scope stays limited to `packages/agentplane/src/backends/task-backend/local-backend.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
