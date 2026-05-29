Task: `202605290253-8GE5QM`
Title: ACR generate decomposition
Canonical task record: `.agentplane/tasks/202605290253-8GE5QM/README.md`

## Summary

ACR generate decomposition

Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior.
- Out of scope: unrelated refactors not required for "ACR generate decomposition".

## Verification

- State: ok
- Note:

```text
Verified ACR generate decomposition. Commands passed: bunx vitest run
packages/agentplane/src/commands/acr/acr.command.test.ts
packages/agentplane/src/commands/task/finish.validation.unit.test.ts --config vitest.workspace.ts
(33 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 21 to 20;
generate.ts is 341 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T02:54:05.885Z
- Branch: task/202605290253-8GE5QM/acr-generate-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/acr/generate-extensions.ts        | 151 ++++++++++++++++++++
 packages/agentplane/src/commands/acr/generate.ts   | 156 +--------------------
 2 files changed, 158 insertions(+), 149 deletions(-)
```

</details>
