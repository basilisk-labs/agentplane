Task: `202607221850-DRWR0V`
Title: Extract the shared typed workflow supervisor from Hermes
Canonical task record: `.agentplane/tasks/202607221850-DRWR0V/README.md`

## Summary

Extract the shared typed workflow supervisor from Hermes

RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.

## Scope

- In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
- Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T23:43:10.504Z
- Branch: task/202607221850-DRWR0V/extract-the-shared-typed-workflow-supervisor-fro
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/hermes/hermes-runtime.ts          | 164 ++++-----
 .../src/commands/hermes/hermes.command.test.ts     | 297 ++---------------
 .../src/commands/hermes/hermes.command.ts          |  61 +++-
 .../commands/shared/workflow-supervisor.test.ts    | 232 +++++++++++++
 .../src/commands/shared/workflow-supervisor.ts     | 371 +++++++++++++++++++++
 .../src/commands/task/next-action.command.ts       |  12 +
 scripts/baselines/trust-boundary-violations.json   |   9 -
 7 files changed, 760 insertions(+), 386 deletions(-)
```

</details>
