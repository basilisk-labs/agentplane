---
id: "202605010644-1YXBE7"
title: "AP-01: Restore oversized test guard budget model"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010644-CE27KS"
tags:
  - "code"
verify:
  - "node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000"
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
doc_updated_at: "2026-05-01T06:44:46.243Z"
doc_updated_by: "CODER"
description: "Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked."
sections:
  Summary: |-
    AP-01: Restore oversized test guard budget model
    
    Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
  Scope: |-
    - In scope: Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
    - Out of scope: unrelated refactors not required for "AP-01: Restore oversized test guard budget model".
  Plan: |-
    1. Implement the change for "AP-01: Restore oversized test guard budget model".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-01: Restore oversized test guard budget model

Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.

## Scope

- In scope: Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
- Out of scope: unrelated refactors not required for "AP-01: Restore oversized test guard budget model".

## Plan

1. Implement the change for "AP-01: Restore oversized test guard budget model".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
