# PR Review

Created: 2026-07-23T00:32:03.635Z

## Task

- Task: `202607221846-4VB97J`
- Title: Align Workflow schema, migration, and runtime version contracts
- Status: DOING
- Branch: `task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers`
- Canonical task record: `.agentplane/tasks/202607221846-4VB97J/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T00:32:03.635Z
- Branch: task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/workflow-contract.mdx               |  106 +-
 docs/user/cli-reference.generated.mdx              |   36 +
 docs/user/workflow-migration.mdx                   |   64 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |    5 +-
 .../src/cli/run-cli/command-catalog/core.ts        |    5 +
 .../src/cli/run-cli/command-loaders/core.ts        |    3 +
 .../agentplane/src/commands/doctor.fast.test.ts    |   21 +
 packages/agentplane/src/commands/doctor.run.ts     |   78 +-
 .../agentplane/src/commands/doctor/workflow.ts     |   33 +-
 .../agentplane/src/commands/upgrade.merge.test.ts  |   44 +
 .../src/commands/workflow-migrate.command.ts       |   84 ++
 packages/agentplane/src/workflow-runtime/build.ts  |   15 +-
 .../agentplane/src/workflow-runtime/file-ops.ts    |   16 +-
 packages/agentplane/src/workflow-runtime/fix.ts    |  149 +--
 packages/agentplane/src/workflow-runtime/index.ts  |    1 +
 .../agentplane/src/workflow-runtime/markdown.ts    |   20 +
 .../src/workflow-runtime/migration.test.ts         |  260 ++++
 .../agentplane/src/workflow-runtime/migration.ts   |  267 ++++
 packages/agentplane/src/workflow-runtime/types.ts  |   35 +-
 .../src/workflow-runtime/validate-frontmatter.ts   |  415 ++-----
 .../src/workflow-runtime/validate.test.ts          |   42 +
 .../src/workflow-runtime/validation-helpers.ts     |    3 +-
 packages/core/schemas/workflow.schema.json         | 1240 +++++++++++++++++++
 packages/core/src/config/config.test.ts            |   87 ++
 packages/core/src/config/config.ts                 |   22 +
 packages/core/src/config/index.ts                  |   22 +
 packages/core/src/config/workflow-contract.test.ts |   79 ++
 packages/core/src/config/workflow-contract.ts      |  304 +++++
 packages/core/src/config/workflow-file.ts          |  208 ++--
 packages/core/src/schemas/index.ts                 |    7 +
 packages/spec/README.md                            |    9 +-
 packages/spec/examples/workflow-v1.json            |   21 +
 packages/spec/examples/workflow-v2.json            |   52 +
 packages/spec/schemas/workflow.schema.json         | 1240 +++++++++++++++++++
 schemas/workflow.schema.json                       | 1297 ++++++++++++++++++--
 .../v0.7-workflow-contract-candidate.json          |   69 ++
 .../check-compatibility-contract-baseline.mjs      |  240 +++-
 scripts/checks/check-spec-examples.mjs             |    2 +
 scripts/generate/sync-schemas.mjs                  |   23 +-
 39 files changed, 5938 insertions(+), 686 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
