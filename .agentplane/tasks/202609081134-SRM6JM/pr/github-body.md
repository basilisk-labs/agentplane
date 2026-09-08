Task: `202609081134-SRM6JM`
Title: Reduce agent protocol overhead for small code changes
Canonical task record: `.agentplane/tasks/202609081134-SRM6JM/README.md`

## Summary

Reduce agent protocol overhead for small code changes

Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.

## Scope

- In scope: Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.
- Out of scope: unrelated refactors not required for "Reduce agent protocol overhead for small code changes".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-08T11:38:53.832Z
- Branch: task/202609081134-SRM6JM/reduce-agent-protocol-overhead-for-small-code-ch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.local-handoff.test.ts    |  46 +-
 .../backends/task-backend/local-backend-read.ts    |  38 +-
 .../src/cli/run-cli.core.kernel-transport.test.ts  |  48 +-
 ...run-cli.core.task-advance.protocol-cost.test.ts | 353 +++++++++++++
 .../src/cli/run-cli.core.task-advance.test.ts      |  79 +--
 .../src/cli/run-cli.core.task-advance.testkit.ts   |   1 +
 .../src/commands/task/advance.command.ts           |  27 +-
 .../src/commands/task/agent-action-packet.ts       |  11 +
 .../commands/task/external-agent-exchange.test.ts  | 103 +++-
 .../src/commands/task/external-agent-exchange.ts   |  33 +-
 .../src/commands/task/external-agent-purpose.ts    |  16 +
 .../commands/task/external-agent-result-routing.ts |  32 +-
 .../src/commands/task/external-agent-supervisor.ts |  27 +-
 .../src/commands/task/kernel-exchange.ts           |  83 ++-
 .../core/src/runner/agent-semantic-result.test.ts  |  30 ++
 packages/core/src/runner/agent-semantic-result.ts  | 110 +++-
 packages/core/src/runner/agent-work-order.test.ts  |  52 ++
 packages/core/src/runner/agent-work-order.ts       |  41 +-
 .../core/src/tasks/task-artifact-schema.shared.ts  |   8 +-
 .../task-centric/replacement-plan-recovery.test.ts |  39 ++
 packages/core/src/tasks/task-centric/schema.ts     | 105 +++-
 .../src/tasks/task-centric/task-centric.test.ts    |  53 ++
 .../baselines/protocol-cost-SRM6JM-after-01.json   | 111 ++++
 .../baselines/protocol-cost-SRM6JM-after-02.json   | 111 ++++
 .../baselines/protocol-cost-SRM6JM-after-03.json   | 111 ++++
 .../baselines/protocol-cost-SRM6JM-before-01.json  | 110 ++++
 .../baselines/protocol-cost-SRM6JM-before-02.json  | 110 ++++
 .../baselines/protocol-cost-SRM6JM-before-03.json  | 110 ++++
 .../protocol-cost-SRM6JM-exchange-01.json          | 110 ++++
 .../baselines/protocol-cost-SRM6JM-plan-01.json    | 110 ++++
 .../protocol-cost-SRM6JM-profile-after.json        | 551 ++++++++++++++++++++
 .../protocol-cost-SRM6JM-profile-before-03.json    | 575 +++++++++++++++++++++
 .../protocol-cost-SRM6JM-recovery-baseline.json    |  29 ++
 .../baselines/protocol-cost-SRM6JM-summary.json    |  67 +++
 34 files changed, 3337 insertions(+), 103 deletions(-)
```

</details>
