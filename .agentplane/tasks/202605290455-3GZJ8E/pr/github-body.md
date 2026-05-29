Task: `202605290455-3GZJ8E`
Title: Task obsidian command decomposition
Canonical task record: `.agentplane/tasks/202605290455-3GZJ8E/README.md`

## Summary

Task obsidian command decomposition

Extract focused helpers from packages/agentplane/src/commands/task/obsidian.ts to reduce the runtime hotspot below the warning threshold without changing task obsidian behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/commands/task/obsidian.ts to reduce the runtime hotspot below the warning threshold without changing task obsidian behavior.
- Out of scope: unrelated refactors not required for "Task obsidian command decomposition".

## Verification

- State: ok
- Note:

```text
Observed: pure Obsidian projection rendering moved into obsidian.render.ts; obsidian.ts is below
hotspot threshold. Checks: obsidian.unit.test, typecheck, arch:check, knip:check, lint:core,
format:changed, hotspots:check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T04:56:21.140Z
- Branch: task/202605290455-3GZJ8E/task-obsidian-render-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/obsidian.render.ts           | 261 ++++++++++++++++++++
 packages/agentplane/src/commands/task/obsidian.ts  | 262 +--------------------
 2 files changed, 270 insertions(+), 253 deletions(-)
```

</details>
