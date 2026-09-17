# PR Review

Created: 2026-09-17T22:51:10.201Z

## Task

- Task: `202609172016-5A9KVM`
- Title: Complete canonical Task application coordinator for 0.7.10
- Status: DOING
- Branch: `task/202609172016-5A9KVM/canonical-application-coordinator`
- Canonical task record: `.agentplane/tasks/202609172016-5A9KVM/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-17T22:51:10.201Z
- Branch: task/202609172016-5A9KVM/canonical-application-coordinator
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-advance.test.ts       | 245 ++++++++++++
 .../agentplane/src/commands/task/kernel-advance.ts |  82 +++-
 .../src/commands/task/kernel-effect-coordinator.ts | 193 ++++++++++
 .../src/commands/task/kernel-exchange.ts           |   8 +
 .../src/commands/task/kernel-final-validation.ts   |  14 +
 .../src/commands/task/kernel-inspection.ts         |  83 +++-
 .../task/kernel-repository-coordinator.test.ts     | 251 ++++++++++++
 .../commands/task/kernel-repository-coordinator.ts | 425 +++++++++++++++++++++
 .../src/commands/task/kernel-run.test.ts           | 140 +++++++
 .../agentplane/src/commands/task/kernel-run.ts     |   2 +-
 .../src/commands/task/kernel-work-order.ts         |  50 ++-
 11 files changed, 1472 insertions(+), 21 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
