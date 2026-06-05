---
id: "202606050748-TSVF5R"
title: "Tolerate rebased pre-merge closure in hosted-close"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project cli-core --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T07:48:32.525Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T07:57:28.461Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass. Review fix: missing basis tolerance now requires explicit matching pr_number."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix hosted-close pre-merge closure handling when GitHub rebase merge rewrites the original branch commit."
events:
  -
    type: "status"
    at: "2026-06-05T07:48:56.991Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix hosted-close pre-merge closure handling when GitHub rebase merge rewrites the original branch commit."
  -
    type: "verify"
    at: "2026-06-05T07:51:13.076Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass."
  -
    type: "verify"
    at: "2026-06-05T07:55:37.278Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass."
  -
    type: "verify"
    at: "2026-06-05T07:57:28.461Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass. Review fix: missing basis tolerance now requires explicit matching pr_number."
doc_version: 3
doc_updated_at: "2026-06-05T07:57:28.628Z"
doc_updated_by: "CODER"
description: "Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout."
sections:
  Summary: |-
    Tolerate rebased pre-merge closure in hosted-close

    Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout.
  Scope: |-
    - In scope: Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout.
    - Out of scope: unrelated refactors not required for "Tolerate rebased pre-merge closure in hosted-close".
  Plan: "Plan: (1) reproduce hosted-close failure from a DONE task with pre_merge_closure.basis_commit missing after GitHub rebase merge; (2) update hosted-close so already-closed pre-merge closure is treated as no-op when the basis commit is absent but task status/metadata confirms closure; (3) add focused regression; (4) verify hosted-close tests plus release-ready manifest; (5) merge through branch_pr before publish."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project cli-core --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T07:51:13.076Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T07:48:56.991Z, excerpt_hash=sha256:2d24d4148f507a220ed456ccd82365cd637eef0425ef8ad2199392b2ee615136

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050748-TSVF5R-tolerate-rebased-pre-merge-closure/.agentplane/tasks/202606050748-TSVF5R/blueprint/resolved-snapshot.json
    - old_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
    - current_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050748-TSVF5R

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606050748-TSVF5R
    - diagnostic_command: agentplane pr check 202606050748-TSVF5R
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-05T07:55:37.278Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T07:51:13.308Z, excerpt_hash=sha256:2d24d4148f507a220ed456ccd82365cd637eef0425ef8ad2199392b2ee615136

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050748-TSVF5R-tolerate-rebased-pre-merge-closure/.agentplane/tasks/202606050748-TSVF5R/blueprint/resolved-snapshot.json
    - old_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
    - current_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050748-TSVF5R

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606050748-TSVF5R
    - diagnostic_command: agentplane pr check 202606050748-TSVF5R
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-05T07:57:28.461Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass. Review fix: missing basis tolerance now requires explicit matching pr_number.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T07:55:37.449Z, excerpt_hash=sha256:2d24d4148f507a220ed456ccd82365cd637eef0425ef8ad2199392b2ee615136

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050748-TSVF5R-tolerate-rebased-pre-merge-closure/.agentplane/tasks/202606050748-TSVF5R/blueprint/resolved-snapshot.json
    - old_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
    - current_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050748-TSVF5R

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606050748-TSVF5R
    - diagnostic_command: agentplane pr check 202606050748-TSVF5R
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Task Hosted Close failed after PR #4456 rebase merge because pre_merge_closure.basis_commit referenced an original branch SHA absent from the hosted checkout.
      Impact: A correctly pre-closed branch_pr task could still leave a failed hosted-close check, adding false lifecycle uncertainty before release.
      Resolution: Hosted-close now treats a missing basis commit as acceptable for an already DONE, branch/PR-matched pre-merge closure packet.
id_source: "generated"
---
## Summary

Tolerate rebased pre-merge closure in hosted-close

Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout.

## Scope

- In scope: Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout.
- Out of scope: unrelated refactors not required for "Tolerate rebased pre-merge closure in hosted-close".

## Plan

Plan: (1) reproduce hosted-close failure from a DONE task with pre_merge_closure.basis_commit missing after GitHub rebase merge; (2) update hosted-close so already-closed pre-merge closure is treated as no-op when the basis commit is absent but task status/metadata confirms closure; (3) add focused regression; (4) verify hosted-close tests plus release-ready manifest; (5) merge through branch_pr before publish.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project cli-core --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T07:51:13.076Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T07:48:56.991Z, excerpt_hash=sha256:2d24d4148f507a220ed456ccd82365cd637eef0425ef8ad2199392b2ee615136

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050748-TSVF5R-tolerate-rebased-pre-merge-closure/.agentplane/tasks/202606050748-TSVF5R/blueprint/resolved-snapshot.json
- old_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
- current_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050748-TSVF5R

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606050748-TSVF5R
- diagnostic_command: agentplane pr check 202606050748-TSVF5R
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-05T07:55:37.278Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T07:51:13.308Z, excerpt_hash=sha256:2d24d4148f507a220ed456ccd82365cd637eef0425ef8ad2199392b2ee615136

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050748-TSVF5R-tolerate-rebased-pre-merge-closure/.agentplane/tasks/202606050748-TSVF5R/blueprint/resolved-snapshot.json
- old_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
- current_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050748-TSVF5R

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606050748-TSVF5R
- diagnostic_command: agentplane pr check 202606050748-TSVF5R
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-05T07:57:28.461Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run --filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result: pass. Review fix: missing basis tolerance now requires explicit matching pr_number.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T07:55:37.449Z, excerpt_hash=sha256:2d24d4148f507a220ed456ccd82365cd637eef0425ef8ad2199392b2ee615136

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050748-TSVF5R-tolerate-rebased-pre-merge-closure/.agentplane/tasks/202606050748-TSVF5R/blueprint/resolved-snapshot.json
- old_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
- current_digest: 7f1a8aab00caa3108a6c2ba6f722e1fdd39f577d7ce163330cbf17a018c32030
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050748-TSVF5R

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606050748-TSVF5R
- diagnostic_command: agentplane pr check 202606050748-TSVF5R
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Task Hosted Close failed after PR #4456 rebase merge because pre_merge_closure.basis_commit referenced an original branch SHA absent from the hosted checkout.
  Impact: A correctly pre-closed branch_pr task could still leave a failed hosted-close check, adding false lifecycle uncertainty before release.
  Resolution: Hosted-close now treats a missing basis commit as acceptable for an already DONE, branch/PR-matched pre-merge closure packet.
