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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T19:28:55.153Z
- Branch: task/202608061925-KANFC0/preserve-exact-windows-task-readme-file-identiti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.local.test.ts        | 22 +++++++++++
 .../backends/task-backend/local-backend-read.ts    | 44 ++++++++++++++++------
 2 files changed, 55 insertions(+), 11 deletions(-)
```

</details>
