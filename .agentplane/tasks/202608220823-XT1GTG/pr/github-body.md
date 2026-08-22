Task: `202608220823-XT1GTG`
Title: Restore the types.ts guardrail for the task-centric execution domains by renaming the two new generic type modules to...
Canonical task record: `.agentplane/tasks/202608220823-XT1GTG/README.md`

## Summary

Restore the types.ts guardrail for the task-centric execution domains by renaming the two new generic type modules to semantic model filenames and updating only their local imports, then verify the release blocker is cleared.

Restore the types.ts guardrail for the task-centric execution domains by renaming the two new generic type modules to semantic model filenames and updating only their local imports, then verify the release blocker is cleared.

## Scope

- In scope: Restore the types.ts guardrail for the task-centric execution domains by renaming the two new generic type modules to semantic model filenames and updating only their local imports, then verify the release blocker is cleared.
- Out of scope: unrelated refactors not required for "Restore the types.ts guardrail for the task-centric execution domains by renaming the two new generic type modules to semantic model filenames and updating only their local imports, then verify the release blocker is cleared.".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T08:24:58.311Z
- Branch: task/202608220823-XT1GTG/restore-the-types-ts-guardrail-for-the-task-cent
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runtime/task-execution-context/index.ts    |  2 +-
 .../src/runtime/task-execution-context/model.ts    | 39 ++++++++++++++++++++++
 .../src/runtime/task-execution-context/resolve.ts  |  2 +-
 .../src/runtime/workspace-allocation/allocate.ts   |  2 +-
 .../src/runtime/workspace-allocation/lease.ts      |  2 +-
 .../src/runtime/workspace-allocation/model.ts      | 27 +++++++++++++++
 6 files changed, 70 insertions(+), 4 deletions(-)
```

</details>
