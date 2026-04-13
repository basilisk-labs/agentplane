---
id: "202604131518-Z6CZ88"
title: "Auto-prune merged local task branches on post-merge"
result_summary: "integrate: squash task/202604131518-Z6CZ88/post-merge-prune-hook"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T15:18:46.252Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T15:25:36.712Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: hooks install/bootstrap now reconcile a managed post-merge hook, the post-merge hook silently no-ops off-base and prunes merged local task worktrees on base via cleanup merged, and .agentplane/bin is now ignored so shim refreshes stop dirtying framework checkouts."
commit:
  hash: "e76ae51eda7fd681338dbcb16c8427ca02fec174"
  message: "🧩 Z6CZ88 integrate: hooks/workflow: Auto-prune merged local task branches on post-merge"
comments:
  -
    author: "CODER"
    body: "Start: add a managed post-merge prune path so local merged task branches/worktrees disappear automatically after main is updated, with hook/bootstrap coverage and targeted regressions."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604131518-Z6CZ88/pr."
events:
  -
    type: "status"
    at: "2026-04-13T15:18:57.134Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a managed post-merge prune path so local merged task branches/worktrees disappear automatically after main is updated, with hook/bootstrap coverage and targeted regressions."
  -
    type: "verify"
    at: "2026-04-13T15:25:36.712Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: hooks install/bootstrap now reconcile a managed post-merge hook, the post-merge hook silently no-ops off-base and prunes merged local task worktrees on base via cleanup merged, and .agentplane/bin is now ignored so shim refreshes stop dirtying framework checkouts."
  -
    type: "status"
    at: "2026-04-13T15:36:27.242Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604131518-Z6CZ88/pr."
doc_version: 3
doc_updated_at: "2026-04-13T15:36:27.250Z"
doc_updated_by: "INTEGRATOR"
description: "Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind."
sections:
  Summary: |-
    Auto-prune merged local task branches on post-merge
    
    Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind.
  Scope: |-
    - In scope: Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind.
    - Out of scope: unrelated refactors not required for "Auto-prune merged local task branches on post-merge".
  Plan: "1. Extend managed git hooks to include a post-merge path and keep bootstrap/install behavior in sync. 2. Add a safe local prune routine that only runs on the base branch after merge/pull and removes merged task/task-close worktrees and local branches when they are no longer current. 3. Cover the new hook and prune behavior with targeted tests, then publish/merge via branch_pr and validate on the live release-hardening base checkout."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T15:25:36.712Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: hooks install/bootstrap now reconcile a managed post-merge hook, the post-merge hook silently no-ops off-base and prunes merged local task worktrees on base via cleanup merged, and .agentplane/bin is now ignored so shim refreshes stop dirtying framework checkouts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T15:18:57.150Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Auto-prune merged local task branches on post-merge

Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind.

## Scope

- In scope: Add a managed post-merge hook path that safely prunes merged local task branches/worktrees after main is updated, so protected-main releases do not leave stale local worktrees behind.
- Out of scope: unrelated refactors not required for "Auto-prune merged local task branches on post-merge".

## Plan

1. Extend managed git hooks to include a post-merge path and keep bootstrap/install behavior in sync. 2. Add a safe local prune routine that only runs on the base branch after merge/pull and removes merged task/task-close worktrees and local branches when they are no longer current. 3. Cover the new hook and prune behavior with targeted tests, then publish/merge via branch_pr and validate on the live release-hardening base checkout.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T15:25:36.712Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: hooks install/bootstrap now reconcile a managed post-merge hook, the post-merge hook silently no-ops off-base and prunes merged local task worktrees on base via cleanup merged, and .agentplane/bin is now ignored so shim refreshes stop dirtying framework checkouts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T15:18:57.150Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
