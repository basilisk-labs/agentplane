---
id: "202605031524-10ZC1E"
title: "Add branch_pr batch drift diagnostics and recovery"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031524-SDCTFM"
  - "202605031524-RRPMDY"
tags:
  - "code"
  - "doctor"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T15:24:54.780Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T16:19:35.609Z"
  updated_by: "CODER"
  note: "Batch drift diagnostics implemented and verified on current HEAD. Checks: focused doctor test, typecheck, format:check, check:types-files, git diff --check, policy routing."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add branch_pr batch drift diagnostics and recovery guidance."
events:
  -
    type: "status"
    at: "2026-05-03T16:12:51.021Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add branch_pr batch drift diagnostics and recovery guidance."
  -
    type: "verify"
    at: "2026-05-03T16:15:19.895Z"
    author: "CODER"
    state: "ok"
    note: "doctor now reports branch_pr batch included-task closure drift."
  -
    type: "verify"
    at: "2026-05-03T16:19:35.609Z"
    author: "CODER"
    state: "ok"
    note: "Batch drift diagnostics implemented and verified on current HEAD. Checks: focused doctor test, typecheck, format:check, check:types-files, git diff --check, policy routing."
doc_version: 3
doc_updated_at: "2026-05-03T16:19:35.641Z"
doc_updated_by: "CODER"
description: "Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests."
sections:
  Summary: |-
    Add branch_pr batch drift diagnostics and recovery
    
    Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.
  Scope: |-
    - In scope: Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.
    - Out of scope: unrelated refactors not required for "Add branch_pr batch drift diagnostics and recovery".
  Plan: "Depends on SDCTFM and RRPMDY. Scope: add diagnostics/recovery for branch_pr batch drift. Doctor should identify merged primary PRs with included verified leaf tasks still open; normalize should reconcile scoped batch drift without relying on every leaf having its own PR metadata. Acceptance: doctor and normalize tests cover the former failure mode from CMO leaf tasks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T16:15:19.895Z — VERIFY — ok
    
    By: CODER
    
    Note: doctor now reports branch_pr batch included-task closure drift.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:12:51.021Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-05-03T16:19:35.609Z — VERIFY — ok
    
    By: CODER
    
    Note: Batch drift diagnostics implemented and verified on current HEAD. Checks: focused doctor test, typecheck, format:check, check:types-files, git diff --check, policy routing.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:15:19.914Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added a doctor check for DONE/MERGED primary batch tasks whose included task ids are missing, still open, or not closed at the same merge commit.
      Impact: The old CMO failure mode becomes visible as an explicit diagnostic instead of requiring manual task-by-task status inspection.
      Resolution: Verification: bun test packages/agentplane/src/commands/doctor.command.open-pr.test.ts --test-name-pattern 'closed branch_pr batch'; bun run typecheck; bun run format:check; bun run check:types-files; git diff --check; node .agentplane/policy/check-routing.mjs.
id_source: "generated"
---
## Summary

Add branch_pr batch drift diagnostics and recovery

Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.

## Scope

- In scope: Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.
- Out of scope: unrelated refactors not required for "Add branch_pr batch drift diagnostics and recovery".

## Plan

Depends on SDCTFM and RRPMDY. Scope: add diagnostics/recovery for branch_pr batch drift. Doctor should identify merged primary PRs with included verified leaf tasks still open; normalize should reconcile scoped batch drift without relying on every leaf having its own PR metadata. Acceptance: doctor and normalize tests cover the former failure mode from CMO leaf tasks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T16:15:19.895Z — VERIFY — ok

By: CODER

Note: doctor now reports branch_pr batch included-task closure drift.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:12:51.021Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-03T16:19:35.609Z — VERIFY — ok

By: CODER

Note: Batch drift diagnostics implemented and verified on current HEAD. Checks: focused doctor test, typecheck, format:check, check:types-files, git diff --check, policy routing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:15:19.914Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added a doctor check for DONE/MERGED primary batch tasks whose included task ids are missing, still open, or not closed at the same merge commit.
  Impact: The old CMO failure mode becomes visible as an explicit diagnostic instead of requiring manual task-by-task status inspection.
  Resolution: Verification: bun test packages/agentplane/src/commands/doctor.command.open-pr.test.ts --test-name-pattern 'closed branch_pr batch'; bun run typecheck; bun run format:check; bun run check:types-files; git diff --check; node .agentplane/policy/check-routing.mjs.
