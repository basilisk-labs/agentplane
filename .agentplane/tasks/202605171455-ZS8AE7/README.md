---
id: "202605171455-ZS8AE7"
title: "Configurable branch naming contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/commands/branch/work-start.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T14:56:04.456Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:38:08.983Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 5 files, 75 tests passed. Command: bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; Result: pass; Evidence: 2 files, 8 tests passed. Command: bun scripts/generate/sync-schemas.mjs check; Result: pass; Evidence: schemas OK. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: exit 0 with 2 pre-existing branch_pr drift warnings. Command: git diff --check; Result: pass. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement configurable branch naming in isolated worktree task/202605171455-ZS8AE7/branch-naming-contract; preserve current defaults while adding repo-level task close prefix configuration and focused tests."
events:
  -
    type: "status"
    at: "2026-05-17T17:11:05.042Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement configurable branch naming in isolated worktree task/202605171455-ZS8AE7/branch-naming-contract; preserve current defaults while adding repo-level task close prefix configuration and focused tests."
  -
    type: "verify"
    at: "2026-05-17T17:38:08.983Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 5 files, 75 tests passed. Command: bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; Result: pass; Evidence: 2 files, 8 tests passed. Command: bun scripts/generate/sync-schemas.mjs check; Result: pass; Evidence: schemas OK. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: exit 0 with 2 pre-existing branch_pr drift warnings. Command: git diff --check; Result: pass. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0."
doc_version: 3
doc_updated_at: "2026-05-17T17:38:09.015Z"
doc_updated_by: "CODER"
description: "Add repository-level configuration for branch_pr task and close branch prefixes, centralize branch naming/parsing helpers, and document the strict branch/worktree naming contract."
sections:
  Summary: |-
    Configurable branch naming contract

    Add repository-level configuration for branch_pr task and close branch prefixes, centralize branch naming/parsing helpers, and document the strict branch/worktree naming contract.
  Scope: |-
    - In scope: Add repository-level configuration for branch_pr task and close branch prefixes, centralize branch naming/parsing helpers, and document the strict branch/worktree naming contract.
    - Out of scope: unrelated refactors not required for "Configurable branch naming contract".
  Plan: "Implement configurable branch naming in the existing branch_pr model. Scope: add branch.task_close_prefix config with validation/defaults; centralize task branch and close branch build/parse helpers; update work start, finish close-tail, hosted-close/pr-flow, cleanup, hooks and docs to use configured prefixes; preserve current defaults task/<task-id>/<slug>, task-close/<task-id>/<sha12>, and paths.worktrees_dir/<task-id>-<slug>; add focused regression coverage for defaults and override behavior."
  Verify Steps: |-
    1. Run `bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: config/schema, branch naming helpers, work start, close-tail, and cleanup merged routes pass.
    2. Run `bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: hosted-close and release evidence scripts keep default behavior while accepting configured close branch prefixes.
    3. Run `bun scripts/generate/sync-schemas.mjs check`. Expected: generated schema artifacts match runtime schema.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
    5. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: command exits 0; unrelated existing branch_pr drift may remain as warnings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:38:08.983Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 5 files, 75 tests passed. Command: bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; Result: pass; Evidence: 2 files, 8 tests passed. Command: bun scripts/generate/sync-schemas.mjs check; Result: pass; Evidence: schemas OK. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: exit 0 with 2 pre-existing branch_pr drift warnings. Command: git diff --check; Result: pass. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:37:41.181Z, excerpt_hash=sha256:5e7d881a5cb9c72d8b7918afb00c61656ea6ed6cc6367e09ff902d688d9e50ba

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/codex-branch-naming-contract/.agentplane/tasks/202605171455-ZS8AE7/blueprint/resolved-snapshot.json
    - old_digest: be29f0c27b3b6431e23b9faba1c3ec5ff3506ba78444164c6b85485bc6c22653
    - current_digest: be29f0c27b3b6431e23b9faba1c3ec5ff3506ba78444164c6b85485bc6c22653
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171455-ZS8AE7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Configurable branch naming contract

Add repository-level configuration for branch_pr task and close branch prefixes, centralize branch naming/parsing helpers, and document the strict branch/worktree naming contract.

## Scope

- In scope: Add repository-level configuration for branch_pr task and close branch prefixes, centralize branch naming/parsing helpers, and document the strict branch/worktree naming contract.
- Out of scope: unrelated refactors not required for "Configurable branch naming contract".

## Plan

Implement configurable branch naming in the existing branch_pr model. Scope: add branch.task_close_prefix config with validation/defaults; centralize task branch and close branch build/parse helpers; update work start, finish close-tail, hosted-close/pr-flow, cleanup, hooks and docs to use configured prefixes; preserve current defaults task/<task-id>/<slug>, task-close/<task-id>/<sha12>, and paths.worktrees_dir/<task-id>-<slug>; add focused regression coverage for defaults and override behavior.

## Verify Steps

1. Run `bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: config/schema, branch naming helpers, work start, close-tail, and cleanup merged routes pass.
2. Run `bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: hosted-close and release evidence scripts keep default behavior while accepting configured close branch prefixes.
3. Run `bun scripts/generate/sync-schemas.mjs check`. Expected: generated schema artifacts match runtime schema.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
5. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: command exits 0; unrelated existing branch_pr drift may remain as warnings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:38:08.983Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 5 files, 75 tests passed. Command: bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; Result: pass; Evidence: 2 files, 8 tests passed. Command: bun scripts/generate/sync-schemas.mjs check; Result: pass; Evidence: schemas OK. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: exit 0 with 2 pre-existing branch_pr drift warnings. Command: git diff --check; Result: pass. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:37:41.181Z, excerpt_hash=sha256:5e7d881a5cb9c72d8b7918afb00c61656ea6ed6cc6367e09ff902d688d9e50ba

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/codex-branch-naming-contract/.agentplane/tasks/202605171455-ZS8AE7/blueprint/resolved-snapshot.json
- old_digest: be29f0c27b3b6431e23b9faba1c3ec5ff3506ba78444164c6b85485bc6c22653
- current_digest: be29f0c27b3b6431e23b9faba1c3ec5ff3506ba78444164c6b85485bc6c22653
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171455-ZS8AE7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
