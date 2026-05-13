Task: `202605131918-0ASXKY`
Title: Harden shared env root worktree detection
Canonical task record: `.agentplane/tasks/202605131918-0ASXKY/README.md`

## Summary

Harden shared env root worktree detection

Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts.

## Scope

- In scope: Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts.
- Out of scope: unrelated refactors not required for "Harden shared env root worktree detection".

## Verification

- State: ok
- Note: Re-verified after fallback refinement: backend/CLI tests pass, changed-file ESLint passes, routing policy passes, doctor passed earlier after bootstrap.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:52:03.891Z
- Branch: task/202605131918-0ASXKY/harden-env-root
- Head: 10b643372150

```text
 .../src/backends/task-backend.load.test.ts         |  44 +++++++
 packages/agentplane/src/shared/env.ts              | 136 +++++++++++++++++++--
 2 files changed, 168 insertions(+), 12 deletions(-)
```

</details>
