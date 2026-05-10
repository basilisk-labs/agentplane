Task: `202605100837-RQ5BHG`
Title: Pre-v0.5: separate integration queue from worktree mutex
Canonical task record: `.agentplane/tasks/202605100837-RQ5BHG/README.md`

## Summary

Pre-v0.5: separate integration queue from worktree mutex

Make the model and code paths distinguish base-branch integration queue from per-worktree Git write mutex. Do not serialize independent task worktrees globally.

## Scope

- In scope: Make the model and code paths distinguish base-branch integration queue from per-worktree Git write mutex. Do not serialize independent task worktrees globally.
- Out of scope: unrelated refactors not required for "Pre-v0.5: separate integration queue from worktree mutex".

## Verification

- State: ok
- Note: Implemented a dedicated integration queue mutex under .agentplane/cache/locks/integration-queue.lock and wrapped enqueue/claim/release/run-next queue mutations with it. The queue lane serializes integration state changes, while per-worktree Git mutation mutexes remain independent. Checks passed: queue-state/queue-mutex Vitest 9 tests, scoped ESLint, Prettier, and agentplane package build.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T16:45:50.123Z
- Branch: task-202605100837-RQ5BHG-integration-queue-mutex
- Head: 7a29b6de0d8d

```text
 .../src/commands/integrate-queue.command.ts        | 171 ++++++++++++---------
 .../src/commands/pr/integrate/queue-mutex.test.ts  | 101 ++++++++++++
 .../src/commands/pr/integrate/queue-state.test.ts  |  56 +++++++
 .../src/commands/pr/integrate/queue-state.ts       |  90 ++++++++++-
 4 files changed, 344 insertions(+), 74 deletions(-)
```

</details>
