Task: `202609200157-HJ7KZE`
Title: Add canonical blocked-plan replanning transition
Canonical task record: `.agentplane/tasks/202609200157-HJ7KZE/README.md`

## Summary

Add canonical blocked-plan replanning transition

Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.

## Scope

- In scope: Add a first-class Task Kernel transition for explicit replanning after an approved WorkItem is blocked; route canonical plan rejection through it, preserve blocked attempt evidence, and cover fail-closed behavior.
- Out of scope: unrelated refactors not required for "Add canonical blocked-plan replanning transition".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T02:16:12.463Z
- Branch: task/202609200157-HJ7KZE/canonical-hj7kze
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/plan-reject.command.test.ts  | 105 +++++++++++++++++++++
 .../src/commands/task/plan-reject.command.ts       |  70 +++++++++++++-
 .../src/tasks/task-kernel/kernel-replan.test.ts    |  72 ++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  10 +-
 packages/core/src/tasks/task-kernel/model.ts       |   9 +-
 5 files changed, 263 insertions(+), 3 deletions(-)
```

</details>
