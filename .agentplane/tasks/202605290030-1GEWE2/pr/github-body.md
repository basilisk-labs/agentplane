Task: `202605290030-1GEWE2`
Title: Blueprint model decomposition
Canonical task record: `.agentplane/tasks/202605290030-1GEWE2/README.md`

## Summary

Blueprint model decomposition

Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint model decomposition".

## Verification

- State: ok
- Note:

```text
Verified blueprint model decomposition. Commands passed: blueprint focused tests (resolve,
recipe-hints, task-input), bun run typecheck, bun run arch:check, bun run knip:check after reviewed
baseline remap, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot
warnings decreased from 30 to 29; model.ts is 5 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T00:30:51.886Z
- Branch: task/202605290030-1GEWE2/blueprint-model-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/blueprints/model-core.ts   | 232 +++++++++
 .../agentplane/src/blueprints/model-execution.ts   | 126 +++++
 .../agentplane/src/blueprints/model-explain.ts     |  32 ++
 .../agentplane/src/blueprints/model-resolution.ts  | 142 ++++++
 .../agentplane/src/blueprints/model-snapshot.ts    |  89 ++++
 packages/agentplane/src/blueprints/model.ts        | 556 +--------------------
 scripts/baselines/knip-baseline.json               |  77 ++-
 7 files changed, 662 insertions(+), 592 deletions(-)
```

</details>
