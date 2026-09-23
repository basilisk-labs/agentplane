Task: `202609231207-R59HKK`
Title: Make canonical supervisor transitions recoverable across branch lifecycle boundaries
Canonical task record: `.agentplane/tasks/202609231207-R59HKK/README.md`

## Summary

Make canonical supervisor transitions recoverable across branch lifecycle boundaries

Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution.

## Scope

- In scope: Repair evaluator diff-base selection after provider branch updates, forward replacement intent into evaluator episodes, persist supervisor-generated task artifacts without false task_worktree_resolution, dispatch pre-merge closure through the supported local lifecycle path, and admit worktree.prepare before dirty-base worktree resolution.
- Out of scope: unrelated refactors not required for "Make canonical supervisor transitions recoverable across branch lifecycle boundaries".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T12:42:13.939Z
- Branch: task/202609231207-R59HKK/make-canonical-supervisor-transitions-recoverabl
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/evaluator/evaluator-review-usecase.ts | 13 ++++-
 .../evaluator-verification-contract.test.ts        | 33 ++++++++++++
 .../src/commands/shared/workflow-step-branch.ts    |  9 +++-
 .../shared/workflow-step-factory-branch.ts         | 21 ++++++++
 .../src/commands/shared/workflow-step-factory.ts   |  1 +
 .../shared/workflow-step-worktree-priority.test.ts | 30 +++++++++++
 .../src/commands/task/advance-task-step.ts         | 22 +++++++-
 .../branch-task-supervisor-evaluator-episode.ts    |  1 +
 .../src/commands/task/branch-task-supervisor.ts    |  1 +
 .../task/direct-task-supervisor-evaluator.test.ts  | 60 ++++++++++++++++++++++
 .../task/direct-task-supervisor-evaluator.ts       |  3 +-
 .../task/kernel-provider-effect-coordinator.ts     | 31 +++++++++++
 .../commands/task/roadmap-terminal-noop.test.ts    | 35 +++++++++++++
 13 files changed, 253 insertions(+), 7 deletions(-)
```

</details>
