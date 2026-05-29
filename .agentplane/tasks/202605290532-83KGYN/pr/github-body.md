Task: `202605290532-83KGYN`
Title: Pre-push hook decomposition
Canonical task record: `.agentplane/tasks/202605290532-83KGYN/README.md`

## Summary

Pre-push hook decomposition

Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior.

## Scope

- In scope: Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior.
- Out of scope: unrelated refactors not required for "Pre-push hook decomposition".

## Verification

- State: ok
- Note:

```text
Pre-push parsing, git/env, package-script, task-binding, and release-note helper logic extracted
into run.pre-push.helpers.ts; run.pre-push.ts reduced to 184 lines while preserving hook dispatch
behavior.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T05:33:16.171Z
- Branch: task/202605290532-83KGYN/pre-push-hook-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/hooks/run.pre-push.helpers.ts     | 271 ++++++++++++++++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 284 ++-------------------
 2 files changed, 290 insertions(+), 265 deletions(-)
```

</details>
