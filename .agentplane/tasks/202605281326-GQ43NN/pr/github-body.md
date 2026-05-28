Task: `202605281326-GQ43NN`
Title: Handle context verify-task non-context skip
Canonical task record: `.agentplane/tasks/202605281326-GQ43NN/README.md`

## Summary

Handle context verify-task non-context skip

Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests.

## Scope

- In scope: Fix context verify-task handling so tasks created through ordinary task new that are not task_kind=context are reported as an explicit non-applicable skip when appropriate, and cover the behavior with focused tests.
- Out of scope: unrelated refactors not required for "Handle context verify-task non-context skip".

## Verification

- State: ok
- Note: Verified explicit non-applicable skip for non-context context verify-task.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T13:27:17.393Z
- Branch: task/202605281326-GQ43NN/handle-context-verify-task-non-context-skip
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../verify-task.maximum-assimilation.unit.test.ts  | 62 ++++++++++++++++++++++
 packages/agentplane/src/context/verify-task.ts     |  9 ++--
 2 files changed, 66 insertions(+), 5 deletions(-)
```

</details>
