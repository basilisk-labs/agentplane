Task: `202608070209-J3DEJ1`
Title: Harden automatic task intake against unknown intent and stale locks
Canonical task record: `.agentplane/tasks/202608070209-J3DEJ1/README.md`

## Summary

Harden automatic task intake against unknown intent and stale locks

Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.

## Scope

- In scope: Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
- Out of scope: unrelated refactors not required for "Harden automatic task intake against unknown intent and stale locks".

## Verification

- State: ok
- Note: Independent local and hosted verification passed on post-review implementation
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T02:26:56.151Z
- Branch: task/202608070209-J3DEJ1/harden-automatic-task-intake-against-unknown-int
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.tasks.user-create.test.ts | 108 ++++++++-
 .../agentplane/src/commands/task/create.command.ts |  76 ++++++-
 .../src/runtime/task-routing/resolve.test.ts       |  16 ++
 packages/core/src/tasks/task-readme-io.test.ts     | 127 +++++++++--
 packages/core/src/tasks/task-readme-io.ts          | 249 +++++++++++++++++++--
 5 files changed, 532 insertions(+), 44 deletions(-)
```

</details>
