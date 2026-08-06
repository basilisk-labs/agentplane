Task: `202608061925-KANFC0`
Title: Preserve exact Windows task README file identities
Canonical task record: `.agentplane/tasks/202608061925-KANFC0/README.md`

## Summary

Preserve exact Windows task README file identities

Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.

## Scope

- In scope: Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
- Out of scope: unrelated refactors not required for "Preserve exact Windows task README file identities".

## Verification

- State: needs_rework
- Note:

```text
The exact NTFS scan-path regression, typecheck, and platform-critical suite pass. Verification
remains rework because the mandatory full critical suite cannot pass until pending PR #4785 repairs
the pre-existing compatibility baseline; after it merges, rebase and rerun the complete check before
evaluation or integration.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T19:34:55.405Z
- Branch: task/202608061925-KANFC0/preserve-exact-windows-task-readme-file-identiti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.local.test.ts        | 102 ++++++++++++++++++++-
 .../backends/task-backend/local-backend-read.ts    |  44 ++++++---
 2 files changed, 133 insertions(+), 13 deletions(-)
```

</details>
