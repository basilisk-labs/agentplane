---
id: "202604130818-7SRWEX"
title: "Harden branch_pr publish friction around PR artifacts and bootstrap"
result_summary: "integrate: squash task/202604130818-7SRWEX/release-hardening"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T08:18:39.606Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T09:02:37.408Z"
  updated_by: "CODER"
  note: "Verified locally: bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..; legacy AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 path still passes."
commit:
  hash: "7f58fec4d747c130efbec8c7cb20b7f773130d8b"
  message: "🧩 7SRWEX integrate: workflow: Harden branch_pr publish friction around PR artifacts and bootstrap"
comments:
  -
    author: "CODER"
    body: "Start: inspect PR self-reference dirt and framework checkout bootstrap gaps, then harden branch_pr release flow so normal repo-local push/workflow works without bypasses."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604130818-7SRWEX/pr."
events:
  -
    type: "status"
    at: "2026-04-13T08:19:16.060Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect PR self-reference dirt and framework checkout bootstrap gaps, then harden branch_pr release flow so normal repo-local push/workflow works without bypasses."
  -
    type: "verify"
    at: "2026-04-13T09:02:37.408Z"
    author: "CODER"
    state: "ok"
    note: "Verified locally: bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..; legacy AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 path still passes."
  -
    type: "status"
    at: "2026-04-13T10:40:30.491Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604130818-7SRWEX/pr."
doc_version: 3
doc_updated_at: "2026-04-13T10:40:30.500Z"
doc_updated_by: "INTEGRATOR"
description: "Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution."
sections:
  Summary: |-
    Harden branch_pr publish friction around PR artifacts and bootstrap
    
    Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.
  Scope: |-
    - In scope: Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.
    - Out of scope: unrelated refactors not required for "Harden branch_pr publish friction around PR artifacts and bootstrap".
  Plan: "1. Inspect branch_pr PR artifact generation and commit/push lifecycle to find why PR metadata becomes self-referential and leaves tracked dirt after task commits/pr open. 2. Inspect framework checkout bootstrap/runtime detection to find why base and nested worktrees require AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK or manual bootstrap before normal CLI execution. 3. Implement the minimal code changes needed so task branches can be committed, pushed, and operated with repo-local CLI without release-path bypasses. 4. Run targeted verification for the repaired publish/bootstrap path and record residual findings if any remain."
  Verify Steps: |-
    1. Run `bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: the new task-only branch_pr commit regression passes, `pr check` stays green after task-only commits, and existing branch_pr PR-flow expectations stay green.
    2. Run `bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: the new unbootstrapped-base `work start` regression passes and the created task worktree is immediately runnable with repo-local CLI.
    3. Run `bun vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: progress and timeout diagnostics remain observable through the process transcript, so local full-fast/pre-push release gating no longer flakes on empty stdout captures.
    4. From the active task worktree, run `node packages/agentplane/bin/agentplane.js pr open 202604130818-7SRWEX --branch task/202604130818-7SRWEX/release-hardening --author CODER --root ../../..` and then `node packages/agentplane/bin/agentplane.js pr check 202604130818-7SRWEX --root ../../..`. Expected: missing branch_pr PR artifacts are rehydrated without manual cleanup, `pr check` succeeds on the current task id without `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1`, and the base release worktree remains runnable through the repo-local CLI.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T09:02:37.408Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified locally: bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..; legacy AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 path still passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T08:19:16.081Z, excerpt_hash=sha256:e6bacad54f302b8377680e9f3858b7a858b08a86b62b5284327a413eecdcad84
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden branch_pr publish friction around PR artifacts and bootstrap

Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.

## Scope

- In scope: Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.
- Out of scope: unrelated refactors not required for "Harden branch_pr publish friction around PR artifacts and bootstrap".

## Plan

1. Inspect branch_pr PR artifact generation and commit/push lifecycle to find why PR metadata becomes self-referential and leaves tracked dirt after task commits/pr open. 2. Inspect framework checkout bootstrap/runtime detection to find why base and nested worktrees require AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK or manual bootstrap before normal CLI execution. 3. Implement the minimal code changes needed so task branches can be committed, pushed, and operated with repo-local CLI without release-path bypasses. 4. Run targeted verification for the repaired publish/bootstrap path and record residual findings if any remain.

## Verify Steps

1. Run `bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: the new task-only branch_pr commit regression passes, `pr check` stays green after task-only commits, and existing branch_pr PR-flow expectations stay green.
2. Run `bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: the new unbootstrapped-base `work start` regression passes and the created task worktree is immediately runnable with repo-local CLI.
3. Run `bun vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: progress and timeout diagnostics remain observable through the process transcript, so local full-fast/pre-push release gating no longer flakes on empty stdout captures.
4. From the active task worktree, run `node packages/agentplane/bin/agentplane.js pr open 202604130818-7SRWEX --branch task/202604130818-7SRWEX/release-hardening --author CODER --root ../../..` and then `node packages/agentplane/bin/agentplane.js pr check 202604130818-7SRWEX --root ../../..`. Expected: missing branch_pr PR artifacts are rehydrated without manual cleanup, `pr check` succeeds on the current task id without `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1`, and the base release worktree remains runnable through the repo-local CLI.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T09:02:37.408Z — VERIFY — ok

By: CODER

Note: Verified locally: bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..; legacy AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 path still passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T08:19:16.081Z, excerpt_hash=sha256:e6bacad54f302b8377680e9f3858b7a858b08a86b62b5284327a413eecdcad84

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
