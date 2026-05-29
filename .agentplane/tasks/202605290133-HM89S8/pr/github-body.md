Task: `202605290133-HM89S8`
Title: Blueprint builtins registry decomposition
Canonical task record: `.agentplane/tasks/202605290133-HM89S8/README.md`

## Summary

Blueprint builtins registry decomposition

Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count.
- Out of scope: unrelated refactors not required for "Blueprint builtins registry decomposition".

## Verification

- State: ok
- Note:

```text
Verified builtin blueprint registry decomposition. Commands passed: blueprint focused vitest suite
(2 files, 26 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core,
bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 26 to 25;
builtins.ts is 384 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T01:33:59.494Z
- Branch: task/202605290133-HM89S8/blueprint-builtins-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/blueprints/builtin-nodes.ts     | 124 +++++++++++++++++++
 packages/agentplane/src/blueprints/builtins.ts     | 133 ++-------------------
 2 files changed, 133 insertions(+), 124 deletions(-)
```

</details>
