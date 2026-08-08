Task: `202608080805-KPWPAV`
Title: Allow explicit replacement after failed task advance operation
Canonical task record: `.agentplane/tasks/202608080805-KPWPAV/README.md`

## Summary

Allow explicit replacement after failed task advance operation

Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.

## Scope

- In scope: Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
- Out of scope: unrelated refactors not required for "Allow explicit replacement after failed task advance operation".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T08:23:09.065Z
- Branch: task/202608080805-KPWPAV/allow-task-advance-replacement
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 107 +++++++++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 ++-
 .../shared/supervisor-execution-episode.ts         |  44 +++++++++
 .../src/commands/task/advance.command.ts           |  27 +++++-
 .../agentplane/src/commands/task/advance.spec.ts   |  10 ++
 ...direct-task-supervisor-formal-operation.test.ts |  67 +++++++++++++
 .../direct-task-supervisor-formal-operation.ts     |   3 +
 .../commands/task/direct-task-verification.test.ts |  21 ++++
 .../src/commands/task/direct-task-verification.ts  |  11 ++-
 .../task/external-agent-supervisor-episode.ts      |  35 +++++++
 .../src/commands/task/external-agent-supervisor.ts |   3 +
 .../baselines/v0.7-compatibility-candidate.json    |  37 +++++--
 .../check-compatibility-contract-baseline.mjs      |  18 +++-
 13 files changed, 378 insertions(+), 16 deletions(-)
```

</details>
