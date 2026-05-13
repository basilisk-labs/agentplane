---
id: "202605131043-802HWG"
title: "Extract local context domain logic from command handlers"
status: "TODO"
priority: "med"
owner: "PLANNER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
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
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-13T10:45:20.136Z"
doc_updated_by: "PLANNER"
description: "Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters."
sections:
  Summary: |-
    Extract local context domain logic from command handlers
    
    Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.
  Scope: |-
    - In scope: Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.
    - Out of scope: unrelated refactors not required for "Extract local context domain logic from command handlers".
  Plan: |-
    1. Identify context command files that contain domain logic rather than CLI parsing/output only.
    2. Create src/context domain modules for projection, ingest, doctor, and verification logic.
    3. Keep commands/context handlers thin and behavior-compatible.
    4. Update imports, focused context tests, docs, and module-topology guidance.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Extract local context domain logic from command handlers

Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.

## Scope

- In scope: Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.
- Out of scope: unrelated refactors not required for "Extract local context domain logic from command handlers".

## Plan

1. Identify context command files that contain domain logic rather than CLI parsing/output only.
2. Create src/context domain modules for projection, ingest, doctor, and verification logic.
3. Keep commands/context handlers thin and behavior-compatible.
4. Update imports, focused context tests, docs, and module-topology guidance.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
