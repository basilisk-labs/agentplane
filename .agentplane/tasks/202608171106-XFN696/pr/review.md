# PR Review

Created: 2026-08-17T11:57:53.694Z

## Task

- Task: `202608171106-XFN696`
- Title: Add policy-driven autonomous side-effect authority
- Status: DOING
- Branch: `task/202608171106-XFN696/add-policy-driven-autonomous-side-effect-authori`
- Canonical task record: `.agentplane/tasks/202608171106-XFN696/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T16:05:50.153Z
- Branch: task/202608171106-XFN696/add-policy-driven-autonomous-side-effect-authori
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  30 ++++
 docs/user/configuration.mdx                        |  48 +++++++
 .../run-cli.core.route-decision.pre-merge.test.ts  |  34 +++++
 ...n-cli.core.task-advance-effect-recovery.test.ts | 159 +++++++++++++++++++++
 ...i.core.task-advance.worktree-resolution.test.ts |   7 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   4 +-
 .../src/cli/run-cli/command-loaders/task.ts        |  31 +++-
 .../shared/workflow-step-planning-checkout.test.ts |  33 +++++
 .../src/commands/shared/workflow-step-reducer.ts   |  12 +-
 .../src/commands/shared/workflow-step.test.ts      |   3 +
 .../src/commands/task/advance.command.ts           |  20 ++-
 .../commands/task/authority-grant.command.test.ts  |  98 ++++++++++++-
 .../src/commands/task/authority-grant.command.ts   |  67 ++++++---
 .../src/commands/task/branch-task-supervisor.ts    |  26 +++-
 .../src/commands/task/configured-authority.test.ts |  56 ++++++++
 .../src/commands/task/configured-authority.ts      | 108 ++++++++++++++
 .../external-agent-implementation-authority.ts     |  16 ++-
 .../task/external-agent-supervisor-episode.ts      |  15 ++
 .../task/external-agent-supervisor-recovery.ts     | 100 +++++++++++++
 .../src/runtime/task-routing/resolve.test.ts       |  36 +++++
 .../agentplane/src/runtime/task-routing/resolve.ts |   4 +-
 packages/core/schemas/config.schema.json           |  45 ++++++
 packages/core/schemas/workflow.schema.json         |  76 ++++++++++
 packages/core/src/config/config.test.ts            |  44 ++++++
 packages/core/src/config/config.ts                 |   1 +
 packages/core/src/config/index.ts                  |   1 +
 packages/core/src/config/schema.impl.ts            |  34 +++++
 packages/core/src/config/workflow-contract.ts      |   1 +
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/spec/schemas/config.schema.json           |  45 ++++++
 packages/spec/schemas/workflow.schema.json         |  76 ++++++++++
 schemas/config.schema.json                         |  45 ++++++
 schemas/workflow.schema.json                       |  76 ++++++++++
 .../baselines/v0.7-compatibility-candidate.json    |   8 +-
 34 files changed, 1310 insertions(+), 51 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
