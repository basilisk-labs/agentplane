# PR Review

Created: 2026-05-20T16:57:11.337Z

## Task

- Task: `202605201656-J68MDT`
- Title: Fix done task next-action route
- Status: DOING
- Branch: `task/202605201656-J68MDT/done-next-action`
- Canonical task record: `.agentplane/tasks/202605201656-J68MDT/README.md`

## Verification

- State: ok
- Note: Review fix accepted locally: branch_pr DONE tasks keep cleanup guidance, direct DONE tasks now return a direct-safe terminal action with null command; no branch_pr recovery blockers for DONE tasks.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T17:02:42.798Z
- Branch: task/202605201656-J68MDT/done-next-action
- Head: bf2f3e28a4f8

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../src/cli/run-cli.core.route-decision.test.ts    |  54 +-
 .../src/commands/shared/route-decision.ts          |  18 +-
 3 files changed, 633 insertions(+), 11 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
