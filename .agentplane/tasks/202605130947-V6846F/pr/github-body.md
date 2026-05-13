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
- Note: Updated docs to describe .agentplane/cache.sqlite as the global SQLite projection/cache database and recorded follow-up backlog tasks for generated projections, scripts layout, and context domain extraction. Evidence: docs IA check passed and stale local.sqlite/context.sqlite references are absent from current docs/code surfaces.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T11:35:36.818Z
- Branch: task/202605130947-V6846F/cli-perf-read-paths
- Head: ce7148152234

```text
 .agentplane/context/service/README.md              |   7 +
 .../blueprint/resolved-snapshot.json               | 550 +++++++++++++++++++++
 .agentplane/tasks/202605131043-2GMHKQ/README.md    |  92 ++++
 .agentplane/tasks/202605131043-802HWG/README.md    |  92 ++++
 .agentplane/tasks/202605131043-GD7RJJ/README.md    |  92 ++++
 .gitignore                                         |   3 +
 bun.lock                                           |  12 +-
 docs/developer/local-context.mdx                   |  24 +-
 docs/developer/project-layout.mdx                  |  11 +-
 docs/user/commands.mdx                             |  13 +-
 docs/user/local-context.mdx                        |   6 +-
 docs/user/overview.mdx                             |  11 +-
 docs/user/tasks-and-backends.mdx                   |  12 +-
 packages/agentplane/package.json                   |   2 +-
 .../src/backends/task-backend.local.test.ts        |  65 +++
 .../backends/task-backend/local-backend-read.ts    |  25 +
 .../task-backend/local-task-sqlite-cache.ts        | 386 +++++++++++++++
 packages/agentplane/src/commands/context/doctor.ts |   8 +-
 packages/agentplane/src/commands/context/ingest.ts |   1 +
 packages/agentplane/src/commands/context/init.ts   |   8 +-
 .../agentplane/src/commands/context/reindex.ts     |   5 +-
 .../agentplane/src/commands/context/sqlite.test.ts |  87 ----
 packages/agentplane/src/commands/context/sqlite.ts | 326 ++++++------
 .../src/commands/context/sqlite.unit.test.ts       |  72 +++
 .../agentplane/src/commands/context/verify-task.ts |  12 +-
 .../src/commands/task/blueprint-summary.ts         |  93 +++-
 packages/agentplane/src/commands/task/list.ts      |  12 +-
 packages/agentplane/src/shared/cache-paths.ts      |   7 +
 packages/agentplane/src/shared/sqlite-driver.ts    | 137 +++++
 29 files changed, 1842 insertions(+), 329 deletions(-)
```

</details>
