Task: `202605282313-0JV1JB`
Title: Harvest task artifacts decomposition
Canonical task record: `.agentplane/tasks/202605282313-0JV1JB/README.md`

## Summary

Harvest task artifacts decomposition

Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior.

## Scope

- In scope: Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior.
- Out of scope: unrelated refactors not required for "Harvest task artifacts decomposition".

## Verification

- State: ok
- Note:

```text
Verified harvest task artifacts decomposition. Commands passed: focused harvest context vitest (11
tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot
report check. Runtime hotspot warnings decreased from 36 to 35; harvest-tasks-artifacts.ts is 175
lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T23:13:46.861Z
- Branch: task/202605282313-0JV1JB/harvest-artifacts-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/context/harvest-tasks-artifacts.ts         | 447 +--------------------
 .../src/context/harvest-tasks-builders.ts          | 277 +++++++++++++
 .../agentplane/src/context/harvest-tasks-model.ts  | 162 ++++++++
 3 files changed, 460 insertions(+), 426 deletions(-)
```

</details>
