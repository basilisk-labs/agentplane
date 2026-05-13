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
- Note: Refactor: split cloud push helper to satisfy hotspot limit (<600 loc). Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T20:39:51.978Z
- Branch: task/202605132026-PV7HGD/cloud-autosync
- Head: beb35d8d3b37

```text
 .../blueprint/resolved-snapshot.json               | 529 +++++++++++++++++++++
 .../src/backends/task-backend.cloud.test.ts        |  57 ++-
 .../backends/task-backend/cloud-backend-push.ts    | 127 +++++
 .../src/backends/task-backend/cloud-backend.ts     | 202 ++++----
 .../agentplane/src/backends/task-backend/load.ts   |   2 +
 5 files changed, 797 insertions(+), 120 deletions(-)
```

</details>
