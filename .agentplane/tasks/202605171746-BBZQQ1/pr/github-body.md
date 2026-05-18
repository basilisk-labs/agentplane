Task: `202605171746-BBZQQ1`
Title: Add feedback issue publish transports
Canonical task record: `.agentplane/tasks/202605171746-BBZQQ1/README.md`

## Summary

Add feedback issue publish transports

Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback.

## Scope

- In scope: Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback.
- Out of scope: unrelated refactors not required for "Add feedback issue publish transports".

## Verification

- State: ok
- Note:

```text
Post-refactor verification: split feedback issue publishing helpers below hotspot threshold after
pre-push hotspot gate caught oversized command module.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T05:20:52.881Z
- Branch: task/202605171746-BBZQQ1/feedback-issue-transports
- Head: 8842fa2a06c2

```text
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +
 docs/user/commands.mdx                             |   1 +
 docs/user/configuration.mdx                        |  15 +-
 docs/user/setup.mdx                                |  12 +-
 packages/agentplane/src/cli/error-map.ts           |  10 +
 packages/agentplane/src/cli/reason-codes.ts        |   6 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  27 ++
 .../src/cli/run-cli.core.insights-report.test.ts   |  85 +++-
 .../src/cli/run-cli/commands/init/answers.ts       |   3 +
 .../src/cli/run-cli/commands/init/execution.ts     |   3 +
 .../src/cli/run-cli/commands/init/model.ts         |   3 +
 .../src/cli/run-cli/commands/init/presets.ts       |   5 +
 .../src/cli/run-cli/commands/init/spec.ts          |  16 +
 .../commands/init/steps/advanced-settings.ts       |  16 +
 .../cli/run-cli/commands/init/steps/contracts.ts   |   1 +
 .../commands/init/steps/prompt-steps.test.ts       |   5 +-
 .../src/cli/run-cli/commands/init/write-config.ts  |   6 +
 .../insights/insights-issue-publish.test.ts        | 121 +++++
 .../commands/insights/insights-issue-publish.ts    | 189 ++++++++
 .../src/commands/insights/insights.command.ts      |  67 +--
 .../src/commands/insights/insights.spec.ts         |  10 +
 packages/core/schemas/config.schema.json           |  20 +
 packages/core/src/config/config.test.ts            |   3 +
 packages/core/src/config/schema.impl.ts            |  24 +-
 packages/spec/schemas/config.schema.json           |  20 +
 schemas/config.schema.json                         |  20 +
 27 files changed, 1184 insertions(+), 34 deletions(-)
```

</details>
