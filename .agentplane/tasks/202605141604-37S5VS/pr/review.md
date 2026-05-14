# PR Review

Created: 2026-05-14T16:05:09.735Z

## Task

- Task: `202605141604-37S5VS`
- Title: Enable feedback issue prompts by default
- Status: DOING
- Branch: `task/202605141604-37S5VS/feedback-default-on`
- Canonical task record: `.agentplane/tasks/202605141604-37S5VS/README.md`

## Verification

- State: ok
- Note: Addressed blocking review thread: E_INTERNAL feedback issue next_action now respects feedback.github_issues.enabled=false. Verification: focused Vitest error-map + insights-report passed (16 tests); targeted ESLint passed; typecheck passed; format:check passed; framework:dev:bootstrap passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T16:46:16.728Z
- Branch: task/202605141604-37S5VS/feedback-default-on
- Head: dc81dd1302a7

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 README.md                                          |  18 +
 docs/user/cli-reference.generated.mdx              |  39 ++
 docs/user/commands.mdx                             |   8 +
 docs/user/configuration.mdx                        |  25 +
 docs/user/setup.mdx                                |  24 +
 .../run-cli.core.help-snap.test.ts.snap            |   1 +
 packages/agentplane/src/cli/error-map.test.ts      |  45 ++
 packages/agentplane/src/cli/error-map.ts           |  14 +
 packages/agentplane/src/cli/reason-codes.ts        |  16 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  25 +
 .../src/cli/run-cli.core.insights-report.test.ts   |  68 ++-
 packages/agentplane/src/cli/run-cli.ts             |  38 +-
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
 35 files changed, 1394 insertions(+), 37 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
