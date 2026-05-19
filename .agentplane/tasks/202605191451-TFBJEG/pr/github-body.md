Task: `202605191451-TFBJEG`
Title: Fix issue #3934 maximum-assimilation lifecycle drift
Canonical task record: `.agentplane/tasks/202605191451-TFBJEG/README.md`

## Summary

Fix issue #3934 maximum-assimilation lifecycle drift

Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling.

## Scope

- In scope: Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling.
- Out of scope: unrelated refactors not required for "Fix issue #3934 maximum-assimilation lifecycle drift".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed after review fix: maximum_assimilation mode no longer bypasses
source_set.files for context_assimilation tasks; focused release-readiness test, lint:core,
typecheck, framework bootstrap, and hosted PR checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T16:50:48.026Z
- Branch: task/202605191451-TFBJEG/fix-3934-context-lifecycle
- Head: ce1775ccd188

```text
 .../blueprint/resolved-snapshot.json               | 573 +++++++++++++++++++++
 .../src/cli/run-cli.core.context-init.test.ts      |  42 ++
 ...-cli.core.lifecycle.finish-close-commit.test.ts | 145 +++++-
 .../src/commands/context/context.command.ts        |   4 +-
 .../src/commands/context/init-profile-switch.ts    |  51 ++
 packages/agentplane/src/commands/context/init.ts   |  17 +-
 .../src/commands/context/release-readiness.test.ts | 111 ++++
 .../agentplane/src/commands/task/finish-execute.ts |  14 +-
 packages/agentplane/src/context/doctor.ts          |  19 +-
 packages/agentplane/src/context/verify-task.ts     |  18 +-
 .../schemas/task-readme-frontmatter.schema.json    |   1 +
 packages/core/schemas/tasks-export.schema.json     |   1 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   1 +
 .../core/src/tasks/task-artifact-schema.test.ts    |  19 +-
 .../schemas/task-readme-frontmatter.schema.json    |   1 +
 packages/spec/schemas/tasks-export.schema.json     |   1 +
 schemas/task-readme-frontmatter.schema.json        |   1 +
 schemas/tasks-export.schema.json                   |   1 +
 18 files changed, 981 insertions(+), 39 deletions(-)
```

</details>
