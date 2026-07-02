Task: `202607021729-8S1DF3`
Title: Add maximum-assimilation wiki reports and evaluator scenarios
Canonical task record: `.agentplane/tasks/202607021729-8S1DF3/README.md`

## Summary

Add maximum-assimilation wiki reports and evaluator scenarios

Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints.

## Scope

- In scope: Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints.
- Out of scope: unrelated refactors not required for "Add maximum-assimilation wiki reports and evaluator scenarios".

## Verification

- State: ok
- Note: Verified maximum-assimilation wiki reports and evaluator scenarios.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T19:45:58.958Z
- Branch: task/202607021729-8S1DF3/add-maximum-assimilation-wiki-reports-and-evalua
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../src/commands/context/context-runner.ts         |   8 +
 .../src/commands/context/context.spec.ts           |  11 +-
 .../verify-task.maximum-assimilation.test.ts       |  81 ++++++
 .../verify-task.maximum-assimilation.unit.test.ts  |  30 ++
 .../src/commands/context/wiki-reports.ts           | 310 +++++++++++++++++++++
 .../src/commands/context/wiki-reports.unit.test.ts | 107 +++++++
 .../src/context/ingest-task-pack.test.ts           |   6 +
 .../agentplane/src/context/ingest-task-pack.ts     |   9 +
 .../agentplane/src/context/ingest-task-prompt.ts   |   9 +-
 ...ximum-assimilation-artifacts-validation.test.ts |  75 +++++
 .../maximum-assimilation-artifacts-validation.ts   |  80 ++++++
 12 files changed, 724 insertions(+), 4 deletions(-)
```

</details>
