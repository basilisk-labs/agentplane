Task: `202610041748-K43XFE`
Title: Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release
Canonical task record: `.agentplane/tasks/202610041748-K43XFE/README.md`

## Summary

Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release

User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.

## Scope

- In scope: User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release".

## Verification

- State: ok
- Note: Canonical validation sha256:618a4278260b812e37b7e3e84d7fafa13d6f8ae46e23f504dfc317c1a50db9b9
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-04T18:13:17.876Z
- Branch: task/202610041748-K43XFE/implement-and-qualify-agentplane-0-7-13-scenario
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |   4 +
 .../src/runner/context/recipe-context.ts           |   2 +
 .../src/runner/context/recipe-plan-validation.ts   | 112 +++++++
 .../context/roadmap-recipe-plan-validation.test.ts | 352 +++++++++++++++++++++
 .../agentplane/src/shared/contained-stable-file.ts |  62 +++-
 packages/core/src/tasks/index.ts                   |   1 +
 packages/core/src/tasks/task-centric/graph.ts      |  45 ++-
 .../src/tasks/task-centric/task-centric.test.ts    |  64 ++++
 packages/recipes/package.json                      |   4 +
 packages/recipes/src/index.ts                      |   2 +
 packages/recipes/src/internal-utils.ts             |  14 +
 packages/recipes/src/resolver-contracts.ts         |   2 +-
 .../recipes/src/roadmap-recipe-parameters.test.ts  | 334 +++++++++++++++++++
 .../recipes/src/roadmap-scenario-v2-parser.test.ts | 153 +++++++++
 packages/recipes/src/scenario-contracts.ts         |   2 +
 packages/recipes/src/scenario-parameters.ts        | 108 +++++++
 packages/recipes/src/scenario-v2.ts                |  70 ++++
 packages/recipes/src/scenario.ts                   |  15 +
 packages/recipes/tsconfig.json                     |   7 +-
 19 files changed, 1342 insertions(+), 11 deletions(-)
```

</details>
