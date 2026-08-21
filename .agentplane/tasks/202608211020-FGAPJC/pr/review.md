# PR Review

Created: 2026-08-21T10:27:11.359Z

## Task

- Task: `202608211020-FGAPJC`
- Title: Implement task-scoped autonomous execution after one user-approved plan
- Status: DOING
- Branch: `task/202608211020-FGAPJC/implement-task-scoped-autonomous-execution-after`
- Canonical task record: `.agentplane/tasks/202608211020-FGAPJC/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run check
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
 .../src/commands/task/advance.command.ts           |  17 +-
 .../src/commands/task/agent-action-packet.test.ts  |  28 +-
 .../src/commands/task/agent-action-packet.ts       |  55 +++-
 .../task/branch-task-supervisor-operations.ts      |   2 +-
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
 24 files changed, 1393 insertions(+), 74 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
