# PR Review

Created: 2026-10-26T23:53:24.219Z

## Task

- Task: `202610261755-GDTZJA`
- Title: Authorize prospective scope for completed canonical task rework
- Status: DOING
- Branch: `task/202610261755-GDTZJA/authorize-prospective-scope-for-completed-canoni`
- Canonical task record: `.agentplane/tasks/202610261755-GDTZJA/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T23:53:24.219Z
- Branch: task/202610261755-GDTZJA/authorize-prospective-scope-for-completed-canoni
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/kernel-authority-schema.ts        |  24 +++
 .../task-backend/kernel-backend-adapter.ts         |  33 ++-
 .../src/adapters/task-backend/kernel-record.ts     |  10 +-
 .../adapters/task-backend/kernel-scope-intake.ts   |   8 +-
 .../kernel-completed-external-blocker-boundary.ts  |  38 +++-
 .../task/kernel-completed-external-rework.test.ts  |   2 +-
 .../kernel-completed-external-rework.testkit.ts    |  51 +++++
 .../task/kernel-completed-rework-scope-evidence.ts | 143 +++++++++++++
 .../task/kernel-completed-rework-scope.test.ts     | 222 +++++++++++++++++++++
 .../commands/task/kernel-completed-rework-scope.ts |  76 +++++++
 .../src/commands/task/kernel-runtime-context.ts    |  34 +++-
 .../src/commands/task/scope-extend.command.test.ts |   5 +
 .../agentplane/src/commands/task/scope-extend.ts   |  19 ++
 .../src/tasks/task-kernel/authority-lineage.ts     |  14 +-
 packages/core/src/tasks/task-kernel/index.ts       |   4 +-
 .../src/tasks/task-kernel/kernel-authority.test.ts | 186 +++++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  66 +++++-
 packages/core/src/tasks/task-kernel/model.ts       |   5 +-
 .../tasks/task-kernel/prospective-scope.test.ts    |  14 ++
 .../src/tasks/task-kernel/prospective-scope.ts     | 111 +++++++++++
 20 files changed, 1034 insertions(+), 31 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
