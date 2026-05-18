# PR Review

Created: 2026-05-18T19:07:51.954Z

## Task

- Task: `202605181904-RC91FT`
- Title: Fix v0.6 follow-up GitHub issues
- Status: DOING
- Branch: `task/202605181904-RC91FT/v06-issue-batch`
- Canonical task record: `.agentplane/tasks/202605181904-RC91FT/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T19:34:13.315Z
- Branch: task/202605181904-RC91FT/v06-issue-batch
- Head: 881fcb2d510f

```text
 .../blueprint/resolved-snapshot.json               |  601 +++++++++++
 bun.lock                                           |   39 +-
 eslint.config.cjs                                  |   22 +-
 package.json                                       |    6 +-
 packages/agentplane/package.json                   |    2 +-
 .../commands/task/list.stale-upstream.unit.test.ts |   52 +
 packages/agentplane/src/commands/task/list.ts      |   21 +
 packages/core/package.json                         |    5 +-
 packages/core/schemas/acr-v0.1.schema.json         |  286 ++++-
 packages/core/schemas/config.schema.json           | 1105 ++++++++++++--------
 packages/core/schemas/pr-meta.schema.json          |   70 +-
 packages/core/schemas/task-handoff.schema.json     |  119 ++-
 .../schemas/task-readme-frontmatter.schema.json    |  338 ++++--
 packages/core/schemas/tasks-export.schema.json     |  334 ++++--
 packages/core/src/config/schema.impl.ts            |   13 +-
 packages/core/src/schemas/zod-error-format.ts      |    2 +-
 .../src/tasks/task-artifact-schema.findings.ts     |    2 +-
 .../core/src/tasks/task-artifact-schema.shared.ts  |   22 +-
 packages/core/tsup.config.ts                       |    2 +-
 packages/spec/schemas/acr-v0.1.schema.json         |  286 ++++-
 packages/spec/schemas/config.schema.json           | 1105 ++++++++++++--------
 packages/spec/schemas/pr-meta.schema.json          |   70 +-
 packages/spec/schemas/task-handoff.schema.json     |  119 ++-
 .../schemas/task-readme-frontmatter.schema.json    |  338 ++++--
 packages/spec/schemas/tasks-export.schema.json     |  334 ++++--
 schemas/acr-v0.1.schema.json                       |  286 ++++-
 schemas/config.schema.json                         | 1105 ++++++++++++--------
 schemas/pr-meta.schema.json                        |   70 +-
 schemas/task-handoff.schema.json                   |  119 ++-
 schemas/task-readme-frontmatter.schema.json        |  338 ++++--
 schemas/tasks-export.schema.json                   |  334 ++++--
 tsconfig.base.json                                 |    1 +
 tsconfig.json                                      |    4 +-
 33 files changed, 5464 insertions(+), 2086 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
