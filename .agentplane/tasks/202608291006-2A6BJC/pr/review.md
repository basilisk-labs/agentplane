# PR Review

Created: 2026-08-30T04:09:19.506Z

## Task

- Task: `202608291006-2A6BJC`
- Title: Add compatibility adapters and replay migration
- Status: DOING
- Branch: `task/202608291006-2A6BJC/add-compatibility-adapters-and-replay-migration`
- Canonical task record: `.agentplane/tasks/202608291006-2A6BJC/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T14:58:29.973Z
- Branch: task/202608291006-2A6BJC/add-compatibility-adapters-and-replay-migration
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../clean-task-core-m2-replay-checkpoint/README.md |   213 +
 .../qualification-capture.json                     | 25356 +++++++++
 docs/developer/harness-dev.mdx                     |    85 +
 .../task-backend/kernel-backend-adapter.test.ts    |   613 +
 .../task-backend/kernel-backend-adapter.ts         |   204 +
 .../task-backend/kernel-effect-dispatch.ts         |    42 +
 .../task-backend/kernel-effect-replay.testkit.ts   |   242 +
 .../task-backend/kernel-evidence-replay.testkit.ts |   233 +
 .../task-backend/kernel-migration-source.ts        |   161 +
 .../adapters/task-backend/kernel-migration.test.ts |   441 +
 .../src/adapters/task-backend/kernel-migration.ts  |   341 +
 .../adapters/task-backend/kernel-next-action.ts    |   106 +
 .../adapters/task-backend/kernel-observations.ts   |   122 +
 .../src/adapters/task-backend/kernel-projector.ts  |    36 +
 .../task-backend/kernel-qualification.testkit.ts   |   354 +
 .../task-backend/kernel-record-invariants.ts       |   101 +
 .../src/adapters/task-backend/kernel-record.ts     |   272 +
 .../task-backend/kernel-replay-capture.testkit.ts  |   196 +
 .../kernel-replay-evidence.corpus.json             |   433 +
 .../kernel-replay-journey.test-fixtures.ts         |   268 +
 .../kernel-replay-migration.corpus.json            |   468 +
 .../task-backend/kernel-replay-migration.test.ts   |   158 +
 .../kernel-replay-persistence.corpus.json          | 54996 +++++++++++++++++++
 .../task-backend/kernel-replay-persistence.test.ts |   768 +
 .../kernel-replay-qualification.corpus.json        |    17 +
 .../kernel-replay-qualification.corpus.json.gz     |   Bin 0 -> 1865695 bytes
 .../task-backend/kernel-replay-storage.testkit.ts  |    48 +
 .../task-backend/kernel-replay.corpus.json         |  8712 +++
 .../adapters/task-backend/kernel-replay.test.ts    |   475 +
 .../src/adapters/task-backend/kernel-replay.ts     |   174 +
 .../kernel-workspace-replay.testkit.ts             |   202 +
 .../task-backend/task-centric-backend-runtime.ts   |    13 +-
 .../src/backends/task-backend/local-backend.ts     |     1 +
 .../backends/task-backend/local-task-byte-store.ts |   128 +
 .../task-backend/serialized-kernel-backend.ts      |    53 +
 .../src/backends/task-backend/shared/types.ts      |     2 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |     7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |     8 +
 .../src/cli/run-cli/command-loaders/task.ts        |     4 +
 .../commands/task/direct-task-verification.test.ts |     8 +-
 .../src/commands/task/direct-task-verification.ts  |    46 +-
 .../src/commands/task/kernel-migrate.command.ts    |   134 +
 .../src/commands/task/show-kernel.test.ts          |    69 +
 packages/agentplane/src/commands/task/show.ts      |    40 +
 packages/agentplane/src/ports/task-byte-store.ts   |    19 +
 .../src/ports/task-record-serialization.ts         |     4 +
 .../usecases/task-run-effect-resolution.test.ts    |    70 +-
 .../runner/usecases/task-run-effect-resolution.ts  |    18 +-
 packages/core/src/tasks/task-kernel/index.ts       |     1 +
 .../core/src/tasks/task-kernel/invariants.test.ts  |   101 +-
 packages/core/src/tasks/task-kernel/kernel.test.ts |   127 +
 packages/core/src/tasks/task-kernel/kernel.ts      |    71 +-
 packages/core/src/tasks/task-kernel/model.ts       |     3 +
 .../baselines/v0.7-compatibility-candidate.json    |    90 +-
 scripts/bench/capture-kernel-evidence-replay.ts    |   213 +
 scripts/bench/capture-kernel-migration-replay.ts   |   191 +
 scripts/bench/capture-kernel-replay.ts             |   181 +
 .../agent-efficiency-dependency-manifest.mjs       |     6 +-
 .../internal/kernel-qualification-manifest.mjs     |   255 +
 scripts/bench/internal/kernel-replay-isolation.mjs |   108 +
 scripts/bench/qualify-kernel-replay.mjs            |   218 +
 .../check-compatibility-contract-baseline.mjs      |    91 +
 62 files changed, 98039 insertions(+), 78 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
