# PR Review

Created: 2026-08-24T15:04:21.249Z

## Task

- Task: `202608241454-4JK4MP`
- Title: Allow replacement after a rejected external-agent result
- Status: DOING
- Branch: `task/202608241454-4JK4MP/allow-replacement-after-a-rejected-external-agen`
- Canonical task record: `.agentplane/tasks/202608241454-4JK4MP/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-24T15:04:21.249Z
- Branch: task/202608241454-4JK4MP/allow-replacement-after-a-rejected-external-agen
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 38 +++++++---
 ...un-cli.core.task-advance.blocked-result.test.ts | 82 ++++++++++++++++++++++
 .../src/commands/task/external-agent-supervisor.ts | 71 +++++++++++++++++--
 3 files changed, 176 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
