# PR Review

Created: 2026-06-04T16:17:02.161Z

## Task

- Task: `202606041604-E3EJG8`
- Title: Clarify confusing agent route diagnostics
- Status: DOING
- Branch: `task/202606041604-E3EJG8/clarify-confusing-agent-route-diagnostics`
- Canonical task record: `.agentplane/tasks/202606041604-E3EJG8/README.md`

## Verification

- State: ok
- Note: Local verification passed for typecheck, formatting, policy routing, and CLI smoke; focused vitest/build wrappers timed out without assertion or compiler failure output.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T16:17:02.161Z
- Branch: task/202606041604-E3EJG8/clarify-confusing-agent-route-diagnostics
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../impl/commands.commit-non-close.unit.test.ts    |  45 +++++++++
 .../src/commands/guard/impl/commit-diagnostics.ts  |  30 +++++-
 packages/agentplane/src/commands/pr/check.ts       |  22 +++++
 .../src/commands/shared/route-guidance.test.ts     |  63 +++++++++++++
 .../src/commands/shared/route-guidance.ts          | 103 +++++++++++++++++++++
 .../src/commands/task/next-action.command.ts       |  13 +++
 .../agentplane/src/commands/task/status.command.ts |  19 +++-
 7 files changed, 292 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
