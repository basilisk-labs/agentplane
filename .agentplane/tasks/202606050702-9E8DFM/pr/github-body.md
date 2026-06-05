Task: `202606050702-9E8DFM`
Title: Recover README when closing no-op tasks
Canonical task record: `.agentplane/tasks/202606050702-9E8DFM/README.md`

## Summary

Recover README when closing no-op tasks

Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness.

## Scope

- In scope: Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness.
- Out of scope: unrelated refactors not required for "Recover README when closing no-op tasks".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T07:02:58.618Z
- Branch: task/202606050702-9E8DFM/recover-readme-when-closing-no-op-tasks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606040927-KSESDS/README.md    | 116 ++++++++++++++++++++
 .agentplane/tasks/202606041702-TVTSM2/README.md    | 120 +++++++++++++++++++++
 .../src/cli/run-cli.core.tasks.lifecycle.test.ts   | 101 +++++++++++++++++
 .../src/commands/task/close-duplicate.ts           |  59 +---------
 .../agentplane/src/commands/task/close-noop.ts     |   3 +-
 .../agentplane/src/commands/task/close-shared.ts   |  57 +++++++++-
 6 files changed, 396 insertions(+), 60 deletions(-)
```

</details>
