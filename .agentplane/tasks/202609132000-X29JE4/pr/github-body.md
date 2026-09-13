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
 .../supervisor-execution-episode-migration.ts      |  17 +-
 ...r-execution-episode-telemetry-admission.test.ts |  20 +-
 .../runner/supervisor-execution-episode.test.ts    | 127 ++++++++--
 .../src/runner/supervisor-execution-episode.ts     | 261 +++++++++------------
 packages/core/src/schemas/index.ts                 |   3 +
 scripts/bench/paired-production-driver.mjs         |  15 --
 scripts/bench/paired-production-driver.test.mjs    |   2 +-
 7 files changed, 246 insertions(+), 199 deletions(-)
```

</details>
