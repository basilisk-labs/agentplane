---
id: "202605021412-DV2ZT8"
title: "Add standalone artifact smoke tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605021412-Q2WGGA"
tags:
  - "code"
  - "release"
  - "tests"
verify:
  - "bun test packages/agentplane/src/commands/release/*standalone*"
  - "node scripts/<standalone-smoke-script>.mjs --artifact <fixture>"
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
doc_updated_at: "2026-05-02T14:12:51.708Z"
doc_updated_by: "CODER"
description: "Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary."
sections:
  Summary: |-
    Add standalone artifact smoke tests
    
    Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
  Scope: |-
    - In scope: Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
    - Out of scope: unrelated refactors not required for "Add standalone artifact smoke tests".
  Plan: |-
    1. Implement the change for "Add standalone artifact smoke tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/*standalone*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/<standalone-smoke-script>.mjs --artifact <fixture>`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add standalone artifact smoke tests

Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.

## Scope

- In scope: Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
- Out of scope: unrelated refactors not required for "Add standalone artifact smoke tests".

## Plan

1. Implement the change for "Add standalone artifact smoke tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/*standalone*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/<standalone-smoke-script>.mjs --artifact <fixture>`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
