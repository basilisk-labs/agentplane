Task: `202605051655-W7502P`
Title: Harden task parsing and lint checks
Canonical task record: `.agentplane/tasks/202605051655-W7502P/README.md`

## Summary

Harden task parsing and lint checks

Fix task projection parsing/cache invalidation so clean branch switches cannot reuse stale task indexes, and make task lint handle legacy historical task records without failing current health checks.

## Scope

- In scope: Fix task projection parsing/cache invalidation so clean branch switches cannot reuse stale task indexes, and make task lint handle legacy historical task records without failing current health checks.
- Out of scope: unrelated refactors not required for "Harden task parsing and lint checks".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/backends/task-index.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/commands/workflow.test.ts. Result: pass. Evidence: 9 files, 143 tests passed. Scope: task README parsing, local backend projection cache, listing/query, normalize/migrate, task lint CLI. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace TypeScript. Command: prettier/eslint on touched files and git diff --check. Result: pass. Evidence: formatting, lint, whitespace clean. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js task lint && node packages/agentplane/bin/agentplane.js task list --quiet --limit 3 && node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: task lint OK, task list printed first three tasks, doctor OK with repo-local runtime and 0 warnings.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T17:07:22.503Z
- Branch: task/202605051655-W7502P/harden-task-parsing-lint
- Head: cc0c8bd4a38c

```text
 .../src/backends/task-backend.local.test.ts        |  46 ++++++++-
 .../backends/task-backend/local-backend-read.ts    | 112 +++++++++++++--------
 packages/agentplane/src/backends/task-index.ts     |  46 +++++++++
 .../agentplane/src/cli/run-cli.core.misc.test.ts   |  31 ++----
 packages/agentplane/src/commands/task/lint.ts      |  22 +++-
 packages/agentplane/src/commands/workflow.test.ts  |  24 +----
 packages/core/src/tasks/tasks-lint.test.ts         |  43 ++++++++
 packages/core/src/tasks/tasks-lint.ts              |  24 ++++-
 8 files changed, 262 insertions(+), 86 deletions(-)
```

</details>
