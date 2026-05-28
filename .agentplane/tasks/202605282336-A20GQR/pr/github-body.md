Task: `202605282336-A20GQR`
Title: Context wiki command decomposition
Canonical task record: `.agentplane/tasks/202605282336-A20GQR/README.md`

## Summary

Context wiki command decomposition

Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior.
- Out of scope: unrelated refactors not required for "Context wiki command decomposition".

## Verification

- State: ok
- Note:

```text
Verified context wiki command decomposition. Commands passed: focused wiki vitest (3 files, 26
tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot
report check. Runtime hotspot warnings decreased from 34 to 33; wiki.ts is 220 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T23:36:39.147Z
- Branch: task/202605282336-A20GQR/context-wiki-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/context/wiki-lint.ts   | 182 ++++++++++
 .../agentplane/src/commands/context/wiki-page.ts   | 194 +++++++++++
 packages/agentplane/src/commands/context/wiki.ts   | 383 +--------------------
 3 files changed, 392 insertions(+), 367 deletions(-)
```

</details>
