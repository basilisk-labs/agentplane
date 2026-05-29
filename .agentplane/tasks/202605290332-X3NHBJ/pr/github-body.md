Task: `202605290332-X3NHBJ`
Title: Blueprint command listing decomposition
Canonical task record: `.agentplane/tasks/202605290332-X3NHBJ/README.md`

## Summary

Blueprint command listing decomposition

Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/blueprint/blueprint.command.ts by extracting blueprint list/examples command handlers into a focused module, preserving command-loader exports and CLI output while reducing runtime hotspot count.
- Out of scope: unrelated refactors not required for "Blueprint command listing decomposition".

## Verification

- State: ok
- Note:

```text
Verified blueprint command listing decomposition. Commands passed: bunx vitest run
packages/agentplane/src/cli/run-cli.core.blueprint.test.ts
packages/agentplane/src/commands/blueprint/task-input.test.ts
packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts --config vitest.workspace.ts
(29 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 18 to 17;
blueprint.command.ts is 336 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T03:33:22.818Z
- Branch: task/202605290332-X3NHBJ/blueprint-command-listing-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/blueprint/blueprint-listing.ts    | 151 +++++++++++++++++++++
 .../src/commands/blueprint/blueprint.command.ts    | 135 +-----------------
 2 files changed, 152 insertions(+), 134 deletions(-)
```

</details>
