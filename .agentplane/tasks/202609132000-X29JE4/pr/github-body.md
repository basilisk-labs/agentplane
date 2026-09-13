Task: `202609132000-X29JE4`
Title: Remove supervisor spend limits and retain informational usage telemetry
Canonical task record: `.agentplane/tasks/202609132000-X29JE4/README.md`

## Summary

Remove supervisor spend limits and retain informational usage telemetry

Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.

## Scope

- In scope: Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.
- Out of scope: unrelated refactors not required for "Remove supervisor spend limits and retain informational usage telemetry".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T20:08:45.624Z
- Branch: task/202609132000-X29JE4/remove-supervisor-spend-limits-and-retain-inform
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.kernel-transport.test.ts  |   8 +-
 ...n-cli.core.task-supervisor-budget-epoch.test.ts | 275 +-----------
 .../cli/run-cli/command-catalog/task-supervisor.ts |  15 +-
 .../src/cli/run-cli/command-loaders/task.ts        |   8 -
 .../evaluator/evaluator-execute-supervisor.ts      |   2 +-
 .../evaluator/evaluator-execute.command.test.ts    |  24 +-
 .../supervisor-execution-budget-renewal.test.ts    | 296 -------------
 .../shared/supervisor-execution-budget-renewal.ts  | 114 -----
 .../supervisor-execution-default-budget.test.ts    |  15 +-
 .../shared/supervisor-execution-episode.test.ts    | 120 ++++--
 .../shared/supervisor-execution-episode.ts         |  89 +---
 .../shared/supervisor-execution-observation.ts     |  17 +-
 .../src/commands/task/advance.command.ts           |  38 +-
 .../src/commands/task/agent-action-packet.ts       |   1 -
 .../src/commands/task/branch-task-supervisor.ts    |  58 ++-
 .../task/external-agent-exchange-authority.ts      |  10 +-
 .../src/commands/task/external-agent-supervisor.ts |   7 +-
 .../agentplane/src/commands/task/kernel-advance.ts |  54 ++-
 .../agentplane/src/commands/task/kernel-run.ts     |  15 +-
 .../task/supervision-outcome-disposition.ts        |   2 +-
 .../task/supervisor-budget-epoch.command.ts        | 229 ----------
 .../supervisor-execution-episode-migration.ts      |  17 +-
 ...r-execution-episode-telemetry-admission.test.ts |  20 +-
 .../runner/supervisor-execution-episode.test.ts    | 259 ++++++++---
 .../src/runner/supervisor-execution-episode.ts     | 478 +++++----------------
 packages/core/src/schemas/index.ts                 |   7 +-
 .../baselines/v0.7-compatibility-candidate.json    | 180 +-------
 scripts/bench/paired-production-driver.mjs         |  15 -
 scripts/bench/paired-production-driver.test.mjs    |   8 +-
 .../check-compatibility-contract-baseline.mjs      | 120 ------
 30 files changed, 632 insertions(+), 1869 deletions(-)
```

</details>
