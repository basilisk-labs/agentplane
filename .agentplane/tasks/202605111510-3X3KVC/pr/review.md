# PR Review

Created: 2026-05-11T15:10:35.637Z

## Task

- Task: `202605111510-3X3KVC`
- Title: Fix git lock diagnostics and merge tests
- Status: TODO
- Branch: `task/202605111510-3X3KVC/fix-git-locks-v2`
- Canonical task record: `.agentplane/tasks/202605111510-3X3KVC/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-11T15:10:35.637Z
- Branch: task/202605111510-3X3KVC/fix-git-locks-v2
- Head: df6e4e8fdab2

```text
 docs/user/cli-reference.generated.mdx              |  29 +++
 docs/user/task-lifecycle.mdx                       |  13 +-
 docs/workflow-guides/branch-pr.mdx                 |  14 +-
 .../src/cli/run-cli/command-catalog/core.ts        |   5 +
 .../src/cli/run-cli/command-loaders/core.ts        |   3 +
 .../src/commands/doctor-git-locks.run.ts           |  45 +++++
 .../src/commands/doctor-git-locks.spec.ts          |  17 ++
 .../impl/commands.commit-non-close.unit.test.ts    |  19 +-
 .../src/commands/guard/impl/comment-commit.ts      | 111 ++++++++++-
 .../src/commands/guard/impl/commit-diagnostics.ts  |  11 +-
 .../agentplane/src/commands/guard/impl/commit.ts   | 220 ++++++++++++++++++++-
 .../src/commands/hooks/capabilities.test.ts        |   6 +-
 .../agentplane/src/commands/hooks/capabilities.ts  |   2 +-
 packages/agentplane/src/commands/hooks/run.ts      |  23 ++-
 .../commands/pr/integrate/internal/merge.test.ts   | 118 ++++++-----
 .../src/commands/pr/integrate/internal/merge.ts    | 215 +++++++++++++++++---
 .../src/shared/git-index-lock-guard.test.ts        |   8 +
 packages/agentplane/src/shared/git-mutation.ts     |  30 ++-
 18 files changed, 768 insertions(+), 121 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
