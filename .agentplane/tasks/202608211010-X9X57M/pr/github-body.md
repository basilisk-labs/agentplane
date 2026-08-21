Task: `202608211010-X9X57M`
Title: Route new task creation to the primary checkout
Canonical task record: `.agentplane/tasks/202608211010-X9X57M/README.md`

## Summary

Route new task creation to the primary checkout

Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership.

## Scope

- In scope: Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership.
- Out of scope: unrelated refactors not required for "Route new task creation to the primary checkout".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T10:33:19.857Z
- Branch: task/202608211010-X9X57M/route-new-task-creation-to-the-primary-checkout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-guided.test.ts       | 49 +++++++++++++++++
 .../src/cli/run-cli.core.tasks.create.test.ts      | 51 ++++++++++++++++++
 .../src/commands/shared/task-backend.test.ts       | 31 +++++++++++
 .../agentplane/src/commands/shared/task-backend.ts | 24 ++++++---
 .../agentplane/src/commands/task/begin.command.ts  | 11 ++--
 .../src/commands/task/new.primary-checkout.test.ts | 62 ++++++++++++++++++++++
 packages/agentplane/src/commands/task/new.ts       | 13 ++++-
 7 files changed, 229 insertions(+), 12 deletions(-)
```

</details>
