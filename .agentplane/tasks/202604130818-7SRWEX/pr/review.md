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
3. Run `bun vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000`. Expected: progress and timeout diagnostics remain observable through the process transcript, so local full-fast/pre-push release gating no longer flakes on empty stdout captures.
4. From the active task worktree, run `node packages/agentplane/bin/agentplane.js pr open 202604130818-7SRWEX --branch task/202604130818-7SRWEX/release-hardening --author CODER --root ../../..` and then `node packages/agentplane/bin/agentplane.js pr check 202604130818-7SRWEX --root ../../..`. Expected: missing branch_pr PR artifacts are rehydrated without manual cleanup, `pr check` succeeds on the current task id without `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1`, and the base release worktree remains runnable through the repo-local CLI.

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

- Updated: 2026-04-13T10:05:02.541Z
- Branch: task/202604130818-7SRWEX/release-hardening
- Head: d8e3ea934200

```text
 .agentplane/tasks/202604130818-7SRWEX/README.md    | 118 +++++++++++++++++
 packages/agentplane/bin/agentplane.js              |  61 ++++++++-
 .../agentplane/src/cli/repo-local-handoff.test.ts  |  74 ++++++-----
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 141 ++++++++++++++++++++-
 .../src/cli/run-cli.core.pr-flow.test.ts           | 117 +++++++++++++++++
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  53 +++++---
 .../agentplane/src/commands/branch/work-start.ts   |  45 ++++++-
 .../agentplane/src/commands/guard/impl/commands.ts |  83 ++++++++++++
 .../src/commands/guard/impl/commands.unit.test.ts  |  61 +++++++++
 packages/agentplane/src/commands/pr/check.ts       |   4 +
 .../src/commands/pr/integrate/cmd.test.ts          |  49 +++++++
 .../agentplane/src/commands/pr/integrate/cmd.ts    |  15 +++
 .../integrate/internal/pre-integrate-bootstrap.ts  |  50 ++++++++
 .../src/commands/pr/integrate/internal/prepare.ts  |   2 +
 .../src/commands/pr/internal/freshness.ts          |   3 +
 .../agentplane/src/commands/pr/internal/sync.ts    |   1 +
 packages/agentplane/src/commands/pr/update.ts      |   1 +
 .../commands/shared/post-commit-pr-artifacts.ts    |  40 ++++++
 .../src/commands/shared/task-local-freshness.ts    |  10 +-
 19 files changed, 861 insertions(+), 67 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
