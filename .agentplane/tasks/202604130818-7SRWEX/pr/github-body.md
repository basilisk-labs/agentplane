## Summary

Harden branch_pr publish friction around PR artifacts and bootstrap

Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.

## Scope

- In scope: Eliminate two confirmed release-path blockers: (1) PR artifact self-reference that leaves tracked changes after task commits and causes normal pre-push to fail, and (2) unbootstrapped framework/base worktrees that force global agentplane override or manual bootstrap during branch_pr/release execution.
- Out of scope: unrelated refactors not required for "Harden branch_pr publish friction around PR artifacts and bootstrap".

## Verification

- State: ok
- Note: Verified locally: bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; bun vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --no-file-parallelism --maxWorkers=1 --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js pr check 202604130750-E2J835 --root ../../..; legacy AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 path still passes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T09:08:10.789Z
- Branch: task/202604130818-7SRWEX/release-hardening
- Head: b44dca8eebb3

```text
 .agentplane/tasks/202604130818-7SRWEX/README.md    | 116 ++++++++++++++++++++
 packages/agentplane/bin/agentplane.js              |  47 ++++++++-
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 105 ++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.test.ts           | 117 +++++++++++++++++++++
 .../agentplane/src/commands/branch/work-start.ts   |  45 +++++++-
 packages/agentplane/src/commands/pr/check.ts       |   4 +
 .../src/commands/pr/integrate/internal/prepare.ts  |   2 +
 .../src/commands/pr/internal/freshness.ts          |   3 +
 .../agentplane/src/commands/pr/internal/sync.ts    |   1 +
 packages/agentplane/src/commands/pr/update.ts      |   1 +
 .../commands/shared/post-commit-pr-artifacts.ts    |  40 +++++++
 .../src/commands/shared/task-local-freshness.ts    |  10 +-
 12 files changed, 482 insertions(+), 9 deletions(-)
```

</details>
