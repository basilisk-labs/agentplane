---
id: "202604030442-E8H05E"
title: "F-009 Introduce explain hooks"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030442-YD0K3G"
  - "202604030442-C3HR7C"
  - "202604030442-NBBE36"
tags:
  - "code"
  - "framework"
  - "explain"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:06.254Z"
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
doc_updated_at: "2026-04-03T04:42:06.012Z"
doc_updated_by: "PLANNER"
description: "Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs."
sections:
  Summary: |-
    F-009 Introduce explain hooks
    
    Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
  Scope: |-
    - In scope: Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
    - Out of scope: unrelated refactors not required for "F-009 Introduce explain hooks".
  Plan: |-
    1. Define explain payload contracts for resolved harness, policy, capabilities, and behavior inputs.
    2. Add hooks that build these payloads from the canonical execution context and precedence results.
    3. Cover machine-readable explain semantics with tests so later recipe and runner extensions can extend rather than replace them.
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

F-009 Introduce explain hooks

Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.

## Scope

- In scope: Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
- Out of scope: unrelated refactors not required for "F-009 Introduce explain hooks".

## Plan

1. Define explain payload contracts for resolved harness, policy, capabilities, and behavior inputs.
2. Add hooks that build these payloads from the canonical execution context and precedence results.
3. Cover machine-readable explain semantics with tests so later recipe and runner extensions can extend rather than replace them.

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
