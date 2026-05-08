Task: `202605081719-FBQEV5`
Title: Blueprint catalog contracts and cache
Canonical task record: `.agentplane/tasks/202605081719-FBQEV5/README.md`

## Batch Tasks

- Primary: `202605081719-FBQEV5`
- Closure policy: `all_or_fail`
- Included: `202605081720-03TR4S`
- Included: `202605081720-DTKG82`
- Included: `202605081720-JF941V`

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

- Updated: 2026-05-08T18:38:55.853Z
- Branch: task/202605081719-FBQEV5/blueprint-catalog-install
- Head: a00f2184663d

```text
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 .agentplane/tasks/202605081720-03TR4S/README.md    |  92 ++++
 .../blueprint/resolved-snapshot.json               | 347 ++++++++++++++
 .agentplane/tasks/202605081720-DTKG82/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 .agentplane/tasks/202605081720-JF941V/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 502 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |  42 ++
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
 29 files changed, 3595 insertions(+), 1 deletion(-)
```

</details>
