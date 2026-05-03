---
id: "202605031255-E1YFBV"
title: "Enforce strict WORKFLOW prompt template variables"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031255-TWKAW3"
tags:
  - "code"
  - "prompt-assembly"
  - "workflow"
verify:
  - "agentplane doctor"
  - "agentplane workflow build --validate --dry-run"
  - "bun test packages/agentplane/src/workflow-runtime packages/agentplane/src/runtime/prompt-modules"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:58:09.524Z"
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
doc_updated_at: "2026-05-03T12:57:13.020Z"
doc_updated_by: "PLANNER"
description: "Define the allowed Prompt Template runtime context for task, workspace, git, workflow, policy, checks, attempt, runner, and evaluator data. Add workflow vars/render/validate diagnostics that fail on unknown variables or filters before a runner or IDE agent receives a broken prompt."
sections:
  Summary: |-
    Enforce strict WORKFLOW prompt template variables
    
    Define the allowed Prompt Template runtime context for task, workspace, git, workflow, policy, checks, attempt, runner, and evaluator data. Add workflow vars/render/validate diagnostics that fail on unknown variables or filters before a runner or IDE agent receives a broken prompt.
  Scope: |-
    - In scope: Define the allowed Prompt Template runtime context for task, workspace, git, workflow, policy, checks, attempt, runner, and evaluator data. Add workflow vars/render/validate diagnostics that fail on unknown variables or filters before a runner or IDE agent receives a broken prompt.
    - Out of scope: unrelated refactors not required for "Enforce strict WORKFLOW prompt template variables".
  Plan: "Define and enforce strict Prompt Template variables/filters for WORKFLOW.md. Add inspect/render/validate commands so unknown variables fail before dispatch. Acceptance: workflow validate catches unknown fields, workflow render dry-run shows resolved prompt for a task, and doctor/preflight block broken templates."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/workflow-runtime packages/agentplane/src/runtime/prompt-modules`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane workflow build --validate --dry-run`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Enforce strict WORKFLOW prompt template variables

Define the allowed Prompt Template runtime context for task, workspace, git, workflow, policy, checks, attempt, runner, and evaluator data. Add workflow vars/render/validate diagnostics that fail on unknown variables or filters before a runner or IDE agent receives a broken prompt.

## Scope

- In scope: Define the allowed Prompt Template runtime context for task, workspace, git, workflow, policy, checks, attempt, runner, and evaluator data. Add workflow vars/render/validate diagnostics that fail on unknown variables or filters before a runner or IDE agent receives a broken prompt.
- Out of scope: unrelated refactors not required for "Enforce strict WORKFLOW prompt template variables".

## Plan

Define and enforce strict Prompt Template variables/filters for WORKFLOW.md. Add inspect/render/validate commands so unknown variables fail before dispatch. Acceptance: workflow validate catches unknown fields, workflow render dry-run shows resolved prompt for a task, and doctor/preflight block broken templates.

## Verify Steps

1. Run `bun test packages/agentplane/src/workflow-runtime packages/agentplane/src/runtime/prompt-modules`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane workflow build --validate --dry-run`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
