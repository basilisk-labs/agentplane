---
id: "202604241137-ZE0F39"
title: "v0.3 freeze E2: move CLI ansi helper into shared layer"
status: "TODO"
priority: "normal"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241137-6FJ1M8"
tags:
  - "architecture"
  - "code"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src"
  - "bun run typecheck"
  - "find packages/agentplane/src -type d -name shared | wc -l"
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
doc_updated_at: "2026-04-24T11:37:10.681Z"
doc_updated_by: "CODER"
description: "Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops."
sections:
  Summary: |-
    v0.3 freeze E2: move CLI ansi helper into shared layer
    
    Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.
  Scope: |-
    - In scope: Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.
    - Out of scope: unrelated refactors not required for "v0.3 freeze E2: move CLI ansi helper into shared layer".
  Plan: |-
    1. Implement the change for "v0.3 freeze E2: move CLI ansi helper into shared layer".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `find packages/agentplane/src -type d -name shared | wc -l`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test -- packages/agentplane/src`. Expected: it succeeds and confirms the requested outcome for this task.
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

v0.3 freeze E2: move CLI ansi helper into shared layer

Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.

## Scope

- In scope: Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.
- Out of scope: unrelated refactors not required for "v0.3 freeze E2: move CLI ansi helper into shared layer".

## Plan

1. Implement the change for "v0.3 freeze E2: move CLI ansi helper into shared layer".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `find packages/agentplane/src -type d -name shared | wc -l`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test -- packages/agentplane/src`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
