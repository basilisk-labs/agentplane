---
id: "202604241136-45ZVBA"
title: "v0.3 freeze D2: extract shared close precheck"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-ATVM0G"
tags:
  - "code"
  - "lifecycle"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task"
  - "bun run typecheck"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:36:52.729Z"
doc_updated_by: "CODER"
description: "Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract."
sections:
  Summary: |-
    v0.3 freeze D2: extract shared close precheck
    
    Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.
  Scope: |-
    - In scope: Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.
    - Out of scope: unrelated refactors not required for "v0.3 freeze D2: extract shared close precheck".
  Plan: |-
    1. Implement the change for "v0.3 freeze D2: extract shared close precheck".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
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

v0.3 freeze D2: extract shared close precheck

Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.

## Scope

- In scope: Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.
- Out of scope: unrelated refactors not required for "v0.3 freeze D2: extract shared close precheck".

## Plan

1. Implement the change for "v0.3 freeze D2: extract shared close precheck".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
