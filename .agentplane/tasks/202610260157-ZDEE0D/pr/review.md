# PR Review

Created: 2026-10-26T02:38:13.651Z

## Task

- Task: `202610260157-ZDEE0D`
- Title: Recover an approved plan when a required declared check cannot execute
- Status: DOING
- Branch: `task/202610260157-ZDEE0D/recover-an-approved-plan-when-a-required-declare`
- Canonical task record: `.agentplane/tasks/202610260157-ZDEE0D/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T02:38:13.651Z
- Branch: task/202610260157-ZDEE0D/recover-an-approved-plan-when-a-required-declare
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/kernel-plan.ts    |  75 +++++++
 .../src/commands/task/plan-set.command.ts          |  26 +++
 packages/core/src/tasks/task-kernel/kernel.test.ts | 242 +++++++++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      | 149 ++++++++++++-
 packages/core/src/tasks/task-kernel/model.ts       |   8 +
 5 files changed, 495 insertions(+), 5 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
