Task: `202607300411-6QF79Y`
Title: Stabilize concurrent effect-resolution retirement test
Canonical task record: `.agentplane/tasks/202607300411-6QF79Y/README.md`

## Summary

Stabilize concurrent effect-resolution retirement test

Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing.

## Scope

- In scope: Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing.
- Out of scope: unrelated refactors not required for "Stabilize concurrent effect-resolution retirement test".

## Verification

- State: ok
- Note: Deterministic retry test covers active-claim read collision followed by concurrent retirement.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T04:25:50.252Z
- Branch: task/202607300411-6QF79Y/stabilize-effect-resolution-test
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../usecases/task-run-effect-resolution.test.ts    | 63 +++++++++++++++-------
 1 file changed, 44 insertions(+), 19 deletions(-)
```

</details>
