# PR Review

Created: 2026-05-21T10:40:55.586Z

## Task

- Task: `202605211039-QZXN8Q`
- Title: Fix open context GitHub issues
- Status: DOING
- Branch: `task/202605211039-QZXN8Q/fix-open-context-issues`
- Canonical task record: `.agentplane/tasks/202605211039-QZXN8Q/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T10:51:23.131Z
- Branch: task/202605211039-QZXN8Q/fix-open-context-issues
- Head: 22bd6142911f

```text
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 .../src/commands/context/release-readiness.test.ts | 235 ++++++++-
 packages/agentplane/src/commands/context/search.ts |   3 +-
 .../commands/context/wiki.obsidian.unit.test.ts    |   2 +-
 packages/agentplane/src/commands/context/wiki.ts   |   8 +-
 packages/agentplane/src/context/context-utils.ts   |   2 +-
 packages/agentplane/src/context/doctor.ts          |  58 ++-
 packages/agentplane/src/context/ingest.ts          |  47 +-
 packages/agentplane/src/context/verify-task.ts     |  58 ++-
 9 files changed, 962 insertions(+), 21 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
