# PR Review

Created: 2026-04-13T09:02:37.644Z
Branch: task/202604130818-7SRWEX/release-hardening

## Summary

Harden branch_pr publish friction around PR artifacts and bootstrap

Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.

## Scope

- In scope: Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.
- Out of scope: unrelated refactors not required for "Harden branch_pr publish friction around PR artifacts and bootstrap".

## Verification

### Plan

1. Run `bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: the new task-only branch_pr commit regression passes, `pr check` stays green after task-only commits, and existing branch_pr PR-flow expectations stay green.
2. Run `bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: the new unbootstrapped-base `work start` regression passes and the created task worktree is immediately runnable with repo-local CLI.
3. From the active task worktree, run `node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..`. Expected: the command succeeds without `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1`, stale task-only branch advances no longer force tracked PR self-refresh drift, and the base release worktree can be checked through the active repo-local runtime.

### Current Status

- State: ok
- Note: Verified locally: bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..; legacy AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 path still passes.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T09:02:37.644Z
- Branch: task/202604130818-7SRWEX/release-hardening
- Head: d5d99da3dbf4

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
