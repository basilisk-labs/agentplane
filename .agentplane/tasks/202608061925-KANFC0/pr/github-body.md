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

- State: ok
- Note:

```text
Verified exact README identity handling: backend suite 32/32, typecheck, and platform-critical 94/94
pass. Full critical awaits PR #4785 compatibility-baseline repair; exact Windows hosted proof
remains an integration gate.
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
