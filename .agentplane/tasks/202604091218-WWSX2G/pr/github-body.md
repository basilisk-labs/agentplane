## Summary

Make branch_pr integrate work without manual base-side PR artifact hydration

Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout.

## Scope

- In scope: Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout.
- Out of scope: unrelated refactors not required for "Make branch_pr integrate work without manual base-side PR artifact hydration".

## Verification

### Plan

1. Run `agentplane integrate 202604091218-WWSX2G --root /Users/densmirnov/Github/agentplane` from the base checkout while the task worktree holds the PR artifacts. Expected: the command succeeds without requiring a manual base-side `agentplane pr open`.
2. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts -t "integrate resolves the task branch from branch_pr worktree artifacts when base lacks the local task snapshot"`. Expected: the regression test passes.
3. Run `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts` and `bunx vitest run packages/agentplane/src/commands/pr/internal/pr-paths.test.ts`. Expected: both suites pass and the worktree artifact fallback stays covered.

### Current Status

- State: ok
- Note: Verified integrate recovery from task worktree artifacts; base-side pr open hydration no longer required for this scenario.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T12:30:44.721Z
- Branch: task/202604091218-WWSX2G/integrate-artifact-recovery
- Head: 0c2c2feb76d3

```text
 .agentplane/tasks/202604091218-WWSX2G/README.md    | 125 +++++++++++++++++++++
 .../tasks/202604091218-WWSX2G/pr/diffstat.txt      |   0
 .../tasks/202604091218-WWSX2G/pr/github-body.md    |  50 +++++++++
 .../tasks/202604091218-WWSX2G/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091218-WWSX2G/pr/meta.json |  14 +++
 .../tasks/202604091218-WWSX2G/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091218-WWSX2G/pr/review.md |  57 ++++++++++
 .../tasks/202604091218-WWSX2G/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |  10 +-
 .../src/commands/pr/integrate/artifacts.ts         |   6 +
 .../commands/pr/integrate/internal/prepare.test.ts |  27 +++++
 .../src/commands/pr/integrate/internal/prepare.ts  |  38 +++++--
 .../src/commands/pr/internal/pr-paths.test.ts      |  11 ++
 .../src/commands/pr/internal/pr-paths.ts           |  10 ++
 .../agentplane/src/commands/shared/task-backend.ts |  44 ++++----
 15 files changed, 355 insertions(+), 38 deletions(-)
```

</details>
