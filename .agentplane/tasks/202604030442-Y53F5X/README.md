---
id: "202604030442-Y53F5X"
title: "F-002 Introduce AgentplaneExecutionContext"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030441-AQRVW4"
tags:
  - "code"
  - "framework"
  - "context"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:00.756Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-03T04:42:00.518Z"
doc_updated_by: "PLANNER"
description: "Create one canonical execution context for task, recipe, and runner paths."
sections:
  Summary: |-
    F-002 Introduce AgentplaneExecutionContext
    
    Create one canonical execution context for task, recipe, and runner paths.
  Scope: |-
    - In scope: Create one canonical execution context for task, recipe, and runner paths.
    - Out of scope: unrelated refactors not required for "F-002 Introduce AgentplaneExecutionContext".
  Plan: |-
    1. Define AgentplaneExecutionContext around repo, task, harness, config, policy, and execution-profile data.
    2. Refactor context assembly so use cases stop stitching ad hoc command-local structures.
    3. Update tests to prove the canonical context is reusable across framework entrypoints.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

F-002 Introduce AgentplaneExecutionContext

Create one canonical execution context for task, recipe, and runner paths.

## Scope

- In scope: Create one canonical execution context for task, recipe, and runner paths.
- Out of scope: unrelated refactors not required for "F-002 Introduce AgentplaneExecutionContext".

## Plan

1. Define AgentplaneExecutionContext around repo, task, harness, config, policy, and execution-profile data.
2. Refactor context assembly so use cases stop stitching ad hoc command-local structures.
3. Update tests to prove the canonical context is reusable across framework entrypoints.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
