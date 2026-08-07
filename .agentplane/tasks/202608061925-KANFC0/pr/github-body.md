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
Exact NTFS identity handling and all local release gates pass on current main; hosted Windows is the
remaining PR gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T19:34:55.405Z
- Branch: task/202608061925-KANFC0/preserve-exact-windows-task-readme-file-identiti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend.local.windows-identity.test.ts    | 120 +++++++++++++++++++++
 .../backends/task-backend/local-backend-read.ts    |  44 ++++++--
 scripts/lib/test-route-registry.mjs                |   2 +
 3 files changed, 155 insertions(+), 11 deletions(-)
```

</details>
