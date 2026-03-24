---
id: "202603241335-S5NTSV"
title: "Fix multiline Verify Steps updates via task doc set --text"
result_summary: "Verify Steps CLI handling is now locked by regression coverage; no underlying runtime defect reproduced in the clean shell path."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "cli"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T13:37:05.324Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: reproduce and fix the multiline Verify Steps CLI write path before touching any other lifecycle bug."
verification:
  state: "ok"
  updated_at: "2026-03-24T13:39:56.498Z"
  updated_by: "CODER"
  note: "Command: node shell repro under .agentplane/tmp/verify-steps-cli-repro ; Result: pass ; Evidence: actual multiline text, literal \\n, and --file each replaced the seeded Verify Steps default on a clean repo. Scope: real shell-facing task doc write path. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts ; Result: pass ; Evidence: 2 files, 51 tests passed. Scope: Verify Steps doc-write and adjacent task CLI behavior. Command: bun run --filter=agentplane build ; Result: pass ; Evidence: build exited 0. Scope: touched CLI test file and package build."
commit:
  hash: "ac6ca1d27ad3d27a54000d8b2636972add076c15"
  message: "✅ S5NTSV code: done"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the shell-facing multiline Verify Steps path, fix the actual doc-write behavior, and keep the diff limited to task doc/verify CLI semantics plus regression coverage."
  -
    author: "CODER"
    body: "Verified: added shell-facing regression coverage for multiline and escaped-newline Verify Steps updates after confirming the runtime path itself reproduces correctly on a clean repo."
events:
  -
    type: "status"
    at: "2026-03-24T13:37:12.989Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the shell-facing multiline Verify Steps path, fix the actual doc-write behavior, and keep the diff limited to task doc/verify CLI semantics plus regression coverage."
  -
    type: "verify"
    at: "2026-03-24T13:39:56.498Z"
    author: "CODER"
    state: "ok"
    note: "Command: node shell repro under .agentplane/tmp/verify-steps-cli-repro ; Result: pass ; Evidence: actual multiline text, literal \\n, and --file each replaced the seeded Verify Steps default on a clean repo. Scope: real shell-facing task doc write path. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts ; Result: pass ; Evidence: 2 files, 51 tests passed. Scope: Verify Steps doc-write and adjacent task CLI behavior. Command: bun run --filter=agentplane build ; Result: pass ; Evidence: build exited 0. Scope: touched CLI test file and package build."
  -
    type: "status"
    at: "2026-03-24T13:40:06.646Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added shell-facing regression coverage for multiline and escaped-newline Verify Steps updates after confirming the runtime path itself reproduces correctly on a clean repo."
doc_version: 3
doc_updated_at: "2026-03-24T13:40:06.646Z"
doc_updated_by: "CODER"
description: "Reproduce and fix the CLI path where multi-line Verify Steps passed through --text fail to replace the seeded default reliably, then cover the working shell invocation path with regression tests."
sections:
  Summary: |-
    Fix multiline Verify Steps updates via task doc set --text
    
    Reproduce and fix the CLI path where multi-line Verify Steps passed through --text fail to replace the seeded default reliably, then cover the working shell invocation path with regression tests.
  Scope: |-
    - In scope: Reproduce and fix the CLI path where multi-line Verify Steps passed through --text fail to replace the seeded default reliably, then cover the working shell invocation path with regression tests.
    - Out of scope: unrelated refactors not required for "Fix multiline Verify Steps updates via task doc set --text".
  Plan: |-
    1. Implement the change for "Fix multiline Verify Steps updates via task doc set --text".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Reproduce the multiline Verify Steps write path with a regression test or direct CLI fixture and confirm the seeded default is replaced.
    2. Run focused task doc/task verify CLI tests covering Verify Steps updates and verify-show.
    3. Run bun run --filter=agentplane build.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T13:39:56.498Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node shell repro under .agentplane/tmp/verify-steps-cli-repro ; Result: pass ; Evidence: actual multiline text, literal \n, and --file each replaced the seeded Verify Steps default on a clean repo. Scope: real shell-facing task doc write path. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts ; Result: pass ; Evidence: 2 files, 51 tests passed. Scope: Verify Steps doc-write and adjacent task CLI behavior. Command: bun run --filter=agentplane build ; Result: pass ; Evidence: build exited 0. Scope: touched CLI test file and package build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:39:56.250Z, excerpt_hash=sha256:66430212a4a04a2e76fee09c97fc3a24aafdc97a081470a9a372355aa1a8b5c0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Clean shell repro showed that actual multiline text, literal 
    , and --file all replace seeded Verify Steps correctly; the gap was missing regression coverage for the Verify Steps-specific escaped-newline path.
id_source: "generated"
---
## Summary

Fix multiline Verify Steps updates via task doc set --text

Reproduce and fix the CLI path where multi-line Verify Steps passed through --text fail to replace the seeded default reliably, then cover the working shell invocation path with regression tests.

## Scope

- In scope: Reproduce and fix the CLI path where multi-line Verify Steps passed through --text fail to replace the seeded default reliably, then cover the working shell invocation path with regression tests.
- Out of scope: unrelated refactors not required for "Fix multiline Verify Steps updates via task doc set --text".

## Plan

1. Implement the change for "Fix multiline Verify Steps updates via task doc set --text".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Reproduce the multiline Verify Steps write path with a regression test or direct CLI fixture and confirm the seeded default is replaced.
2. Run focused task doc/task verify CLI tests covering Verify Steps updates and verify-show.
3. Run bun run --filter=agentplane build.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T13:39:56.498Z — VERIFY — ok

By: CODER

Note: Command: node shell repro under .agentplane/tmp/verify-steps-cli-repro ; Result: pass ; Evidence: actual multiline text, literal \n, and --file each replaced the seeded Verify Steps default on a clean repo. Scope: real shell-facing task doc write path. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts ; Result: pass ; Evidence: 2 files, 51 tests passed. Scope: Verify Steps doc-write and adjacent task CLI behavior. Command: bun run --filter=agentplane build ; Result: pass ; Evidence: build exited 0. Scope: touched CLI test file and package build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:39:56.250Z, excerpt_hash=sha256:66430212a4a04a2e76fee09c97fc3a24aafdc97a081470a9a372355aa1a8b5c0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Clean shell repro showed that actual multiline text, literal 
, and --file all replace seeded Verify Steps correctly; the gap was missing regression coverage for the Verify Steps-specific escaped-newline path.
