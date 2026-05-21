Task: `202605211331-F6AMAP`
Title: Optimize task list read-only fast path
Canonical task record: `.agentplane/tasks/202605211331-F6AMAP/README.md`

## Summary

Optimize task list read-only fast path

Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.

## Scope

- In scope: Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.
- Out of scope: unrelated refactors not required for "Optimize task list read-only fast path".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed after merge from main. Evidence: backend projection cache tests, task
listing/query tests, branch_pr list-state test, exact-file eslint, git diff --check, policy routing,
framework bootstrap, and PR artifact check passed; scope remains limited to task list read-only
projection fast path.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T14:13:23.440Z
- Branch: task/202605211331-F6AMAP/task-list-fast-path
- Head: 42f809dd3c03

```text
 .../blueprint/resolved-snapshot.json               | 594 +++++++++++++++++++++
 .../task-backend/local-task-sqlite-cache.ts        |  37 +-
 packages/agentplane/src/commands/task/list.run.ts  |  11 +-
 3 files changed, 624 insertions(+), 18 deletions(-)
```

</details>
