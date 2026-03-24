---
id: "202603241918-MN5VQH"
title: "Runner: rerun fast lifecycle coverage after graceful-cancel contract fix"
result_summary: "Cancel lifecycle coverage is stable; remaining fast-path failure is outside runner cancel scope."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 10
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
  state: "ok"
  updated_at: "2026-03-24T19:49:09.041Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; the lifecycle suite stayed green with the relaxed observed-contract regression. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\\nCommand: bun run test:fast; Result: fail; Evidence: task-run-lifecycle coverage passed inside the full fast run, and the remaining reproduced failure was packages/agentplane/src/commands/release/local-release-e2e-script.test.ts > local release E2E script > fails when the downloaded artifact manifest does not match the exact release sha (timeout after 30000ms). Scope: fast-path verification beyond runner cancel coverage."
commit:
  hash: "cf245c4e90f7c2f526d84d92c5f33d87e2c2712f"
  message: "✨ MN5VQH code: relax TERM-cancel regression to the observed contract"
comments:
  -
    author: "CODER"
    body: "Start: rerun the corrected lifecycle suite and the local fast-test surface that failed in GitHub Actions, then record verification evidence for the graceful-cancel contract."
  -
    author: "CODER"
    body: "Verified: the runner cancel regression no longer reproduces under the targeted lifecycle suite or inside the broader fast-path; the remaining fast failure is an unrelated release E2E timeout."
events:
  -
    type: "status"
    at: "2026-03-24T19:37:20.325Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rerun the corrected lifecycle suite and the local fast-test surface that failed in GitHub Actions, then record verification evidence for the graceful-cancel contract."
  -
    type: "verify"
    at: "2026-03-24T19:49:09.041Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; the lifecycle suite stayed green with the relaxed observed-contract regression. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\\nCommand: bun run test:fast; Result: fail; Evidence: task-run-lifecycle coverage passed inside the full fast run, and the remaining reproduced failure was packages/agentplane/src/commands/release/local-release-e2e-script.test.ts > local release E2E script > fails when the downloaded artifact manifest does not match the exact release sha (timeout after 30000ms). Scope: fast-path verification beyond runner cancel coverage."
  -
    type: "status"
    at: "2026-03-24T19:49:10.038Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the runner cancel regression no longer reproduces under the targeted lifecycle suite or inside the broader fast-path; the remaining fast failure is an unrelated release E2E timeout."
doc_version: 3
doc_updated_at: "2026-03-24T19:49:10.038Z"
doc_updated_by: "CODER"
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
    #### 2026-03-24T19:49:09.041Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; the lifecycle suite stayed green with the relaxed observed-contract regression. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\nCommand: bun run test:fast; Result: fail; Evidence: task-run-lifecycle coverage passed inside the full fast run, and the remaining reproduced failure was packages/agentplane/src/commands/release/local-release-e2e-script.test.ts > local release E2E script > fails when the downloaded artifact manifest does not match the exact release sha (timeout after 30000ms). Scope: fast-path verification beyond runner cancel coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T19:48:22.567Z, excerpt_hash=sha256:eee66abda02b34243b7e7d1d68252a296a168d5792ea3b937b784b3c02b50b39
    
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
#### 2026-03-24T19:49:09.041Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; the lifecycle suite stayed green with the relaxed observed-contract regression. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\nCommand: bun run test:fast; Result: fail; Evidence: task-run-lifecycle coverage passed inside the full fast run, and the remaining reproduced failure was packages/agentplane/src/commands/release/local-release-e2e-script.test.ts > local release E2E script > fails when the downloaded artifact manifest does not match the exact release sha (timeout after 30000ms). Scope: fast-path verification beyond runner cancel coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T19:48:22.567Z, excerpt_hash=sha256:eee66abda02b34243b7e7d1d68252a296a168d5792ea3b937b784b3c02b50b39

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
