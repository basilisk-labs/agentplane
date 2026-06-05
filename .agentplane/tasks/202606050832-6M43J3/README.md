---
id: "202606050832-6M43J3"
title: "Recognize legacy pre-merge closure markers after rebase merge"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hosted-close"
  - "release-blocker"
verify:
  - "agentplane task verify-show 202606050832-6M43J3"
  - "bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
  - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts"
  - "bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check"
  - "bun run --filter=agentplane typecheck"
  - "bun run --filter=agentplane build"
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T08:32:52.529Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T08:38:37.687Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current, code_pr evidence required. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing hosted-close legacy pre-merge markers without pr_number and persisting pr_number in new pre-merge closure markers. Release remains blocked until this task lands and hosted-close is green."
events:
  -
    type: "status"
    at: "2026-06-05T08:33:23.505Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing hosted-close legacy pre-merge markers without pr_number and persisting pr_number in new pre-merge closure markers. Release remains blocked until this task lands and hosted-close is green."
  -
    type: "verify"
    at: "2026-06-05T08:38:37.687Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current, code_pr evidence required. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated."
doc_version: 3
doc_updated_at: "2026-06-05T08:38:37.901Z"
doc_updated_by: "CODER"
description: "Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct."
sections:
  Summary: |-
    Recognize legacy pre-merge closure markers after rebase merge

    Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
  Scope: |-
    - In scope: Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
    - Out of scope: unrelated refactors not required for "Recognize legacy pre-merge closure markers after rebase merge".
  Plan: "Fix remaining hosted-close pre-merge marker semantics. Scope: hosted-close command, finish pre-merge marker writer, and focused tests. Steps: (1) update hosted-close so legacy pre_merge_closure markers without pr_number can no-op when the DONE task, meta.branch, marker.branch, and merged PR source branch all match, even when marker.basis_commit is the pre-finish branch head instead of task.commit.hash; keep explicit mismatched pr_number rejection; (2) update finish pre-merge marker writing to preserve meta.pr_number when available; (3) add focused regression tests for legacy no-pr marker with distinct task commit and marker basis, mismatched PR rejection, and marker pr_number persistence; (4) run verify-show, focused vitest, Prettier check, eslint, typecheck/build, hosted PR checks; (5) finish with pre-merge closure and integrate before release."
  Verify Steps: |-
    1. Run `agentplane task verify-show 202606050832-6M43J3`. Expected: blueprint is `quality.regression`, snapshot is current, and required evidence matches code regression scope.
    2. Run `bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: legacy no-PR pre-merge marker, explicit PR mismatch rejection, and marker pr_number persistence tests pass.
    3. Run `node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts`. Expected: lint passes on touched files.
    4. Run `bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check`. Expected: formatting passes.
    5. Run `bun run --filter=agentplane typecheck` and `bun run --filter=agentplane build`. Expected: TypeScript and package build pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T08:38:37.687Z — VERIFY — ok

    By: CODER

    Note: Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current, code_pr evidence required. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T08:37:10.393Z, excerpt_hash=sha256:5d5617e03d28e17fc9d1706b85adadd6d0c9a4d846909ecc3a19fea6c3dc8ebe

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050832-6M43J3-legacy-premerge-marker/.agentplane/tasks/202606050832-6M43J3/blueprint/resolved-snapshot.json
    - old_digest: e1fece02f1e52c0c915c66701593703f93f22ece518cb7b35e1348f7737b6cb0
    - current_digest: e1fece02f1e52c0c915c66701593703f93f22ece518cb7b35e1348f7737b6cb0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050832-6M43J3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606050832-6M43J3
    - diagnostic_command: agentplane pr check 202606050832-6M43J3
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Recognize legacy pre-merge closure markers after rebase merge

Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.

## Scope

- In scope: Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
- Out of scope: unrelated refactors not required for "Recognize legacy pre-merge closure markers after rebase merge".

## Plan

Fix remaining hosted-close pre-merge marker semantics. Scope: hosted-close command, finish pre-merge marker writer, and focused tests. Steps: (1) update hosted-close so legacy pre_merge_closure markers without pr_number can no-op when the DONE task, meta.branch, marker.branch, and merged PR source branch all match, even when marker.basis_commit is the pre-finish branch head instead of task.commit.hash; keep explicit mismatched pr_number rejection; (2) update finish pre-merge marker writing to preserve meta.pr_number when available; (3) add focused regression tests for legacy no-pr marker with distinct task commit and marker basis, mismatched PR rejection, and marker pr_number persistence; (4) run verify-show, focused vitest, Prettier check, eslint, typecheck/build, hosted PR checks; (5) finish with pre-merge closure and integrate before release.

## Verify Steps

1. Run `agentplane task verify-show 202606050832-6M43J3`. Expected: blueprint is `quality.regression`, snapshot is current, and required evidence matches code regression scope.
2. Run `bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: legacy no-PR pre-merge marker, explicit PR mismatch rejection, and marker pr_number persistence tests pass.
3. Run `node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts`. Expected: lint passes on touched files.
4. Run `bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check`. Expected: formatting passes.
5. Run `bun run --filter=agentplane typecheck` and `bun run --filter=agentplane build`. Expected: TypeScript and package build pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T08:38:37.687Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current, code_pr evidence required. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T08:37:10.393Z, excerpt_hash=sha256:5d5617e03d28e17fc9d1706b85adadd6d0c9a4d846909ecc3a19fea6c3dc8ebe

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050832-6M43J3-legacy-premerge-marker/.agentplane/tasks/202606050832-6M43J3/blueprint/resolved-snapshot.json
- old_digest: e1fece02f1e52c0c915c66701593703f93f22ece518cb7b35e1348f7737b6cb0
- current_digest: e1fece02f1e52c0c915c66701593703f93f22ece518cb7b35e1348f7737b6cb0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050832-6M43J3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606050832-6M43J3
- diagnostic_command: agentplane pr check 202606050832-6M43J3
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
