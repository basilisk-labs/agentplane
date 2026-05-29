Task: `202605290438-WVKXG8`
Title: Prompt module compiler decomposition
Canonical task record: `.agentplane/tasks/202605290438-WVKXG8/README.md`

## Summary

Prompt module compiler decomposition

Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior.
- Out of scope: unrelated refactors not required for "Prompt module compiler decomposition".

## Verification

- State: ok
- Note:

```text
Observed: prompt module compiler context normalization and load-condition matching moved into
compiler.context.ts; compiler.ts is below hotspot threshold. Checks: compiler.test, mutations.test,
registry.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T04:38:43.884Z
- Branch: task/202605290438-WVKXG8/prompt-module-compiler-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runtime/prompt-modules/compiler.context.ts | 222 +++++++++++++++++++
 .../src/runtime/prompt-modules/compiler.ts         | 244 ++-------------------
 2 files changed, 238 insertions(+), 228 deletions(-)
```

</details>
