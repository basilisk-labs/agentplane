---
id: "202604191639-7SDT2H"
title: "Retire run-cli test helper shim after final CLI migration"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-19T16:39:00.142Z"
doc_updated_by: "CODER"
description: "Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain."
sections:
  Summary: |-
    Retire run-cli test helper shim after final CLI migration
    
    Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.
  Scope: |-
    - In scope: Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.
    - Out of scope: unrelated refactors not required for "Retire run-cli test helper shim after final CLI migration".
  Plan: |-
    1. Implement the change for "Retire run-cli test helper shim after final CLI migration".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
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

Retire run-cli test helper shim after final CLI migration

Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.

## Scope

- In scope: Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.
- Out of scope: unrelated refactors not required for "Retire run-cli test helper shim after final CLI migration".

## Plan

1. Implement the change for "Retire run-cli test helper shim after final CLI migration".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

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
