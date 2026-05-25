Task: `202605251936-1HC32Z`
Title: Fix active task selector projection fallback
Canonical task record: `.agentplane/tasks/202605251936-1HC32Z/README.md`

## Summary

Fix active task selector projection fallback

Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.

## Scope

- In scope: Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.
- Out of scope: unrelated refactors not required for "Fix active task selector projection fallback".

## Verification

- State: ok
- Note:

```text
Verified: aligned finish close-commit tests with evaluator run quality-report gate; focused
cli-core/task-backend tests, typecheck, format:check, policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T19:41:23.691Z
- Branch: task/202605251936-1HC32Z/fix-active-task-selector-projection-fallback
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.core.lifecycle.finish-close-commit.test.ts | 53 +++++++++++++++-------
 .../src/cli/run-cli.core.tasks.active.test.ts      | 34 ++++++++++++++
 .../src/commands/shared/task-backend.test.ts       | 41 +++++++++++++++++
 .../agentplane/src/commands/task/active.command.ts |  5 ++
 4 files changed, 116 insertions(+), 17 deletions(-)
```

</details>
