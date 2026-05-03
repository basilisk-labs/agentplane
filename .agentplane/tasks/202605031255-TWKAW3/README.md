---
id: "202605031255-TWKAW3"
title: "Wire WORKFLOW.md into startup and prompt assembly"
result_summary: "WORKFLOW.md is wired into startup and prompt assembly."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-03T13:28:31.086Z"
  updated_by: "CODER"
  note: "quickstart, bundled AGENTS, docs, workflow artifacts, and workflow build now point to WORKFLOW.md as workflow/config source."
commit:
  hash: "c02111e054b00ac06e7277733a65e88cbb557391"
  message: "✅ GV0N4K close: Merged via PR #814. (202605031255-GV0N4K) [config,docs,workflow] (#817)"
comments:
  -
    author: "CODER"
    body: "Start: Wired WORKFLOW.md into startup surfaces, quickstart guidance, prompt artifact runtime context, and docs."
  -
    author: "CODER"
    body: "Verified: startup, quickstart, bundled AGENTS, workflow artifacts, and docs point agents to WORKFLOW.md."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:30.717Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Wired WORKFLOW.md into startup surfaces, quickstart guidance, prompt artifact runtime context, and docs."
  -
    type: "verify"
    at: "2026-05-03T13:28:31.086Z"
    author: "CODER"
    state: "ok"
    note: "quickstart, bundled AGENTS, docs, workflow artifacts, and workflow build now point to WORKFLOW.md as workflow/config source."
  -
    type: "status"
    at: "2026-05-03T13:40:44.317Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: startup, quickstart, bundled AGENTS, workflow artifacts, and docs point agents to WORKFLOW.md."
doc_version: 3
doc_updated_at: "2026-05-03T13:40:44.317Z"
doc_updated_by: "CODER"
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
    ### 2026-05-03T13:28:31.086Z — VERIFY — ok
    
    By: CODER
    
    Note: quickstart, bundled AGENTS, docs, workflow artifacts, and workflow build now point to WORKFLOW.md as workflow/config source.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:30.717Z, excerpt_hash=sha256:97efe8d56a8f3fe3db0b18dad659579a5dbf73a753a6e1dc0f49c673a4057edb
    
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
### 2026-05-03T13:28:31.086Z — VERIFY — ok

By: CODER

Note: quickstart, bundled AGENTS, docs, workflow artifacts, and workflow build now point to WORKFLOW.md as workflow/config source.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:30.717Z, excerpt_hash=sha256:97efe8d56a8f3fe3db0b18dad659579a5dbf73a753a6e1dc0f49c673a4057edb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
