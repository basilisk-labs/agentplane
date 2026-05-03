---
id: "202605031908-TFYQJ0"
title: "T03: Add ACR command unit tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-6V1G82"
  - "202605031908-Z2FSSG"
tags:
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:17.129Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T19:08:16.485Z"
doc_updated_by: "PLANNER"
description: "Add direct Vitest coverage for acr generate, validate, check failure modes, and schema output."
sections:
  Summary: |-
    T03: Add ACR command unit tests

    Add direct Vitest coverage for acr generate, validate, check failure modes, and schema output.
  Scope: |-
    - In scope: Add direct Vitest coverage for acr generate, validate, check failure modes, and schema output.
    - Out of scope: unrelated refactors not required for "T03: Add ACR command unit tests".
  Plan: "Create focused tests for packages/agentplane/src/commands/acr, cover happy and failure paths, and run the focused agentplane Vitest command with coverage evidence where supported."
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

T03: Add ACR command unit tests

Add direct Vitest coverage for acr generate, validate, check failure modes, and schema output.

## Scope

- In scope: Add direct Vitest coverage for acr generate, validate, check failure modes, and schema output.
- Out of scope: unrelated refactors not required for "T03: Add ACR command unit tests".

## Plan

Create focused tests for packages/agentplane/src/commands/acr, cover happy and failure paths, and run the focused agentplane Vitest command with coverage evidence where supported.

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
