Task: `202605191451-1E0EHD`
Title: Add daily cloud pull before task start
Canonical task record: `.agentplane/tasks/202605191451-1E0EHD/README.md`

## Summary

Add daily cloud pull before task start

Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.

## Scope

- In scope: Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.
- Out of scope: unrelated refactors not required for "Add daily cloud pull before task start".

## Verification

- State: ok
- Note:

```text
Rebased onto current origin/main and reran focused cloud backend tests, typecheck, build, hotspots,
doctor, and routing checks successfully.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:22:49.030Z
- Branch: task/202605191451-1E0EHD/daily-cloud-start-pull
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend.cloud-start-refresh.test.ts       | 153 +++++++++++++++++++++
 .../task-backend/cloud-backend-capabilities.ts     |  16 +++
 .../task-backend/cloud-backend-settings.ts         |   1 +
 .../task-backend/cloud-backend-state.test.ts       |   5 +
 .../backends/task-backend/cloud-backend-state.ts   |   8 +-
 .../src/backends/task-backend/cloud-backend.ts     |  37 +++--
 .../backends/task-backend/cloud-start-refresh.ts   |  83 +++++++++++
 .../src/backends/task-backend/shared/types.ts      |   1 +
 .../agentplane/src/commands/task/start-ready.ts    |   1 +
 9 files changed, 290 insertions(+), 15 deletions(-)
```

</details>
