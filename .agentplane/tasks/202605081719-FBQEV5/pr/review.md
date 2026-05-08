# PR Review

Created: 2026-05-08T17:23:48.984Z

## Task

- Task: `202605081719-FBQEV5`
- Title: Blueprint catalog contracts and cache
- Status: DOING
- Branch: `task/202605081719-FBQEV5/blueprint-catalog-install`
- Canonical task record: `.agentplane/tasks/202605081719-FBQEV5/README.md`

## Verification

- State: ok
- Note: Remote PR checks passed for #3487 at 5d090f5d2 after docs IA alignment; local pre-push docs-only gates passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T19:10:53.043Z
- Branch: task/202605081719-FBQEV5/blueprint-catalog-install
- Head: d2c56282cdd5

```text
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 .agentplane/tasks/202605081720-03TR4S/README.md    |  92 ++++
 .../blueprint/resolved-snapshot.json               | 347 ++++++++++++++
 .agentplane/tasks/202605081720-DTKG82/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 .agentplane/tasks/202605081720-JF941V/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |  48 +-
 docs/reference/generated-reference.mdx             |  14 +-
 docs/user/cli-reference.generated.mdx              |  89 ++++
 docs/user/commands.mdx                             |  31 ++
 .../src/cli/run-cli.core.blueprint.test.ts         | 252 +++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     |  21 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/cli/run-cli/commands/init/answers.ts       |  13 +
 .../src/cli/run-cli/commands/init/blueprints.ts    | 157 +++++++
 .../src/cli/run-cli/commands/init/execution.ts     |  10 +
 .../src/cli/run-cli/commands/init/model.ts         |   2 +
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   2 +
 .../src/cli/run-cli/commands/init/parsers.ts       |   9 +
 .../src/cli/run-cli/commands/init/presets.ts       |   1 +
 .../src/cli/run-cli/commands/init/spec.ts          |  11 +
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   8 +
 .../src/cli/run-cli/commands/init/steps/apply.ts   |  10 +
 .../commands/init/steps/blueprint-selection.ts     |  60 +++
 .../cli/run-cli/commands/init/steps/contracts.ts   |   4 +
 .../src/cli/run-cli/commands/init/steps/index.ts   |   1 +
 .../commands/init/steps/prompt-steps.test.ts       |  37 +-
 .../src/commands/blueprints/blueprints.command.ts  | 286 ++++++++++++
 .../agentplane/src/commands/blueprints/catalog.ts  | 415 +++++++++++++++++
 website/static/llms-full.txt                       |  97 +++-
 31 files changed, 3700 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
