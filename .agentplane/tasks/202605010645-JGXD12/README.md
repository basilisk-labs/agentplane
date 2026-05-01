---
id: "202605010645-JGXD12"
title: "AP-10: Split release apply tests"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-B5ERD0"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical"
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
doc_updated_at: "2026-05-01T06:45:12.857Z"
doc_updated_by: "CODER"
description: "Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures."
sections:
  Summary: |-
    AP-10: Split release apply tests
    
    Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
  Scope: |-
    - In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
    - Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".
  Plan: |-
    1. Implement the change for "AP-10: Split release apply tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-10: Split release apply tests

Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.

## Scope

- In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
- Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".

## Plan

1. Implement the change for "AP-10: Split release apply tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
