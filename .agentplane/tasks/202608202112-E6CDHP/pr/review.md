# PR Review

Created: 2026-08-20T21:18:16.979Z

## Task

- Task: `202608202112-E6CDHP`
- Title: Fix live GitLab MR transport and provider-neutral mergeability validation
- Status: DOING
- Branch: `task/202608202112-E6CDHP/fix-live-gitlab-mr-transport-and-provider-neutra`
- Canonical task record: `.agentplane/tasks/202608202112-E6CDHP/README.md`

## Verification

- State: ok
- Note: Accepted with operator-approved verification exception: GitLab implementation and current-head focused regression pass; unstable unrelated local full-suite failures remain recorded and accepted as residual harness risk. Exact-head hosted checks remain mandatory before merge.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-20T21:32:39.733Z
- Branch: task/202608202112-E6CDHP/fix-live-gitlab-mr-transport-and-provider-neutra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cleanup-merged-provider-reconciliation.test.ts | 103 +++++++++++++++++++++
 .../cleanup-merged-provider-reconciliation.ts      |  37 +++++++-
 .../branch/cleanup-merged-targeted-proof.ts        |   7 +-
 .../branch/cleanup-merged.targeted.test.ts         |  13 ++-
 .../src/commands/integrate-queue.command.test.ts   |   8 ++
 .../src/commands/integrate-queue.command.ts        |   2 +
 .../src/commands/pr/conflict-rework.test.ts        |  25 +++++
 .../agentplane/src/commands/pr/conflict-rework.ts  |  27 +++++-
 .../src/commands/pr/hosted-checks.gitlab.test.ts   |  55 ++++++++++-
 .../agentplane/src/commands/pr/hosted-checks.ts    |  19 ++++
 .../agentplane/src/commands/pr/integrate/cmd.ts    |   3 +-
 .../pr/integrate/internal/route-label.test.ts      |  17 ++++
 .../commands/pr/integrate/internal/route-label.ts  |   7 ++
 .../src/commands/pr/internal/glab-api.test.ts      |  26 ++++++
 .../src/commands/pr/internal/glab-api.ts           |   4 +-
 .../src/commands/pr/internal/sync-gitlab.test.ts   |  58 ++++++++++++
 .../src/commands/pr/internal/sync-gitlab.ts        |  29 ++++++
 17 files changed, 422 insertions(+), 18 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
