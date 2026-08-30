Task: `202608291006-2A6BJC`
Title: Add compatibility adapters and replay migration
Canonical task record: `.agentplane/tasks/202608291006-2A6BJC/README.md`

## Summary

Add compatibility adapters and replay migration

Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.

## Scope

- In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
- Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T04:09:19.506Z
- Branch: task/202608291006-2A6BJC/add-compatibility-adapters-and-replay-migration
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |   85 +
 .../task-backend/kernel-backend-adapter.test.ts    |  587 ++
 .../task-backend/kernel-backend-adapter.ts         |  193 +
 .../task-backend/kernel-migration-source.ts        |  161 +
 .../adapters/task-backend/kernel-migration.test.ts |  350 +
 .../src/adapters/task-backend/kernel-migration.ts  |  341 +
 .../adapters/task-backend/kernel-observations.ts   |   95 +
 .../src/adapters/task-backend/kernel-projector.ts  |   36 +
 .../task-backend/kernel-record-invariants.ts       |  101 +
 .../src/adapters/task-backend/kernel-record.ts     |  271 +
 .../kernel-replay-evidence.corpus.json             |  433 +
 .../kernel-replay-journey.test-fixtures.ts         |  216 +
 .../kernel-replay-migration.corpus.json            |  468 ++
 .../task-backend/kernel-replay-migration.test.ts   |  115 +
 .../task-backend/kernel-replay-persistence.test.ts |  241 +
 .../task-backend/kernel-replay.corpus.json         | 8712 ++++++++++++++++++++
 .../adapters/task-backend/kernel-replay.test.ts    |  103 +
 .../src/adapters/task-backend/kernel-replay.ts     |  128 +
 .../task-backend/task-centric-backend-runtime.ts   |   13 +-
 .../src/backends/task-backend/local-backend.ts     |    1 +
 .../backends/task-backend/local-task-byte-store.ts |  128 +
 .../src/backends/task-backend/shared/types.ts      |    2 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |    7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |    8 +
 .../src/cli/run-cli/command-loaders/task.ts        |    4 +
 .../src/commands/task/kernel-migrate.command.ts    |  134 +
 .../src/commands/task/show-kernel.test.ts          |   69 +
 packages/agentplane/src/commands/task/show.ts      |   40 +
 packages/agentplane/src/ports/task-byte-store.ts   |   19 +
 packages/core/src/tasks/task-kernel/kernel.test.ts |   46 +
 packages/core/src/tasks/task-kernel/kernel.ts      |   25 +
 packages/core/src/tasks/task-kernel/model.ts       |    1 +
 .../baselines/v0.7-compatibility-candidate.json    |   90 +-
 scripts/bench/capture-kernel-evidence-replay.ts    |  213 +
 scripts/bench/capture-kernel-migration-replay.ts   |  191 +
 scripts/bench/capture-kernel-replay.ts             |  181 +
 scripts/bench/qualify-kernel-replay.mjs            |  146 +
 .../check-compatibility-contract-baseline.mjs      |   91 +
 38 files changed, 14032 insertions(+), 13 deletions(-)
```

</details>
