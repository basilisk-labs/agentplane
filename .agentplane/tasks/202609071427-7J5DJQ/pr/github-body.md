Task: `202609071427-7J5DJQ`
Title: Upgrade Bun to 1.4.2 and qualify runtime migration boundaries
Canonical task record: `.agentplane/tasks/202609071427-7J5DJQ/README.md`

## Summary

Upgrade Bun to 1.4.2 and qualify runtime migration boundaries

Implement the staged Bun adoption agreed with the user. Upgrade repository and CI Bun pins from 1.3.6 to 1.4.2. Qualify frozen installs, SQLite driver behavior, compiled CLI, process supervision, and existing Node-based verification. Compare representative Node and Bun runtime behavior and timings without replacing Vitest or tsup or dropping Node support. Preserve dependency versions and unrelated work. Record evidence and remaining platform gaps. Do not publish, push, merge, or globally replace runtimes.

## Scope

- In scope: Implement the staged Bun adoption agreed with the user. Upgrade repository and CI Bun pins from 1.3.6 to 1.4.2. Qualify frozen installs, SQLite driver behavior, compiled CLI, process supervision, and existing Node-based verification. Compare representative Node and Bun runtime behavior and timings without replacing Vitest or tsup or dropping Node support. Preserve dependency versions and unrelated work. Record evidence and remaining platform gaps. Do not publish, push, merge, or globally replace runtimes.
- Out of scope: unrelated refactors not required for "Upgrade Bun to 1.4.2 and qualify runtime migration boundaries".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T14:33:24.150Z
- Branch: task/202609071427-7J5DJQ/upgrade-bun-to-1-4-2-and-qualify-runtime-migrati
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |  20 ++--
 .github/workflows/docs-ci.yml                      |   2 +-
 .github/workflows/pages-deploy.yml                 |   2 +-
 .github/workflows/prepublish.yml                   |   2 +-
 .github/workflows/publish-distribution-module.yml  |   2 +-
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   2 +-
 .github/workflows/workflows-lint.yml               |   2 +-
 package.json                                       |   2 +-
 ...n-cli.core.task-advance.branch-worktree.test.ts |  94 ++++++++++++++++++-
 .../external-agent-implementation-authority.ts     |  18 +++-
 .../agentplane/src/shared/sqlite-driver.test.ts    | 103 +++++++++++++++++++++
 packages/agentplane/src/shared/sqlite-driver.ts    |   2 +-
 13 files changed, 228 insertions(+), 27 deletions(-)
```

</details>
