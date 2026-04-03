---
id: "202604030441-AQRVW4"
title: "F-001 Introduce ResolvedHarnessContract"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "framework"
  - "runtime"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:41:59.975Z"
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
doc_updated_at: "2026-04-03T04:41:59.738Z"
doc_updated_by: "PLANNER"
description: "Centralize harness sources of truth into an explicit framework contract with merge tests."
sections:
  Summary: |-
    F-001 Introduce ResolvedHarnessContract
    
    Centralize harness sources of truth into an explicit framework contract with merge tests.
  Scope: |-
    - In scope: Centralize harness sources of truth into an explicit framework contract with merge tests.
    - Out of scope: unrelated refactors not required for "F-001 Introduce ResolvedHarnessContract".
  Plan: |-
    1. Catalog the current harness facts spread across config, policy gateway, runner, and helper layers.
    2. Add a centralized ResolvedHarnessContract resolver under the runtime harness surface with explicit sources of truth and merge semantics.
    3. Migrate the first consumers and lock the merge behavior with unit tests.
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

F-001 Introduce ResolvedHarnessContract

Centralize harness sources of truth into an explicit framework contract with merge tests.

## Scope

- In scope: Centralize harness sources of truth into an explicit framework contract with merge tests.
- Out of scope: unrelated refactors not required for "F-001 Introduce ResolvedHarnessContract".

## Plan

1. Catalog the current harness facts spread across config, policy gateway, runner, and helper layers.
2. Add a centralized ResolvedHarnessContract resolver under the runtime harness surface with explicit sources of truth and merge semantics.
3. Migrate the first consumers and lock the merge behavior with unit tests.

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
