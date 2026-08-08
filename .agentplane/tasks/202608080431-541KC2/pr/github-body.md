Task: `202608080431-541KC2`
Title: Bound concurrent effect-retirement observation by time
Canonical task record: `.agentplane/tasks/202608080431-541KC2/README.md`

## Summary

Bound concurrent effect-retirement observation by time

Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes.

## Scope

- In scope: Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes.
- Out of scope: unrelated refactors not required for "Bound concurrent effect-retirement observation by time".

## Verification

- State: ok
- Note:

```text
Concurrent effect retirement now uses a bounded monotonic observation window; delayed convergence,
adjacent concurrency, full unit, typing, repository contracts, and module budgets all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T04:32:07.103Z
- Branch: task/202608080431-541KC2/bound-concurrent-effect-retirement
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/usecases/task-run-effect-resolution.test.ts |  6 +++++-
 .../src/runner/usecases/task-run-effect-resolution.ts      | 14 ++++++++------
 2 files changed, 13 insertions(+), 7 deletions(-)
```

</details>
