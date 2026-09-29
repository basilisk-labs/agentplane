Task: `202609130858-RMHWQ5`
Title: Add an explicit USER-approved supervisor budget epoch for unknown token telemetry
Canonical task record: `.agentplane/tasks/202609130858-RMHWQ5/README.md`

## Summary

Add an explicit USER-approved supervisor budget epoch for unknown token telemetry

When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.

## Scope

- In scope: When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.
- Out of scope: unrelated refactors not required for "Add an explicit USER-approved supervisor budget epoch for unknown token telemetry".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T14:18:44.390Z
- Branch: task/202609130858-RMHWQ5/add-an-explicit-user-approved-supervisor-budget
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-supervisor-budget-epoch.test.ts | 278 ++++++++++++++++++
 .../agentplane/src/cli/run-cli/command-catalog.ts  |   2 +
 .../cli/run-cli/command-catalog/task-supervisor.ts |  14 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../supervisor-execution-budget-renewal.test.ts    | 296 ++++++++++++++++++++
 .../supervisor-execution-default-budget.test.ts    |  28 ++
 .../shared/supervisor-execution-episode.ts         |  14 +-
 .../external-agent-implementation-recovery.test.ts |  23 +-
 .../task/external-agent-implementation-recovery.ts |  13 +-
 .../task/scope-extend-legacy-compat.test.ts        | 220 +++++++++++++++
 .../agentplane/src/commands/task/scope-extend.ts   |  36 ++-
 .../task/supervisor-budget-epoch.command.ts        | 229 +++++++++++++++
 .../src/runner/supervisor-execution-episode.ts     | 311 +++++++++++++++++++--
 packages/core/src/schemas/index.ts                 |   3 +
 .../baselines/v0.7-compatibility-candidate.json    | 180 +++++++++++-
 .../check-compatibility-contract-baseline.mjs      | 120 ++++++++
 scripts/lib/test-route-registry.mjs                |   2 +-
 17 files changed, 1731 insertions(+), 46 deletions(-)
```

</details>
