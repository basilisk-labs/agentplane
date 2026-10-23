Task: `202610232049-NSMZYM`
Title: Preserve linked-worktree observation context for canonical primary-stored tasks
Canonical task record: `.agentplane/tasks/202610232049-NSMZYM/README.md`

## Summary

Preserve linked-worktree observation context for canonical primary-stored tasks

Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.

## Scope

- In scope: Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
- Out of scope: unrelated refactors not required for "Preserve linked-worktree observation context for canonical primary-stored tasks".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-23T21:06:45.684Z
- Branch: task/202610232049-NSMZYM/preserve-linked-worktree-observation-context-for
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.kernel-transport.test.ts    | 20 ++++++++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts   | 18 +++++++++++++++++-
 2 files changed, 37 insertions(+), 1 deletion(-)
```

</details>
