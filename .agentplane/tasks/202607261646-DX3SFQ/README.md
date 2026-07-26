---
id: "202607261646-DX3SFQ"
title: "Allow targeted cleanup of registered sibling task worktrees"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T16:47:36.201Z"
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
    at: "2026-07-26T16:48:58.198Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-26T17:29:08.860Z"
doc_updated_by: "CODER"
description: "Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests."
sections:
  Summary: |-
    Allow targeted cleanup of registered sibling task worktrees

    Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
  Scope: |-
    - In scope: Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
    - Out of scope: unrelated refactors not required for "Allow targeted cleanup of registered sibling task worktrees".
  Plan: |-
    1. Trace cleanup candidate derivation and prove the exact task worktree comes from the repository's registered worktree list.
    2. Permit only explicit targeted/finalize cleanup of a registered sibling task worktree with the same Git common directory; preserve rejection for arbitrary external, foreign, current, and dirty worktrees.
    3. Add regression coverage for the clean sibling-base finalization route and retain negative security coverage.
    4. Run focused cleanup tests, typecheck, lifecycle invariants, guards, routing validation, and relevant full CI.
  Verify Steps: |-
    1. Run the targeted finalize regression from a clean sibling base checkout. Expected: an exact branch-to-canonical-path registration under a separately registered base worktree with the same Git common directory is removed only for `cleanup merged --task-id <id> --finalize`.
    2. Exercise the negative matrix. Expected: broad cleanup, targeted non-finalize cleanup, foreign or arbitrary external hints, discovery-path mismatch, current checkout, dirty worktree, and changed expected head do not remove a worktree, branch, or external directory.
    3. Run the focused matrix exactly: `bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.remote.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --no-file-parallelism --reporter=dot`. Expected: registered sibling acceptance and all fail-closed cases pass.
    4. Run `bun run typecheck`, `bun run lifecycle:invariants`, `bun run guards:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: the focused security fix preserves repository contracts.
    5. Run `AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast`. Expected: the capacity-normalized fast suite passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "ed2c279623dd429edd121a41e0fc0d8057bdab91"
    version: 1
id_source: "generated"
---
## Summary

Allow targeted cleanup of registered sibling task worktrees

Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.

## Scope

- In scope: Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
- Out of scope: unrelated refactors not required for "Allow targeted cleanup of registered sibling task worktrees".

## Plan

1. Trace cleanup candidate derivation and prove the exact task worktree comes from the repository's registered worktree list.
2. Permit only explicit targeted/finalize cleanup of a registered sibling task worktree with the same Git common directory; preserve rejection for arbitrary external, foreign, current, and dirty worktrees.
3. Add regression coverage for the clean sibling-base finalization route and retain negative security coverage.
4. Run focused cleanup tests, typecheck, lifecycle invariants, guards, routing validation, and relevant full CI.

## Verify Steps

1. Run the targeted finalize regression from a clean sibling base checkout. Expected: an exact branch-to-canonical-path registration under a separately registered base worktree with the same Git common directory is removed only for `cleanup merged --task-id <id> --finalize`.
2. Exercise the negative matrix. Expected: broad cleanup, targeted non-finalize cleanup, foreign or arbitrary external hints, discovery-path mismatch, current checkout, dirty worktree, and changed expected head do not remove a worktree, branch, or external directory.
3. Run the focused matrix exactly: `bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.remote.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --no-file-parallelism --reporter=dot`. Expected: registered sibling acceptance and all fail-closed cases pass.
4. Run `bun run typecheck`, `bun run lifecycle:invariants`, `bun run guards:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: the focused security fix preserves repository contracts.
5. Run `AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast`. Expected: the capacity-normalized fast suite passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
