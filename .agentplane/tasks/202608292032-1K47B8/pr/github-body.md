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

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T22:04:21.476Z
- Branch: task/202608292032-1K47B8/implement-the-isolated-canonical-task-kernel
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 depcruise.config.cjs                               |   13 +
 .../src/commands/shared/pr-meta/verify-log.test.ts |   60 ++
 .../src/commands/shared/pr-meta/verify-log.ts      |    4 +
 packages/core/src/tasks/index.ts                   |    2 +
 .../core/src/tasks/task-kernel/M1-QUALIFICATION.md |   93 ++
 packages/core/src/tasks/task-kernel/index.ts       |   23 +
 .../core/src/tasks/task-kernel/invariants.test.ts  |  427 ++++++++
 packages/core/src/tasks/task-kernel/invariants.ts  |  257 +++++
 .../src/tasks/task-kernel/kernel.test-fixtures.ts  |  207 ++++
 packages/core/src/tasks/task-kernel/kernel.test.ts |  833 +++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      | 1061 ++++++++++++++++++++
 packages/core/src/tasks/task-kernel/model.test.ts  |  108 ++
 packages/core/src/tasks/task-kernel/model.ts       |  375 +++++++
 13 files changed, 3463 insertions(+)
```

</details>
