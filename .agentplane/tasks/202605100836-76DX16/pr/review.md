# PR Review

Created: 2026-05-10T11:10:39.848Z

## Task

- Task: `202605100836-76DX16`
- Title: Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED
- Status: DOING
- Branch: `task/202605100836-76DX16/git-index-lock`
- Canonical task record: `.agentplane/tasks/202605100836-76DX16/README.md`

## Verification

- State: ok
- Note: Verified E_GIT_LOCKED preflight for gitdir index.lock.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T11:42:48.320Z
- Branch: task/202605100836-76DX16/git-index-lock
- Head: 79277550c2e5

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 packages/agentplane/src/cli/cli-contract.test.ts   |   1 +
 packages/agentplane/src/cli/exit-codes.ts          |   1 +
 .../src/commands/guard/impl/allow.test.ts          |  84 ++++
 .../agentplane/src/commands/guard/impl/allow.ts    |  28 ++
 .../guard/impl/commands.commit-close.unit.test.ts  |   6 +
 .../impl/commands.commit-non-close.unit.test.ts    |   6 +
 .../src/commands/guard/impl/comment-commit.test.ts |  21 +-
 packages/agentplane/src/shared/errors.ts           |   2 +
 packages/agentplane/src/shared/git-mutation.ts     |  30 ++
 10 files changed, 683 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
