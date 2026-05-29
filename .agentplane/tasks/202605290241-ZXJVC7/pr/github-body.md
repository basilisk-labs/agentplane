Task: `202605290241-ZXJVC7`
Title: PR integrate command decomposition
Canonical task record: `.agentplane/tasks/202605290241-ZXJVC7/README.md`

## Summary

PR integrate command decomposition

Decompose packages/agentplane/src/commands/pr/integrate/cmd.ts by extracting protected-base GitHub PR handoff/merge routing while preserving integrate behavior and diagnostics.

## Scope

- In scope: Decompose packages/agentplane/src/commands/pr/integrate/cmd.ts by extracting protected-base GitHub PR handoff/merge routing while preserving integrate behavior and diagnostics.
- Out of scope: unrelated refactors not required for "PR integrate command decomposition".

## Verification

- State: ok
- Note:

```text
Verified PR integrate command decomposition. Commands passed: bunx vitest run
packages/agentplane/src/commands/pr/integrate/cmd.test.ts
packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts --config
vitest.workspace.ts (25 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run
lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from
22 to 21; cmd.ts is 293 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T02:42:28.306Z
- Branch: task/202605290241-ZXJVC7/pr-integrate-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 197 +-------------------
 .../integrate/internal/protected-base-handoff.ts   | 206 +++++++++++++++++++++
 2 files changed, 209 insertions(+), 194 deletions(-)
```

</details>
