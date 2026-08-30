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
 .../clean-task-core-m2-replay-checkpoint.md        |   84 +
 docs/developer/harness-dev.mdx                     |   85 +
 .../task-backend/kernel-backend-adapter.test.ts    |  610 ++
 .../task-backend/kernel-backend-adapter.ts         |  202 +
 .../task-backend/kernel-migration-source.ts        |  161 +
 .../adapters/task-backend/kernel-migration.test.ts |  350 +
 .../src/adapters/task-backend/kernel-migration.ts  |  341 +
 .../adapters/task-backend/kernel-next-action.ts    |  106 +
 .../adapters/task-backend/kernel-observations.ts   |  122 +
 .../src/adapters/task-backend/kernel-projector.ts  |   36 +
 .../task-backend/kernel-record-invariants.ts       |  101 +
 .../src/adapters/task-backend/kernel-record.ts     |  271 +
 .../task-backend/kernel-replay-capture.testkit.ts  |   90 +
 .../kernel-replay-evidence.corpus.json             |  433 +
 .../kernel-replay-journey.test-fixtures.ts         |  268 +
 .../kernel-replay-migration.corpus.json            |  468 ++
 .../task-backend/kernel-replay-migration.test.ts   |  115 +
 .../task-backend/kernel-replay-persistence.test.ts |  515 ++
 .../task-backend/kernel-replay-storage.testkit.ts  |   48 +
 .../task-backend/kernel-replay.corpus.json         | 8712 ++++++++++++++++++++
 .../adapters/task-backend/kernel-replay.test.ts    |  282 +
 .../src/adapters/task-backend/kernel-replay.ts     |  174 +
 .../task-backend/task-centric-backend-runtime.ts   |   13 +-
 .../src/backends/task-backend/local-backend.ts     |    1 +
 .../backends/task-backend/local-task-byte-store.ts |  128 +
 .../task-backend/serialized-kernel-backend.ts      |   53 +
 .../src/backends/task-backend/shared/types.ts      |    2 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |    7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |    8 +
 .../src/cli/run-cli/command-loaders/task.ts        |    4 +
 .../src/commands/task/kernel-migrate.command.ts    |  134 +
 .../src/commands/task/show-kernel.test.ts          |   69 +
 packages/agentplane/src/commands/task/show.ts      |   40 +
 packages/agentplane/src/ports/task-byte-store.ts   |   19 +
 .../src/ports/task-record-serialization.ts         |    4 +
 .../usecases/task-run-effect-resolution.test.ts    |   70 +-
 .../runner/usecases/task-run-effect-resolution.ts  |   18 +-
 packages/core/src/tasks/task-kernel/index.ts       |    1 +
 packages/core/src/tasks/task-kernel/kernel.test.ts |   76 +
 packages/core/src/tasks/task-kernel/kernel.ts      |   37 +
 packages/core/src/tasks/task-kernel/model.ts       |    1 +
 .../baselines/v0.7-compatibility-candidate.json    |   90 +-
 scripts/bench/capture-kernel-evidence-replay.ts    |  213 +
 scripts/bench/capture-kernel-migration-replay.ts   |  191 +
 scripts/bench/capture-kernel-replay.ts             |  181 +
 .../agent-efficiency-dependency-manifest.mjs       |    6 +-
 scripts/bench/internal/kernel-replay-isolation.mjs |  105 +
 scripts/bench/qualify-kernel-replay.mjs            |  191 +
 .../check-compatibility-contract-baseline.mjs      |   91 +
 49 files changed, 15298 insertions(+), 29 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
