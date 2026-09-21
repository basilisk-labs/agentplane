Task: `202609210002-0TQ72H`
Title: LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command...
Canonical task record: `.agentplane/tasks/202609210002-0TQ72H/README.md`

## Summary

LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.

LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.

## Scope

- In scope: LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.
- Out of scope: unrelated refactors not required for "LC-02: route all supported Plan and WorkItem lifecycle writes through the backend transaction and Task Kernel command/event gateway; keep compatibility status and README state as read-only Kernel projections; remove the unused parallel LifecycleEngine; diagnose projection conflicts; preserve legacy historical evidence; verify CAS, read-only rendering, one accepted mutation, and conflict rejection.".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T00:49:32.433Z
- Branch: task/202609210002-0TQ72H/canonical-0tq72h
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/adapters/task-backend/kernel-record.ts     |   8 +
 .../commands/shared/native-task-identity.test.ts   |   1 +
 .../shared/roadmap-single-mutation-gateway.test.ts | 184 ++++++++++++++++
 .../src/commands/shared/task-mutation.ts           |  24 ++-
 .../src/commands/task/active.command.unit.test.ts  |   7 +-
 .../agentplane/src/commands/task/kernel-advance.ts |   6 +-
 .../task/kernel-operational-projection.test.ts     |  13 +-
 .../commands/task/kernel-operational-projection.ts |  29 +--
 .../kernel-provider-effect-coordinator.test.ts     |   2 +-
 .../task/kernel-provider-effect-coordinator.ts     |   6 +-
 .../src/commands/task/show-kernel.test.ts          |  13 +-
 packages/core/src/tasks/task-centric/index.ts      |   1 -
 packages/core/src/tasks/task-centric/lifecycle.ts  | 233 +--------------------
 scripts/checks/lifecycle-owner-map.json            |  12 --
 scripts/checks/lifecycle-owner-map.test.mjs        |   6 +-
 15 files changed, 258 insertions(+), 287 deletions(-)
```

</details>
