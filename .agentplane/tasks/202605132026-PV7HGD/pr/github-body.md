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
- Note:

```text
Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install
smoke, and empty-folder context assimilation smoke passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T07:59:34.983Z
- Branch: task/202605132026-PV7HGD/cloud-autosync
- Head: 9684dd52198e

```text
 .../blueprint/resolved-snapshot.json               | 529 +++++++++++++++++++++
 .../src/backends/task-backend.cloud.test.ts        | 297 +++++-------
 .../backends/task-backend/cloud-backend-push.ts    | 122 +++++
 .../src/backends/task-backend/cloud-backend.ts     | 202 ++++----
 .../agentplane/src/backends/task-backend/load.ts   |   2 +
 .../src/commands/blueprints/catalog-cache.ts       |   4 +-
 packages/agentplane/src/shared/env.ts              |   3 +-
 scripts/baselines/cli-cold-path-smoke.json         |   2 +-
 scripts/oversized-test-baseline.json               |   4 +-
 9 files changed, 862 insertions(+), 303 deletions(-)
```

</details>
