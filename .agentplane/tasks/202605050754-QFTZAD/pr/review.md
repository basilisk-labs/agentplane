# PR Review

Created: 2026-05-05T07:54:54.410Z

## Task

- Task: `202605050754-QFTZAD`
- Title: Generate Obsidian task navigation
- Status: DOING
- Branch: `task/202605050754-QFTZAD/obsidian-task-index`
- Canonical task record: `.agentplane/tasks/202605050754-QFTZAD/README.md`

## Verification

- State: ok
- Note: Expanded scope to resolve task-readme review blockers. Verified Obsidian projection plus README v3 canonical sections behavior, task-store no-op handling, release evidence audit, docs gates, doctor, and ci:local:fast.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T09:12:11.669Z
- Branch: task/202605050754-QFTZAD/obsidian-task-index
- Head: 6c7e76cb3099

```text
 .gitignore                                         |   5 +
 docs/user/cli-reference.generated.mdx              |  25 ++
 docs/user/commands.mdx                             |  12 +
 docs/user/tasks-and-backends.mdx                   |  24 ++
 packages/agentplane/src/cli/release-smoke.test.ts  |  17 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/shared/task-store.test.ts         |  21 +-
 .../src/commands/shared/task-store/readme.ts       |   4 +-
 packages/agentplane/src/commands/task/index.ts     |   1 +
 .../src/commands/task/obsidian.command.ts          |  44 +++
 packages/agentplane/src/commands/task/obsidian.ts  | 345 +++++++++++++++++++++
 .../src/commands/task/obsidian.unit.test.ts        | 173 +++++++++++
 .../src/commands/workflow.task-doc.test.ts         |  27 +-
 packages/agentplane/src/commands/workflow.test.ts  |   7 +-
 .../src/runtime/shared/runtime-artifacts.ts        |   5 +
 packages/core/src/index.ts                         |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 packages/core/src/tasks/task-readme.test.ts        |  88 +++++-
 packages/core/src/tasks/task-readme.ts             |  57 +++-
 scripts/check-docs-ia.mjs                          |   6 +-
 scripts/release-task-evidence.mjs                  |   4 +-
 22 files changed, 830 insertions(+), 44 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
