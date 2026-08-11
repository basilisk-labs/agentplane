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
- Note: Final review fix verified at 28f67445f.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T02:46:45.806Z
- Branch: task/202608110235-WCJJRD/replace-task-create-keyword-inference-with-expli
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  17 +-
 .../run-cli.core.help-snap.test.ts.snap            |   2 +-
 .../src/cli/run-cli.core.task-advance.test.ts      |   3 +
 ...run-cli.core.task-create-planner-intent.test.ts | 169 +++++++++
 .../src/cli/run-cli.core.tasks.user-create.test.ts | 248 ++++++++-----
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../src/commands/task/agent-action-packet.ts       |   2 +-
 .../agentplane/src/commands/task/create.command.ts | 400 ++++++++-------------
 .../task/external-agent-planning-authority.ts      |  88 +++++
 .../src/commands/task/external-agent-supervisor.ts |  16 +-
 packages/agentplane/src/commands/task/plan.ts      |  61 ++--
 .../agentplane/src/commands/task/task.command.ts   |   4 +-
 packages/core/src/index.ts                         |   1 +
 .../core/src/runner/agent-semantic-result.test.ts  |  32 ++
 packages/core/src/runner/agent-semantic-result.ts  |  39 ++
 packages/core/src/schemas/index.ts                 |   1 +
 schemas/agent-semantic-result.schema.json          | 165 +++++++++
 .../baselines/v0.7-compatibility-candidate.json    | 157 +++++++-
 .../check-compatibility-contract-baseline.mjs      | 132 ++++++-
 19 files changed, 1155 insertions(+), 393 deletions(-)
```

</details>
