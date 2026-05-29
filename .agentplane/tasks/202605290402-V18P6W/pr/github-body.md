Task: `202605290402-V18P6W`
Title: ACR command specs decomposition
Canonical task record: `.agentplane/tasks/202605290402-V18P6W/README.md`

## Summary

ACR command specs decomposition

Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/acr/acr.command.ts by extracting ACR command specs and parsed types into a focused acr.specs module, preserving public exports and CLI parsing behavior while reducing runtime hotspot count.
- Out of scope: unrelated refactors not required for "ACR command specs decomposition".

## Verification

- State: ok
- Note:

```text
Verified ACR command specs decomposition. Commands passed: bunx vitest run
packages/agentplane/src/commands/acr/acr.command.test.ts --config vitest.workspace.ts (11 tests),
bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 15 to 14;
acr.command.ts is 196 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T04:02:50.740Z
- Branch: task/202605290402-V18P6W/acr-command-specs-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/acr/acr.command.ts     | 305 ++-------------------
 packages/agentplane/src/commands/acr/acr.specs.ts  | 281 +++++++++++++++++++
 2 files changed, 305 insertions(+), 281 deletions(-)
```

</details>
