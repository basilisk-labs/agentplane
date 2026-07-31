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

- State: ok
- Note:

```text
Verified: branch_pr supervisor owns mechanical lifecycle and provider preparation while semantic
episodes remain role-scoped; all declared gates passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T11:15:01.849Z
- Branch: task/202607221852-71SCSW/extend-supervised-execution-to-branch-pr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.route-decision.pre-merge.test.ts  | 158 ++++-
 .../src/cli/run-cli.core.task-run.test.ts          |   2 +-
 .../agentplane/src/commands/branch/work-start.ts   |  17 +-
 .../src/commands/integrate-queue.command.ts        | 111 ++--
 .../src/commands/integrate-queue.spec.ts           |   2 +
 packages/agentplane/src/commands/pr/flow-status.ts |   3 +-
 packages/agentplane/src/commands/pr/open.ts        |  13 +-
 .../commands/shared/quality-review-target.test.ts  | 102 ++++
 .../src/commands/shared/quality-review-target.ts   | 170 +++++-
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../shared/supervisor-execution-episode.test.ts    |  35 ++
 .../shared/supervisor-execution-episode.ts         |  17 +-
 .../src/commands/shared/workflow-step-branch.ts    |  32 +-
 .../workflow-step-integration-projections.test.ts  |  33 ++
 .../shared/workflow-step-integration-queue.ts      |  96 ++++
 .../src/commands/shared/workflow-step.ts           |  16 +-
 .../commands/shared/workflow-supervisor.test.ts    |  62 +-
 .../src/commands/shared/workflow-supervisor.ts     |   8 +-
 .../task/branch-task-supervisor-episodes.ts        | 598 +++++++++++++++++++
 .../task/branch-task-supervisor-operations.ts      | 278 +++++++++
 .../commands/task/branch-task-supervisor.test.ts   | 640 +++++++++++++++++++++
 .../src/commands/task/branch-task-supervisor.ts    | 462 +++++++++++++++
 .../direct-task-supervisor-observation.test.ts     |   5 +-
 .../task/direct-task-supervisor-observation.ts     |   6 +-
 .../src/commands/task/hosted-close-pr.command.ts   |   6 +-
 .../src/commands/task/hosted-close-pr.types.ts     |   1 +
 .../agentplane/src/commands/task/run-render.ts     |  84 ++-
 .../agentplane/src/commands/task/run.command.ts    |  87 ++-
 28 files changed, 2828 insertions(+), 219 deletions(-)
```

</details>
