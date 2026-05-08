Task: `202605081719-FBQEV5`
Title: Blueprint catalog contracts and cache
Canonical task record: `.agentplane/tasks/202605081719-FBQEV5/README.md`

## Summary

Blueprint catalog contracts and cache

Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes.

## Scope

- In scope: Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes.
- Out of scope: unrelated refactors not required for "Blueprint catalog contracts and cache".

## Verification

- State: ok
- Note: Extended implementation to init: explicit --blueprints selection installs cached blueprint catalog entries and packs during full-harness/non-interactive init, activates installed blueprint ids, updates preview/progress/docs, and verifies with focused init prompt/apply tests, cli-core blueprint init test, typecheck, build, docs:cli:check, real init smoke, hotspot check, routing check, and doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:26:46.541Z
- Branch: task/202605081719-FBQEV5/blueprint-catalog-install
- Head: 305eba838683

```text
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 .agentplane/tasks/202605081720-03TR4S/README.md    |  58 +++
 .agentplane/tasks/202605081720-DTKG82/README.md    |  59 +++
 .agentplane/tasks/202605081720-JF941V/README.md    |  59 +++
 docs/user/cli-reference.generated.mdx              |  89 ++++
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
 24 files changed, 2069 insertions(+), 1 deletion(-)
```

</details>
