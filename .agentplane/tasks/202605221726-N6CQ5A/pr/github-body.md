Task: `202605221726-N6CQ5A`
Title: Add compact active task route summary
Canonical task record: `.agentplane/tasks/202605221726-N6CQ5A/README.md`

## Summary

Add compact active task route summary

Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.

## Scope

- In scope: Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
- Out of scope: unrelated refactors not required for "Add compact active task route summary".

## Verification

- State: ok
- Note:

```text
Verified: reviewed active task route summary implementation; --all keeps full history, default
listing stays active-only, SQLite projection status filtering is bounded, and full-fast local CI
passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T20:50:01.283Z
- Branch: task/202605221726-N6CQ5A/active-route-summary
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              | 11 +++-
 .../backends/task-backend/local-backend-read.ts    | 45 +++++++++++----
 .../src/backends/task-backend/local-backend.ts     |  3 +-
 .../task-backend/local-task-sqlite-cache.ts        | 23 +++++++-
 .../src/backends/task-backend/shared/types.ts      |  6 +-
 .../run-cli.core.tasks.list-active-summary.test.ts | 66 ++++++++++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts | 19 ++++++-
 packages/agentplane/src/commands/task/list.spec.ts | 12 +++-
 packages/agentplane/src/commands/task/list.ts      | 34 ++++++++++-
 .../src/commands/task/shared.unit.test.ts          |  2 +
 .../agentplane/src/commands/task/shared/listing.ts | 14 ++++-
 11 files changed, 210 insertions(+), 25 deletions(-)
```

</details>
