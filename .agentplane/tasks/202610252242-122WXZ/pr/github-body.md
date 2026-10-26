Task: `202610252242-122WXZ`
Title: Ensure task projection and canonical aggregate revision coherence through verification-only replans
Canonical task record: `.agentplane/tasks/202610252242-122WXZ/README.md`

## Summary

Ensure task projection and canonical aggregate revision coherence through verification-only replans

Investigate #6926 on exact current main; reproduce historical verification-only replan, replace-verify, approve, start-ready and already-split 15/14; if reproduced, implement generic atomic CAS/projection and evidence-bound recovery without bypassing concurrency; otherwise document exact current-main evidence and disposition.

## Scope

- In scope: Investigate #6926 on exact current main; reproduce historical verification-only replan, replace-verify, approve, start-ready and already-split 15/14; if reproduced, implement generic atomic CAS/projection and evidence-bound recovery without bypassing concurrency; otherwise document exact current-main evidence and disposition.
- Out of scope: unrelated refactors not required for "Ensure task projection and canonical aggregate revision coherence through verification-only replans".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T00:29:35.504Z
- Branch: task/202610252242-122WXZ/ensure-task-projection-and-canonical-aggregate-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-adapter.test.ts           |  39 ++++
 .../task-backend/task-centric-backend-adapter.ts   |   9 +-
 .../commands/doctor/workspace-task-state.test.ts   |  95 ++++++++-
 .../src/commands/doctor/workspace-task-state.ts    |  53 +++--
 .../src/commands/task/next-action.command.ts       |  26 +++
 .../task/revision-consistency.integration.test.ts  | 227 +++++++++++++++++++++
 6 files changed, 432 insertions(+), 17 deletions(-)
```

</details>
