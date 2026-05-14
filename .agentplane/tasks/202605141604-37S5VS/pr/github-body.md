Task: `202605141604-37S5VS`
Title: Enable feedback issue prompts by default
Canonical task record: `.agentplane/tasks/202605141604-37S5VS/README.md`

## Summary

Enable feedback issue prompts by default

Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.

## Scope

- In scope: Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
- Out of scope: unrelated refactors not required for "Enable feedback issue prompts by default".

## Verification

- State: ok
- Note:

```text
Implemented default-on feedback GitHub issue prompts with explicit opt-out commands and docs.
Verification: framework:dev:bootstrap; focused Vitest 99 passed; docs:cli:check; schemas:check;
format:check; typecheck; knip:check; lint:core; targeted ESLint for changed source/site files;
docs:site:check; policy routing check; ap doctor OK. Residual: full lint:website still reports
pre-existing Docusaurus type-aware lint errors outside changed file.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T16:17:45.619Z
- Branch: task/202605141604-37S5VS/feedback-default-on
- Head: 1b662065abfe

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 README.md                                          |  18 +
 docs/user/cli-reference.generated.mdx              |  39 ++
 docs/user/commands.mdx                             |   8 +
 docs/user/configuration.mdx                        |  25 +
 docs/user/setup.mdx                                |  24 +
 .../run-cli.core.help-snap.test.ts.snap            |   1 +
 packages/agentplane/src/cli/error-map.test.ts      |  20 +
 packages/agentplane/src/cli/error-map.ts           |  11 +
 packages/agentplane/src/cli/reason-codes.ts        |  16 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  25 +
 .../src/cli/run-cli.core.insights-report.test.ts   |  68 ++-
 .../src/cli/run-cli/command-catalog/core.ts        |  11 +-
 .../src/cli/run-cli/command-loaders/core.ts        |   4 +
 .../src/cli/run-cli/commands/init/answers.ts       |   3 +
 .../src/cli/run-cli/commands/init/execution.ts     |   3 +
 .../src/cli/run-cli/commands/init/model.ts         |   3 +
 .../src/cli/run-cli/commands/init/presets.ts       |   5 +
 .../src/cli/run-cli/commands/init/spec.ts          |  16 +
 .../commands/init/steps/advanced-settings.ts       |  10 +
 .../cli/run-cli/commands/init/steps/contracts.ts   |   1 +
 .../commands/init/steps/prompt-steps.test.ts       |   7 +-
 .../src/cli/run-cli/commands/init/write-config.ts  |   2 +
 .../src/commands/insights/insights.command.ts      | 128 ++++-
 .../src/commands/insights/insights.spec.ts         |  61 ++-
 .../src/workflow-runtime/validate-frontmatter.ts   |   1 +
 packages/core/schemas/config.schema.json           |  59 +++
 packages/core/src/config/config.test.ts            |  14 +
 packages/core/src/config/schema.impl.ts            |  31 ++
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/spec/schemas/config.schema.json           |  59 +++
 schemas/config.schema.json                         |  59 +++
 website/src/data/homepage-content.ts               |   1 +
 website/static/llms-full.txt                       | 104 +++-
 34 files changed, 1332 insertions(+), 33 deletions(-)
```

</details>
