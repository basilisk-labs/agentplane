Task: `202609231019-MPSGJZ`
Title: Fix canonical completed-task branch lifecycle recovery without internal provider work items
Canonical task record: `.agentplane/tasks/202609231019-MPSGJZ/README.md`

## Summary

Fix canonical completed-task branch lifecycle recovery without internal provider work items

Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.

## Scope

- In scope: Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
- Out of scope: unrelated refactors not required for "Fix canonical completed-task branch lifecycle recovery without internal provider work items".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T11:19:17.178Z
- Branch: task/202609231019-MPSGJZ/fix-canonical-completed-task-branch-lifecycle-re
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |   6 +-
 .../evaluator/evaluator-execute-supervisor.ts      |  38 +++--
 .../evaluator-human-review-replacement.test.ts     |  70 ++++++++
 .../evaluator-human-review-replacement.ts          |  44 +++++
 .../evaluator/evaluator-review-apply.test.ts       |  37 ++++-
 .../commands/evaluator/evaluator-review-apply.ts   |  71 +++++---
 .../commands/evaluator/evaluator-review-usecase.ts |  13 +-
 .../src/commands/pr/conflict-rework.test.ts        |  39 +++++
 .../commands/shared/merged-branch-cleanup.test.ts  |  34 +++-
 .../src/commands/shared/merged-branch-cleanup.ts   |   8 +-
 .../shared/roadmap-rework-conservation.test.ts     |   2 +-
 .../shared/supervisor-execution-budget-renewal.ts  |  17 ++
 .../shared/supervisor-execution-episode.test.ts    | 107 ++++--------
 .../shared/supervisor-execution-episode.testkit.ts |  80 +++++++++
 .../shared/supervisor-execution-episode.ts         |  44 +++--
 .../supervisor-execution-worktree-recovery.test.ts |  66 ++++++++
 .../supervisor-execution-worktree-recovery.ts      |  52 ++++++
 .../agentplane/src/commands/shared/text-payload.ts |   1 -
 .../src/commands/task/advance-task-step.ts         |  69 ++++++--
 .../src/commands/task/advance.command.ts           |  27 +++-
 .../src/commands/task/agent-action-packet.test.ts  |   1 +
 .../src/commands/task/agent-action-packet.ts       |   8 +-
 .../task/branch-task-supervisor-episodes.ts        |  73 ++++++++-
 ...branch-task-supervisor-journal-recovery.test.ts |  66 ++++++++
 .../branch-task-supervisor-journal-recovery.ts     |  90 +++++++++++
 .../commands/task/branch-task-supervisor.test.ts   |  31 +++-
 .../src/commands/task/branch-task-supervisor.ts    |   1 +
 .../commands/task/branch-task-verification.test.ts |  14 +-
 ...direct-task-supervisor-formal-operation.test.ts | 172 ++++++++++++++++++++
 .../direct-task-supervisor-formal-operation.ts     |  26 +++
 .../src/commands/task/doc-set.command.ts           |  15 +-
 .../agentplane/src/commands/task/doc.unit.test.ts  |  11 ++
 .../task/external-agent-plan-refinement.test.ts    |  57 +++++++
 .../task/external-agent-plan-refinement.ts         | 128 ++++++++++++++-
 .../task/external-agent-supervisor.test.ts         | 180 +++++++++++++++++++++
 .../src/commands/task/finish-execute-close.ts      |  41 +++++
 .../agentplane/src/commands/task/finish-execute.ts |  61 +++++--
 .../task/finish.pre-merge-closure.unit.test.ts     |  50 +++++-
 .../kernel-provider-effect-coordinator.test.ts     | 158 +++++++++++++++++-
 .../task/kernel-provider-effect-coordinator.ts     | 149 +++++++++++++----
 .../src/commands/task/plan-set.command.ts          |  24 +--
 .../agentplane/src/commands/task/plan.unit.test.ts |  11 ++
 .../commands/task/roadmap-advance-one-step.test.ts |  13 +-
 .../task/roadmap-integration-parity.test.ts        |   6 +
 .../commands/task/roadmap-terminal-noop.test.ts    |  58 ++++++-
 .../src/commands/task/verify-record-execute.ts     |  20 ++-
 .../task/verify-record-kernel-state.test.ts        |  20 +++
 .../commands/task/verify-record-kernel-state.ts    |  21 +++
 .../runner/adapters/codex-output-schema-compat.ts  |  95 +++++++++++
 .../src/runner/adapters/codex-result-transport.ts  |  41 +++--
 .../runner/adapters/roadmap-output-parity.test.ts  |   1 +
 .../src/runner/usecases/task-run-authority.ts      |  11 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   2 +
 .../src/runner/supervisor-execution-episode.ts     |  80 +++++++++
 .../supervisor-execution-human-review.test.ts      | 121 ++++++++++++++
 packages/core/src/schemas/index.ts                 |   2 +
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/plan-execution-grant.test.ts    |  20 ++-
 packages/core/src/tasks/plan-execution-grant.ts    |  52 +++---
 .../core/src/tasks/task-kernel/invariants.test.ts  |  69 ++++++++
 packages/core/src/tasks/task-kernel/invariants.ts  |  11 ++
 61 files changed, 2535 insertions(+), 301 deletions(-)
```

</details>
