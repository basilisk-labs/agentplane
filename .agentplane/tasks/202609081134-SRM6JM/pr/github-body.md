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
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-08T11:38:53.832Z
- Branch: task/202609081134-SRM6JM/reduce-agent-protocol-overhead-for-small-code-ch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.local-handoff.test.ts    |  46 +++-
 .../backends/task-backend/local-backend-read.ts    |  38 +++-
 ...run-cli.core.task-advance.protocol-cost.test.ts | 251 +++++++++++++++++++++
 .../baselines/protocol-cost-SRM6JM-before-01.json  | 110 +++++++++
 .../baselines/protocol-cost-SRM6JM-before-02.json  | 110 +++++++++
 .../baselines/protocol-cost-SRM6JM-before-03.json  | 110 +++++++++
 6 files changed, 661 insertions(+), 4 deletions(-)
```

</details>
