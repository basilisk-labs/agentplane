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
- Note: Implemented external blueprint catalog refresh/list/info/install commands, pack expansion, explicit activation allowlist updates, focused CLI tests, generated CLI reference, and verified with typecheck, cli-core blueprint tests, real agentplane-blueprints smoke installs, docs:cli:check, hotspot check, policy routing, and doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:15:30.046Z
- Branch: task/202605081719-FBQEV5/blueprint-catalog-install
- Head: 0006d9a5bae3

```text
 .agentplane/tasks/202605081720-03TR4S/README.md    |  58 +++
 .agentplane/tasks/202605081720-DTKG82/README.md    |  59 +++
 .agentplane/tasks/202605081720-JF941V/README.md    |  59 +++
 docs/user/cli-reference.generated.mdx              |  88 +++++
 .../src/cli/run-cli.core.blueprint.test.ts         | 195 ++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     |  21 ++
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/commands/blueprints/blueprints.command.ts  | 286 ++++++++++++++
 .../agentplane/src/commands/blueprints/catalog.ts  | 415 +++++++++++++++++++++
 9 files changed, 1185 insertions(+)
```

</details>
