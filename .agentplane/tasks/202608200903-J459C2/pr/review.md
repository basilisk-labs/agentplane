# PR Review

Created: 2026-08-20T15:49:58.682Z

## Task

- Task: `202608200903-J459C2`
- Title: Make task execution authority local and direct execution workspace-safe
- Status: DOING
- Branch: `task/202608200903-J459C2/make-task-execution-authority-local-and-direct-e`
- Canonical task record: `.agentplane/tasks/202608200903-J459C2/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
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
 ...-cli.critical.agent-efficiency-baseline.test.ts |   5 +-
 .../branch/cleanup-merged-provider-rebase.test.ts  |   4 +-
 .../src/commands/branch/work-start.command.ts      |  14 +-
 .../commands/evaluator/evaluator-diff-evidence.ts  |  49 +---
 .../evaluator-evidence-compaction.test.ts          |   9 +-
 .../evaluator/evaluator-execute-supervisor.ts      |   2 +-
 .../commands/evaluator/evaluator-execution-base.ts |  46 +++
 .../evaluator/evaluator-qualification-review.ts    |   4 +-
 .../commands/evaluator/evaluator-review-apply.ts   |   3 +-
 .../commands/evaluator/evaluator-review-support.ts |  75 +++++
 .../commands/evaluator/evaluator-review-usecase.ts | 125 ++++-----
 .../evaluator/evaluator-run.command.test.ts        |   2 +-
 .../commands/evaluator/evaluator-test-helpers.ts   |  27 ++
 .../evaluator-verification-contract.test.ts        |   9 +-
 .../src/commands/integrate-queue-direct.ts         | 195 +++++++++++++
 .../src/commands/integrate-queue-lane.ts           |   6 +-
 .../src/commands/integrate-queue-reservation.ts    |  16 ++
 .../src/commands/integrate-queue.command.ts        | 122 ++++----
 packages/agentplane/src/commands/pr/flow-status.ts |   9 +-
 .../src/commands/pr/integrate/queue-state-types.ts |  50 ++++
 .../src/commands/pr/integrate/queue-state.test.ts  |  41 +++
 .../src/commands/pr/integrate/queue-state.ts       |  75 ++---
 .../agentplane/src/commands/pr/internal/sync.ts    |  15 +-
 packages/agentplane/src/commands/pr/open.ts        |  32 ++-
 .../src/commands/provider-ops-results.test.ts      |  15 +
 .../src/commands/shared/declared-check.test.ts     |   9 +
 .../src/commands/shared/declared-check.ts          |   6 +-
 .../commands/shared/post-commit-pr-artifacts.ts    |   6 +-
 .../src/commands/shared/route-cleanup-probe.ts     |   3 +-
 .../src/commands/shared/route-decision-blockers.ts |  50 ++--
 .../shared/route-decision-verification-blocker.ts  |   4 +-
 .../commands/shared/route-decision-verification.ts |   3 +
 .../src/commands/shared/route-decision.ts          |  44 +--
 .../src/commands/shared/route-gate-priority.ts     |  18 ++
 .../commands/shared/side-effect-authority.test.ts  |  26 ++
 .../src/commands/shared/side-effect-authority.ts   |  45 +++
 .../shared/task-verification-input-types.ts        |  52 ++++
 .../shared/task-verification-input.test.ts         |  64 ++++-
 .../src/commands/shared/task-verification-input.ts | 140 +++++----
 .../shared/task-verification-record-parser.ts      | 183 ++++++++++++
 .../commands/shared/task-verification-records.ts   | 206 +++++---------
 .../shared/task-verification-records.v2.test.ts    |   6 +-
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 .../task/branch-task-supervisor-episodes.ts        |  10 +
 .../task/branch-task-supervisor-operations.ts      |   7 +-
 .../src/commands/task/branch-task-supervisor.ts    |   2 +
 .../src/commands/task/complete.command.ts          |  12 +-
 .../task/direct-task-supervisor-operation.test.ts  | 137 +++++++++
 .../task/direct-task-supervisor-operation.ts       | 142 ++++++++++
 .../commands/task/direct-task-supervisor.test.ts   |  92 +++++-
 .../src/commands/task/direct-task-supervisor.ts    | 159 +++++------
 .../external-agent-implementation-authority.ts     |   7 +
 .../src/commands/task/finish-blueprint-evidence.ts |   8 +-
 .../agentplane/src/commands/task/finish-close.ts   |   7 +-
 .../commands/task/finish-closeout-journal.test.ts  | 163 +++++++++++
 .../task/finish-closeout-journal.testkit.ts        |  17 ++
 .../src/commands/task/finish-closeout-journal.ts   | 144 ++++++++++
 .../agentplane/src/commands/task/finish-command.ts |  20 +-
 .../src/commands/task/finish-execute-close.ts      |  18 +-
 .../src/commands/task/finish-execute-commit.ts     |  89 ++++--
 .../agentplane/src/commands/task/finish-execute.ts | 312 ++++++++++++---------
 .../agentplane/src/commands/task/finish-plan.ts    |  18 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   7 +-
 .../agentplane/src/commands/task/finish-types.ts   |   9 +
 .../commands/task/finish.close-tail.unit.test.ts   |   4 +-
 .../task/finish.quality-review-target.unit.test.ts |  73 ++++-
 .../src/commands/task/finish.state.unit.test.ts    |  15 +
 .../commands/task/finish.validation.unit.test.ts   |   9 +-
 .../agentplane/src/commands/task/handoff.shared.ts |  17 +-
 .../src/commands/task/mutation-parity.unit.test.ts |  43 +++
 packages/agentplane/src/commands/task/new.spec.ts  |   8 +-
 packages/agentplane/src/commands/task/new.ts       |   2 +-
 .../agentplane/src/commands/task/run.command.ts    |  29 +-
 .../src/commands/task/shared/transitions.ts        |  18 +-
 .../agentplane/src/commands/task/start-ready.ts    |  14 +-
 packages/agentplane/src/commands/task/start.ts     |  13 +-
 .../src/commands/task/start.unit.test.ts           |  15 +
 .../task-execution-contract-observation.test.ts    |  24 +-
 .../task/task-execution-contract-observation.ts    |  10 +-
 .../src/commands/task/verify-record-execute.ts     | 155 ++++------
 .../task/verify-record-observed-changes.ts         |   8 +-
 .../src/commands/task/verify-record-references.ts  |  86 ++++++
 .../src/commands/task/verify-record.testkit.ts     |  57 ++++
 .../src/commands/task/verify-record.unit.test.ts   |  66 ++---
 .../agentplane/src/runner/context/task-context.ts  |   3 +-
 .../src/runner/usecases/agent-work-order.ts        |   5 +-
 .../task-run-authority.capabilities.test.ts        |  52 ++++
 .../src/runner/usecases/task-run-authority.ts      |  29 ++
 .../src/runner/usecases/task-run-options.ts        |  27 ++
 .../agentplane/src/runner/usecases/task-run.ts     |  34 +--
 .../architecture-guard.test.ts                     |  41 +++
 .../src/runtime/task-execution-context/index.ts    |   2 +
 .../runtime/task-execution-context/resolve.test.ts | 104 +++++++
 .../src/runtime/task-execution-context/resolve.ts  | 307 ++++++++++++++++++++
 .../src/runtime/task-execution-context/types.ts    |  39 +++
 .../agentplane/src/runtime/task-routing/index.ts   |   1 -
 .../agentplane/src/runtime/task-routing/resolve.ts |  20 +-
 .../runtime/workspace-allocation/allocate.test.ts  | 118 ++++++++
 .../src/runtime/workspace-allocation/allocate.ts   | 225 +++++++++++++++
 .../src/runtime/workspace-allocation/index.ts      |   2 +
 .../src/runtime/workspace-allocation/lease.ts      |  93 ++++++
 .../src/runtime/workspace-allocation/types.ts      |  27 ++
 .../baselines/v0.7-compatibility-candidate.json    |  24 +-
 .../check-compatibility-contract-baseline.mjs      |  10 +-
 scripts/checks/run-local-ci.mjs                    |   6 +
 .../docs/adr/0014-task-execution-authority.png     | Bin 0 -> 62644 bytes
 .../docs/adr/0015-task-workspace-isolation.png     | Bin 0 -> 64475 bytes
 .../adr/0016-serialized-direct-integration.png     | Bin 0 -> 64669 bytes
 .../docs/developer/task-execution-authority.png    | Bin 0 -> 60616 bytes
 website/static/img/social/manifest.json            |  32 +++
 117 files changed, 4300 insertions(+), 1021 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
