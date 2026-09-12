Task: `202609121423-9WPTCW`
Title: Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21
Canonical task record: `.agentplane/tasks/202609121423-9WPTCW/README.md`

## Summary

Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21

Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.
- Out of scope: unrelated refactors not required for "Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T17:57:52.207Z
- Branch: task/202609121423-9WPTCW/implement-the-0-7-9-baseline-inventory-and-lifec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.roadmap-branch.test.ts    |  29 +++
 .../src/cli/run-cli.core.roadmap-direct.test.ts    |  34 ++++
 .../src/cli/run-cli.core.roadmap-recovery.test.ts  |  30 +++
 .../shared/roadmap-backend-roundtrip.test.ts       |  30 +++
 .../shared/roadmap-rework-conservation.test.ts     |  27 +++
 scripts/baselines/architecture-inventory.json      | 226 +++++++++++++++++++++
 scripts/checks/architecture-inventory.mjs          | 117 +++++++++++
 scripts/checks/architecture-inventory.test.mjs     |  47 +++++
 scripts/lib/test-route-registry.mjs                |   2 +-
 scripts/lib/test-route-registry.test.mjs           |  14 ++
 10 files changed, 555 insertions(+), 1 deletion(-)
```

</details>
