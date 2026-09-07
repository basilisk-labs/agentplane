Task: `202609071111-Y0Z0VQ`
Title: Repair confirmed Arkady Factory compatibility lifecycle defects sequentially
Canonical task record: `.agentplane/tasks/202609071111-Y0Z0VQ/README.md`

## Summary

Repair confirmed Arkady Factory compatibility lifecycle defects sequentially

Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.

## Scope

- In scope: Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.
- Out of scope: unrelated refactors not required for "Repair confirmed Arkady Factory compatibility lifecycle defects sequentially".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T13:03:09.416Z
- Branch: task/202609071111-Y0Z0VQ/repair-confirmed-arkady-factory-compatibility-li
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-adapter.test.ts           |  35 +++
 .../task-backend/task-centric-backend-adapter.ts   |   2 +
 .../agentplane/src/cli/route-decision.testkit.ts   |   1 +
 ...n-cli.core.task-advance.evidence-rework.test.ts | 228 +++++++++++---------
 .../src/cli/run-cli.core.task-advance.test.ts      | 234 +++++++++------------
 .../src/cli/run-cli.core.task-advance.testkit.ts   | 177 ++++++++++++++++
 .../cli/run-cli.core.tasks.update-scrub.test.ts    |  80 ++++++-
 .../src/commands/shared/reconcile-check.test.ts    |   2 +-
 .../shared/task-backend-branch-snapshot.ts         |  67 +++++-
 .../src/commands/shared/task-backend.test.ts       |  89 ++++++++
 .../agentplane/src/commands/shared/task-backend.ts |  15 +-
 .../src/commands/shared/task-mutation.test.ts      |  44 ++++
 .../src/commands/shared/workflow-step-branch.ts    |  29 +--
 .../src/commands/shared/workflow-step-common.ts    |  24 ++-
 .../src/commands/shared/workflow-step-factory.ts   |  46 ++--
 .../commands/shared/workflow-step-quality.test.ts  | 156 +++++++++++---
 .../src/commands/shared/workflow-step-reducer.ts   |   8 +-
 .../src/commands/task/active.command.unit.test.ts  |   5 +-
 .../commands/task/evidence-only-rework-commit.ts   |  27 +++
 .../external-agent-implementation-authority.ts     |  22 +-
 .../external-agent-implementation-finalization.ts  |   1 +
 .../task/external-agent-implementation-recovery.ts |  76 +++----
 .../agentplane/src/commands/task/finish-shared.ts  |   5 +-
 .../agentplane/src/commands/task/plan-shared.ts    |  38 +++-
 packages/agentplane/src/commands/task/plan.ts      |  38 ++--
 .../src/commands/task/shared/dependencies.ts       |   9 +
 .../task/task-centric-external-result.test.ts      | 146 ++++++++++++-
 .../commands/task/task-centric-external-result.ts  |  61 ++++--
 .../src/runner/usecases/kernel-authority.test.ts   |  51 ++++-
 .../core/src/tasks/task-centric/compatibility.ts   |   2 +
 packages/core/src/tasks/task-centric/index.ts      |   1 +
 packages/core/src/tasks/task-centric/lifecycle.ts  |  16 +-
 32 files changed, 1309 insertions(+), 426 deletions(-)
```

</details>
