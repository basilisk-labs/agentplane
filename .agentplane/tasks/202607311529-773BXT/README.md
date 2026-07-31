---
id: "202607311529-773BXT"
title: "Make merged worktree cleanup idempotent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge"
  - "release"
verify:
  - "bun run format:check"
  - "bun run test:project agentplane packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T15:29:17.510Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make merged worktree cleanup idempotent when post-merge hooks already removed the task worktree and branch."
events:
  -
    type: "status"
    at: "2026-07-31T15:29:40.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make merged worktree cleanup idempotent when post-merge hooks already removed the task worktree and branch."
doc_version: 3
doc_updated_at: "2026-07-31T15:34:00.883Z"
doc_updated_by: "CODER"
description: "Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge."
sections:
  Summary: |-
    Make merged worktree cleanup idempotent

    Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
  Scope: |-
    - In scope: Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
    - Out of scope: unrelated refactors not required for "Make merged worktree cleanup idempotent".
  Plan: "1. Create an isolated post-merge worktree from the maintenance base. 2. Make merged worktree cleanup tolerate a worktree/branch already removed by the post-merge hook while preserving unexpected errors. 3. Add the exact regression and run focused tests, typecheck, format, lint, and release fast gate. 4. Open a maintenance PR, wait for hosted checks, and integrate through the serialized lane."
  Verify Steps: |-
    1. `bun run test:project agentplane packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`
       Expected: cleanup treats an already removed hook-owned worktree as complete and still surfaces genuine failures while registered.
    2. `bun run typecheck`
       Expected: TypeScript build passes.
    3. `bun run format:check`
       Expected: repository formatting passes.
    4. `bun run lint:core`
       Expected: core lint passes.
    5. `bun run release:prepublish:fast`
       Expected: release gates pass for v0.6.26.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: `cleanupMergedLocalBranch` trusted a stale `worktreePathHint` after the post-merge hook had already removed both worktree and branch, then treated `git worktree remove` exit 128 as a new integration failure.
    - Resolution: re-check branch worktree registration after a cleanup exception; suppress only the already-removed race and rethrow when the worktree remains registered.
    - Regression coverage includes both the idempotent race and the genuine-failure path.
id_source: "generated"
---
## Summary

Make merged worktree cleanup idempotent

Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.

## Scope

- In scope: Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
- Out of scope: unrelated refactors not required for "Make merged worktree cleanup idempotent".

## Plan

1. Create an isolated post-merge worktree from the maintenance base. 2. Make merged worktree cleanup tolerate a worktree/branch already removed by the post-merge hook while preserving unexpected errors. 3. Add the exact regression and run focused tests, typecheck, format, lint, and release fast gate. 4. Open a maintenance PR, wait for hosted checks, and integrate through the serialized lane.

## Verify Steps

1. `bun run test:project agentplane packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`
   Expected: cleanup treats an already removed hook-owned worktree as complete and still surfaces genuine failures while registered.
2. `bun run typecheck`
   Expected: TypeScript build passes.
3. `bun run format:check`
   Expected: repository formatting passes.
4. `bun run lint:core`
   Expected: core lint passes.
5. `bun run release:prepublish:fast`
   Expected: release gates pass for v0.6.26.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: `cleanupMergedLocalBranch` trusted a stale `worktreePathHint` after the post-merge hook had already removed both worktree and branch, then treated `git worktree remove` exit 128 as a new integration failure.
- Resolution: re-check branch worktree registration after a cleanup exception; suppress only the already-removed race and rethrow when the worktree remains registered.
- Regression coverage includes both the idempotent race and the genuine-failure path.
