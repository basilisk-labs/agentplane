Task: `202607221852-71SCSW`
Title: Extend supervised execution to branch_pr
Canonical task record: `.agentplane/tasks/202607221852-71SCSW/README.md`

## Summary

Extend supervised execution to branch_pr

RF-10b: add worktree, PR sync/open, hosted checks, integration queue, merge, hosted close, and cleanup operations to the proven supervisor while preserving provider waits and user-attributed authority.

## Scope

- In scope: branch_pr pre/post operations, task worktree recovery, PR artifacts/provider truth, hosted-check stabilization, integration queue, merge authority, pre-merge closure, hosted close, cleanup, retries, and golden metrics.
- Out of scope: bypassing protected main, assuming provider state from local projections, or granting merge/publish authority implicitly.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T11:15:01.849Z
- Branch: task/202607221852-71SCSW/extend-supervised-execution-to-branch-pr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |   2 +-
 .../agentplane/src/commands/branch/work-start.ts   |  17 +-
 .../src/commands/integrate-queue.command.ts        | 111 ++--
 .../src/commands/integrate-queue.spec.ts           |   2 +
 packages/agentplane/src/commands/pr/open.ts        |  13 +-
 .../shared/supervisor-execution-episode.test.ts    |  35 ++
 .../shared/supervisor-execution-episode.ts         |  17 +-
 .../commands/shared/workflow-supervisor.test.ts    |  62 +-
 .../src/commands/shared/workflow-supervisor.ts     |   8 +-
 .../task/branch-task-supervisor-episodes.ts        | 598 +++++++++++++++++++
 .../task/branch-task-supervisor-operations.ts      | 278 +++++++++
 .../commands/task/branch-task-supervisor.test.ts   | 640 +++++++++++++++++++++
 .../src/commands/task/branch-task-supervisor.ts    | 465 +++++++++++++++
 .../direct-task-supervisor-observation.test.ts     |   5 +-
 .../task/direct-task-supervisor-observation.ts     |   6 +-
 .../src/commands/task/hosted-close-pr.command.ts   |   6 +-
 .../src/commands/task/hosted-close-pr.types.ts     |   1 +
 .../agentplane/src/commands/task/run-render.ts     |  84 ++-
 .../agentplane/src/commands/task/run.command.ts    |  87 ++-
 19 files changed, 2294 insertions(+), 143 deletions(-)
```

</details>
