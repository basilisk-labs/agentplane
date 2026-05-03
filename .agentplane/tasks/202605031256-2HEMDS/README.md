---
id: "202605031256-2HEMDS"
title: "Add WORKFLOW-only migration and release gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031256-758Q7Z"
tags:
  - "code"
  - "release"
  - "workflow"
verify:
  - "agentplane doctor"
  - "bun test"
  - "git status --short --untracked-files=no"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:58:21.313Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:28:32.858Z"
  updated_by: "CODER"
  note: "upgrade policy denies .agentplane/WORKFLOW.md and legacy config.json, workflow build preserves existing WORKFLOW.md as override, and release/test helpers use WORKFLOW-backed config."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Added WORKFLOW-only migration and release/upgrade gates so managed updates do not overwrite project workflow state."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:32.488Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Added WORKFLOW-only migration and release/upgrade gates so managed updates do not overwrite project workflow state."
  -
    type: "verify"
    at: "2026-05-03T13:28:32.858Z"
    author: "CODER"
    state: "ok"
    note: "upgrade policy denies .agentplane/WORKFLOW.md and legacy config.json, workflow build preserves existing WORKFLOW.md as override, and release/test helpers use WORKFLOW-backed config."
doc_version: 3
doc_updated_at: "2026-05-03T13:28:32.861Z"
doc_updated_by: "CODER"
description: "Add the final integration gate for the WORKFLOW-only architecture: migrate an existing config.json repository to WORKFLOW.md v2, verify no new repository writes config.json, run full doctor/routing/schema checks, and document rollback behavior for legacy imports."
sections:
  Summary: |-
    Add WORKFLOW-only migration and release gate
    
    Add the final integration gate for the WORKFLOW-only architecture: migrate an existing config.json repository to WORKFLOW.md v2, verify no new repository writes config.json, run full doctor/routing/schema checks, and document rollback behavior for legacy imports.
  Scope: |-
    - In scope: Add the final integration gate for the WORKFLOW-only architecture: migrate an existing config.json repository to WORKFLOW.md v2, verify no new repository writes config.json, run full doctor/routing/schema checks, and document rollback behavior for legacy imports.
    - Out of scope: unrelated refactors not required for "Add WORKFLOW-only migration and release gate".
  Plan: "Run the final WORKFLOW-only migration gate. Exercise migration from existing config.json repositories, prove fresh repos are WORKFLOW-only, run full doctor/routing/schema/test checks, and record rollback behavior for legacy imports. Acceptance: no steady-state config.json dependency remains and the full chain is ready for release integration."
  Verify Steps: |-
    1. Run `bun test`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git status --short --untracked-files=no`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:28:32.858Z — VERIFY — ok
    
    By: CODER
    
    Note: upgrade policy denies .agentplane/WORKFLOW.md and legacy config.json, workflow build preserves existing WORKFLOW.md as override, and release/test helpers use WORKFLOW-backed config.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:32.488Z, excerpt_hash=sha256:b300a19315d1bf97105962ed19dcf822a9f622192c31c4cb9ed1d648961664b4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add WORKFLOW-only migration and release gate

Add the final integration gate for the WORKFLOW-only architecture: migrate an existing config.json repository to WORKFLOW.md v2, verify no new repository writes config.json, run full doctor/routing/schema checks, and document rollback behavior for legacy imports.

## Scope

- In scope: Add the final integration gate for the WORKFLOW-only architecture: migrate an existing config.json repository to WORKFLOW.md v2, verify no new repository writes config.json, run full doctor/routing/schema checks, and document rollback behavior for legacy imports.
- Out of scope: unrelated refactors not required for "Add WORKFLOW-only migration and release gate".

## Plan

Run the final WORKFLOW-only migration gate. Exercise migration from existing config.json repositories, prove fresh repos are WORKFLOW-only, run full doctor/routing/schema/test checks, and record rollback behavior for legacy imports. Acceptance: no steady-state config.json dependency remains and the full chain is ready for release integration.

## Verify Steps

1. Run `bun test`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git status --short --untracked-files=no`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:28:32.858Z — VERIFY — ok

By: CODER

Note: upgrade policy denies .agentplane/WORKFLOW.md and legacy config.json, workflow build preserves existing WORKFLOW.md as override, and release/test helpers use WORKFLOW-backed config.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:32.488Z, excerpt_hash=sha256:b300a19315d1bf97105962ed19dcf822a9f622192c31c4cb9ed1d648961664b4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
