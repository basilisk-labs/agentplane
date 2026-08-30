# PR Review

Created: 2026-08-29T20:33:30.307Z

## Task

- Task: `202608292032-1K47B8`
- Title: Implement the isolated canonical Task kernel
- Status: DOING
- Branch: `task/202608292032-1K47B8/implement-the-isolated-canonical-task-kernel`
- Canonical task record: `.agentplane/tasks/202608292032-1K47B8/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T22:04:21.476Z
- Branch: task/202608292032-1K47B8/implement-the-isolated-canonical-task-kernel
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 depcruise.config.cjs                               |   13 +
 .../src/commands/shared/pr-meta/verify-log.test.ts |   60 ++
 .../src/commands/shared/pr-meta/verify-log.ts      |    4 +
 packages/core/src/tasks/index.ts                   |    2 +
 .../core/src/tasks/task-kernel/M1-QUALIFICATION.md |   93 ++
 packages/core/src/tasks/task-kernel/index.ts       |   23 +
 .../core/src/tasks/task-kernel/invariants.test.ts  |  427 ++++++++
 packages/core/src/tasks/task-kernel/invariants.ts  |  257 +++++
 .../src/tasks/task-kernel/kernel.test-fixtures.ts  |  207 ++++
 packages/core/src/tasks/task-kernel/kernel.test.ts |  833 +++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      | 1061 ++++++++++++++++++++
 packages/core/src/tasks/task-kernel/model.test.ts  |  108 ++
 packages/core/src/tasks/task-kernel/model.ts       |  375 +++++++
 13 files changed, 3463 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
