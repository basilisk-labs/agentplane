Task: `202605130947-V6846F`
Title: Optimize CLI read-heavy startup paths
Canonical task record: `.agentplane/tasks/202605130947-V6846F/README.md`

## Summary

Optimize CLI read-heavy startup paths

Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.

## Scope

- In scope: Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.
- Out of scope: unrelated refactors not required for "Optimize CLI read-heavy startup paths".

## Verification

- State: ok
- Note: Implemented unified SQLite projection cache with embedded better-sqlite3 driver. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; framework bootstrap passed; cold-path benchmark after native rebuild improved task_list 1159.331ms -> 355.393ms, task_search 1123.773ms -> 366.110ms, task_next 1164.330ms -> 371.164ms.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T10:24:11.153Z
- Branch: task/202605130947-V6846F/cli-perf-read-paths
- Head: 1ee9bc7583d1

```text
 .../blueprint/resolved-snapshot.json               | 550 +++++++++++++++++++++
 bun.lock                                           |  65 ++-
 package.json                                       |   3 +
 packages/agentplane/package.json                   |   4 +-
 .../src/backends/task-backend.local.test.ts        |  50 ++
 .../backends/task-backend/local-backend-read.ts    |  20 +
 .../task-backend/local-task-sqlite-cache.ts        | 360 ++++++++++++++
 packages/agentplane/src/commands/context/sqlite.ts | 299 +++++------
 .../src/commands/context/sqlite.unit.test.ts       |  72 +++
 .../src/commands/task/blueprint-summary.ts         |  93 +++-
 packages/agentplane/src/commands/task/list.ts      |  12 +-
 packages/agentplane/src/shared/sqlite-driver.ts    |  39 ++
 12 files changed, 1386 insertions(+), 181 deletions(-)
```

</details>
