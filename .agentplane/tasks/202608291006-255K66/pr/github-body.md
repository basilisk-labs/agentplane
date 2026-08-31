Task: `202608291006-255K66`
Title: Cut over to the canonical Task kernel and retire legacy core paths
Canonical task record: `.agentplane/tasks/202608291006-255K66/README.md`

## Summary

Cut over to the canonical Task kernel and retire legacy core paths

After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.

## Scope

- In scope: After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
- Out of scope: unrelated refactors not required for "Cut over to the canonical Task kernel and retire legacy core paths".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T21:48:11.941Z
- Branch: task/202608291006-255K66/cut-over-to-the-canonical-task-kernel-and-retire
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  99 +++++
 .../task-backend/kernel-backend-adapter.test.ts    |   8 +-
 .../task-backend/kernel-backend-adapter.ts         |  78 +++-
 .../src/adapters/task-backend/kernel-documents.ts  |  64 +++
 .../adapters/task-backend/kernel-next-action.ts    |  10 +-
 .../src/adapters/task-backend/kernel-record.ts     |  14 +-
 .../run-cli.core.task-status-token-usage.test.ts   |  73 ++++
 .../agentplane/src/commands/task/active.command.ts | 110 +++--
 .../src/commands/task/active.command.unit.test.ts  |  51 +++
 .../agentplane/src/commands/task/brief.command.ts  |   5 +
 .../task/execution-authority-context.test.ts       |  28 +-
 .../commands/task/execution-authority-context.ts   |   4 +
 .../agentplane/src/commands/task/kernel-read.ts    |  91 ++++
 .../src/commands/task/next-action.command.ts       |   5 +
 packages/agentplane/src/commands/task/ready.ts     |   6 +
 .../src/commands/task/show-kernel.test.ts          | 121 ++++++
 packages/agentplane/src/commands/task/show.ts      |  15 +-
 .../agentplane/src/commands/task/status.command.ts |   5 +
 .../runner/usecases/kernel-task-lifecycle.test.ts  | 461 +++++++++++++++++++++
 .../src/runner/usecases/kernel-task-lifecycle.ts   | 259 ++++++++++++
 .../core/src/tasks/task-kernel/invariants.test.ts  |  52 +++
 packages/core/src/tasks/task-kernel/invariants.ts  |   6 +
 packages/core/src/tasks/task-kernel/kernel.ts      |  18 +
 packages/core/src/tasks/task-kernel/model.ts       |   3 +
 24 files changed, 1533 insertions(+), 53 deletions(-)
```

</details>
