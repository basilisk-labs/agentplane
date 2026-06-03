Task: `202606030859-NEFZ9F`
Title: Clarify branch_pr task completion and duplicate task creation
Canonical task record: `.agentplane/tasks/202606030859-NEFZ9F/README.md`

## Summary

Clarify branch_pr task completion and duplicate task creation

Fix CLI behavior so branch_pr guided completion does not imply lifecycle closure, and so similar open-task titles do not hard-block distinct new tasks.

## Scope

- In scope: Fix CLI behavior so branch_pr guided completion does not imply lifecycle closure, and so similar open-task titles do not hard-block distinct new tasks.
- Out of scope: unrelated refactors not required for "Clarify branch_pr task completion and duplicate task creation".

## Verification

- State: ok
- Note: Verified: targeted tests, format check, routing policy, and repo-local bootstrap passed on commit 95e6dc916.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T09:00:20.340Z
- Branch: task/202606030859-NEFZ9F/clarify-branch-pr-task-completion-and-duplicate
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-guided.test.ts       |  7 ++-
 .../src/cli/run-cli.core.tasks.create.test.ts      | 63 ++++++++++++++++++++--
 .../src/commands/task/complete.command.ts          | 11 ++--
 packages/agentplane/src/commands/task/new.ts       | 55 ++++++++++++++-----
 4 files changed, 115 insertions(+), 21 deletions(-)
```

</details>
