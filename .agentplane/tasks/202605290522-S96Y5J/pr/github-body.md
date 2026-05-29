Task: `202605290522-S96Y5J`
Title: Prompt module registry decomposition
Canonical task record: `.agentplane/tasks/202605290522-S96Y5J/README.md`

## Summary

Prompt module registry decomposition

Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior.

## Scope

- In scope: Extract focused construction helpers from packages/agentplane/src/runtime/prompt-modules/registry.ts to reduce the runtime hotspot below the warning threshold without changing framework prompt module graph behavior.
- Out of scope: unrelated refactors not required for "Prompt module registry decomposition".

## Verification

- State: ok
- Note:

```text
Prompt module registry construction helpers extracted into registry.factory.ts; registry.ts reduced
to 216 lines while preserving framework prompt module graph exports.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T05:22:36.686Z
- Branch: task/202605290522-S96Y5J/prompt-module-registry-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runtime/prompt-modules/registry.factory.ts | 227 ++++++++++++++++++++
 .../src/runtime/prompt-modules/registry.ts         | 233 +--------------------
 2 files changed, 234 insertions(+), 226 deletions(-)
```

</details>
