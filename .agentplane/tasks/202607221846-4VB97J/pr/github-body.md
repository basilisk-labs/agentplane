Task: `202607221846-4VB97J`
Title: Align Workflow schema, migration, and runtime version contracts
Canonical task record: `.agentplane/tasks/202607221846-4VB97J/README.md`

## Summary

Align Workflow schema, migration, and runtime version contracts

Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior.

## Scope

- In scope: one Zod source of truth for supported WORKFLOW versions, generated JSON Schema and fixtures, an idempotent v1-to-v2 migrator with rollback evidence, strict rejection of unsupported future versions, and synchronized public contract documentation.
- Out of scope: unrelated workflow semantics or removal of supported v1 reading without a compatibility window.

## Verification

- State: ok
- Note:

```text
PASS after CI rework at implementation 816b1f592: 41 focused and 2216/2216 full tests pass;
hosted-equivalent static, critical, schema, docs, workflow and compatibility gates pass; independent
evaluator found no P0-P2 issues.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T02:31:14.653Z
- Branch: task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/workflow-contract.mdx               |  107 +-
 docs/user/cli-reference.generated.mdx              |   36 +
 docs/user/workflow-migration.mdx                   |   64 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |    5 +-
 .../src/cli/run-cli/command-catalog/core.ts        |    5 +
 .../src/cli/run-cli/command-loaders/core.ts        |    3 +
 .../agentplane/src/commands/doctor.fast.test.ts    |   21 +
 packages/agentplane/src/commands/doctor.run.ts     |   78 +-
 .../agentplane/src/commands/doctor/workflow.ts     |   33 +-
 .../agentplane/src/commands/upgrade.merge.test.ts  |   42 +
 .../src/commands/workflow-migrate.command.ts       |   84 +
 packages/agentplane/src/workflow-runtime/build.ts  |   15 +-
 .../src/workflow-runtime/file-ops.test.ts          |   28 +
 .../agentplane/src/workflow-runtime/file-ops.ts    |   58 +-
 packages/agentplane/src/workflow-runtime/fix.ts    |  149 +-
 packages/agentplane/src/workflow-runtime/index.ts  |    1 +
 .../agentplane/src/workflow-runtime/markdown.ts    |   20 +
 .../src/workflow-runtime/migration.test.ts         |  374 ++++
 .../agentplane/src/workflow-runtime/migration.ts   |  307 +++
 packages/agentplane/src/workflow-runtime/types.ts  |   35 +-
 .../src/workflow-runtime/validate-frontmatter.ts   |  415 ++---
 .../src/workflow-runtime/validate.test.ts          |   42 +
 .../src/workflow-runtime/validation-helpers.ts     |  110 +-
 packages/core/schemas/workflow.schema.json         | 1894 +++++++++++++++++++
 packages/core/src/config/config.test.ts            |   87 +
 packages/core/src/config/index.ts                  |   22 +
 packages/core/src/config/workflow-contract.test.ts |  120 ++
 packages/core/src/config/workflow-contract.ts      |  324 ++++
 packages/core/src/config/workflow-file.ts          |  210 ++-
 packages/core/src/schemas/index.ts                 |    7 +
 packages/spec/README.md                            |    9 +-
 packages/spec/examples/workflow-v1.json            |   21 +
 packages/spec/examples/workflow-v2.json            |   52 +
 packages/spec/schemas/workflow.schema.json         | 1894 +++++++++++++++++++
 schemas/workflow.schema.json                       | 1951 +++++++++++++++++++-
 .../v0.7-workflow-contract-candidate.json          |   69 +
 .../check-compatibility-contract-baseline.mjs      |  240 ++-
 scripts/checks/check-spec-examples.mjs             |    2 +
 scripts/generate/sync-schemas.mjs                  |   26 +-
 39 files changed, 8164 insertions(+), 796 deletions(-)
```

</details>
