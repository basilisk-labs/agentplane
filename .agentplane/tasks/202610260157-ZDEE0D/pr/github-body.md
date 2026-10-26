Task: `202610260157-ZDEE0D`
Title: Recover an approved plan when a required declared check cannot execute
Canonical task record: `.agentplane/tasks/202610260157-ZDEE0D/README.md`

## Summary

Recover an approved plan when a required declared check cannot execute

Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.

## Scope

- In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
- Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

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
