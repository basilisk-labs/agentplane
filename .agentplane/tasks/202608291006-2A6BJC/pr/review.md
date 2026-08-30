# PR Review

Created: 2026-08-30T04:09:19.506Z

## Task

- Task: `202608291006-2A6BJC`
- Title: Add compatibility adapters and replay migration
- Status: DOING
- Branch: `task/202608291006-2A6BJC/add-compatibility-adapters-and-replay-migration`
- Canonical task record: `.agentplane/tasks/202608291006-2A6BJC/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T04:09:19.506Z
- Branch: task/202608291006-2A6BJC/add-compatibility-adapters-and-replay-migration
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  53 ++
 .../task-backend/kernel-backend-adapter.test.ts    | 562 +++++++++++++++++++++
 .../task-backend/kernel-backend-adapter.ts         | 193 +++++++
 .../task-backend/kernel-migration-source.ts        | 161 ++++++
 .../adapters/task-backend/kernel-migration.test.ts | 336 ++++++++++++
 .../src/adapters/task-backend/kernel-migration.ts  | 341 +++++++++++++
 .../adapters/task-backend/kernel-observations.ts   |  95 ++++
 .../src/adapters/task-backend/kernel-projector.ts  |  36 ++
 .../task-backend/kernel-record-invariants.ts       | 101 ++++
 .../src/adapters/task-backend/kernel-record.ts     | 271 ++++++++++
 .../task-backend/task-centric-backend-runtime.ts   |  13 +-
 .../src/backends/task-backend/local-backend.ts     |   1 +
 .../backends/task-backend/local-task-byte-store.ts | 128 +++++
 .../src/backends/task-backend/shared/types.ts      |   2 +
 .../src/cli/run-cli/command-catalog/task.ts        |   8 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/task/kernel-migrate.command.ts    | 134 +++++
 .../src/commands/task/show-kernel.test.ts          |  69 +++
 packages/agentplane/src/commands/task/show.ts      |  40 ++
 packages/agentplane/src/ports/task-byte-store.ts   |  19 +
 20 files changed, 2566 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
