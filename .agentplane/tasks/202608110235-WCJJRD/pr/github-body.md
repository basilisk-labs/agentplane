Task: `202608110235-WCJJRD`
Title: Replace task-create keyword inference with explicit semantic intent
Canonical task record: `.agentplane/tasks/202608110235-WCJJRD/README.md`

## Summary

Replace task-create keyword inference with explicit semantic intent

Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route.

## Scope

- In scope: Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route.
- Out of scope: unrelated refactors not required for "Replace task-create keyword inference with explicit semantic intent".

## Verification

- State: ok
- Note:

```text
Explicit semantic task intent verified: CLI classification is independent of natural-language
keywords, and missing intent deterministically routes to neutral PLANNER intake.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T02:46:45.806Z
- Branch: task/202608110235-WCJJRD/replace-task-create-keyword-inference-with-expli
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.help-snap.test.ts.snap            |   2 +-
 .../src/cli/run-cli.core.tasks.user-create.test.ts | 246 ++++++++-----
 .../agentplane/src/commands/task/create.command.ts | 385 +++++++--------------
 .../agentplane/src/commands/task/task.command.ts   |   4 +-
 4 files changed, 301 insertions(+), 336 deletions(-)
```

</details>
