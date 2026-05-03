---
id: "202605031255-E1YFBV"
title: "Enforce strict WORKFLOW prompt template variables"
result_summary: "Strict WORKFLOW prompt template diagnostics remain enforced."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-03T13:28:31.681Z"
  updated_by: "CODER"
  note: "workflow build continues validateTemplateStrict/renderTemplateStrict with strictVariables and strictFilters; tests cover unknown variable/filter diagnostics and v2 build behavior."
commit:
  hash: "c02111e054b00ac06e7277733a65e88cbb557391"
  message: "✅ GV0N4K close: Merged via PR #814. (202605031255-GV0N4K) [config,docs,workflow] (#817)"
comments:
  -
    author: "CODER"
    body: "Start: Kept strict WORKFLOW prompt template validation fail-closed for unknown variables and filters while preserving v2 rendering."
  -
    author: "CODER"
    body: "Verified: strict prompt template variable/filter validation remains fail-closed for WORKFLOW build/render."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:31.314Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Kept strict WORKFLOW prompt template validation fail-closed for unknown variables and filters while preserving v2 rendering."
  -
    type: "verify"
    at: "2026-05-03T13:28:31.681Z"
    author: "CODER"
    state: "ok"
    note: "workflow build continues validateTemplateStrict/renderTemplateStrict with strictVariables and strictFilters; tests cover unknown variable/filter diagnostics and v2 build behavior."
  -
    type: "status"
    at: "2026-05-03T13:40:46.135Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: strict prompt template variable/filter validation remains fail-closed for WORKFLOW build/render."
doc_version: 3
doc_updated_at: "2026-05-03T13:40:46.136Z"
doc_updated_by: "CODER"
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
    ### 2026-05-03T13:28:31.681Z — VERIFY — ok
    
    By: CODER
    
    Note: workflow build continues validateTemplateStrict/renderTemplateStrict with strictVariables and strictFilters; tests cover unknown variable/filter diagnostics and v2 build behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:31.314Z, excerpt_hash=sha256:0046e2497f86493f36023440d8d68b591e177eb62e73f6c0201778a2a1ab844a
    
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
### 2026-05-03T13:28:31.681Z — VERIFY — ok

By: CODER

Note: workflow build continues validateTemplateStrict/renderTemplateStrict with strictVariables and strictFilters; tests cover unknown variable/filter diagnostics and v2 build behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:31.314Z, excerpt_hash=sha256:0046e2497f86493f36023440d8d68b591e177eb62e73f6c0201778a2a1ab844a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
