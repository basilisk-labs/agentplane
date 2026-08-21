Task: `202608202112-E6CDHP`
Title: Fix live GitLab MR transport and provider-neutral mergeability validation
Canonical task record: `.agentplane/tasks/202608202112-E6CDHP/README.md`

## Summary

Fix live GitLab MR transport and provider-neutral mergeability validation

Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.

## Scope

- In scope: Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
- Out of scope: unrelated refactors not required for "Fix live GitLab MR transport and provider-neutral mergeability validation".

## Verification

- State: blocked_external
- Note: Rework: Declared check failed: bun run --filter=agentplane test -- --maxWorkers=1
- Canonical workflow state lives in the task README.

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
 .../src/commands/pr/conflict-rework.test.ts        |  25 +++++
 .../agentplane/src/commands/pr/conflict-rework.ts  |  27 +++++-
 .../agentplane/src/commands/pr/integrate/cmd.ts    |   3 +-
 .../pr/integrate/internal/route-label.test.ts      |  17 ++++
 .../commands/pr/integrate/internal/route-label.ts  |   7 ++
 .../src/commands/pr/internal/glab-api.test.ts      |  26 ++++++
 .../src/commands/pr/internal/glab-api.ts           |   4 +-
 .../src/commands/pr/internal/sync-gitlab.test.ts   |  33 +++++++
 .../src/commands/pr/internal/sync-gitlab.ts        |  29 ++++++
 13 files changed, 317 insertions(+), 14 deletions(-)
```

</details>
