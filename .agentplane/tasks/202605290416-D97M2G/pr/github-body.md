Task: `202605290416-D97M2G`
Title: Task observations command decomposition
Canonical task record: `.agentplane/tasks/202605290416-D97M2G/README.md`

## Summary

Task observations command decomposition

Extract command wiring or rendering helpers from packages/agentplane/src/commands/task/observations.command.ts to reduce the runtime hotspot below the warning threshold without changing user-visible task observations behavior.

## Scope

- In scope: Extract command wiring or rendering helpers from packages/agentplane/src/commands/task/observations.command.ts to reduce the runtime hotspot below the warning threshold without changing user-visible task observations behavior.
- Out of scope: unrelated refactors not required for "Task observations command decomposition".

## Verification

- State: ok
- Note:

```text
Observed: observations command specs were extracted into observations.specs.ts;
observations.command.ts is below hotspot threshold. Checks: observations.unit.test, typecheck,
arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T04:16:21.019Z
- Branch: task/202605290416-D97M2G/task-observations-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/observations.command.ts      | 249 ++-------------------
 .../src/commands/task/observations.specs.ts        | 230 +++++++++++++++++++
 2 files changed, 252 insertions(+), 227 deletions(-)
```

</details>
