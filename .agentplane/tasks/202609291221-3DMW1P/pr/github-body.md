Task: `202609291221-3DMW1P`
Title: Fix issue 6020: task new must admit bounded source and test plans
Canonical task record: `.agentplane/tasks/202609291221-3DMW1P/README.md`

## Summary

Fix issue 6020: task new must admit bounded source and test plans

Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue.

## Scope

- In scope: Issue #6020 is still applicable on main 4119c434. task new uses a legacy-derived execution contract with empty scope roots and no explicit scope/effect/capability/resource flags. Reuse the structured intake contract already available to task create, without weakening canonical subset admission or external authority. Add source-and-test plan admission tests, explicit-root bounds and unauthorized-effect rejection. Update generated CLI documentation if the command surface changes. Verify focused tests, typecheck and standard PR CI before merging and closing the issue.
- Out of scope: unrelated refactors not required for "Fix issue 6020: task new must admit bounded source and test plans".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-29T19:37:33.025Z
- Branch: task/202609291221-3DMW1P/fix-issue-6020-task-new-must-admit-bounded-sourc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/create.command.ts | 128 +----------------
 .../src/commands/task/execution-contract-intake.ts |  93 ++++++++++++
 .../commands/task/execution-contract-options.ts    |  59 ++++++++
 .../commands/task/new-execution-contract.test.ts   | 159 +++++++++++++++++++++
 packages/agentplane/src/commands/task/new.spec.ts  |   7 +
 packages/agentplane/src/commands/task/new.ts       |  49 +++----
 6 files changed, 349 insertions(+), 146 deletions(-)
```

</details>
