# PR Review

Created: 2026-08-08T05:52:09.195Z

## Task

- Task: `202608080551-8BH6HY`
- Title: Accept external task-worktree resolution results
- Status: DOING
- Branch: `task/202608080551-8BH6HY/accept-external-task-worktree-resolution-results`
- Canonical task record: `.agentplane/tasks/202608080551-8BH6HY/README.md`

## Verification

- State: needs_rework
- Note: Rework: Unsupported declared check: bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T05:55:06.161Z
- Branch: task/202608080551-8BH6HY/accept-external-task-worktree-resolution-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-advance.test.ts      |  61 +++++
 ...i.core.task-advance.worktree-resolution.test.ts | 293 +++++++++++++++++++++
 .../external-agent-implementation-authority.ts     |   3 +-
 .../commands/task/external-agent-purpose.test.ts   |  19 ++
 .../src/commands/task/external-agent-purpose.ts    |  11 +
 .../src/commands/task/external-agent-supervisor.ts |  30 +--
 6 files changed, 400 insertions(+), 17 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
