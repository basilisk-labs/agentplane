# PR Review

Created: 2026-08-06T19:28:55.153Z

## Task

- Task: `202608061925-KANFC0`
- Title: Preserve exact Windows task README file identities
- Status: DOING
- Branch: `task/202608061925-KANFC0/preserve-exact-windows-task-readme-file-identiti`
- Canonical task record: `.agentplane/tasks/202608061925-KANFC0/README.md`

## Verification

- State: ok
- Note: Verified exact README identity handling: backend suite 32/32, typecheck, and platform-critical 94/94 pass. Full critical awaits PR #4785 compatibility-baseline repair; exact Windows hosted proof remains an integration gate.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
