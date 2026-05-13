Task: `202605132026-PV7HGD`
Title: Cloud backend: auto-sync on task reads/writes
Canonical task record: `.agentplane/tasks/202605132026-PV7HGD/README.md`

## Summary

Cloud backend: auto-sync on task reads/writes

Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend.

## Scope

- In scope: Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend.
- Out of scope: unrelated refactors not required for "Cloud backend: auto-sync on task reads/writes".

## Verification

- State: ok
- Note: Auto-sync implemented for cloud backend. Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts (all pass).
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T20:36:01.690Z
- Branch: task/202605132026-PV7HGD/cloud-autosync
- Head: e7236d29af20

```text
 .../src/backends/task-backend.cloud.test.ts        | 57 ++++++++++++++-
 .../src/backends/task-backend/cloud-backend.ts     | 84 +++++++++++++++++++---
 .../agentplane/src/backends/task-backend/load.ts   |  2 +
 3 files changed, 132 insertions(+), 11 deletions(-)
```

</details>
