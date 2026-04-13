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

- Updated: 2026-04-13T10:40:31.307Z
- Branch: task/202604130818-7SRWEX/release-hardening
- Head: 1eb1a5e99b47

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
 scripts/run-local-ci.mjs                           |  52 +++++---
 20 files changed, 898 insertions(+), 82 deletions(-)
```

</details>
