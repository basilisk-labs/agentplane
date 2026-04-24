---
id: "202604241137-V5SYC4"
title: "v0.3 freeze G3: guard release parity against freeze artifact drift"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241137-PT2V56"
tags:
  - "code"
  - "release"
  - "v0.3"
verify:
  - "bun run release:ci-check"
  - "node scripts/check-release-parity.mjs"
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
doc_updated_at: "2026-04-24T11:37:31.986Z"
doc_updated_by: "CODER"
description: "Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit."
sections:
  Summary: |-
    v0.3 freeze G3: guard release parity against freeze artifact drift
    
    Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.
  Scope: |-
    - In scope: Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.
    - Out of scope: unrelated refactors not required for "v0.3 freeze G3: guard release parity against freeze artifact drift".
  Plan: |-
    1. Implement the change for "v0.3 freeze G3: guard release parity against freeze artifact drift".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run release:ci-check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/check-release-parity.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

v0.3 freeze G3: guard release parity against freeze artifact drift

Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.

## Scope

- In scope: Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.
- Out of scope: unrelated refactors not required for "v0.3 freeze G3: guard release parity against freeze artifact drift".

## Plan

1. Implement the change for "v0.3 freeze G3: guard release parity against freeze artifact drift".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run release:ci-check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/check-release-parity.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
