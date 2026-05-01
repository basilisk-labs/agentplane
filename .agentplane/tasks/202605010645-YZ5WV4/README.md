---
id: "202605010645-YZ5WV4"
title: "AP-14: Add modular check runner"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-JH4RV4"
tags:
  - "code"
verify:
  - "node scripts/run-checks.mjs --select docs:scripts && bun run docs:scripts:check"
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
doc_updated_at: "2026-05-01T06:45:21.768Z"
doc_updated_by: "CODER"
description: "Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior."
sections:
  Summary: |-
    AP-14: Add modular check runner
    
    Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.
  Scope: |-
    - In scope: Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.
    - Out of scope: unrelated refactors not required for "AP-14: Add modular check runner".
  Plan: |-
    1. Implement the change for "AP-14: Add modular check runner".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `node scripts/run-checks.mjs --select docs:scripts && bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-14: Add modular check runner

Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.

## Scope

- In scope: Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.
- Out of scope: unrelated refactors not required for "AP-14: Add modular check runner".

## Plan

1. Implement the change for "AP-14: Add modular check runner".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `node scripts/run-checks.mjs --select docs:scripts && bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
