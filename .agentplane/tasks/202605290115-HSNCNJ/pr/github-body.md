Task: `202605290115-HSNCNJ`
Title: Init execution decomposition
Canonical task record: `.agentplane/tasks/202605290115-HSNCNJ/README.md`

## Summary

Init execution decomposition

Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count.
- Out of scope: unrelated refactors not required for "Init execution decomposition".

## Verification

- State: ok
- Note:

```text
Verified init execution decomposition. Commands passed: init focused vitest suite (4 files, 55
tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 27 to 26;
execution.ts is 253 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T01:16:22.379Z
- Branch: task/202605290115-HSNCNJ/init-execution-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/commands/init/execution.ts     | 302 +--------------------
 .../src/cli/run-cli/commands/init/init-paths.ts    |  79 ++++++
 .../src/cli/run-cli/commands/init/init-plan.ts     | 219 +++++++++++++++
 3 files changed, 311 insertions(+), 289 deletions(-)
```

</details>
