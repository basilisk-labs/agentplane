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
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T08:16:59.359Z
- Branch: task/202610260157-ZDEE0D/recover-an-approved-plan-when-a-required-declare
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/commands/task/kernel-exchange.ts           |  18 +-
 .../commands/task/kernel-failed-check-evidence.ts  |  74 ++++
 .../agentplane/src/commands/task/kernel-plan.ts    |  15 +
 .../task/kernel-required-check-rework.test.ts      | 246 ++++++++++++
 .../src/commands/task/kernel-rework-lineage.ts     |  48 +++
 .../src/commands/task/kernel-rework-proof.ts       |  18 +-
 .../src/commands/task/plan-set.command.ts          |  26 ++
 packages/core/src/tasks/task-kernel/kernel.ts      | 201 +++++++++-
 packages/core/src/tasks/task-kernel/model.ts       |  10 +
 .../task-kernel/required-check-correction.test.ts  | 417 +++++++++++++++++++++
 11 files changed, 1060 insertions(+), 14 deletions(-)
```

</details>
