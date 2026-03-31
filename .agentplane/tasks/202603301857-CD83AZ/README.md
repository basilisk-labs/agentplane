---
id: "202603301857-CD83AZ"
title: "Implement a real local-backend `listProjectionTasks()` fast path"
result_summary: "integrate: squash task/202603301857-CD83AZ/local-backend-projection-fast-path"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "approved"
  updated_at: "2026-03-31T09:32:22.254Z"
  updated_by: "ORCHESTRATOR"
  note: "Approve R2.2 local-backend projection fast path using task index cache with safe README fallback on misses or invalidation."
verification:
  state: "ok"
  updated_at: "2026-03-31T09:37:17.897Z"
  updated_by: "CODER"
  note: "Focused vitest slice passed for local projection fast path and full-read separation; agentplane build and eslint passed on touched backend files."
commit:
  hash: "86e20b17a4ed7d8ef564164d8c80d715ee25ac1b"
  message: "🧩 CD83AZ integrate: squash task/202603301857-CD83AZ/local-backend-projection-fast-path"
comments:
  -
    author: "CODER"
    body: "Start: split projection and full-read paths in LocalBackend so summary reads use the task index and full reads stay canonical."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-CD83AZ/pr."
events:
  -
    type: "status"
    at: "2026-03-31T09:34:32.035Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split projection and full-read paths in LocalBackend so summary reads use the task index and full reads stay canonical."
  -
    type: "verify"
    at: "2026-03-31T09:37:17.897Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest slice passed for local projection fast path and full-read separation; agentplane build and eslint passed on touched backend files."
  -
    type: "status"
    at: "2026-03-31T09:41:49.936Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-CD83AZ/pr."
doc_version: 3
doc_updated_at: "2026-03-31T09:41:49.941Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-03-31T09:37:17.897Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest slice passed for local projection fast path and full-read separation; agentplane build and eslint passed on touched backend files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:34:32.037Z, excerpt_hash=sha256:8ceee98a60cd20893014f757f2bb0c0e4f9c0e9b9f67d7b5dd5b31d998091dd3
    
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
### 2026-03-31T09:37:17.897Z — VERIFY — ok

By: CODER

Note: Focused vitest slice passed for local projection fast path and full-read separation; agentplane build and eslint passed on touched backend files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:34:32.037Z, excerpt_hash=sha256:8ceee98a60cd20893014f757f2bb0c0e4f9c0e9b9f67d7b5dd5b31d998091dd3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
