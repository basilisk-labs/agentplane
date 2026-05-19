# PR Review

Created: 2026-05-19T14:52:30.296Z

## Task

- Task: `202605191451-TFBJEG`
- Title: Fix issue #3934 maximum-assimilation lifecycle drift
- Status: DOING
- Branch: `task/202605191451-TFBJEG/fix-3934-context-lifecycle`
- Canonical task record: `.agentplane/tasks/202605191451-TFBJEG/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed: focused regression coverage exercises the schema/help drift, initialized profile switch behavior, profile-switch verification path, context check label, and direct close-commit preflight before DONE mutation.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T16:46:13.164Z
- Branch: task/202605191451-TFBJEG/fix-3934-context-lifecycle
- Head: b0c5ff20ed1f

```text
 .../blueprint/resolved-snapshot.json               | 573 +++++++++++++++++++++
 .../src/cli/run-cli.core.context-init.test.ts      |  42 ++
 ...-cli.core.lifecycle.finish-close-commit.test.ts | 145 +++++-
 .../src/commands/context/context.command.ts        |   4 +-
 .../src/commands/context/init-profile-switch.ts    |  51 ++
 packages/agentplane/src/commands/context/init.ts   |  17 +-
 .../src/commands/context/release-readiness.test.ts |  70 +++
 .../agentplane/src/commands/task/finish-execute.ts |  14 +-
 packages/agentplane/src/context/doctor.ts          |  19 +-
 packages/agentplane/src/context/verify-task.ts     |  20 +-
 .../schemas/task-readme-frontmatter.schema.json    |   1 +
 packages/core/schemas/tasks-export.schema.json     |   1 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   1 +
 .../core/src/tasks/task-artifact-schema.test.ts    |  19 +-
 .../schemas/task-readme-frontmatter.schema.json    |   1 +
 packages/spec/schemas/tasks-export.schema.json     |   1 +
 schemas/task-readme-frontmatter.schema.json        |   1 +
 schemas/tasks-export.schema.json                   |   1 +
 18 files changed, 942 insertions(+), 39 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
