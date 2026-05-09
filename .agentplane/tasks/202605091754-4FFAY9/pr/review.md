# PR Review

Created: 2026-05-09T18:46:47.225Z

## Task

- Task: `202605091754-4FFAY9`
- Title: Extract shared task doc section parser
- Status: DOING
- Branch: `task/202605091754-4FFAY9/task-doc-parser`
- Canonical task record: `.agentplane/tasks/202605091754-4FFAY9/README.md`

## Verification

- State: ok
- Note: Verified: extracted shared task doc section parser; focused core task-doc/readme/store tests passed (4 files, 58 tests), typecheck passed, Prettier passed, clone:report improved metrics to 83 clones / 1384 duplicated lines / 14705 duplicated tokens, and clone:check passed without baseline update.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T18:53:16.677Z
- Branch: task/202605091754-4FFAY9/task-doc-parser
- Head: 90f3f6953a17

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 packages/core/src/tasks/task-doc.ts                | 152 +++----
 2 files changed, 562 insertions(+), 95 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
