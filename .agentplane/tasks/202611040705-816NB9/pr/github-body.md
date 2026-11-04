Task: `202611040705-816NB9`
Title: Require fresh verification after native GitLab branch updates
Canonical task record: `.agentplane/tasks/202611040705-816NB9/README.md`

## Summary

Require fresh verification after native GitLab branch updates

Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion.

## Scope

- In scope: Prevent earlier verification and review from authorizing integration after a native task-owned GitLab current-base update or uncertain-effect recovery. Bind both gates to the authenticated merged head and actual fresh execution while retaining the immutable execution base and full combined-tree checks. Preserve existing GitHub and adopted-PR behavior, all branches and worktrees, data, credentials, runtime guards and required checks. Deliver through native independent evaluation, canonical PR/merge/main CI and qualified controller promotion.
- Out of scope: unrelated refactors not required for "Require fresh verification after native GitLab branch updates".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-04T10:34:18.958Z
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
 .../pr/provider-update-verification-proof.ts       |  206 +++-
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
 .../provider-update-effect-recovery.testkit.ts     |  598 +++++++++++
 .../task/provider-update-effect-recovery.ts        |  269 ++++-
 21 files changed, 4945 insertions(+), 848 deletions(-)
```

</details>
