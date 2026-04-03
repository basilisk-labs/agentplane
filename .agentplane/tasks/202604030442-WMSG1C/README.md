---
id: "202604030442-WMSG1C"
title: "F-010 Introduce protocol and result foundation"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030442-E8H05E"
tags:
  - "code"
  - "framework"
  - "protocol"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:07.044Z"
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
doc_updated_at: "2026-04-03T04:42:06.803Z"
doc_updated_by: "PLANNER"
description: "Create stable JSON-friendly result contracts on top of the explain foundation."
sections:
  Summary: |-
    F-010 Introduce protocol and result foundation
    
    Create stable JSON-friendly result contracts on top of the explain foundation.
  Scope: |-
    - In scope: Create stable JSON-friendly result contracts on top of the explain foundation.
    - Out of scope: unrelated refactors not required for "F-010 Introduce protocol and result foundation".
  Plan: |-
    1. Define base protocol and result types that are machine-readable, versionable, and independent from concrete runner adapters.
    2. Connect the explain surface to the new result foundation and describe the compatibility strategy in code or docs.
    3. Add tests that freeze the JSON-facing contract.
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

F-010 Introduce protocol and result foundation

Create stable JSON-friendly result contracts on top of the explain foundation.

## Scope

- In scope: Create stable JSON-friendly result contracts on top of the explain foundation.
- Out of scope: unrelated refactors not required for "F-010 Introduce protocol and result foundation".

## Plan

1. Define base protocol and result types that are machine-readable, versionable, and independent from concrete runner adapters.
2. Connect the explain surface to the new result foundation and describe the compatibility strategy in code or docs.
3. Add tests that freeze the JSON-facing contract.

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
