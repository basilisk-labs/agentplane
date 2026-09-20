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

- State: ok
- Note: Canonical validation sha256:ddf6d604cfe5ac0b71338515373a058de15f944328407cca5f463082b4c6a16f
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T02:16:12.463Z
- Branch: task/202609200157-HJ7KZE/canonical-hj7kze
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-runtime-context.ts    |   9 +-
 .../src/commands/task/plan-reject.command.test.ts  | 105 ++++++++++++++
 .../src/commands/task/plan-reject.command.ts       |  70 +++++++++-
 .../src/tasks/task-kernel/kernel-replan.test.ts    | 154 +++++++++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  15 +-
 packages/core/src/tasks/task-kernel/model.ts       |   9 +-
 6 files changed, 358 insertions(+), 4 deletions(-)
```

</details>
