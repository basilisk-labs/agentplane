---
id: "202603250902-4PCA8P"
title: "Make branch_pr integrate persist tracked task artifacts without extra close commit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "git"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T09:18:33.695Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T09:50:09.367Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/policy.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts. Result: pass. Evidence: 76 targeted tests across integrate, finish, guard, finalize, and git-context passed; agentplane build passed; integrate fixtures now end on a close commit that persists tracked task artifacts and the tracked tasks-index cache without a follow-up base artifact commit. Scope: branch_pr integrate/finish artifact persistence only."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Inspect branch_pr integrate and finish flow, implement the smallest coherent change that persists tracked task and PR artifacts on base without a separate artifact-only close commit, and verify the guarded workflow with focused regression coverage."
events:
  -
    type: "status"
    at: "2026-03-25T09:18:57.276Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Inspect branch_pr integrate and finish flow, implement the smallest coherent change that persists tracked task and PR artifacts on base without a separate artifact-only close commit, and verify the guarded workflow with focused regression coverage."
  -
    type: "verify"
    at: "2026-03-25T09:50:09.367Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/policy.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts. Result: pass. Evidence: 76 targeted tests across integrate, finish, guard, finalize, and git-context passed; agentplane build passed; integrate fixtures now end on a close commit that persists tracked task artifacts and the tracked tasks-index cache without a follow-up base artifact commit. Scope: branch_pr integrate/finish artifact persistence only."
doc_version: 3
doc_updated_at: "2026-03-25T09:50:09.370Z"
doc_updated_by: "CODER"
description: "Eliminate the remaining branch_pr workflow gap where integrate on base merges code but still requires a separate close commit to persist tracked task and PR artifacts. The canonical integrate/finish path should leave base in a final task-artifact state without an extra manual artifact-only commit."
sections:
  Summary: |-
    Make branch_pr integrate persist tracked task artifacts without extra close commit
    
    Eliminate the remaining branch_pr workflow gap where integrate on base merges code but still requires a separate close commit to persist tracked task and PR artifacts. The canonical integrate/finish path should leave base in a final task-artifact state without an extra manual artifact-only commit.
  Scope: |-
    - In scope: Eliminate the remaining branch_pr workflow gap where integrate on base merges code but still requires a separate close commit to persist tracked task and PR artifacts. The canonical integrate/finish path should leave base in a final task-artifact state without an extra manual artifact-only commit.
    - Out of scope: unrelated refactors not required for "Make branch_pr integrate persist tracked task artifacts without extra close commit".
  Plan: |-
    1. Inspect the branch_pr integrate and finish flow to locate where tracked task and PR artifacts are left for a separate base close commit.
    2. Update the integrate or close path so the canonical base-branch flow persists tracked task artifacts in the same guarded workflow instead of requiring a follow-up artifact-only commit.
    3. Add or extend branch_pr regression coverage for tracked local-backend task artifacts and base close behavior, then run the targeted verification suite and record evidence.
  Verify Steps: |-
    1. Run `bunx vitest run` for the branch_pr workflow suites that cover integrate, finish, and PR artifact resolution. Expected: the updated branch_pr flow passes without requiring a follow-up tracked-artifact close commit.
    2. Run `bun run --filter=agentplane build`. Expected: the CLI builds successfully after the workflow change.
    3. Reproduce or reason through the base-branch integrate/finish path on the touched fixtures. Expected: tracked task and PR artifacts are persisted by the canonical flow itself, and any residual gap is documented in `## Findings`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T09:50:09.367Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/policy.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts. Result: pass. Evidence: 76 targeted tests across integrate, finish, guard, finalize, and git-context passed; agentplane build passed; integrate fixtures now end on a close commit that persists tracked task artifacts and the tracked tasks-index cache without a follow-up base artifact commit. Scope: branch_pr integrate/finish artifact persistence only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T09:18:57.277Z, excerpt_hash=sha256:10cb2ced972d023d552da8a4dfe271e6b7a91c2e0a1195fcba6fa97d42fb6d12
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make branch_pr integrate persist tracked task artifacts without extra close commit

Eliminate the remaining branch_pr workflow gap where integrate on base merges code but still requires a separate close commit to persist tracked task and PR artifacts. The canonical integrate/finish path should leave base in a final task-artifact state without an extra manual artifact-only commit.

## Scope

- In scope: Eliminate the remaining branch_pr workflow gap where integrate on base merges code but still requires a separate close commit to persist tracked task and PR artifacts. The canonical integrate/finish path should leave base in a final task-artifact state without an extra manual artifact-only commit.
- Out of scope: unrelated refactors not required for "Make branch_pr integrate persist tracked task artifacts without extra close commit".

## Plan

1. Inspect the branch_pr integrate and finish flow to locate where tracked task and PR artifacts are left for a separate base close commit.
2. Update the integrate or close path so the canonical base-branch flow persists tracked task artifacts in the same guarded workflow instead of requiring a follow-up artifact-only commit.
3. Add or extend branch_pr regression coverage for tracked local-backend task artifacts and base close behavior, then run the targeted verification suite and record evidence.

## Verify Steps

1. Run `bunx vitest run` for the branch_pr workflow suites that cover integrate, finish, and PR artifact resolution. Expected: the updated branch_pr flow passes without requiring a follow-up tracked-artifact close commit.
2. Run `bun run --filter=agentplane build`. Expected: the CLI builds successfully after the workflow change.
3. Reproduce or reason through the base-branch integrate/finish path on the touched fixtures. Expected: tracked task and PR artifacts are persisted by the canonical flow itself, and any residual gap is documented in `## Findings`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T09:50:09.367Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/policy.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts. Result: pass. Evidence: 76 targeted tests across integrate, finish, guard, finalize, and git-context passed; agentplane build passed; integrate fixtures now end on a close commit that persists tracked task artifacts and the tracked tasks-index cache without a follow-up base artifact commit. Scope: branch_pr integrate/finish artifact persistence only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T09:18:57.277Z, excerpt_hash=sha256:10cb2ced972d023d552da8a4dfe271e6b7a91c2e0a1195fcba6fa97d42fb6d12

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
