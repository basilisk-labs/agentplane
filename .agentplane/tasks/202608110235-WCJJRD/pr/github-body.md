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
Verified 0cca19004674: the generated CLI reference is exact; unchanged explicit-intent and
compatibility evidence remains reusable.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T02:46:45.806Z
- Branch: task/202608110235-WCJJRD/replace-task-create-keyword-inference-with-expli
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  17 +-
 .../run-cli.core.help-snap.test.ts.snap            |   2 +-
 .../src/cli/run-cli.core.tasks.user-create.test.ts | 248 ++++++++-----
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../agentplane/src/commands/task/create.command.ts | 400 ++++++++-------------
 .../agentplane/src/commands/task/task.command.ts   |   4 +-
 .../baselines/v0.7-compatibility-candidate.json    | 157 +++++++-
 .../check-compatibility-contract-baseline.mjs      | 132 ++++++-
 8 files changed, 609 insertions(+), 362 deletions(-)
```

</details>
