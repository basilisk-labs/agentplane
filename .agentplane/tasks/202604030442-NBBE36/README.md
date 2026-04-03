---
id: "202604030442-NBBE36"
title: "F-008 Introduce task intake contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030442-Y53F5X"
  - "202604030442-YD0K3G"
tags:
  - "code"
  - "framework"
  - "intake"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:05.462Z"
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
doc_updated_at: "2026-04-03T04:42:05.221Z"
doc_updated_by: "PLANNER"
description: "Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows."
sections:
  Summary: |-
    F-008 Introduce task intake contracts
    
    Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
  Scope: |-
    - In scope: Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
    - Out of scope: unrelated refactors not required for "F-008 Introduce task intake contracts".
  Plan: |-
    1. Define TaskIntakeContext, ClarificationContract, TaskGraphDraft, and TaskMaterializationPlan in a recipe-agnostic runtime module.
    2. Connect the contracts to the canonical execution context and precedence surfaces without importing runner-specific behavior.
    3. Add tests that preserve separation between clarification, drafting, and materialization.
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

F-008 Introduce task intake contracts

Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.

## Scope

- In scope: Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
- Out of scope: unrelated refactors not required for "F-008 Introduce task intake contracts".

## Plan

1. Define TaskIntakeContext, ClarificationContract, TaskGraphDraft, and TaskMaterializationPlan in a recipe-agnostic runtime module.
2. Connect the contracts to the canonical execution context and precedence surfaces without importing runner-specific behavior.
3. Add tests that preserve separation between clarification, drafting, and materialization.

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
