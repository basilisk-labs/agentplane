# PR Review

Created: 2026-07-26T05:34:29.033Z

## Task

- Task: `202607260532-9M7RNH`
- Title: Recover stale protected-PR conflict-base context
- Status: DONE
- Branch: `task/202607260532-9M7RNH/recover-stale-protected-pr-conflict-base-context`
- Canonical task record: `.agentplane/tasks/202607260532-9M7RNH/README.md`

## Verification

- State: ok
- Note: Independent TESTER passed the declared legacy protected-conflict recovery contract.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T05:35:17.261Z
- Branch: task/202607260532-9M7RNH/recover-stale-protected-pr-conflict-base-context
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221908-9M2FBQ/README.md    |   3 +-
 .../run-cli.core.help-snap.test.ts.snap            |   3 +
 packages/agentplane/src/cli/reason-codes.ts        |  22 +
 .../cli/run-cli.core.pr-conflict-rework.test.ts    | 224 ++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     |   5 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/commands/integrate-queue.command.test.ts   | 120 ++++++
 .../src/commands/integrate-queue.command.ts        |  92 ++++
 .../src/commands/integrate-queue.spec.test.ts      |  27 +-
 .../src/commands/integrate-queue.spec.ts           |  49 ++-
 .../src/commands/pr/conflict-rework-checks.ts      |  63 +++
 .../src/commands/pr/conflict-rework-legacy.ts      | 101 +++++
 .../pr/conflict-rework-route-eligibility.ts        | 310 ++++++++++++++
 .../src/commands/pr/conflict-rework.command.ts     |  35 +-
 .../pr/conflict-rework.legacy-base.test.ts         | 476 +++++++++++++++++++++
 .../src/commands/pr/conflict-rework.test.ts        |  12 +
 .../agentplane/src/commands/pr/conflict-rework.ts  | 310 +++++++-------
 packages/agentplane/src/commands/pr/flow-status.ts |  28 +-
 .../pr/integrate/queue-state-legacy-adoption.ts    | 252 +++++++++++
 .../src/commands/pr/integrate/queue-state-paths.ts |  22 +
 .../commands/pr/integrate/queue-state-snapshot.ts  |  26 ++
 .../src/commands/pr/integrate/queue-state.test.ts  | 149 +++++++
 .../src/commands/pr/integrate/queue-state.ts       | 194 ++++++---
 .../src/commands/shared/route-decision-blockers.ts |   8 +
 .../src/commands/shared/route-decision.ts          |   1 +
 .../agentplane/src/commands/shared/route-oracle.ts |   1 +
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   6 +
 .../workflow-operation-projection.registry.test.ts | 225 ++++++++++
 .../shared/workflow-operation-projection.ts        |  11 +
 .../src/commands/shared/workflow-postconditions.ts | 112 +++++
 .../src/commands/shared/workflow-step-branch.ts    |  19 +-
 .../shared/workflow-step-conflict-rework.ts        | 104 +++++
 .../src/commands/shared/workflow-step-factory.ts   |  63 +--
 ...rkflow-step-projections.conflict-rework.test.ts | 113 +++++
 .../shared/workflow-step-projections.test.ts       |  41 ++
 .../commands/shared/workflow-step-projections.ts   |   6 +-
 .../src/commands/shared/workflow-step.test.ts      | 207 +--------
 .../src/commands/shared/workflow-step.ts           | 133 +-----
 39 files changed, 2979 insertions(+), 599 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
