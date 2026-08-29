Task: `202608292032-1K47B8`
Title: Implement the isolated canonical Task kernel
Canonical task record: `.agentplane/tasks/202608292032-1K47B8/README.md`

## Summary

Implement the isolated canonical Task kernel

Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.

## Scope

- In scope: Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
- Out of scope: unrelated refactors not required for "Implement the isolated canonical Task kernel".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T20:33:30.307Z
- Branch: task/202608292032-1K47B8/implement-the-isolated-canonical-task-kernel
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/core/src/tasks/index.ts                   |   2 +
 packages/core/src/tasks/task-kernel/index.ts       |  22 +
 .../core/src/tasks/task-kernel/invariants.test.ts  | 301 ++++++++
 packages/core/src/tasks/task-kernel/invariants.ts  | 214 ++++++
 packages/core/src/tasks/task-kernel/kernel.test.ts | 298 ++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      | 792 +++++++++++++++++++++
 packages/core/src/tasks/task-kernel/model.test.ts  | 108 +++
 packages/core/src/tasks/task-kernel/model.ts       | 365 ++++++++++
 8 files changed, 2102 insertions(+)
```

</details>
