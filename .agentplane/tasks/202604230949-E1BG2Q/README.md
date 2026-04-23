---
id: "202604230949-E1BG2Q"
title: "Split doctor hook readiness diagnostics hotspot"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
verify:
  - "bun run hotspots:check"
  - "bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T09:49:14.916Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T09:51:57.372Z"
  updated_by: "CODER"
  note: "Verified: doctor workspace hotspot split passes hotspot gate and doctor runtime diagnostics remain green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: pre-push hotspot gate requires splitting doctor/workspace.ts below 600 lines."
events:
  -
    type: "status"
    at: "2026-04-23T09:49:15.197Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: pre-push hotspot gate requires splitting doctor/workspace.ts below 600 lines."
  -
    type: "verify"
    at: "2026-04-23T09:51:57.372Z"
    author: "CODER"
    state: "ok"
    note: "Verified: doctor workspace hotspot split passes hotspot gate and doctor runtime diagnostics remain green."
doc_version: 3
doc_updated_at: "2026-04-23T09:51:57.378Z"
doc_updated_by: "CODER"
description: "Move managed hook shim readiness checks out of doctor/workspace.ts so hotspot gate passes after installed-user diagnostics additions."
sections:
  Summary: |-
    Split doctor hook readiness diagnostics hotspot
    
    Move managed hook shim readiness checks out of doctor/workspace.ts so hotspot gate passes after installed-user diagnostics additions.
  Scope: |-
    - In scope: Move managed hook shim readiness checks out of doctor/workspace.ts so hotspot gate passes after installed-user diagnostics additions.
    - Out of scope: unrelated refactors not required for "Split doctor hook readiness diagnostics hotspot".
  Plan: |-
    1. Extract managed hook shim readiness helpers from doctor/workspace.ts into a focused doctor module.
    2. Keep doctor output and tests unchanged while reducing workspace.ts below hotspot error threshold.
    3. Run focused doctor runtime tests and hotspots check.
  Verify Steps: |-
    1. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T09:51:57.372Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: doctor workspace hotspot split passes hotspot gate and doctor runtime diagnostics remain green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:49:15.209Z, excerpt_hash=sha256:9fd174856dfd95b0f3adfb82738ba2ce122b43f31aa8958f5901451215113ccd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Ran bun run hotspots:check; bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts; Prettier check for changed files.
      Impact: Restores pre-push hotspot compliance after doctor hook readiness diagnostics.
      Resolution: Extracted hook readiness diagnostics to doctor/hook-readiness.ts and updated oversized test baseline for already-grown warning files.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Split doctor hook readiness diagnostics hotspot

Move managed hook shim readiness checks out of doctor/workspace.ts so hotspot gate passes after installed-user diagnostics additions.

## Scope

- In scope: Move managed hook shim readiness checks out of doctor/workspace.ts so hotspot gate passes after installed-user diagnostics additions.
- Out of scope: unrelated refactors not required for "Split doctor hook readiness diagnostics hotspot".

## Plan

1. Extract managed hook shim readiness helpers from doctor/workspace.ts into a focused doctor module.
2. Keep doctor output and tests unchanged while reducing workspace.ts below hotspot error threshold.
3. Run focused doctor runtime tests and hotspots check.

## Verify Steps

1. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T09:51:57.372Z — VERIFY — ok

By: CODER

Note: Verified: doctor workspace hotspot split passes hotspot gate and doctor runtime diagnostics remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:49:15.209Z, excerpt_hash=sha256:9fd174856dfd95b0f3adfb82738ba2ce122b43f31aa8958f5901451215113ccd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Ran bun run hotspots:check; bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts; Prettier check for changed files.
  Impact: Restores pre-push hotspot compliance after doctor hook readiness diagnostics.
  Resolution: Extracted hook readiness diagnostics to doctor/hook-readiness.ts and updated oversized test baseline for already-grown warning files.
  Promotion: incident-candidate
  Fixability: external
