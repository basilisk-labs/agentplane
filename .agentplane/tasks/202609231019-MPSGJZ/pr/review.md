# PR Review

Created: 2026-09-23T10:57:06.440Z

## Task

- Task: `202609231019-MPSGJZ`
- Title: Fix canonical completed-task branch lifecycle recovery without internal provider work items
- Status: DOING
- Branch: `task/202609231019-MPSGJZ/fix-canonical-completed-task-branch-lifecycle-re`
- Canonical task record: `.agentplane/tasks/202609231019-MPSGJZ/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T10:57:06.440Z
- Branch: task/202609231019-MPSGJZ/fix-canonical-completed-task-branch-lifecycle-re
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/conflict-rework.test.ts        |  39 +++++
 .../commands/shared/merged-branch-cleanup.test.ts  |  34 +++-
 .../src/commands/shared/merged-branch-cleanup.ts   |   8 +-
 .../shared/roadmap-rework-conservation.test.ts     |   2 +-
 .../shared/supervisor-execution-episode.ts         |  10 +-
 .../supervisor-execution-worktree-recovery.test.ts |  66 ++++++++
 .../supervisor-execution-worktree-recovery.ts      |  52 ++++++
 .../agentplane/src/commands/shared/text-payload.ts |   1 -
 .../src/commands/task/advance-task-step.ts         |  69 ++++++--
 .../src/commands/task/advance.command.ts           |  25 ++-
 .../src/commands/task/agent-action-packet.test.ts  |   1 +
 .../src/commands/task/agent-action-packet.ts       |   8 +-
 .../task/branch-task-supervisor-episodes.ts        |  47 +++++-
 .../branch-task-supervisor-journal-recovery.ts     |  89 ++++++++++
 .../commands/task/branch-task-supervisor.test.ts   |  31 +++-
 .../src/commands/task/branch-task-supervisor.ts    |   1 +
 .../commands/task/branch-task-verification.test.ts |  14 +-
 .../src/commands/task/doc-set.command.ts           |  15 +-
 .../agentplane/src/commands/task/doc.unit.test.ts  |  11 ++
 .../task/external-agent-supervisor.test.ts         | 180 +++++++++++++++++++++
 .../agentplane/src/commands/task/finish-execute.ts |  58 +++++--
 .../task/finish.pre-merge-closure.unit.test.ts     |  50 +++++-
 .../kernel-provider-effect-coordinator.test.ts     | 150 ++++++++++++++++-
 .../task/kernel-provider-effect-coordinator.ts     | 142 ++++++++++++----
 .../src/commands/task/plan-set.command.ts          |  24 +--
 .../agentplane/src/commands/task/plan.unit.test.ts |  11 ++
 .../commands/task/roadmap-advance-one-step.test.ts |   9 +-
 .../commands/task/roadmap-terminal-noop.test.ts    |  58 ++++++-
 .../runner/adapters/codex-output-schema-compat.ts  |  95 +++++++++++
 .../src/runner/adapters/codex-result-transport.ts  |  41 +++--
 .../runner/adapters/roadmap-output-parity.test.ts  |   1 +
 .../src/runner/usecases/task-run-authority.ts      |  11 +-
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/plan-execution-grant.test.ts    |  20 ++-
 packages/core/src/tasks/plan-execution-grant.ts    |  52 +++---
 .../core/src/tasks/task-kernel/invariants.test.ts  |  69 ++++++++
 packages/core/src/tasks/task-kernel/invariants.ts  |  11 ++
 37 files changed, 1353 insertions(+), 153 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
