# PR Review

Created: 2026-10-31T13:55:43.107Z

## Task

- Task: `202610311347-7CPDQV`
- Title: Qualify bounded native recovery with frozen branch_pr routing
- Status: DOING
- Branch: `task/202610311347-7CPDQV/qualify-bounded-native-recovery-with-frozen-bran`
- Canonical task record: `.agentplane/tasks/202610311347-7CPDQV/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-31T13:55:43.107Z
- Branch: task/202610311347-7CPDQV/qualify-bounded-native-recovery-with-frozen-bran
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   2 +-
 docs/user/task-lifecycle.mdx                       |  62 +++
 .../src/commands/doctor/workspace-task-state.ts    |  94 +++-
 .../src/commands/task/advance.command.ts           |  12 +
 .../agentplane/src/commands/task/advance.spec.ts   |   2 +-
 .../task/completed-fixture-verification.testkit.ts |  62 +++
 .../task/completed-projection-recovery.test.ts     | 528 +++++++++++++++++++++
 .../commands/task/completed-projection-recovery.ts | 509 ++++++++++++++++++++
 .../kernel-completed-external-rework.testkit.ts    |  38 +-
 .../src/commands/task/kernel-migrate.command.ts    |  57 +++
 .../task/kernel-migrate.quarantine.test.ts         | 358 ++++++++++++++
 .../commands/task/migration-apply-conversion.ts    |  23 +-
 .../src/commands/task/migration-apply.ts           | 130 ++---
 .../src/commands/task/migration-quarantine.test.ts | 355 ++++++++++++++
 .../src/commands/task/migration-quarantine.ts      | 209 ++++++++
 .../task-execution-contract-observation.test.ts    |  67 +++
 .../task/task-execution-contract-observation.ts    |   3 +-
 .../agentplane/src/runtime/task-routing/resolve.ts |  92 +---
 .../src/runtime/task-routing/verification.ts       | 129 +++++
 19 files changed, 2535 insertions(+), 197 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
