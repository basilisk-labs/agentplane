Task: `202605181904-RC91FT`
Title: Fix v0.6 follow-up GitHub issues
Canonical task record: `.agentplane/tasks/202605181904-RC91FT/README.md`

## Summary

Fix v0.6 follow-up GitHub issues

Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.

## Scope

- In scope: Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
- Out of scope: unrelated refactors not required for "Fix v0.6 follow-up GitHub issues".

## Verification

- State: ok
- Note:

```text
Evaluator review: local checks and scoped diff are consistent with the approved batch plan; no
unrelated dirty artifact was staged. Awaiting hosted GitHub checks before integration.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T19:36:00.654Z
- Branch: task/202605181904-RC91FT/v06-issue-batch
- Head: bb822a0ae679

```text
 .../blueprint/resolved-snapshot.json               | 601 ++++++++++++++
 bun.lock                                           |  39 +-
 eslint.config.cjs                                  |  22 +-
 package.json                                       |   6 +-
 packages/agentplane/package.json                   |   2 +-
 .../commands/task/list.stale-upstream.unit.test.ts |  52 ++
 packages/agentplane/src/commands/task/list.ts      |  21 +
 packages/core/package.json                         |   5 +-
 packages/core/schemas/acr-v0.1.schema.json         |  27 +-
 packages/core/schemas/config.schema.json           | 914 +++++++++++----------
 packages/core/schemas/pr-meta.schema.json          |  26 +-
 packages/core/schemas/task-handoff.schema.json     |  78 +-
 .../schemas/task-readme-frontmatter.schema.json    | 183 ++++-
 packages/core/schemas/tasks-export.schema.json     | 177 +++-
 packages/core/src/config/schema.impl.ts            |  13 +-
 packages/core/src/schemas/zod-error-format.ts      |   2 +-
 .../src/tasks/task-artifact-schema.findings.ts     |   2 +-
 .../core/src/tasks/task-artifact-schema.shared.ts  |  22 +-
 packages/core/tsup.config.ts                       |   2 +-
 packages/spec/schemas/acr-v0.1.schema.json         |  27 +-
 packages/spec/schemas/config.schema.json           | 914 +++++++++++----------
 packages/spec/schemas/pr-meta.schema.json          |  26 +-
 packages/spec/schemas/task-handoff.schema.json     |  78 +-
 .../schemas/task-readme-frontmatter.schema.json    | 183 ++++-
 packages/spec/schemas/tasks-export.schema.json     | 177 +++-
 schemas/acr-v0.1.schema.json                       |  27 +-
 schemas/config.schema.json                         | 914 +++++++++++----------
 schemas/pr-meta.schema.json                        |  26 +-
 schemas/task-handoff.schema.json                   |  78 +-
 schemas/task-readme-frontmatter.schema.json        | 183 ++++-
 schemas/tasks-export.schema.json                   | 177 +++-
 tsconfig.base.json                                 |   1 +
 tsconfig.json                                      |   4 +-
 33 files changed, 3256 insertions(+), 1753 deletions(-)
```

</details>
