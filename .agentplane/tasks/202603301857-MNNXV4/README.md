---
id: "202603301857-MNNXV4"
title: "Move `task list` to the shared pipeline"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-32E1F0"
tags:
  - "code"
  - "refactor"
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
doc_updated_at: "2026-03-30T18:57:04.772Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 3 / R3.2 from REFACTOR.md. `task list` becomes a thin formatter over shared query results."
sections:
  Summary: |-
    Move `task list` to the shared pipeline
    
    Implement Epic 3 / R3.2 from REFACTOR.md. `task list` becomes a thin formatter over shared query results.
  Scope: |-
    - In scope: Implement Epic 3 / R3.2 from REFACTOR.md. `task list` becomes a thin formatter over shared query results.
    - Out of scope: unrelated refactors not required for "Move `task list` to the shared pipeline".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/list.ts` to isolate the exact behavior gap for R3.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `task list` becomes a thin formatter over shared query results.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/commands/task/list.ts`. Expected: the behavior described by R3.2 is observable and stable.
    2. Inspect the final diff for 202603301857-MNNXV4. Expected: scope stays limited to `packages/agentplane/src/commands/task/list.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `task list` becomes a thin formatter over shared query results.
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

Move `task list` to the shared pipeline

Implement Epic 3 / R3.2 from REFACTOR.md. `task list` becomes a thin formatter over shared query results.

## Scope

- In scope: Implement Epic 3 / R3.2 from REFACTOR.md. `task list` becomes a thin formatter over shared query results.
- Out of scope: unrelated refactors not required for "Move `task list` to the shared pipeline".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/list.ts` to isolate the exact behavior gap for R3.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: `task list` becomes a thin formatter over shared query results.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/commands/task/list.ts`. Expected: the behavior described by R3.2 is observable and stable.
2. Inspect the final diff for 202603301857-MNNXV4. Expected: scope stays limited to `packages/agentplane/src/commands/task/list.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `task list` becomes a thin formatter over shared query results.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
