Task: `202605282346-2A32BY`
Title: Blueprint catalog parser decomposition
Canonical task record: `.agentplane/tasks/202605282346-2A32BY/README.md`

## Summary

Blueprint catalog parser decomposition

Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior.
- Out of scope: unrelated refactors not required for "Blueprint catalog parser decomposition".

## Verification

- State: ok
- Note:

```text
Verified blueprint catalog parser decomposition. Commands passed: focused blueprint catalog vitest
(2 files, 25 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run
format:changed, hotspot report check. Runtime hotspot warnings decreased from 33 to 32; catalog.ts
is 307 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T23:46:36.926Z
- Branch: task/202605282346-2A32BY/blueprint-catalog-parser-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/blueprints/catalog-model.ts       | 278 ++++++++++++++++++++
 .../agentplane/src/commands/blueprints/catalog.ts  | 291 ++-------------------
 2 files changed, 293 insertions(+), 276 deletions(-)
```

</details>
