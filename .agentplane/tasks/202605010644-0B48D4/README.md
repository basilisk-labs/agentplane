---
id: "202605010644-0B48D4"
title: "AP-02: Guard recipes runtime version parity"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010644-1YXBE7"
tags:
  - "code"
verify:
  - "bun run release:parity && bun run test:project -- recipes"
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
doc_updated_at: "2026-05-01T06:44:49.132Z"
doc_updated_by: "CODER"
description: "Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches."
sections:
  Summary: |-
    AP-02: Guard recipes runtime version parity
    
    Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
  Scope: |-
    - In scope: Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
    - Out of scope: unrelated refactors not required for "AP-02: Guard recipes runtime version parity".
  Plan: |-
    1. Implement the change for "AP-02: Guard recipes runtime version parity".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run release:parity && bun run test:project -- recipes`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-02: Guard recipes runtime version parity

Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.

## Scope

- In scope: Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
- Out of scope: unrelated refactors not required for "AP-02: Guard recipes runtime version parity".

## Plan

1. Implement the change for "AP-02: Guard recipes runtime version parity".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run release:parity && bun run test:project -- recipes`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
