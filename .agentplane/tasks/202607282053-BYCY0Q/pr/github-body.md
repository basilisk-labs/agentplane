Task: `202607282053-BYCY0Q`
Title: Charge supervisor wall-time budget from observed execution
Canonical task record: `.agentplane/tasks/202607282053-BYCY0Q/README.md`

## Summary

Charge supervisor wall-time budget from observed execution

Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.

## Scope

- In scope: Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
- Out of scope: unrelated refactors not required for "Charge supervisor wall-time budget from observed execution".

## Verification

- State: ok
- Note:

```text
Verified: focused supervisor/evaluator regression tests, typecheck, lint, format, policy routing,
hotspots, and full test:fast passed on abba7d47a.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T20:54:54.418Z
- Branch: task/202607282053-BYCY0Q/charge-supervisor-wall-time-budget-from-observed
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-execute.command.test.ts    | 70 ++++++++++++++++++++++
 .../runner/supervisor-execution-episode.test.ts    | 39 ++++++++++++
 .../src/runner/supervisor-execution-episode.ts     | 15 +----
 3 files changed, 111 insertions(+), 13 deletions(-)
```

</details>
