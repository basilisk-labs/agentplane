Task: `202608080551-8BH6HY`
Title: Accept external task-worktree resolution results
Canonical task record: `.agentplane/tasks/202608080551-8BH6HY/README.md`

## Summary

Accept external task-worktree resolution results

Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage.

## Scope

- In scope: Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage.
- Out of scope: unrelated refactors not required for "Accept external task-worktree resolution results".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

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
 .../src/commands/task/external-agent-purpose.ts    |  21 ++
 .../task/external-agent-supervisor-episode.ts      | 116 ++++++
 .../src/commands/task/external-agent-supervisor.ts | 121 +-----
 12 files changed, 871 insertions(+), 112 deletions(-)
```

</details>
