# PR Review

Created: 2026-09-03T23:29:34.750Z

## Task

- Task: `202609032308-F31YXS`
- Title: Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete
- Status: DOING
- Branch: `task/202609032308-F31YXS/repair-verification-evidence-contract-atomicity`
- Canonical task record: `.agentplane/tasks/202609032308-F31YXS/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-03T23:29:34.750Z
- Branch: task/202609032308-F31YXS/repair-verification-evidence-contract-atomicity
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-projection.ts             |  13 +-
 ...n-cli.core.task-advance.evidence-rework.test.ts |  18 ++-
 .../src/commands/shared/task-mutation.test.ts      | 143 +++++++++++++++++++++
 .../commands/task/direct-task-verification.test.ts |   8 ++
 .../src/commands/task/direct-task-verification.ts  |   4 +-
 .../task/external-agent-implementation-recovery.ts |  18 ++-
 .../src/commands/task/verify-record-execute.ts     |  43 ++++---
 .../agentplane/src/commands/task/verify-record.ts  |   3 +-
 .../src/commands/task/verify-record.types.ts       |   8 ++
 9 files changed, 233 insertions(+), 25 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
