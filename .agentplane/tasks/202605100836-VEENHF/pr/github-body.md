Task: `202605100836-VEENHF`
Title: Pre-v0.5: add worktree-aware Git context diagnostics
Canonical task record: `.agentplane/tasks/202605100836-VEENHF/README.md`

## Summary

Pre-v0.5: add worktree-aware Git context diagnostics

Capture command, cwd, repo root, gitdir, branch, workflow mode, mutation kind, task id, allow prefixes, changed paths, and staged paths for internal git add/commit/checkout failures.

## Scope

- In scope: Capture command, cwd, repo root, gitdir, branch, workflow mode, mutation kind, task id, allow prefixes, changed paths, and staged paths for internal git add/commit/checkout failures.
- Out of scope: unrelated refactors not required for "Pre-v0.5: add worktree-aware Git context diagnostics".

## Verification

- State: ok
- Note: Verified worktree-aware Git context diagnostics for staging failures.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T10:56:25.496Z
- Branch: task/202605100836-VEENHF/worktree-git-context
- Head: 2c2fec156a9b

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 .../src/commands/guard/impl/allow.test.ts          |  56 ++-
 .../agentplane/src/commands/guard/impl/allow.ts    |  23 +-
 packages/agentplane/src/shared/git-mutation.ts     |  39 ++
 4 files changed, 621 insertions(+), 2 deletions(-)
```

</details>
