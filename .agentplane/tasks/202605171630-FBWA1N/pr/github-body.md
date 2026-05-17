Task: `202605171630-FBWA1N`
Title: Fix pr open publishing to inherited upstream
Canonical task record: `.agentplane/tasks/202605171630-FBWA1N/README.md`

## Summary

Fix pr open publishing to inherited upstream

Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref.

## Scope

- In scope: Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref.
- Out of scope: unrelated refactors not required for "Fix pr open publishing to inherited upstream".

## Verification

- State: ok
- Note:

```text
Focused PR-open publishing regression passed: bun test
packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail
and covers inherited origin/main upstream publishing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T16:41:41.967Z
- Branch: task/202605171630-FBWA1N/pr-open-publish-transaction
- Head: 4fbefbd338a3

```text
 .agentplane/tasks/202605171630-CXZJS8/README.md    |  92 ++++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .../cli/run-cli.core.pr-flow.pr-open.git.test.ts   | 162 ++++++-
 .../src/commands/pr/internal/sync-branch.ts        |   1 +
 packages/agentplane/src/commands/pr/open.ts        |  85 +---
 6 files changed, 1328 insertions(+), 68 deletions(-)
```

</details>
