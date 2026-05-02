---
id: "202605021926-0H15MJ"
title: "Support related task batches in one branch_pr worktree"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605021909-4V65QP"
tags:
  - "code"
  - "tasks"
  - "workflow"
verify:
  - "agentplane doctor"
  - "bun test packages/agentplane/src/commands/work*.test.ts packages/agentplane/src/commands/pr*.test.ts packages/agentplane/src/commands/task*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:26:59.922Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-05-02T19:26:51.621Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add first-class CLI/runtime support for executing an approved related task chain in one primary branch_pr worktree while preserving per-task plans, start-ready records, verification evidence, PR traceability, and final closure into main."
sections:
  Summary: |-
    Support related task batches in one branch_pr worktree
    
    Add first-class CLI/runtime support for executing an approved related task chain in one primary branch_pr worktree while preserving per-task plans, start-ready records, verification evidence, PR traceability, and final closure into main.
  Scope: |-
    - In scope: Add first-class CLI/runtime support for executing an approved related task chain in one primary branch_pr worktree while preserving per-task plans, start-ready records, verification evidence, PR traceability, and final closure into main.
    - Out of scope: unrelated refactors not required for "Support related task batches in one branch_pr worktree".
  Plan: |-
    Goal: make related task batches a first-class branch_pr workflow capability instead of a policy-only exception.
    
    Steps:
    1. Define a primary-task batch model: one branch/worktree/PR owns a related approved task set.
    2. Add command/runtime support to record included task ids on the primary task PR or task artifact.
    3. Ensure start-ready, verify, and finish evidence remain per included task.
    4. Ensure integration/PR checks expose the included task set and keep final merge traceability.
    5. Add focused workflow/task tests and update docs/help surfaces.
    
    Acceptance:
    - A related task chain can be implemented in one branch_pr worktree without losing per-task traceability.
    - Base checkout receives only the final integrated result and deterministic task state.
    - Doctor/runtime diagnostics can identify the primary task and included task ids.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/work*.test.ts packages/agentplane/src/commands/pr*.test.ts packages/agentplane/src/commands/task*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Support related task batches in one branch_pr worktree

Add first-class CLI/runtime support for executing an approved related task chain in one primary branch_pr worktree while preserving per-task plans, start-ready records, verification evidence, PR traceability, and final closure into main.

## Scope

- In scope: Add first-class CLI/runtime support for executing an approved related task chain in one primary branch_pr worktree while preserving per-task plans, start-ready records, verification evidence, PR traceability, and final closure into main.
- Out of scope: unrelated refactors not required for "Support related task batches in one branch_pr worktree".

## Plan

Goal: make related task batches a first-class branch_pr workflow capability instead of a policy-only exception.

Steps:
1. Define a primary-task batch model: one branch/worktree/PR owns a related approved task set.
2. Add command/runtime support to record included task ids on the primary task PR or task artifact.
3. Ensure start-ready, verify, and finish evidence remain per included task.
4. Ensure integration/PR checks expose the included task set and keep final merge traceability.
5. Add focused workflow/task tests and update docs/help surfaces.

Acceptance:
- A related task chain can be implemented in one branch_pr worktree without losing per-task traceability.
- Base checkout receives only the final integrated result and deterministic task state.
- Doctor/runtime diagnostics can identify the primary task and included task ids.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/work*.test.ts packages/agentplane/src/commands/pr*.test.ts packages/agentplane/src/commands/task*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
