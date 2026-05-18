---
id: "202605180515-4CAK13"
title: "Fix open branch_pr feedback issues"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T05:15:21.601Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T05:26:31.780Z"
  updated_by: "CODER"
  note: "Post-commit verification refresh. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts --runInBand; Result: pass; Evidence: 1 metadata-only task artifact freshness regression passed on branch head after PR publication. Scope: issue #3854. Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: command exits 0 under Bun with 9 intentional skips instead of runner API crashes. Scope: issue #3845 raw Bun command contract. Prior full verification remains recorded in the same task README for typecheck, format, hotspot, lint, policy, Vitest unit coverage, and PR validation coverage."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement focused fixes for open GitHub issues #3853, #3854, and #3845 in the branch_pr PR-check and verification-runner contracts."
events:
  -
    type: "status"
    at: "2026-05-18T05:15:54.336Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement focused fixes for open GitHub issues #3853, #3854, and #3845 in the branch_pr PR-check and verification-runner contracts."
  -
    type: "verify"
    at: "2026-05-18T05:24:04.853Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: 9 tests skipped under Bun and command exits 0, preventing Vitest-only API crashes from issue #3845. Scope: raw Bun runner contract for the reported files. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed under Vitest. Scope: full unit coverage remains active on the supported Vitest runner. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; Result: pass; Evidence: 24 tests passed including metadata-only PR artifact freshness and branch artifact fallback coverage. Scope: issues #3853 and #3854. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: changed files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot and oversized test baseline checks passed after moving regression to focused file. Scope: CI hotspot gate. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Scope: repo lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing."
  -
    type: "verify"
    at: "2026-05-18T05:26:31.780Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification refresh. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts --runInBand; Result: pass; Evidence: 1 metadata-only task artifact freshness regression passed on branch head after PR publication. Scope: issue #3854. Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: command exits 0 under Bun with 9 intentional skips instead of runner API crashes. Scope: issue #3845 raw Bun command contract. Prior full verification remains recorded in the same task README for typecheck, format, hotspot, lint, policy, Vitest unit coverage, and PR validation coverage."
