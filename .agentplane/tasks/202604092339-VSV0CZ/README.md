---
id: "202604092339-VSV0CZ"
title: "Make finish closeout idempotent after partial DONE retries"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
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
doc_updated_at: "2026-04-09T23:39:15.647Z"
doc_updated_by: "CODER"
description: "If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit."
sections:
  Summary: |-
    Make finish closeout idempotent after partial DONE retries
    
    If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
  Scope: |-
    - In scope: If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
    - Out of scope: unrelated refactors not required for "Make finish closeout idempotent after partial DONE retries".
  Plan: |-
    1. Implement the change for "Make finish closeout idempotent after partial DONE retries".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
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

Make finish closeout idempotent after partial DONE retries

If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.

## Scope

- In scope: If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
- Out of scope: unrelated refactors not required for "Make finish closeout idempotent after partial DONE retries".

## Plan

1. Implement the change for "Make finish closeout idempotent after partial DONE retries".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
