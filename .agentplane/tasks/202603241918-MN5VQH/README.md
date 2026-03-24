---
id: "202603241918-MN5VQH"
title: "Runner: rerun fast lifecycle coverage after graceful-cancel contract fix"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603241918-KZ0VH9"
  - "202603241918-5MD12X"
tags:
  - "code"
  - "runner"
  - "verification"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:27:01.498Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: rerun the corrected lifecycle suite and the local fast-test surface that failed in GitHub Actions, then record verification evidence for the graceful-cancel contract."
events:
  -
    type: "status"
    at: "2026-03-24T19:37:20.325Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rerun the corrected lifecycle suite and the local fast-test surface that failed in GitHub Actions, then record verification evidence for the graceful-cancel contract."
doc_version: 3
doc_updated_at: "2026-03-24T19:48:22.567Z"
doc_updated_by: "ORCHESTRATOR"
description: "Re-run the same local fast-test surface that failed in GitHub Actions and confirm the cancel lifecycle suite stays green after the graceful-cancel contract and regression coverage are corrected."
sections:
  Summary: |-
    Runner: rerun fast lifecycle coverage after graceful-cancel contract fix
    
    Re-run the same local fast-test surface that failed in GitHub Actions and confirm the cancel lifecycle suite stays green after the graceful-cancel contract and regression coverage are corrected.
  Scope: |-
    - In scope: rerun the local fast path and targeted lifecycle coverage after the graceful-cancel fix.
    - Out of scope: new product changes beyond verification of the corrected cancel contract.
  Plan: |-
    1. Re-run the targeted lifecycle suite after the graceful-cancel contract fix and regression coverage land.
    2. Re-run the same fast-test surface that failed in GitHub Actions.
    3. Record verification evidence showing the cancel flake no longer reproduces under the corrected contract.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts. Expected: the lifecycle suite passes with the corrected graceful-cancel assertions.
    2. Run bun run test:fast. Expected: the server-side cancel assertion failure no longer reproduces in task-run-lifecycle coverage; any remaining failures are recorded explicitly with file and test name.
    3. Review the resulting evidence. Expected: verification notes clearly separate the resolved runner cancel regression from unrelated blockers outside the runner cancel scope.
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

Runner: rerun fast lifecycle coverage after graceful-cancel contract fix

Re-run the same local fast-test surface that failed in GitHub Actions and confirm the cancel lifecycle suite stays green after the graceful-cancel contract and regression coverage are corrected.

## Scope

- In scope: rerun the local fast path and targeted lifecycle coverage after the graceful-cancel fix.
- Out of scope: new product changes beyond verification of the corrected cancel contract.

## Plan

1. Re-run the targeted lifecycle suite after the graceful-cancel contract fix and regression coverage land.
2. Re-run the same fast-test surface that failed in GitHub Actions.
3. Record verification evidence showing the cancel flake no longer reproduces under the corrected contract.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts. Expected: the lifecycle suite passes with the corrected graceful-cancel assertions.
2. Run bun run test:fast. Expected: the server-side cancel assertion failure no longer reproduces in task-run-lifecycle coverage; any remaining failures are recorded explicitly with file and test name.
3. Review the resulting evidence. Expected: verification notes clearly separate the resolved runner cancel regression from unrelated blockers outside the runner cancel scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
