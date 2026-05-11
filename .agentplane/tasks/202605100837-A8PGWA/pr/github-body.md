Task: `202605100837-A8PGWA`
Title: Pre-v0.5: feed workflow Git capabilities into blueprint planner
Canonical task record: `.agentplane/tasks/202605100837-A8PGWA/README.md`

## Summary

Pre-v0.5: feed workflow Git capabilities into blueprint planner

Expose workflow capabilities to blueprint planning: workflowMode, implementationCommitLocation, finishCommitSource, closeTailRequired, and related branch_pr constraints.

## Scope

- In scope: Expose workflow capabilities to blueprint planning: workflowMode, implementationCommitLocation, finishCommitSource, closeTailRequired, and related branch_pr constraints.
- Out of scope: unrelated refactors not required for "Pre-v0.5: feed workflow Git capabilities into blueprint planner".

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --reporter dot; Result: pass, 3 files / 46 tests. Command: bunx eslint touched blueprint/task preview files; Result: pass. Command: bunx prettier --check touched files; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass, oversized baseline OK. Command: ap blueprint snapshot 202605100837-A8PGWA && ap task verify-show 202605100837-A8PGWA; Result: pass, workflow_git capabilities visible and snapshot current.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-11T07:43:58.910Z
- Branch: task-202605100837-A8PGWA-blueprint-git-capabilities
- Head: 4cd946f85a30

```text
 .../blueprint/resolved-snapshot.json               | 521 +++++++++++++++++++++
 packages/agentplane/src/blueprints/explain.ts      |  16 +-
 packages/agentplane/src/blueprints/model.ts        |  12 +
 packages/agentplane/src/blueprints/plan.ts         |  34 +-
 packages/agentplane/src/blueprints/resolve.test.ts |  36 ++
 .../agentplane/src/blueprints/snapshot.test.ts     |  11 +
 packages/agentplane/src/blueprints/snapshot.ts     |   4 +-
 .../src/cli/run-cli.core.tasks.create.test.ts      |   3 +
 .../src/commands/task/blueprint-summary.ts         |  12 +
 9 files changed, 643 insertions(+), 6 deletions(-)
```

</details>
