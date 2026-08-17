# PR Review

Created: 2026-08-17T11:57:53.694Z

## Task

- Task: `202608171106-XFN696`
- Title: Add policy-driven autonomous side-effect authority
- Status: DOING
- Branch: `task/202608171106-XFN696/add-policy-driven-autonomous-side-effect-authori`
- Canonical task record: `.agentplane/tasks/202608171106-XFN696/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T11:57:53.694Z
- Branch: task/202608171106-XFN696/add-policy-driven-autonomous-side-effect-authori
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  30 ++++++
 docs/user/configuration.mdx                        |  48 +++++++++
 .../src/commands/task/advance.command.ts           |  16 +++
 .../commands/task/authority-grant.command.test.ts  |  26 +++++
 .../src/commands/task/authority-grant.command.ts   |  23 ++++-
 .../src/commands/task/branch-task-supervisor.ts    |  26 +++--
 .../src/commands/task/configured-authority.test.ts |  56 +++++++++++
 .../src/commands/task/configured-authority.ts      | 108 +++++++++++++++++++++
 packages/core/schemas/config.schema.json           |  45 +++++++++
 packages/core/schemas/workflow.schema.json         |  76 +++++++++++++++
 packages/core/src/config/config.test.ts            |  44 +++++++++
 packages/core/src/config/config.ts                 |   1 +
 packages/core/src/config/index.ts                  |   1 +
 packages/core/src/config/schema.impl.ts            |  34 +++++++
 packages/core/src/config/workflow-contract.ts      |   1 +
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/spec/schemas/config.schema.json           |  45 +++++++++
 packages/spec/schemas/workflow.schema.json         |  76 +++++++++++++++
 schemas/config.schema.json                         |  45 +++++++++
 schemas/workflow.schema.json                       |  76 +++++++++++++++
 20 files changed, 768 insertions(+), 11 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
