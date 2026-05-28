Task: `202605282057-M1Z3D9`
Title: Task finish execution decomposition
Canonical task record: `.agentplane/tasks/202605282057-M1Z3D9/README.md`

## Summary

Task finish execution decomposition

Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI.

## Scope

- In scope: Decompose packages/agentplane/src/commands/task/finish-execute.ts into focused helper modules without changing finish behavior, close-tail contracts, evaluator freshness gates, or branch_pr/direct semantics. Verify with focused finish tests, typecheck, lint, format, hotspot, and hosted CI.
- Out of scope: unrelated refactors not required for "Task finish execution decomposition".

## Verification

- State: ok
- Note: Task finish execution decomposition verified locally.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T20:57:51.056Z
- Branch: task/202605282057-M1Z3D9/finish-execution-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/finish-execute-close.ts      | 140 +++++++++
 .../src/commands/task/finish-execute-commit.ts     | 105 +++++++
 .../src/commands/task/finish-execute-load.ts       |  66 +++++
 .../agentplane/src/commands/task/finish-execute.ts | 313 +--------------------
 4 files changed, 317 insertions(+), 307 deletions(-)
```

</details>
