Task: `202607302125-Y61ZHN`
Title: Record superseded provider-conflict outcomes without false integration
Canonical task record: `.agentplane/tasks/202607302125-Y61ZHN/README.md`

## Summary

Record superseded provider-conflict outcomes without false integration

Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue.

## Scope

- In scope: Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue.
- Out of scope: unrelated refactors not required for "Record superseded provider-conflict outcomes without false integration".

## Verification

- State: ok
- Note: Verified semantic supersession lifecycle and compatibility ratchet on commit 9840fe498.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T21:28:59.552Z
- Branch: task/202607302125-Y61ZHN/record-superseded-provider-conflict-outcomes-wit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/commands/integrate-queue-doctor-command.ts |   2 +-
 .../src/commands/integrate-queue-lane.ts           |   3 +-
 .../src/commands/integrate-queue.command.test.ts   |  93 +++++++++++++++++++
 .../src/commands/integrate-queue.command.ts        | 100 ++++++++++++++++++++-
 .../src/commands/integrate-queue.spec.test.ts      |  39 ++++++++
 .../src/commands/integrate-queue.spec.ts           |  45 ++++++++--
 .../src/commands/pr/flow-status.render.ts          |   3 +-
 packages/agentplane/src/commands/pr/flow-status.ts |   7 ++
 .../src/commands/pr/integrate/queue-state.test.ts  |  50 +++++++++++
 .../src/commands/pr/integrate/queue-state.ts       |  86 +++++++++++++++++-
 .../src/commands/shared/route-decision-blockers.ts |   7 ++
 .../src/commands/shared/workflow-step-branch.ts    |  18 ++++
 ...rkflow-step-projections.conflict-rework.test.ts |  56 ++++++++++++
 .../src/commands/shared/workflow-step.ts           |   3 +-
 .../baselines/v0.7-compatibility-candidate.json    |  50 +++++++++--
 .../check-compatibility-contract-baseline.mjs      |  38 +++++++-
 17 files changed, 582 insertions(+), 25 deletions(-)
```

</details>
