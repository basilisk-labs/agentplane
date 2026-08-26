# PR Review

Created: 2026-08-26T13:12:22.036Z

## Task

- Task: `202608261249-BXQZ97`
- Title: Add a digest-bound provider update-branch recovery transition for stale hosted PR heads
- Status: DOING
- Branch: `task/202608261249-BXQZ97/add-provider-update-branch-recovery`
- Canonical task record: `.agentplane/tasks/202608261249-BXQZ97/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T13:12:22.036Z
- Branch: task/202608261249-BXQZ97/add-provider-update-branch-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/provider-update-branch.test.ts | 230 +++++++++++++
 .../src/commands/pr/provider-update-branch.ts      | 368 +++++++++++++++++++++
 2 files changed, 598 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
