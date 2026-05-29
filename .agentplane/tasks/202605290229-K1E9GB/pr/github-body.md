Task: `202605290229-K1E9GB`
Title: Prompt module validation decomposition
Canonical task record: `.agentplane/tasks/202605290229-K1E9GB/README.md`

## Summary

Prompt module validation decomposition

Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.

## Scope

- In scope: Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
- Out of scope: unrelated refactors not required for "Prompt module validation decomposition".

## Verification

- State: ok
- Note:

```text
Verified prompt module validation decomposition. Commands passed: bunx vitest run
packages/agentplane/src/runtime/prompt-modules/model.test.ts
packages/agentplane/src/runtime/prompt-modules/mutations.test.ts
packages/agentplane/src/runtime/prompt-modules/registry.test.ts --config vitest.workspace.ts (13
tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 23 to 22;
validation.ts is 342 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T02:29:48.627Z
- Branch: task/202605290229-K1E9GB/prompt-validation-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../runtime/prompt-modules/validation-constants.ts | 119 ++++++++++++
 .../runtime/prompt-modules/validation-guards.ts    |  73 +++++++
 .../src/runtime/prompt-modules/validation.ts       | 213 +++------------------
 3 files changed, 223 insertions(+), 182 deletions(-)
```

</details>
