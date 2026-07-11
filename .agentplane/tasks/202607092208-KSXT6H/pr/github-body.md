Task: `202607092208-KSXT6H`
Title: Split runtime and backend hotspots for v0.6.22
Canonical task record: `.agentplane/tasks/202607092208-KSXT6H/README.md`

## Summary

Split runtime and backend hotspots for v0.6.22

Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.

## Scope

- In scope: Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
- Out of scope: unrelated refactors not required for "Split runtime and backend hotspots for v0.6.22".

## Verification

- State: ok
- Note:

```text
Public APIs and serialized contracts are preserved; all seven scoped hotspots are decomposed.
Focused 33/246 and full 364/2157 tests, build, typecheck, architecture, hotspot, contract, Knip, and
coverage checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-11T11:31:25.645Z
- Branch: task/202607092208-KSXT6H/split-runtime-and-backend-hotspots-for-v0-6-22
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend/cloud-backend-utils.ts   |  37 +--
 .../src/backends/task-backend/cloud-backend.ts     |  18 +-
 .../task-backend/cloud-config-overrides.ts         |  34 +++
 .../src/commands/hermes/hermes-environment.ts      |  64 ++++++
 .../src/commands/hermes/hermes-runtime.ts          | 164 +-------------
 .../agentplane/src/commands/hermes/hermes-specs.ts | 230 +++++++++++++++++++
 .../agentplane/src/commands/hermes/hermes-state.ts |  93 ++++++++
 .../src/commands/hermes/hermes.command.ts          | 252 ++-------------------
 .../commands/insights/insights-report-render.ts    |  69 ++++++
 .../src/commands/insights/insights-report.ts       |  89 +-------
 .../src/commands/insights/insights-task-loader.ts  |  19 ++
 .../src/runner/result-manifest-artifacts.ts        | 149 ++++++++++++
 packages/agentplane/src/runner/result-manifest.ts  | 165 ++------------
 .../src/runtime/sgr/contract-evaluator-routing.ts  | 143 ++++++++++++
 .../src/runtime/sgr/contract-shared-validation.ts  |  37 +++
 packages/agentplane/src/runtime/sgr/contracts.ts   | 170 +-------------
 16 files changed, 901 insertions(+), 832 deletions(-)
```

</details>
