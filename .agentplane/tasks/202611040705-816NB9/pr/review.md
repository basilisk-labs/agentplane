# PR Review

Created: 2026-11-04T10:34:18.958Z

## Task

- Task: `202611040705-816NB9`
- Title: Require fresh verification after native GitLab branch updates
- Status: DONE
- Branch: `task/202611040705-816NB9/require-fresh-verification-after-native-gitlab-b`
- Canonical task record: `.agentplane/tasks/202611040705-816NB9/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-04T13:33:23.477Z
- Branch: task/202611040705-816NB9/require-fresh-verification-after-native-gitlab-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/sync-gitlab.test.ts   |   52 +
 .../src/commands/pr/internal/sync-gitlab.ts        |   46 +
 .../pr/provider-update-branch-gitlab.test.ts       |  331 ++++++
 .../commands/pr/provider-update-branch-gitlab.ts   |  375 +++++++
 .../src/commands/pr/provider-update-branch.test.ts |    9 +-
 .../src/commands/pr/provider-update-branch.ts      |    6 +-
 .../pr/provider-update-verification-proof.test.ts  |  439 +++++---
 .../pr/provider-update-verification-proof.ts       |  207 +++-
 .../shared/provider-update-branch-route.test.ts    |  114 ++
 .../shared/provider-update-branch-route.ts         |   16 +-
 .../src/commands/shared/quality-review-target.ts   |   63 +-
 .../shared/supervisor-execution-episode.ts         |  414 ++++----
 .../shared/supervisor-execution-journal.test.ts    |  887 ++++++++++++++++
 .../shared/supervisor-execution-journal.ts         |  433 ++++++++
 .../commands/shared/task-verification-records.ts   |   75 +-
 .../workflow-step-provider-update-branch-spec.ts   |    4 +-
 .../task/branch-task-supervisor-operations.test.ts |  302 ++++++
 .../task/branch-task-supervisor-operations.ts      |   56 +-
 .../task/provider-update-effect-recovery.test.ts   | 1098 ++++++++++++++------
 .../provider-update-effect-recovery.testkit.ts     |  599 +++++++++++
 .../task/provider-update-effect-recovery.ts        |  326 ++++--
 21 files changed, 4983 insertions(+), 869 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
