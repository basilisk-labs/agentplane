---
id: "202605022153-93GVV1"
title: "Unify git commit and PR message format"
result_summary: "Merged via PR #781."
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T21:53:29.951Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T22:18:45.061Z"
  updated_by: "ORCHESTRATOR"
  note: "Command: agentplane task verify-show 202605022153-93GVV1; Result: pass; Evidence: verify checklist displayed. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 23 tests passed. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: agentplane preflight --json; Result: pass with expected dirty-worktree/task-artifact warnings; Evidence: message_format_guard ok."
commit:
  hash: "2b521bee46533af0c4a2264885e71d6110672c03"
  message: "Merge pull request #781 from basilisk-labs/task/202605022153-93GVV1/git-message-format"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implementing unified message format across task commits and PR artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #781 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-02T21:53:30.154Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing unified message format across task commits and PR artifacts."
  -
    type: "verify"
    at: "2026-05-02T22:18:45.061Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Command: agentplane task verify-show 202605022153-93GVV1; Result: pass; Evidence: verify checklist displayed. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 23 tests passed. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: agentplane preflight --json; Result: pass with expected dirty-worktree/task-artifact warnings; Evidence: message_format_guard ok."
  -
    type: "status"
    at: "2026-05-02T22:41:21.666Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #781 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-02T22:41:21.672Z"
doc_updated_by: "INTEGRATOR"
description: "Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context."
sections:
  Summary: |-
    Unify git commit and PR message format
    
    Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context.
  Scope: |-
    - In scope: Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context.
    - Out of scope: unrelated refactors not required for "Unify git commit and PR message format".
  Plan: "Стандартизировать формирование git commit message и PR title/body в branch_pr и local в едином формате: emoji по типу изменений, суффикс задачи и поле с названием задачи."
  Verify Steps: |-
    1. Review the requested outcome for "Unify git commit and PR message format". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T22:18:45.061Z — VERIFY — ok
    
    By: ORCHESTRATOR
    
    Note: Command: agentplane task verify-show 202605022153-93GVV1; Result: pass; Evidence: verify checklist displayed. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 23 tests passed. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: agentplane preflight --json; Result: pass with expected dirty-worktree/task-artifact warnings; Evidence: message_format_guard ok.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:53:30.154Z, excerpt_hash=sha256:0c6b5a4b14045e35b0e66f6b02eaf2f27bb9c1580f96804c3d33e59e90d3f1e9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify git commit and PR message format

Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context.

## Scope

- In scope: Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context.
- Out of scope: unrelated refactors not required for "Unify git commit and PR message format".

## Plan

Стандартизировать формирование git commit message и PR title/body в branch_pr и local в едином формате: emoji по типу изменений, суффикс задачи и поле с названием задачи.

## Verify Steps

1. Review the requested outcome for "Unify git commit and PR message format". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T22:18:45.061Z — VERIFY — ok

By: ORCHESTRATOR

Note: Command: agentplane task verify-show 202605022153-93GVV1; Result: pass; Evidence: verify checklist displayed. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 23 tests passed. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: agentplane preflight --json; Result: pass with expected dirty-worktree/task-artifact warnings; Evidence: message_format_guard ok.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:53:30.154Z, excerpt_hash=sha256:0c6b5a4b14045e35b0e66f6b02eaf2f27bb9c1580f96804c3d33e59e90d3f1e9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
