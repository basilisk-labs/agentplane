## Summary

Introduce command-layer backend capability helpers

Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.

## Scope

- In scope: Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.
- Out of scope: unrelated refactors not required for "Introduce command-layer backend capability helpers".

## Verification

- State: ok
- Note: Backend capability facade now drives local-task-store routing in shared task command paths; focused and full fast-suite verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T06:42:53.525Z
- Branch: task/202604180617-MV8SE2/backend-capability-facade
- Head: e7d63f04c6d8

```text
 .agentplane/tasks/202604180617-8RSXN9/README.md    | 86 +++++++++++++++++++++
 .agentplane/tasks/202604180617-SWBDDT/README.md    | 87 ++++++++++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts | 24 +++++-
 .../src/commands/shared/task-mutation.test.ts      | 25 ++++++-
 .../src/commands/shared/task-mutation.ts           | 12 ++-
 .../src/commands/shared/task-store/store.ts        |  5 +-
 .../src/commands/task/block.unit.test.ts           |  1 +
 .../agentplane/src/commands/task/doc.unit.test.ts  |  1 +
 .../agentplane/src/commands/task/finish-shared.ts  | 10 ++-
 packages/agentplane/src/commands/task/finish.ts    | 10 ++-
 .../src/commands/task/finish.unit.test.ts          |  1 +
 .../src/commands/task/mutation-parity.unit.test.ts | 11 +++
 .../agentplane/src/commands/task/plan.unit.test.ts |  1 +
 .../src/commands/task/set-status.unit.test.ts      |  1 +
 packages/agentplane/src/commands/task/show.ts      |  5 +-
 .../src/commands/task/start.unit.test.ts           |  1 +
 .../src/commands/task/verify-record.unit.test.ts   |  1 +
 .../src/commands/workflow.task-doc.test.ts         | 46 +++++++++++-
 18 files changed, 308 insertions(+), 20 deletions(-)
```

</details>
