Task: `202605282000-XJETF6`
Title: Task runner execution usecase decomposition
Canonical task record: `.agentplane/tasks/202605282000-XJETF6/README.md`

## Summary

Task runner execution usecase decomposition

Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files.

## Scope

- In scope: Decompose packages/agentplane/src/runner/usecases/task-run.ts into focused runner execution modules without changing runner lifecycle behavior. Extract manifest/result construction and execution status mapping so agent-run evidence is easier to audit and future runner changes touch smaller files.
- Out of scope: unrelated refactors not required for "Task runner execution usecase decomposition".

## Verification

- State: ok
- Note:

```text
Task runner usecase decomposition verified: task-run.ts reduced from 566 to 388 lines, blueprint
plan/snapshot helpers extracted, targeted runner blueprint/lifecycle tests passed, typecheck passed,
lint:core passed, format:changed passed, hotspot threshold check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T20:01:14.372Z
- Branch: task/202605282000-XJETF6/task-runner-execution-usecase-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
