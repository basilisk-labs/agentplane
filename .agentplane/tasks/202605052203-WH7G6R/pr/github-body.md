Task: `202605052203-WH7G6R`
Title: Define executable blueprint definition contracts

## Summary

Define executable blueprint definition contracts

Add the first implementation task for blueprint execution contracts: define typed BlueprintDefinition and BlueprintState shapes without command execution, covering states, required evidence, allowed commands, policy modules, stop rules, and resolver-facing metadata.

## Scope

- In scope: Add the first implementation task for blueprint execution contracts: define typed BlueprintDefinition and BlueprintState shapes without command execution, covering states, required evidence, allowed commands, policy modules, stop rules, and resolver-facing metadata.
- Out of scope: unrelated refactors not required for "Define executable blueprint definition contracts".

## Verification

- State: ok
- Note: Verified: executable blueprint definition contracts now include state metadata, policy modules, command boundaries, context budget, materialized plan typing, and focused validation coverage.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T22:20:45.673Z
- Branch: task/202605052203-WH7G6R/executable-blueprint-contracts
- Head: 745e035230ef

```text
 .agentplane/tasks/202605052204-4XSTAA/README.md    | 139 ++++++++++++++
 .agentplane/tasks/202605052204-50B7J9/README.md    | 139 ++++++++++++++
 .agentplane/tasks/202605052204-AJBX3D/README.md    | 139 ++++++++++++++
 .agentplane/tasks/202605052204-GD17KQ/README.md    | 139 ++++++++++++++
 .agentplane/tasks/202605052204-WJ25N8/README.md    | 139 ++++++++++++++
 docs/developer/blueprints.mdx                      |  35 ++--
 packages/agentplane/src/blueprints/builtins.ts     | 200 +++++++++++++++++++--
 packages/agentplane/src/blueprints/explain.ts      |  32 ++--
 packages/agentplane/src/blueprints/index.ts        |   7 +
 packages/agentplane/src/blueprints/model.ts        |  55 ++++++
 packages/agentplane/src/blueprints/plan.ts         |  88 +++++++++
 packages/agentplane/src/blueprints/resolve.test.ts |  59 ++++++
 packages/agentplane/src/blueprints/validate.ts     |   9 +
 .../run-cli.core.tasks.query-run-prepare.test.ts   |  28 +++
 .../src/commands/blueprint/blueprint.command.ts    |   1 +
 .../agentplane/src/commands/task/run-output.ts     |  15 ++
 .../src/commands/task/run-show.command.ts          |  20 +++
 packages/agentplane/src/runner/types/context.ts    |   2 +
 .../agentplane/src/runner/usecases/task-run.ts     |  94 ++++++++++
 19 files changed, 1302 insertions(+), 38 deletions(-)
```

</details>
