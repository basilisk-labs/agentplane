---
id: "202604062308-VV2MBB"
title: "Stabilize worktree fast CI against uv_cwd worker failures"
result_summary: "integrate: squash task/202604062308-VV2MBB/worktree-fast-ci-cwd"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T23:08:43.846Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T00:12:52.667Z"
  updated_by: "CODER"
  note: "Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in the published worktree branch without uv_cwd/ENOENT failures."
commit:
  hash: "525b61e50ad6e586988e31acc4d99747c0456a54"
  message: "📝 VV2MBB task: add tracked PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the worktree uv_cwd worker crash from fast pre-push/ci, fix the cwd lifecycle in the failing tests or helpers, and lock the publish path with regression coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604062308-VV2MBB/pr."
events:
  -
    type: "status"
    at: "2026-04-06T23:09:02.811Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the worktree uv_cwd worker crash from fast pre-push/ci, fix the cwd lifecycle in the failing tests or helpers, and lock the publish path with regression coverage."
  -
    type: "verify"
    at: "2026-04-07T00:11:29.588Z"
    author: "CODER"
    state: "ok"
    note: "Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in a bootstrap-ready worktree without uv_cwd/ENOENT failures."
  -
    type: "verify"
    at: "2026-04-07T00:12:52.667Z"
    author: "CODER"
    state: "ok"
    note: "Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in the published worktree branch without uv_cwd/ENOENT failures."
  -
    type: "status"
    at: "2026-04-07T00:29:59.536Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604062308-VV2MBB/pr."
doc_version: 3
doc_updated_at: "2026-04-07T00:29:59.545Z"
doc_updated_by: "INTEGRATOR"
description: "Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT."
sections:
  Summary: |-
    Stabilize worktree fast CI against uv_cwd worker failures
    
    Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT.
  Scope: |-
    - In scope: Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT.
    - Out of scope: unrelated refactors not required for "Stabilize worktree fast CI against uv_cwd worker failures".
  Plan: "1. Reproduce the worktree fast-CI failure and localize which tests or helpers leave vitest workers without a valid cwd. 2. Fix the underlying cwd lifecycle so hook/ci runs remain stable in worktrees. 3. Add regression coverage for the failing path and verify with the smallest sufficient hook/CI slice."
  Verify Steps: |-
    1. Reproduce the worktree failure with `bun run ci:local:fast` or the equivalent pre-push hook path from a task worktree. Expected: before the fix the failure is attributable to the uv_cwd ENOENT path, and after the fix the command completes without worker cwd crashes.
    2. Run focused vitest coverage for the touched tests/helpers that previously mutated or deleted cwd state. Expected: the targeted suite passes and no worker reports uv_cwd ENOENT.
    3. Run eslint on the touched source/tests/scripts. Expected: lint exits 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T00:11:29.588Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in a bootstrap-ready worktree without uv_cwd/ENOENT failures.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:09:02.838Z, excerpt_hash=sha256:c0b58a4368546c247a13e882ca37149a77a84f322f30db24e3e91a72532918ac
    
    ### 2026-04-07T00:12:52.667Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in the published worktree branch without uv_cwd/ENOENT failures.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T00:11:29.592Z, excerpt_hash=sha256:c0b58a4368546c247a13e882ca37149a77a84f322f30db24e3e91a72532918ac
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize worktree fast CI against uv_cwd worker failures

Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT.

## Scope

- In scope: Stop pre-push / ci:local:fast from failing in worktree checkouts when vitest workers inherit a deleted current working directory and crash with uv_cwd ENOENT.
- Out of scope: unrelated refactors not required for "Stabilize worktree fast CI against uv_cwd worker failures".

## Plan

1. Reproduce the worktree fast-CI failure and localize which tests or helpers leave vitest workers without a valid cwd. 2. Fix the underlying cwd lifecycle so hook/ci runs remain stable in worktrees. 3. Add regression coverage for the failing path and verify with the smallest sufficient hook/CI slice.

## Verify Steps

1. Reproduce the worktree failure with `bun run ci:local:fast` or the equivalent pre-push hook path from a task worktree. Expected: before the fix the failure is attributable to the uv_cwd ENOENT path, and after the fix the command completes without worker cwd crashes.
2. Run focused vitest coverage for the touched tests/helpers that previously mutated or deleted cwd state. Expected: the targeted suite passes and no worker reports uv_cwd ENOENT.
3. Run eslint on the touched source/tests/scripts. Expected: lint exits 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T00:11:29.588Z — VERIFY — ok

By: CODER

Note: Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in a bootstrap-ready worktree without uv_cwd/ENOENT failures.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:09:02.838Z, excerpt_hash=sha256:c0b58a4368546c247a13e882ca37149a77a84f322f30db24e3e91a72532918ac

### 2026-04-07T00:12:52.667Z — VERIFY — ok

By: CODER

Note: Removed global process.chdir leaks from the two worktree-sensitive tests; targeted vitest and eslint passed in the published worktree branch without uv_cwd/ENOENT failures.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T00:11:29.592Z, excerpt_hash=sha256:c0b58a4368546c247a13e882ca37149a77a84f322f30db24e3e91a72532918ac

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
