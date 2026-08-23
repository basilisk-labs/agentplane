Task: `202608230020-TEK7WE`
Title: Stabilize full CI runtime claims under supervisor load
Canonical task record: `.agentplane/tasks/202608230020-TEK7WE/README.md`

## Summary

Stabilize full CI runtime claims under supervisor load

Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.

## Scope

- In scope: Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.
- Out of scope: unrelated refactors not required for "Stabilize full CI runtime claims under supervisor load".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-23T02:24:37.779Z
- Branch: task/202608230020-TEK7WE/stabilize-full-ci-runtime-claims-under-superviso
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../usecases/task-run-active-claim.testkit.ts      |  2 +-
 scripts/checks/run-local-ci.mjs                    | 37 ++++++++++++++++------
 2 files changed, 29 insertions(+), 10 deletions(-)
```

</details>
