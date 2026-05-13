# PR Review

Created: 2026-05-13T20:27:38.160Z

## Task

- Task: `202605132026-PV7HGD`
- Title: Cloud backend: auto-sync on task reads/writes
- Status: DOING
- Branch: `task/202605132026-PV7HGD/cloud-autosync`
- Canonical task record: `.agentplane/tasks/202605132026-PV7HGD/README.md`

## Verification

- State: ok
- Note: Auto-sync implemented for cloud backend. Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts (all pass).
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
