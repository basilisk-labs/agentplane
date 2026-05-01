---
id: "202605010645-JH4RV4"
title: "AP-13: Split task query prepare tests"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-GA1SAK"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000"
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
doc_updated_at: "2026-05-01T06:45:19.676Z"
doc_updated_by: "CODER"
description: "Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers."
sections:
  Summary: |-
    AP-13: Split task query prepare tests
    
    Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
  Scope: |-
    - In scope: Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
    - Out of scope: unrelated refactors not required for "AP-13: Split task query prepare tests".
  Plan: |-
    1. Implement the change for "AP-13: Split task query prepare tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-13: Split task query prepare tests

Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.

## Scope

- In scope: Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
- Out of scope: unrelated refactors not required for "AP-13: Split task query prepare tests".

## Plan

1. Implement the change for "AP-13: Split task query prepare tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
