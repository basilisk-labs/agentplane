# PR Review

Created: 2026-10-31T01:26:30.608Z

## Task

- Task: `202610310121-21Y197`
- Title: Fix completed-scope metadata readers across Node command bundles
- Status: DOING
- Branch: `task/202610310121-21Y197/fix-completed-scope-metadata-readers-across-node`
- Canonical task record: `.agentplane/tasks/202610310121-21Y197/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-31T01:26:30.608Z
- Branch: task/202610310121-21Y197/fix-completed-scope-metadata-readers-across-node
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/task-backend-branch-snapshot.ts         |  22 +-
 .../agentplane/src/commands/shared/task-backend.ts |  16 +-
 .../task/finish-completed-scope.testkit.ts         | 183 ++++++++++++++++
 .../agentplane/src/commands/task/finish-shared.ts  |   6 +-
 .../kernel-completed-external-rework.testkit.ts    |   2 +-
 .../commands/task/kernel-worktree-routing.test.ts  |  58 +++++
 .../src/commands/task/scope-extend.command.test.ts | 243 ++++++++-------------
 7 files changed, 368 insertions(+), 162 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
