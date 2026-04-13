---
id: "202604131456-JEQT5N"
title: "Auto-prune merged task worktrees and branches after integrate"
result_summary: "Merged via PR #281."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T14:56:56.031Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T15:06:38.910Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx eslint packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: integrate still delegates through the cleanup hook, hosted-close-pr now auto-prunes the merged local task branch/worktree when safe, and the hosted-close integration regression confirms the branch disappears without breaking PR reuse/fallback flows. Scope: packages/agentplane/src/commands/shared/merged-branch-cleanup.ts, packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts, packages/agentplane/src/commands/task/hosted-close-pr.command.ts, packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
commit:
  hash: "3a2343a10f6cd122314efcf59cef1c8efb459f34"
  message: "git/workflow: Auto-prune merged task worktrees and branches after integrate (JEQT5N)"
comments:
  -
    author: "CODER"
    body: "Start: inspect branch_pr integrate and finish lifecycle to auto-prune merged task worktrees and stale local task branches without touching active checkouts or detached external worktrees."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #281 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-13T14:57:19.998Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect branch_pr integrate and finish lifecycle to auto-prune merged task worktrees and stale local task branches without touching active checkouts or detached external worktrees."
  -
    type: "verify"
    at: "2026-04-13T15:06:38.910Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx eslint packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: integrate still delegates through the cleanup hook, hosted-close-pr now auto-prunes the merged local task branch/worktree when safe, and the hosted-close integration regression confirms the branch disappears without breaking PR reuse/fallback flows. Scope: packages/agentplane/src/commands/shared/merged-branch-cleanup.ts, packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts, packages/agentplane/src/commands/task/hosted-close-pr.command.ts, packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
  -
    type: "status"
    at: "2026-04-13T15:12:57.465Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #281 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T15:12:57.471Z"
doc_updated_by: "INTEGRATOR"
description: "After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup."
sections:
  Summary: |-
    Auto-prune merged task worktrees and branches after integrate
    
    After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.
  Scope: |-
    - In scope: After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.
    - Out of scope: unrelated refactors not required for "Auto-prune merged task worktrees and branches after integrate".
  Plan: "1. Inspect the existing branch_pr integrate and finish flow to find the authoritative point where a task worktree and its local task branch become disposable. 2. Implement automatic safe cleanup after successful integration/close, explicitly skipping the current checkout, non-task branches, detached ~/.codex worktrees, and any worktree with residual tracked drift. 3. Add regression coverage for post-merge cleanup behavior and run the targeted workflow tests. 4. Summarize the remaining external GitHub permission requirement for fully automated hosted-close PR creation."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T15:06:38.910Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx eslint packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: integrate still delegates through the cleanup hook, hosted-close-pr now auto-prunes the merged local task branch/worktree when safe, and the hosted-close integration regression confirms the branch disappears without breaking PR reuse/fallback flows. Scope: packages/agentplane/src/commands/shared/merged-branch-cleanup.ts, packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts, packages/agentplane/src/commands/task/hosted-close-pr.command.ts, packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T15:06:37.570Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Hosted close automation still depends on organization-level permission to let GitHub Actions create follow-up pull requests after a merged task PR.
      Impact: The local branch/worktree cleanup step is now folded into task hosted-close-pr, but fully hands-off hosted closure still cannot complete until the permission boundary is lifted.
      Resolution: Enable GitHub Actions PR creation for this repository or move hosted-close PR creation onto an auth principal with contents:write and pull-requests:write rights.
id_source: "generated"
---
## Summary

Auto-prune merged task worktrees and branches after integrate

After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.

## Scope

- In scope: After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.
- Out of scope: unrelated refactors not required for "Auto-prune merged task worktrees and branches after integrate".

## Plan

1. Inspect the existing branch_pr integrate and finish flow to find the authoritative point where a task worktree and its local task branch become disposable. 2. Implement automatic safe cleanup after successful integration/close, explicitly skipping the current checkout, non-task branches, detached ~/.codex worktrees, and any worktree with residual tracked drift. 3. Add regression coverage for post-merge cleanup behavior and run the targeted workflow tests. 4. Summarize the remaining external GitHub permission requirement for fully automated hosted-close PR creation.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T15:06:38.910Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx eslint packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: integrate still delegates through the cleanup hook, hosted-close-pr now auto-prunes the merged local task branch/worktree when safe, and the hosted-close integration regression confirms the branch disappears without breaking PR reuse/fallback flows. Scope: packages/agentplane/src/commands/shared/merged-branch-cleanup.ts, packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts, packages/agentplane/src/commands/task/hosted-close-pr.command.ts, packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T15:06:37.570Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Hosted close automation still depends on organization-level permission to let GitHub Actions create follow-up pull requests after a merged task PR.
  Impact: The local branch/worktree cleanup step is now folded into task hosted-close-pr, but fully hands-off hosted closure still cannot complete until the permission boundary is lifted.
  Resolution: Enable GitHub Actions PR creation for this repository or move hosted-close PR creation onto an auth principal with contents:write and pull-requests:write rights.
