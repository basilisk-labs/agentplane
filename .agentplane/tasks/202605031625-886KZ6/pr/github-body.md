Task: `202605031625-886KZ6`
Title: ACR v0.1 core schema contract

## Batch Tasks

- Primary: `202605031625-886KZ6`
- Closure policy: `all_or_fail`
- Included: `202605031625-BM686J`
- Included: `202605031626-83YQTA`
- Included: `202605031626-EQYR7H`
- Included: `202605031626-M8GRHS`
- Included: `202605031626-QPTPBD`
- Included: `202605031626-RX30C6`
- Included: `202605031626-ZN55PB`

## Summary

ACR v0.1 core schema contract

Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.

## Scope

- In scope: Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.
- Out of scope: unrelated refactors not required for "ACR v0.1 core schema contract".

## Verification

- State: ok
- Note: Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: refreshed task-local acr.json after implementation commit; digest sha256:836e5f483582c393caed74090dc9a9ee0fcc43aed8b08799e30819d1ff7cdbb7. Scope: final ACR evidence for the committed batch.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T17:24:32.400Z
- Branch: task/202605031625-886KZ6/acr-core-schema
- Head: 0e0995c9aa97

```text
 .agentplane/tasks/202605031624-H1PV7F/README.md    | 129 +++
 .agentplane/tasks/202605031625-886KZ6/acr.json     | 275 ++++++
 .agentplane/tasks/202605031625-BM686J/README.md    | 122 +++
 .agentplane/tasks/202605031626-83YQTA/README.md    | 122 +++
 .agentplane/tasks/202605031626-EQYR7H/README.md    | 122 +++
 .agentplane/tasks/202605031626-M8GRHS/README.md    | 122 +++
 .agentplane/tasks/202605031626-QPTPBD/README.md    | 121 +++
 .agentplane/tasks/202605031626-RX30C6/README.md    | 122 +++
 .agentplane/tasks/202605031626-ZN55PB/README.md    | 122 +++
 .../agent-change-record-implementation.mdx         |  16 +-
 docs/developer/architecture.mdx                    |   5 +-
 docs/developer/cli-contract.mdx                    |   2 +
 docs/user/agent-change-record.mdx                  |  20 +-
 docs/user/cli-reference.generated.mdx              | 165 ++++
 docs/user/commands.mdx                             |  11 +-
 docs/user/configuration.mdx                        |  14 +-
 docs/user/overview.mdx                             |   8 +-
 docs/user/task-lifecycle.mdx                       |  17 +-
 packages/agentplane/src/cli/run-cli.core.test.ts   |  12 +
 .../src/cli/run-cli/command-catalog/project.ts     |  20 +
 .../src/cli/run-cli/command-loaders/project.ts     |  19 +
 packages/agentplane/src/cli/run-cli/globals.ts     |   2 +-
 .../agentplane/src/commands/acr/acr.command.ts     | 994 +++++++++++++++++++++
 packages/agentplane/src/commands/finish.run.ts     |   1 +
 .../agentplane/src/commands/finish.spec.shared.ts  |   2 +
 packages/agentplane/src/commands/finish.spec.ts    |   7 +
 .../agentplane/src/commands/task/finish-execute.ts |  35 +
 .../agentplane/src/commands/task/finish-types.ts   |   1 +
 packages/core/schemas/acr-v0.1.schema.json         | 684 ++++++++++++++
 packages/core/schemas/config.schema.json           | 298 +++++-
 packages/core/src/config/config.ts                 |   1 +
 packages/core/src/config/schema.impl.ts            |  37 +
 packages/core/src/index.ts                         |   6 +
 packages/core/src/schemas/index.ts                 |   5 +
 packages/core/src/tasks/index.ts                   |   8 +
 .../core/src/tasks/task-artifact-schema.acr.ts     | 310 +++++++
 .../core/src/tasks/task-artifact-schema.test.ts    | 168 ++++
 packages/core/src/tasks/task-artifact-schema.ts    |  22 +
 packages/spec/schemas/acr-v0.1.schema.json         | 684 ++++++++++++++
 packages/spec/schemas/config.schema.json           | 298 +++++-
 scripts/sync-schemas.mjs                           |   9 +
 41 files changed, 5019 insertions(+), 119 deletions(-)
```

</details>
