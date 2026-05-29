Task: `202605290146-32ZB9B`
Title: SGR contracts decomposition
Canonical task record: `.agentplane/tasks/202605290146-32ZB9B/README.md`

## Summary

SGR contracts decomposition

Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "SGR contracts decomposition".

## Verification

- State: ok
- Note:

```text
Verified SGR contracts decomposition. Commands passed: SGR contract vitest suite (1 file, 8 tests),
bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap for moved
public types, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot
warnings decreased from 25 to 24; contracts.ts is 322 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T01:46:41.538Z
- Branch: task/202605290146-32ZB9B/sgr-contracts-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/runtime/sgr/contract-types.ts   | 143 +++++++++++
 .../src/runtime/sgr/contract-validators.ts         |  93 +++++++
 packages/agentplane/src/runtime/sgr/contracts.ts   | 281 ++++-----------------
 scripts/baselines/knip-baseline.json               | 118 ++++++---
 4 files changed, 379 insertions(+), 256 deletions(-)
```

</details>
