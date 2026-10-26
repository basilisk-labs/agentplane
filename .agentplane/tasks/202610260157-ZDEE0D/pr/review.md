# PR Review

Created: 2026-10-26T02:38:13.651Z

## Task

- Task: `202610260157-ZDEE0D`
- Title: Recover an approved plan when a required declared check cannot execute
- Status: DONE
- Branch: `task/202610260157-ZDEE0D/recover-an-approved-plan-when-a-required-declare`
- Canonical task record: `.agentplane/tasks/202610260157-ZDEE0D/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T08:16:59.359Z
- Branch: task/202610260157-ZDEE0D/recover-an-approved-plan-when-a-required-declare
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 .../agentplane/src/commands/task/kernel-plan.ts    |  82 ++++++
 .../src/commands/task/plan-set.command.ts          |  26 ++
 packages/core/src/tasks/task-kernel/kernel.ts      | 165 ++++++++++-
 packages/core/src/tasks/task-kernel/model.ts       |   9 +
 .../task-kernel/required-check-correction.test.ts  | 321 +++++++++++++++++++++
 6 files changed, 599 insertions(+), 5 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
