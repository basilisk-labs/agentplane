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
- Note: GitHub review found two uncovered task-worktree resolution cases: pre-existing dirty paths and read-only authority.
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
 .../src/cli/run-cli.core.task-advance.test.ts      |  61 ++++
 ...i.core.task-advance.worktree-resolution.test.ts | 405 +++++++++++++++++++++
 .../route-decision-blockers.quality-review.test.ts |  57 +++
 .../src/commands/shared/route-decision-blockers.ts |   5 +-
 .../commands/shared/route-decision-verification.ts |  18 +
 ...direct-task-supervisor-formal-operation.test.ts |  61 ++++
 .../direct-task-supervisor-formal-operation.ts     |  16 +-
 .../external-agent-implementation-authority.ts     |  63 +++-
 .../commands/task/external-agent-purpose.test.ts   |  39 ++
 .../src/commands/task/external-agent-purpose.ts    |  19 +
 .../task/external-agent-supervisor-episode.ts      | 116 ++++++
 .../src/commands/task/external-agent-supervisor.ts | 124 ++-----
 12 files changed, 872 insertions(+), 112 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
