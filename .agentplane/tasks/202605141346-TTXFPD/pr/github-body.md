Task: `202605141346-TTXFPD`
Title: Add opt-in GitHub issue feedback prompts
Canonical task record: `.agentplane/tasks/202605141346-TTXFPD/README.md`

## Summary

Add opt-in GitHub issue feedback prompts

Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics.

## Scope

- In scope: Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics.
- Out of scope: unrelated refactors not required for "Add opt-in GitHub issue feedback prompts".

## Verification

- State: ok
- Note:

```text
Re-verified after commit amend and PR creation. Current implementation commit is 43b06e622; local
checks remain passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check,
policy routing, ap doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T14:23:14.559Z
- Branch: task/202605141346-TTXFPD/feedback-issue-prompts
- Head: 43b06e622104

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  39 ++
 docs/user/configuration.mdx                        |  23 +
 .../run-cli.core.help-snap.test.ts.snap            | 103 ++--
 packages/agentplane/src/cli/error-map.test.ts      |  20 +
 packages/agentplane/src/cli/error-map.ts           |  11 +
 packages/agentplane/src/cli/reason-codes.ts        |  16 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  25 +
 .../src/cli/run-cli.core.insights-report.test.ts   |  65 ++-
 .../src/cli/run-cli/command-catalog/core.ts        |  11 +-
 .../src/cli/run-cli/command-loaders/core.ts        |   4 +
 .../src/cli/run-cli/commands/init/answers.ts       |   3 +
 .../src/cli/run-cli/commands/init/execution.ts     |   3 +
 .../src/cli/run-cli/commands/init/model.ts         |   3 +
 .../src/cli/run-cli/commands/init/presets.ts       |   5 +
 .../src/cli/run-cli/commands/init/spec.ts          |  16 +
 .../commands/init/steps/advanced-settings.ts       |  10 +
 .../cli/run-cli/commands/init/steps/contracts.ts   |   1 +
 .../src/cli/run-cli/commands/init/write-config.ts  |   2 +
 .../src/commands/insights/insights.command.ts      | 129 ++++-
 .../src/commands/insights/insights.spec.ts         |  61 ++-
 .../src/workflow-runtime/validate-frontmatter.ts   |   1 +
 packages/core/schemas/config.schema.json           |  59 +++
 packages/core/src/config/config.test.ts            |  14 +
 packages/core/src/config/config.ts                 |   1 +
 packages/core/src/config/schema.impl.ts            |  31 ++
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/spec/schemas/config.schema.json           |  59 +++
 schemas/config.schema.json                         |  59 +++
 29 files changed, 1244 insertions(+), 58 deletions(-)
```

</details>
