Task: `202605290321-43ZECH`
Title: Backend command decomposition
Canonical task record: `.agentplane/tasks/202605290321-43ZECH/README.md`

## Summary

Backend command decomposition

Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold.

## Scope

- In scope: Decompose packages/agentplane/src/commands/backend.ts by extracting backend connect configuration and dotenv helpers into a focused module, preserving CLI behavior while bringing backend.ts under the 400-line hotspot warning threshold.
- Out of scope: unrelated refactors not required for "Backend command decomposition".

## Verification

- State: ok
- Note:

```text
Verified backend command decomposition. Commands passed: bunx vitest run
packages/agentplane/src/commands/backend.test.ts
packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --config vitest.workspace.ts (21
tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 19 to 18; backend.ts
is 352 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T03:21:56.833Z
- Branch: task/202605290321-43ZECH/backend-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/backend-connect.ts     | 140 +++++++++++++++++++++
 packages/agentplane/src/commands/backend.ts        | 127 +------------------
 2 files changed, 142 insertions(+), 125 deletions(-)
```

</details>
