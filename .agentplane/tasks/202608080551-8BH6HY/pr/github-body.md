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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T05:52:09.195Z
- Branch: task/202608080551-8BH6HY/accept-external-task-worktree-resolution-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/external-agent-purpose.test.ts  | 19 +++++++++++++++++++
 .../src/commands/task/external-agent-purpose.ts       | 11 +++++++++++
 .../src/commands/task/external-agent-supervisor.ts    | 12 +++---------
 3 files changed, 33 insertions(+), 9 deletions(-)
```

</details>
