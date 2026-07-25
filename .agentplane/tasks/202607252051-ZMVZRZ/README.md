---
id: "202607252051-ZMVZRZ"
title: "Make merged worktree cleanup resilient to partial removal"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "correctness"
  - "v0.7"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:12:38.307Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T22:13:26.524Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-25T22:13:26.524Z"
doc_updated_by: "CODER"
description: "Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases."
sections:
  Summary: |-
    Make merged worktree cleanup resilient to partial removal

    Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.
  Scope: "In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories."
  Plan: "1. Reproduce cleanup against a clean merged worktree and inspect Git removal behavior when a path becomes unregistered before directory deletion. 2. Make cleanup remove only a proven clean task worktree atomically or report a recoverable state without orphaning it. 3. Treat a remote task branch already absent after provider merge as idempotent success. 4. Retain all dirty, current, outside-root, and expected-head race guards. 5. Add focused cleanup regressions and run cleanup, type, lint, policy, and lifecycle checks."
  Verify Steps: "1. Focused cleanup regression proves a clean proven worktree is fully removed or leaves a diagnosed recoverable state without silently dropping branch proof. 2. A remote branch missing before delete is accepted as idempotent success. 3. Dirty, outside-root, current-worktree, and expected-head race fixtures remain refused. 4. bun test packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts pass. 5. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit. This restores the previous cleanup behavior; no task branch, worktree, or remote ref is removed without its existing proof guards."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Make merged worktree cleanup resilient to partial removal

Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.

## Scope

In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories.

## Plan

1. Reproduce cleanup against a clean merged worktree and inspect Git removal behavior when a path becomes unregistered before directory deletion. 2. Make cleanup remove only a proven clean task worktree atomically or report a recoverable state without orphaning it. 3. Treat a remote task branch already absent after provider merge as idempotent success. 4. Retain all dirty, current, outside-root, and expected-head race guards. 5. Add focused cleanup regressions and run cleanup, type, lint, policy, and lifecycle checks.

## Verify Steps

1. Focused cleanup regression proves a clean proven worktree is fully removed or leaves a diagnosed recoverable state without silently dropping branch proof. 2. A remote branch missing before delete is accepted as idempotent success. 3. Dirty, outside-root, current-worktree, and expected-head race fixtures remain refused. 4. bun test packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts pass. 5. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit. This restores the previous cleanup behavior; no task branch, worktree, or remote ref is removed without its existing proof guards.

## Findings
