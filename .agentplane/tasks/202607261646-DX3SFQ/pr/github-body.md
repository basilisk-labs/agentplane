Task: `202607261646-DX3SFQ`
Title: Allow targeted cleanup of registered sibling task worktrees
Canonical task record: `.agentplane/tasks/202607261646-DX3SFQ/README.md`

## Summary

Allow targeted cleanup of registered sibling task worktrees

Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.

## Scope

- In scope: Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
- Out of scope: unrelated refactors not required for "Allow targeted cleanup of registered sibling task worktrees".

## Verification

- State: ok
- Note:

```text
PASS: registered sibling cleanup is allowed only in the explicit task-id plus finalize lane after
fresh Git-topology and common-directory validation; all other external paths remain fail-closed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T16:52:00.020Z
- Branch: task/202607261646-DX3SFQ/allow-targeted-cleanup-of-registered-sibling-tas
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../branch/cleanup-merged.targeted.test.ts         | 204 +++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  61 ++++-
 .../commands/shared/merged-branch-cleanup.test.ts  | 301 +++++++++++++++++++++
 .../src/commands/shared/merged-branch-cleanup.ts   | 138 +++++++++-
 4 files changed, 687 insertions(+), 17 deletions(-)
```

</details>
