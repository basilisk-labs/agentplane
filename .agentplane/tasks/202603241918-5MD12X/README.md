---
id: "202603241918-5MD12X"
title: "Runner tests: add regression coverage for TERM cancellation metadata semantics"
result_summary: "Lifecycle tests now explicitly cover TERM cancellation with distinct cancel_signal and exit_signal semantics."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202603241918-BG2EQH"
tags:
  - "code"
  - "runner"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:36:17.587Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T19:37:01.212Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; new regression keeps cancel_signal distinct from exit_signal during TERM cancellation. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-5MD12X/README.md; Result: pass; Evidence: diff is limited to the new regression and task traceability. Scope: 5MD12X."
commit:
  hash: "338a2deadc1af98e6281faa9949c61dd47074862"
  message: "✨ 5MD12X code: add TERM-cancel metadata regression coverage"
comments:
  -
    author: "CODER"
    body: "Start: add focused regression coverage for the graceful SIGTERM path where the child traps TERM, exits 0, and persisted runner metadata keeps cancel_signal while exit_signal stays null."
  -
    author: "CODER"
    body: "Verified: TERM cancellation regression coverage now fixes the requested-versus-observed signal semantics."
events:
  -
    type: "status"
    at: "2026-03-24T19:34:35.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add focused regression coverage for the graceful SIGTERM path where the child traps TERM, exits 0, and persisted runner metadata keeps cancel_signal while exit_signal stays null."
  -
    type: "verify"
    at: "2026-03-24T19:37:01.212Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; new regression keeps cancel_signal distinct from exit_signal during TERM cancellation. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-5MD12X/README.md; Result: pass; Evidence: diff is limited to the new regression and task traceability. Scope: 5MD12X."
  -
    type: "status"
    at: "2026-03-24T19:37:02.106Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: TERM cancellation regression coverage now fixes the requested-versus-observed signal semantics."
doc_version: 3
doc_updated_at: "2026-03-24T19:37:02.106Z"
doc_updated_by: "CODER"
description: "Add focused lifecycle regression coverage for the TERM cancellation contract where the runner records cancel_signal while observed exit_signal may remain null."
sections:
  Summary: |-
    Runner tests: add regression coverage for TERM cancellation metadata semantics
    
    Add focused lifecycle regression coverage for the TERM cancellation contract where the runner records cancel_signal while observed exit_signal may remain null.
  Scope: |-
    - In scope: add regression coverage for TERM cancellation metadata semantics, especially the separation between requested cancel_signal and observed exit_signal.
    - Out of scope: pinning a platform-specific exit_code for shell trap behavior.
  Plan: |-
    1. Add focused regression coverage for TERM cancellation metadata semantics.
    2. Assert that cancelled runs preserve cancel_signal while allowing exit_signal to remain null.
    3. Keep the regression free of platform-specific exit_code assumptions while still checking persisted result consistency.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts. Expected: regression coverage confirms TERM cancellation can keep exit_signal null while cancel metadata stays consistent.
    2. Inspect the new regression assertions. Expected: they distinguish requested cancel signal from observed process exit signal without pinning a platform-specific shell exit code.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T19:37:01.212Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; new regression keeps cancel_signal distinct from exit_signal during TERM cancellation. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-5MD12X/README.md; Result: pass; Evidence: diff is limited to the new regression and task traceability. Scope: 5MD12X.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T19:36:17.049Z, excerpt_hash=sha256:5635108ff42a918d647aaf980c0188f89495a026b769d3ec5e2a486319619d4f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Runner tests: add regression coverage for TERM cancellation metadata semantics

Add focused lifecycle regression coverage for the TERM cancellation contract where the runner records cancel_signal while observed exit_signal may remain null.

## Scope

- In scope: add regression coverage for TERM cancellation metadata semantics, especially the separation between requested cancel_signal and observed exit_signal.
- Out of scope: pinning a platform-specific exit_code for shell trap behavior.

## Plan

1. Add focused regression coverage for TERM cancellation metadata semantics.
2. Assert that cancelled runs preserve cancel_signal while allowing exit_signal to remain null.
3. Keep the regression free of platform-specific exit_code assumptions while still checking persisted result consistency.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts. Expected: regression coverage confirms TERM cancellation can keep exit_signal null while cancel metadata stays consistent.
2. Inspect the new regression assertions. Expected: they distinguish requested cancel signal from observed process exit signal without pinning a platform-specific shell exit code.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T19:37:01.212Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 6 passed; new regression keeps cancel_signal distinct from exit_signal during TERM cancellation. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-5MD12X/README.md; Result: pass; Evidence: diff is limited to the new regression and task traceability. Scope: 5MD12X.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T19:36:17.049Z, excerpt_hash=sha256:5635108ff42a918d647aaf980c0188f89495a026b769d3ec5e2a486319619d4f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
