Task: `202607302331-3C8V0X`
Title: Repair beta.2 guard and clone baseline drift
Canonical task record: `.agentplane/tasks/202607302331-3C8V0X/README.md`

## Summary

Repair beta.2 guard and clone baseline drift

Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on.

## Scope

- In scope: Move the duplicated local isRecord repair and measured clone-baseline refresh out of beta.2 qualification. Preserve guard semantics, review the three absolute clone increments, and provide a bounded verified repair that beta.2 can depend on.
- Out of scope: unrelated refactors not required for "Repair beta.2 guard and clone baseline drift".

## Verification

- State: ok
- Note: Command-level verification evidence is frozen for the repaired implementation.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T23:35:43.550Z
- Branch: task/202607302331-3C8V0X/repair-beta-2-guard-and-clone-baseline-drift
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/context/reindex-projection.ts   | 57 ++++++++++------------
 packages/agentplane/src/context/sqlite.ts          | 43 ++++++++++------
 .../usecases/task-knowledge-request-scope.test.ts  | 20 ++++++++
 .../usecases/task-knowledge-request-scope.ts       |  4 +-
 .../runner/usecases/task-knowledge-request.test.ts |  3 +-
 .../runner/usecases/task-knowledge-retrieval.ts    | 19 ++------
 .../usecases/task-knowledge-semantic-escalation.ts |  5 +-
 scripts/baselines/clone-baseline.json              | 32 ++++++------
 8 files changed, 98 insertions(+), 85 deletions(-)
```

</details>
