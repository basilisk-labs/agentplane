---
id: "202603251134-WR51C7"
title: "Allow branch_pr base commands to load branch-backed task README"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202603251024-2KQ7QT"
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T11:35:31.691Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T12:14:31.256Z"
  updated_by: "CODER"
  note: "Focused branch_pr coverage passed: isolated integrate fallback scenario, task-backend branch snapshot fallback, PR artifact branch fallback, reconcile warning suppression, and agentplane build all completed successfully."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproducing the fresh base-worktree branch_pr failure, then patching command-layer task loading so base commands can read branch-backed task README snapshots before merge in stacked integration flows."
events:
  -
    type: "status"
    at: "2026-03-25T11:35:32.990Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the fresh base-worktree branch_pr failure, then patching command-layer task loading so base commands can read branch-backed task README snapshots before merge in stacked integration flows."
  -
    type: "verify"
    at: "2026-03-25T12:14:31.256Z"
    author: "CODER"
    state: "ok"
    note: "Focused branch_pr coverage passed: isolated integrate fallback scenario, task-backend branch snapshot fallback, PR artifact branch fallback, reconcile warning suppression, and agentplane build all completed successfully."
doc_version: 3
doc_updated_at: "2026-03-25T12:14:31.267Z"
doc_updated_by: "CODER"
description: "Teach branch_pr base-worktree commands such as pr check and integrate to resolve task data from the task branch when the local backend README is not yet present on base, so stacked tasks can be integrated from a fresh base checkout without manual artifact seeding."
sections:
  Summary: |-
    Allow branch_pr base commands to load branch-backed task README
    
    Teach branch_pr base-worktree commands such as pr check and integrate to resolve task data from the task branch when the local backend README is not yet present on base, so stacked tasks can be integrated from a fresh base checkout without manual artifact seeding.
  Scope: |-
    - In scope: Teach branch_pr base-worktree commands such as pr check and integrate to resolve task data from the task branch when the local backend README is not yet present on base, so stacked tasks can be integrated from a fresh base checkout without manual artifact seeding.
    - Out of scope: unrelated refactors not required for "Allow branch_pr base commands to load branch-backed task README".
  Plan: |-
    1. Reproduce the branch_pr base-worktree failure path and confirm that pr check/integrate die before reading PR artifacts because loadBackendTask cannot find the task README on base.
    2. Implement the smallest command-layer fallback that loads task data from the unique matching task branch when workflow_mode=branch_pr and the local backend README is not yet present on base.
    3. Add regression coverage for pr check and integrate on a fresh base worktree, then rerun the focused branch_pr suite and retry the real stacked integrate flow.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/check.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts`. Expected: branch_pr `pr check` and `integrate` stay green when the base checkout lacks a local task README but the task branch contains the tracked artifact.
    2. Run `bun run --filter=agentplane build`. Expected: the CLI builds cleanly after the branch-backed task-loading fallback.
    3. Re-run the real stacked base-worktree flow for `202603250902-4PCA8P`. Expected: `pr check` and `integrate` no longer fail with `ENOENT ... .agentplane/tasks/<id>/README.md`, and any remaining blocker is recorded in `## Findings`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T12:14:31.256Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused branch_pr coverage passed: isolated integrate fallback scenario, task-backend branch snapshot fallback, PR artifact branch fallback, reconcile warning suppression, and agentplane build all completed successfully.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T11:35:32.992Z, excerpt_hash=sha256:8e8a09aaf6e1fb00120aeb629c4c67bcfea37acd1b4ec1b258b65e3f9ebab4ea
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow branch_pr base commands to load branch-backed task README

Teach branch_pr base-worktree commands such as pr check and integrate to resolve task data from the task branch when the local backend README is not yet present on base, so stacked tasks can be integrated from a fresh base checkout without manual artifact seeding.

## Scope

- In scope: Teach branch_pr base-worktree commands such as pr check and integrate to resolve task data from the task branch when the local backend README is not yet present on base, so stacked tasks can be integrated from a fresh base checkout without manual artifact seeding.
- Out of scope: unrelated refactors not required for "Allow branch_pr base commands to load branch-backed task README".

## Plan

1. Reproduce the branch_pr base-worktree failure path and confirm that pr check/integrate die before reading PR artifacts because loadBackendTask cannot find the task README on base.
2. Implement the smallest command-layer fallback that loads task data from the unique matching task branch when workflow_mode=branch_pr and the local backend README is not yet present on base.
3. Add regression coverage for pr check and integrate on a fresh base worktree, then rerun the focused branch_pr suite and retry the real stacked integrate flow.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/check.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts`. Expected: branch_pr `pr check` and `integrate` stay green when the base checkout lacks a local task README but the task branch contains the tracked artifact.
2. Run `bun run --filter=agentplane build`. Expected: the CLI builds cleanly after the branch-backed task-loading fallback.
3. Re-run the real stacked base-worktree flow for `202603250902-4PCA8P`. Expected: `pr check` and `integrate` no longer fail with `ENOENT ... .agentplane/tasks/<id>/README.md`, and any remaining blocker is recorded in `## Findings`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T12:14:31.256Z — VERIFY — ok

By: CODER

Note: Focused branch_pr coverage passed: isolated integrate fallback scenario, task-backend branch snapshot fallback, PR artifact branch fallback, reconcile warning suppression, and agentplane build all completed successfully.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T11:35:32.992Z, excerpt_hash=sha256:8e8a09aaf6e1fb00120aeb629c4c67bcfea37acd1b4ec1b258b65e3f9ebab4ea

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
