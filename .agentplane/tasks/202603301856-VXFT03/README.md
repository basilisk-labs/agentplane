---
id: "202603301856-VXFT03"
title: "Lock task listing/query behavior with golden tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301721-9ZMFDY"
tags:
  - "code"
  - "refactor"
  - "tests"
  - "cli"
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
doc_updated_at: "2026-03-30T18:56:54.672Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output."
sections:
  Summary: |-
    Lock task listing/query behavior with golden tests
    
    Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
  Scope: |-
    - In scope: Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
    - Out of scope: unrelated refactors not required for "Lock task listing/query behavior with golden tests".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/*.test.ts` to isolate the exact behavior gap for R0.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/commands/task/*.test.ts`. Expected: the behavior described by R0.2 is observable and stable.
    2. Inspect the final diff for 202603301856-VXFT03. Expected: scope stays limited to `packages/agentplane/src/commands/task/*.test.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
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

Lock task listing/query behavior with golden tests

Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.

## Scope

- In scope: Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
- Out of scope: unrelated refactors not required for "Lock task listing/query behavior with golden tests".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/*.test.ts` to isolate the exact behavior gap for R0.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/commands/task/*.test.ts`. Expected: the behavior described by R0.2 is observable and stable.
2. Inspect the final diff for 202603301856-VXFT03. Expected: scope stays limited to `packages/agentplane/src/commands/task/*.test.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
