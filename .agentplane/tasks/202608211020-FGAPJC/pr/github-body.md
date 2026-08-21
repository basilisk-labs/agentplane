Task: `202608211020-FGAPJC`
Title: Implement task-scoped autonomous execution after one user-approved plan
Canonical task record: `.agentplane/tasks/202608211020-FGAPJC/README.md`

## Summary

Implement task-scoped autonomous execution after one user-approved plan

Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift.

## Scope

- In scope: Introduce PlanProposal, host-originated user decisions, task-scoped ExecutionGrant and OperationLease authority, an autonomous supervisor loop through verification and logical closeout, task-scoped base refs and path-independent workspace recovery, compatibility migration, doctor diagnostics, documentation, and end-to-end one-approval execution coverage. Preserve user control through plan revisions and require a new confirmation only for material drift.
- Out of scope: unrelated refactors not required for "Implement task-scoped autonomous execution after one user-approved plan".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T11:11:57.023Z
- Branch: task/202608211020-FGAPJC/implement-task-scoped-autonomous-execution-after
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/task-execution-authority.mdx        |  26 ++
 docs/user/branching-and-pr-artifacts.mdx           |  16 +
 docs/user/cli-reference.generated.mdx              |   2 +
 docs/user/task-lifecycle.mdx                       |  35 ++-
 .../src/cli/run-cli.core.lifecycle.plan.test.ts    |  61 +++-
 ...run-cli.core.task-create-planner-intent.test.ts |  68 ++++-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/commands/branch/work-start.command.ts      |   2 +
 .../agentplane/src/commands/branch/work-start.ts   |   7 +-
 .../agentplane/src/commands/pr/internal/sync.ts    |  13 +-
 packages/agentplane/src/commands/pr/open.ts        |   2 +
 packages/agentplane/src/commands/pr/update.ts      |  11 +-
 .../src/commands/task/advance.command.ts           |  17 +-
 .../src/commands/task/agent-action-packet.test.ts  |  28 +-
 .../src/commands/task/agent-action-packet.ts       |  55 +++-
 .../task/branch-task-supervisor-operations.ts      |   4 +-
 .../src/commands/task/configured-authority.test.ts |  78 +++++
 .../src/commands/task/configured-authority.ts      | 121 ++++++--
 .../agentplane/src/commands/task/create.command.ts |  34 +++
 packages/agentplane/src/commands/task/new.ts       |  26 +-
 .../src/commands/task/plan-approve.command.ts      |  70 ++++-
 packages/agentplane/src/commands/task/plan.ts      |  81 ++++-
 .../runtime/task-execution-context/resolve.test.ts |  26 +-
 .../src/runtime/task-execution-context/resolve.ts  |  81 ++++-
 packages/core/src/tasks/index.ts                   |  28 ++
 .../core/src/tasks/plan-execution-grant.test.ts    | 226 ++++++++++++++
 packages/core/src/tasks/plan-execution-grant.ts    | 340 +++++++++++++++++++++
 packages/core/src/tasks/task-execution-base.ts     |  43 +++
 packages/core/src/tasks/task-store.ts              |   1 +
 packages/core/src/tasks/tasks-export.ts            |   2 +
 .../baselines/v0.7-compatibility-candidate.json    |  41 ++-
 .../check-compatibility-contract-baseline.mjs      |  27 ++
 website/static/llms-full.txt                       |  35 ++-
 33 files changed, 1515 insertions(+), 99 deletions(-)
```

</details>
