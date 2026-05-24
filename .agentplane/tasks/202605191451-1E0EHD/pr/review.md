# PR Review

Created: 2026-05-19T14:52:45.909Z

## Task

- Task: `202605191451-1E0EHD`
- Title: Add daily cloud pull before task start
- Status: DOING
- Branch: `task/202605191451-1E0EHD/daily-cloud-start-pull`
- Canonical task record: `.agentplane/tasks/202605191451-1E0EHD/README.md`

## Verification

- State: ok
- Note: Final refresh after fixing the two full-fast pre-push fixture failures; focused failing tests now pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:22:49.030Z
- Branch: task/202605191451-1E0EHD/daily-cloud-start-pull
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend.cloud-start-refresh.test.ts       | 172 +++++++++++++++++++++
 .../task-backend/cloud-backend-capabilities.ts     |  16 ++
 .../task-backend/cloud-backend-settings.ts         |   1 +
 .../task-backend/cloud-backend-state.test.ts       |   5 +
 .../backends/task-backend/cloud-backend-state.ts   |   8 +-
 .../src/backends/task-backend/cloud-backend.ts     |  37 +++--
 .../backends/task-backend/cloud-start-refresh.ts   |  83 ++++++++++
 .../src/backends/task-backend/shared/types.ts      |   1 +
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  19 +++
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |  22 +++
 ...un-cli.core.lifecycle.finish-validation.test.ts |  35 ++++-
 .../src/cli/run-cli.core.tasks.incidents.test.ts   |  24 +++
 .../verify-task.maximum-assimilation.unit.test.ts  |  25 +++
 .../src/commands/evaluator/evaluator.command.ts    |  10 +-
 .../src/commands/pr/integrate/internal/prepare.ts  |  10 +-
 .../agentplane/src/commands/task/start-ready.ts    |   1 +
 16 files changed, 450 insertions(+), 19 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
