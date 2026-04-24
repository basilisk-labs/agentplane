---
id: "202604241136-R6RZ93"
title: "v0.3 freeze D3: split verify-record and hosted-close command hotspots"
status: "TODO"
priority: "normal"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-ATVM0G"
tags:
  - "code"
  - "refactor"
  - "v0.3"
verify:
  - "bun run hotspots:check"
  - "bun run test -- packages/agentplane/src/commands/task"
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
doc_updated_at: "2026-04-24T11:36:58.315Z"
doc_updated_by: "CODER"
description: "Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior."
sections:
  Summary: |-
    v0.3 freeze D3: split verify-record and hosted-close command hotspots
    
    Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.
  Scope: |-
    - In scope: Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.
    - Out of scope: unrelated refactors not required for "v0.3 freeze D3: split verify-record and hosted-close command hotspots".
  Plan: |-
    1. Implement the change for "v0.3 freeze D3: split verify-record and hosted-close command hotspots".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test -- packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
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

v0.3 freeze D3: split verify-record and hosted-close command hotspots

Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.

## Scope

- In scope: Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.
- Out of scope: unrelated refactors not required for "v0.3 freeze D3: split verify-record and hosted-close command hotspots".

## Plan

1. Implement the change for "v0.3 freeze D3: split verify-record and hosted-close command hotspots".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test -- packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