doc_version: 3
doc_updated_at: "2026-05-18T05:26:31.790Z"
doc_updated_by: "CODER"
description: "Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests."
sections:
  Summary: |-
    Fix open branch_pr feedback issues

    Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.
  Scope: |-
    - In scope: Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.
    - Out of scope: unrelated refactors not required for "Fix open branch_pr feedback issues".
  Plan: "Fix GitHub feedback issues #3853, #3854, and #3845 in one branch_pr task. Scope: inspect pr check/open metadata flow and test runner guidance; add focused regressions for base checkout PR artifact recovery, metadata-only PR identity commits preserving verification validity, and Vitest runner contract; update implementation with minimal route-specific behavior; verify with focused tests, typecheck/format/lint/hotspot/policy checks; open one PR with Fixes #3853/#3854/#3845."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand`. Expected: command exits 0 under Bun without runner API failures.
    2. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts`. Expected: Vitest executes the full unit coverage.
    3. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand`. Expected: branch_pr PR artifact hydration and metadata-only verification freshness regressions pass.
    4. Run `bun run typecheck`, `bun run format:changed`, `bun run hotspots:check`, `bun run lint:core -- packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts`, and `node .agentplane/policy/check-routing.mjs`. Expected: all exit 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T05:24:04.853Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: 9 tests skipped under Bun and command exits 0, preventing Vitest-only API crashes from issue #3845. Scope: raw Bun runner contract for the reported files. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed under Vitest. Scope: full unit coverage remains active on the supported Vitest runner. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; Result: pass; Evidence: 24 tests passed including metadata-only PR artifact freshness and branch artifact fallback coverage. Scope: issues #3853 and #3854. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: changed files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot and oversized test baseline checks passed after moving regression to focused file. Scope: CI hotspot gate. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Scope: repo lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T05:23:48.833Z, excerpt_hash=sha256:4301bb9ec143c28a96ae30087bbe3159112f5290ba8165d24dd22ade559e55b1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180515-4CAK13-fix-open-branch-pr-feedback/.agentplane/tasks/202605180515-4CAK13/blueprint/resolved-snapshot.json
    - old_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
    - current_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180515-4CAK13

    ### 2026-05-18T05:26:31.780Z — VERIFY — ok

    By: CODER

    Note: Post-commit verification refresh. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts --runInBand; Result: pass; Evidence: 1 metadata-only task artifact freshness regression passed on branch head after PR publication. Scope: issue #3854. Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: command exits 0 under Bun with 9 intentional skips instead of runner API crashes. Scope: issue #3845 raw Bun command contract. Prior full verification remains recorded in the same task README for typecheck, format, hotspot, lint, policy, Vitest unit coverage, and PR validation coverage.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T05:24:04.864Z, excerpt_hash=sha256:4301bb9ec143c28a96ae30087bbe3159112f5290ba8165d24dd22ade559e55b1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180515-4CAK13-fix-open-branch-pr-feedback/.agentplane/tasks/202605180515-4CAK13/blueprint/resolved-snapshot.json
    - old_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
    - current_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180515-4CAK13

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix open branch_pr feedback issues

Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.

## Scope

- In scope: Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.
- Out of scope: unrelated refactors not required for "Fix open branch_pr feedback issues".

## Plan

Fix GitHub feedback issues #3853, #3854, and #3845 in one branch_pr task. Scope: inspect pr check/open metadata flow and test runner guidance; add focused regressions for base checkout PR artifact recovery, metadata-only PR identity commits preserving verification validity, and Vitest runner contract; update implementation with minimal route-specific behavior; verify with focused tests, typecheck/format/lint/hotspot/policy checks; open one PR with Fixes #3853/#3854/#3845.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand`. Expected: command exits 0 under Bun without runner API failures.
2. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts`. Expected: Vitest executes the full unit coverage.
3. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand`. Expected: branch_pr PR artifact hydration and metadata-only verification freshness regressions pass.
4. Run `bun run typecheck`, `bun run format:changed`, `bun run hotspots:check`, `bun run lint:core -- packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts`, and `node .agentplane/policy/check-routing.mjs`. Expected: all exit 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T05:24:04.853Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: 9 tests skipped under Bun and command exits 0, preventing Vitest-only API crashes from issue #3845. Scope: raw Bun runner contract for the reported files. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed under Vitest. Scope: full unit coverage remains active on the supported Vitest runner. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; Result: pass; Evidence: 24 tests passed including metadata-only PR artifact freshness and branch artifact fallback coverage. Scope: issues #3853 and #3854. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: changed files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot and oversized test baseline checks passed after moving regression to focused file. Scope: CI hotspot gate. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Scope: repo lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T05:23:48.833Z, excerpt_hash=sha256:4301bb9ec143c28a96ae30087bbe3159112f5290ba8165d24dd22ade559e55b1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180515-4CAK13-fix-open-branch-pr-feedback/.agentplane/tasks/202605180515-4CAK13/blueprint/resolved-snapshot.json
- old_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
- current_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180515-4CAK13

### 2026-05-18T05:26:31.780Z — VERIFY — ok

By: CODER

Note: Post-commit verification refresh. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts --runInBand; Result: pass; Evidence: 1 metadata-only task artifact freshness regression passed on branch head after PR publication. Scope: issue #3854. Command: bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence: command exits 0 under Bun with 9 intentional skips instead of runner API crashes. Scope: issue #3845 raw Bun command contract. Prior full verification remains recorded in the same task README for typecheck, format, hotspot, lint, policy, Vitest unit coverage, and PR validation coverage.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T05:24:04.864Z, excerpt_hash=sha256:4301bb9ec143c28a96ae30087bbe3159112f5290ba8165d24dd22ade559e55b1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180515-4CAK13-fix-open-branch-pr-feedback/.agentplane/tasks/202605180515-4CAK13/blueprint/resolved-snapshot.json
- old_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
- current_digest: 7ad8eba8be3a3567e66779a809b759a0f391ad0aa79dc5ff55aa210d445331ba
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180515-4CAK13

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
