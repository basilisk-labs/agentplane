Task: `202607021729-BC11BT`
Title: Enforce maximum-assimilation structural validators
Canonical task record: `.agentplane/tasks/202607021729-BC11BT/README.md`

## Summary

Enforce maximum-assimilation structural validators

Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.

## Scope

- In scope: Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
- Out of scope: unrelated refactors not required for "Enforce maximum-assimilation structural validators".

## Verification

- State: ok
- Note: Verified maximum-assimilation structural validators.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T19:17:35.140Z
- Branch: task/202607021729-BC11BT/enforce-maximum-assimilation-structural-validato
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../verify-task.maximum-assimilation.test.ts       |  97 ++++++++++
 .../verify-task.maximum-assimilation.unit.test.ts  |  90 +++++++++
 .../src/context/coverage-validation.test.ts        | 120 ++++++++++++
 .../agentplane/src/context/coverage-validation.ts  |  68 ++++++-
 ...ximum-assimilation-artifacts-validation.test.ts | 110 +++++++++++
 .../maximum-assimilation-artifacts-validation.ts   | 214 +++++++++++++++++++++
 .../src/context/verify-task-artifacts.ts           |  82 +++++++-
 .../agentplane/src/context/verify-task.test.ts     |  72 +++++++
 8 files changed, 843 insertions(+), 10 deletions(-)
```

</details>
