# PR Review

Created: 2026-08-20T15:49:58.682Z

## Task

- Task: `202608200903-J459C2`
- Title: Make task execution authority local and direct execution workspace-safe
- Status: DOING
- Branch: `task/202608200903-J459C2/make-task-execution-authority-local-and-direct-e`
- Canonical task record: `.agentplane/tasks/202608200903-J459C2/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:fast
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-20T17:33:44.182Z
- Branch: task/202608200903-J459C2/make-task-execution-authority-local-and-direct-e
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/adr/0014-task-execution-authority.md          |  53 ++++
 docs/adr/0015-task-workspace-isolation.md          |  49 ++++
 docs/adr/0016-serialized-direct-integration.md     |  49 ++++
 docs/adr/README.md                                 |   3 +
 docs/developer/task-execution-authority.mdx        |  63 +++++
 ...un-cli.core.route-decision.verification.test.ts |   2 +-
 .../src/cli/run-cli.core.tasks.create.test.ts      |  38 +++
 .../src/commands/branch/work-start.command.ts      |  14 +-
 .../commands/evaluator/evaluator-diff-evidence.ts  |  51 +---
 .../evaluator/evaluator-qualification-review.ts    |   4 +-
 .../commands/evaluator/evaluator-review-usecase.ts |  52 +++-
 .../src/commands/integrate-queue-lane.ts           |   6 +-
 .../src/commands/integrate-queue-reservation.ts    |  16 ++
 .../src/commands/integrate-queue.command.ts        | 232 +++++++++++++++-
 packages/agentplane/src/commands/pr/flow-status.ts |   6 +-
 .../src/commands/pr/integrate/queue-state.test.ts  |  41 +++
 .../src/commands/pr/integrate/queue-state.ts       |  18 ++
 .../agentplane/src/commands/pr/internal/sync.ts    |  15 +-
 packages/agentplane/src/commands/pr/open.ts        |  32 ++-
 .../src/commands/provider-ops-results.test.ts      |  15 +
 .../src/commands/shared/declared-check.test.ts     |   9 +
 .../src/commands/shared/declared-check.ts          |   6 +-
 .../commands/shared/post-commit-pr-artifacts.ts    |   6 +-
 .../src/commands/shared/route-cleanup-probe.ts     |   3 +-
 .../src/commands/shared/route-decision-blockers.ts |  30 +-
 .../shared/route-decision-verification-blocker.ts  |   4 +-
 .../commands/shared/route-decision-verification.ts |   3 +
 .../src/commands/shared/route-decision.ts          |  44 +--
 .../commands/shared/side-effect-authority.test.ts  |  26 ++
 .../src/commands/shared/side-effect-authority.ts   |  47 +++-
 .../shared/task-verification-input.test.ts         |  64 ++++-
 .../src/commands/shared/task-verification-input.ts | 104 ++++++-
 .../commands/shared/task-verification-records.ts   | 127 ++++++++-
 .../shared/task-verification-records.v2.test.ts    |   6 +-
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 .../task/branch-task-supervisor-episodes.ts        |  10 +
 .../task/branch-task-supervisor-operations.ts      |   7 +-
 .../src/commands/task/branch-task-supervisor.ts    |   2 +
 .../src/commands/task/complete.command.ts          |  12 +-
 .../src/commands/task/direct-task-supervisor.ts    |  51 +++-
 .../external-agent-implementation-authority.ts     |   7 +
 .../src/commands/task/finish-blueprint-evidence.ts |   5 +-
 .../agentplane/src/commands/task/finish-close.ts   |   7 +-
 .../commands/task/finish-closeout-journal.test.ts  | 131 +++++++++
 .../src/commands/task/finish-closeout-journal.ts   | 126 +++++++++
 .../agentplane/src/commands/task/finish-command.ts |  20 +-
 .../src/commands/task/finish-execute-close.ts      |  18 +-
 .../agentplane/src/commands/task/finish-execute.ts | 291 ++++++++++---------
 .../agentplane/src/commands/task/finish-plan.ts    |  18 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   7 +-
 .../agentplane/src/commands/task/finish-types.ts   |   9 +
 .../commands/task/finish.close-tail.unit.test.ts   |  14 +
 .../src/commands/task/finish.state.unit.test.ts    |  15 +
 .../commands/task/finish.validation.unit.test.ts   |  15 +
 .../agentplane/src/commands/task/handoff.shared.ts |  17 +-
 packages/agentplane/src/commands/task/new.spec.ts  |   8 +-
 packages/agentplane/src/commands/task/new.ts       |   2 +-
 .../agentplane/src/commands/task/run.command.ts    |  29 +-
 .../src/commands/task/shared/transitions.ts        |  18 +-
 .../agentplane/src/commands/task/start-ready.ts    |  14 +-
 packages/agentplane/src/commands/task/start.ts     |  13 +-
 .../task-execution-contract-observation.test.ts    |  24 +-
 .../task/task-execution-contract-observation.ts    |  10 +-
 .../src/commands/task/verify-record-execute.ts     |  62 ++++-
 .../task/verify-record-observed-changes.ts         |   8 +-
 .../agentplane/src/runner/context/task-context.ts  |   3 +-
 .../src/runner/usecases/agent-work-order.ts        |   5 +-
 .../task-run-authority.capabilities.test.ts        |  52 ++++
 .../src/runner/usecases/task-run-authority.ts      |  29 ++
 .../agentplane/src/runner/usecases/task-run.ts     |  14 +
 .../architecture-guard.test.ts                     |  41 +++
 .../src/runtime/task-execution-context/index.ts    |   8 +
 .../runtime/task-execution-context/resolve.test.ts | 104 +++++++
 .../src/runtime/task-execution-context/resolve.ts  | 307 +++++++++++++++++++++
 .../src/runtime/task-execution-context/types.ts    |  39 +++
 .../agentplane/src/runtime/task-routing/index.ts   |   1 -
 .../agentplane/src/runtime/task-routing/resolve.ts |  20 +-
 .../runtime/workspace-allocation/allocate.test.ts  | 118 ++++++++
 .../src/runtime/workspace-allocation/allocate.ts   | 225 +++++++++++++++
 .../src/runtime/workspace-allocation/index.ts      |  11 +
 .../src/runtime/workspace-allocation/lease.ts      |  93 +++++++
 .../src/runtime/workspace-allocation/types.ts      |  27 ++
 82 files changed, 2918 insertions(+), 389 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
