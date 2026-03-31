---
id: "202603301856-6G2YVG"
title: "Extend the task index schema to store the exact summary projection needed by read-heavy commands"
result_summary: "integrate: squash task/202603301856-6G2YVG/extend-task-index-summary-projection"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "approved"
  updated_at: "2026-03-31T09:18:17.779Z"
  updated_by: "ORCHESTRATOR"
  note: "Approve R2.1 minimal task-index schema change so cache stores the exact TaskSummary projection required by read-heavy task queries."
verification:
  state: "ok"
  updated_at: "2026-03-31T09:21:51.148Z"
  updated_by: "CODER"
  note: "Focused vitest slice passed for task-index projection coverage and local-backend cache behavior; agentplane build and eslint passed on touched backend files."
commit:
  hash: "9e398d54a090da6ca3977a720cddf81ffac8d483"
  message: "🧩 6G2YVG integrate: squash task/202603301856-6G2YVG/extend-task-index-summary-projection"
comments:
  -
    author: "CODER"
    body: "Start: extend the task index cache to persist the exact TaskSummary projection needed by read-heavy task queries."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-6G2YVG/pr."
events:
  -
    type: "status"
    at: "2026-03-31T09:19:13.559Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend the task index cache to persist the exact TaskSummary projection needed by read-heavy task queries."
  -
    type: "verify"
    at: "2026-03-31T09:21:51.148Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest slice passed for task-index projection coverage and local-backend cache behavior; agentplane build and eslint passed on touched backend files."
  -
    type: "status"
    at: "2026-03-31T09:26:22.976Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-6G2YVG/pr."
doc_version: 3
doc_updated_at: "2026-03-31T09:26:22.980Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-03-31T09:21:51.148Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest slice passed for task-index projection coverage and local-backend cache behavior; agentplane build and eslint passed on touched backend files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:19:13.561Z, excerpt_hash=sha256:ab121a69f0775c483ae369e4f239606bc6b65e31feb7a0aa8aa54b4438a37e33
    
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
### 2026-03-31T09:21:51.148Z — VERIFY — ok

By: CODER

Note: Focused vitest slice passed for task-index projection coverage and local-backend cache behavior; agentplane build and eslint passed on touched backend files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:19:13.561Z, excerpt_hash=sha256:ab121a69f0775c483ae369e4f239606bc6b65e31feb7a0aa8aa54b4438a37e33

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
