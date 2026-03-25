---
id: "202603251024-2KQ7QT"
title: "Auto-remove task branch and worktree after successful integrate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251001-C26JTM"
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "git"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T10:24:27.550Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T10:31:45.561Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts; bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts. Result: pass. Evidence: successful integrate now deletes the merged task branch, removes repo-local task worktrees, removes temporary verify worktrees after success, keeps dry-run branches intact, and leaves failure paths untouched for recovery. Scope: post-integrate cleanup only."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing automatic removal of the integrated task branch and its repo-local worktree after a successful branch_pr integrate path, stacked on top of 4PCA8P and C26JTM while those tasks remain on the same task branch."
events:
  -
    type: "status"
    at: "2026-03-25T10:24:46.454Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing automatic removal of the integrated task branch and its repo-local worktree after a successful branch_pr integrate path, stacked on top of 4PCA8P and C26JTM while those tasks remain on the same task branch."
  -
    type: "verify"
    at: "2026-03-25T10:31:45.561Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts; bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts. Result: pass. Evidence: successful integrate now deletes the merged task branch, removes repo-local task worktrees, removes temporary verify worktrees after success, keeps dry-run branches intact, and leaves failure paths untouched for recovery. Scope: post-integrate cleanup only."
doc_version: 3
doc_updated_at: "2026-03-25T10:31:45.567Z"
doc_updated_by: "CODER"
description: "Teach branch_pr integrate to remove the integrated task branch and its repo-local worktree automatically after a successful finalize/close path, while keeping failure and dry-run behavior deterministic."
sections:
  Summary: |-
    Auto-remove task branch and worktree after successful integrate
    
    Teach branch_pr integrate to remove the integrated task branch and its repo-local worktree automatically after a successful finalize/close path, while keeping failure and dry-run behavior deterministic.
  Scope: |-
    - In scope: Teach branch_pr integrate to remove the integrated task branch and its repo-local worktree automatically after a successful finalize/close path, while keeping failure and dry-run behavior deterministic.
    - Out of scope: unrelated refactors not required for "Auto-remove task branch and worktree after successful integrate".
  Plan: |-
    1. Inspect the current integrate and worktree-cleanup flow, including where branch and worktree paths are resolved and how cleanup merged currently removes them manually.
    2. Implement automatic post-integrate cleanup for branch_pr success paths only: remove the integrated task branch and its repo-local worktree after finalize/close succeeds, while preserving dry-run and failure recovery paths.
    3. Update branch_pr tests to cover success, no-op, and non-removal semantics, then record verification evidence and refresh task-local PR artifacts.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts. Expected: integrate succeeds and automatically removes the integrated task branch and repo-local worktree only after a successful finalize path.
    2. Run bun run --filter=agentplane build. Expected: the CLI builds cleanly after the integrate cleanup change.
    3. Compare success, dry-run, and failure behavior. Expected: auto-removal is skipped on dry-run and skipped when integrate/finalize fails, leaving the branch/worktree available for recovery.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T10:31:45.561Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts; bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts. Result: pass. Evidence: successful integrate now deletes the merged task branch, removes repo-local task worktrees, removes temporary verify worktrees after success, keeps dry-run branches intact, and leaves failure paths untouched for recovery. Scope: post-integrate cleanup only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T10:24:46.456Z, excerpt_hash=sha256:5c1f79dc08d4d79a4a0ea0a407d7bb8ac8c17078b3a30cec8ca913a8fcab5b5b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Auto-remove task branch and worktree after successful integrate

Teach branch_pr integrate to remove the integrated task branch and its repo-local worktree automatically after a successful finalize/close path, while keeping failure and dry-run behavior deterministic.

## Scope

- In scope: Teach branch_pr integrate to remove the integrated task branch and its repo-local worktree automatically after a successful finalize/close path, while keeping failure and dry-run behavior deterministic.
- Out of scope: unrelated refactors not required for "Auto-remove task branch and worktree after successful integrate".

## Plan

1. Inspect the current integrate and worktree-cleanup flow, including where branch and worktree paths are resolved and how cleanup merged currently removes them manually.
2. Implement automatic post-integrate cleanup for branch_pr success paths only: remove the integrated task branch and its repo-local worktree after finalize/close succeeds, while preserving dry-run and failure recovery paths.
3. Update branch_pr tests to cover success, no-op, and non-removal semantics, then record verification evidence and refresh task-local PR artifacts.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts. Expected: integrate succeeds and automatically removes the integrated task branch and repo-local worktree only after a successful finalize path.
2. Run bun run --filter=agentplane build. Expected: the CLI builds cleanly after the integrate cleanup change.
3. Compare success, dry-run, and failure behavior. Expected: auto-removal is skipped on dry-run and skipped when integrate/finalize fails, leaving the branch/worktree available for recovery.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T10:31:45.561Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/*.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts; bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts. Result: pass. Evidence: successful integrate now deletes the merged task branch, removes repo-local task worktrees, removes temporary verify worktrees after success, keeps dry-run branches intact, and leaves failure paths untouched for recovery. Scope: post-integrate cleanup only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T10:24:46.456Z, excerpt_hash=sha256:5c1f79dc08d4d79a4a0ea0a407d7bb8ac8c17078b3a30cec8ca913a8fcab5b5b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
