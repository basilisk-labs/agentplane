Task: `202608221115-2H0QP2`
Title: Port the verified types.ts guardrail fix from blocked task 202608220823-XT1GTG into a clean branch_pr task: rename ta...
Canonical task record: `.agentplane/tasks/202608221115-2H0QP2/README.md`

## Summary

Port the verified types.ts guardrail fix from blocked task 202608220823-XT1GTG into a clean branch_pr task: rename task-execution-context/types.ts and workspace-allocation/types.ts to model.ts, update only their local imports, preserve readonly semantics, and prove check:types-files plus typecheck pass.

Port the verified types.ts guardrail fix from blocked task 202608220823-XT1GTG into a clean branch_pr task: rename task-execution-context/types.ts and workspace-allocation/types.ts to model.ts, update only their local imports, preserve readonly semantics, and prove check:types-files plus typecheck pass.

## Scope

- In scope: Port the verified types.ts guardrail fix from blocked task 202608220823-XT1GTG into a clean branch_pr task: rename task-execution-context/types.ts and workspace-allocation/types.ts to model.ts, update only their local imports, preserve readonly semantics, and prove check:types-files plus typecheck pass.
- Out of scope: unrelated refactors not required for "Port the verified types.ts guardrail fix from blocked task 202608220823-XT1GTG into a clean branch_pr task: rename task-execution-context/types.ts and workspace-allocation/types.ts to model.ts, update only their local imports, preserve readonly semantics, and prove check:types-files plus typecheck pass.".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T11:18:59.850Z
- Branch: task/202608221115-2H0QP2/port-the-verified-types-ts-guardrail-fix-from-bl
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runtime/task-execution-context/index.ts    |  2 +-
 .../src/runtime/task-execution-context/model.ts    | 39 ++++++++++++++++++++++
 .../src/runtime/task-execution-context/resolve.ts  |  2 +-
 .../src/runtime/task-execution-context/types.ts    | 39 ----------------------
 .../src/runtime/workspace-allocation/allocate.ts   |  2 +-
 .../src/runtime/workspace-allocation/lease.ts      |  2 +-
 .../src/runtime/workspace-allocation/model.ts      | 27 +++++++++++++++
 .../src/runtime/workspace-allocation/types.ts      | 27 ---------------
 8 files changed, 70 insertions(+), 70 deletions(-)
```

</details>
