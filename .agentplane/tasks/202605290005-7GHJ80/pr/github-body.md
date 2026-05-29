Task: `202605290005-7GHJ80`
Title: Context verify-task validator decomposition
Canonical task record: `.agentplane/tasks/202605290005-7GHJ80/README.md`

## Summary

Context verify-task validator decomposition

Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior.

## Scope

- In scope: Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior.
- Out of scope: unrelated refactors not required for "Context verify-task validator decomposition".

## Verification

- State: ok
- Note:

```text
Verified context verify-task validator decomposition. Commands passed: focused context verify-task
tests, bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run
format:changed, hotspot report check. Runtime hotspot warnings decreased from 32 to 31;
verify-task.ts is 144 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T00:05:45.215Z
- Branch: task/202605290005-7GHJ80/context-verify-task-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/context/verify-task-artifacts.ts           | 309 ++++++++++++++
 .../agentplane/src/context/verify-task-policy.ts   | 143 +++++++
 packages/agentplane/src/context/verify-task.ts     | 451 +--------------------
 3 files changed, 467 insertions(+), 436 deletions(-)
```

</details>
