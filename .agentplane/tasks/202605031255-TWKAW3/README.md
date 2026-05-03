---
id: "202605031255-TWKAW3"
title: "Wire WORKFLOW.md into startup and prompt assembly"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031255-92K2Q0"
tags:
  - "code"
  - "prompt-assembly"
  - "workflow"
verify:
  - "agentplane doctor"
  - "agentplane quickstart"
  - "bun test packages/agentplane/src/runner/context packages/agentplane/src/runtime"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:58:02.862Z"
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
doc_updated_at: "2026-05-03T12:57:08.113Z"
doc_updated_by: "PLANNER"
description: "Make WORKFLOW.md v2 part of the shared startup contract for any IDE or CLI agent working in the folder. Ensure quickstart, AGENTS.md gateway guidance, runtime context, base prompt assembly, and runner bundles expose the workflow contract without copying AGENTS.md into the Prompt Template."
sections:
  Summary: |-
    Wire WORKFLOW.md into startup and prompt assembly
    
    Make WORKFLOW.md v2 part of the shared startup contract for any IDE or CLI agent working in the folder. Ensure quickstart, AGENTS.md gateway guidance, runtime context, base prompt assembly, and runner bundles expose the workflow contract without copying AGENTS.md into the Prompt Template.
  Scope: |-
    - In scope: Make WORKFLOW.md v2 part of the shared startup contract for any IDE or CLI agent working in the folder. Ensure quickstart, AGENTS.md gateway guidance, runtime context, base prompt assembly, and runner bundles expose the workflow contract without copying AGENTS.md into the Prompt Template.
    - Out of scope: unrelated refactors not required for "Wire WORKFLOW.md into startup and prompt assembly".
  Plan: "Wire WORKFLOW.md into the startup and prompt contour. AGENTS.md remains the policy gateway; WORKFLOW.md supplies orchestration/runtime contract for IDE agents, quickstart, runner bundles, and prompt assembly. Acceptance: startup guidance makes any folder agent load/inspect WORKFLOW.md and runner context includes rendered workflow contract without duplicating AGENTS.md."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner/context packages/agentplane/src/runtime`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane quickstart`. Expected: it succeeds and confirms the requested outcome for this task.
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

Wire WORKFLOW.md into startup and prompt assembly

Make WORKFLOW.md v2 part of the shared startup contract for any IDE or CLI agent working in the folder. Ensure quickstart, AGENTS.md gateway guidance, runtime context, base prompt assembly, and runner bundles expose the workflow contract without copying AGENTS.md into the Prompt Template.

## Scope

- In scope: Make WORKFLOW.md v2 part of the shared startup contract for any IDE or CLI agent working in the folder. Ensure quickstart, AGENTS.md gateway guidance, runtime context, base prompt assembly, and runner bundles expose the workflow contract without copying AGENTS.md into the Prompt Template.
- Out of scope: unrelated refactors not required for "Wire WORKFLOW.md into startup and prompt assembly".

## Plan

Wire WORKFLOW.md into the startup and prompt contour. AGENTS.md remains the policy gateway; WORKFLOW.md supplies orchestration/runtime contract for IDE agents, quickstart, runner bundles, and prompt assembly. Acceptance: startup guidance makes any folder agent load/inspect WORKFLOW.md and runner context includes rendered workflow contract without duplicating AGENTS.md.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner/context packages/agentplane/src/runtime`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane quickstart`. Expected: it succeeds and confirms the requested outcome for this task.
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
