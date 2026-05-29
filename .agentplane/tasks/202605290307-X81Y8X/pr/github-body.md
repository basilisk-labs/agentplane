Task: `202605290307-X81Y8X`
Title: Blueprint resolve decomposition
Canonical task record: `.agentplane/tasks/202605290307-X81Y8X/README.md`

## Summary

Blueprint resolve decomposition

Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
- Out of scope: unrelated refactors not required for "Blueprint resolve decomposition".

## Verification

- State: ok
- Note:

```text
Verified blueprint resolve decomposition. Commands passed: bunx vitest run
packages/agentplane/src/blueprints/resolve.test.ts
packages/agentplane/src/blueprints/recipe-hints.test.ts
packages/agentplane/src/blueprints/snapshot.test.ts
packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (56 tests), bun run
typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun
run hotspots:check. Runtime hotspot warnings decreased from 20 to 19; resolve.ts is 346 lines, below
the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T03:07:30.419Z
- Branch: task/202605290307-X81Y8X/blueprint-resolve-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/blueprints/resolve-recipe-hints.ts         | 135 ++++++++++++++++++++
 packages/agentplane/src/blueprints/resolve.ts      | 136 +--------------------
 2 files changed, 138 insertions(+), 133 deletions(-)
```

</details>
