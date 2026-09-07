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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T11:19:37.618Z
- Branch: task/202609071111-Y0Z0VQ/repair-confirmed-arkady-factory-compatibility-li
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/task-centric-backend-adapter.ts   |   2 +
 .../agentplane/src/cli/route-decision.testkit.ts   |   1 +
 ...n-cli.core.task-advance.evidence-rework.test.ts | 186 +++++++++++++--------
 .../src/commands/shared/workflow-step-branch.ts    |  29 +---
 .../src/commands/shared/workflow-step-factory.ts   |  26 +++
 .../commands/shared/workflow-step-quality.test.ts  | 126 ++++++++++----
 .../external-agent-implementation-authority.ts     |  22 ++-
 .../external-agent-implementation-finalization.ts  |   1 +
 .../task/external-agent-implementation-recovery.ts |  50 +++---
 .../agentplane/src/commands/task/finish-shared.ts  |   5 +-
 .../task/task-centric-external-result.test.ts      | 146 +++++++++++++++-
 .../commands/task/task-centric-external-result.ts  |  61 +++++--
 packages/core/src/tasks/task-centric/index.ts      |   1 +
 packages/core/src/tasks/task-centric/lifecycle.ts  |  16 +-
 14 files changed, 498 insertions(+), 174 deletions(-)
```

</details>
