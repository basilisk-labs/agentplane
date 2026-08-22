Task: `202608220538-SVC324`
Title: Resolve task autonomy and evaluator rework incidents
Canonical task record: `.agentplane/tasks/202608220538-SVC324/README.md`

## Summary

Resolve task autonomy and evaluator rework incidents

Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.

## Scope

- In scope: Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.
- Out of scope: unrelated refactors not required for "Resolve task autonomy and evaluator rework incidents".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T06:18:37.427Z
- Branch: task/202608220538-SVC324/resolve-task-autonomy-and-evaluator-rework-incid
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |  2 -
 docs/developer/incident-archive.mdx                |  6 ++
 packages/agentplane/assets/policy/incidents.md     |  2 -
 .../route-decision-blockers.quality-review.test.ts | 32 +++++++++
 .../src/commands/shared/route-decision-blockers.ts |  9 +--
 .../commands/shared/route-decision-verification.ts | 10 ++-
 .../src/commands/shared/workflow-step-factory.ts   | 30 +++++++++
 .../commands/shared/workflow-step-quality.test.ts  | 38 +++++++++--
 .../src/commands/task/scope-extend.test.ts         | 76 +++++++++++++++++++++-
 .../agentplane/src/commands/task/scope-extend.ts   | 33 +++++++++-
 .../task/supervision-outcome-disposition.test.ts   | 45 ++++++++++---
 .../task/supervision-outcome-disposition.ts        | 10 +--
 packages/core/src/tasks/index.ts                   |  1 +
 .../core/src/tasks/plan-execution-grant.test.ts    | 42 ++++++++++++
 packages/core/src/tasks/plan-execution-grant.ts    | 37 +++++++++++
 15 files changed, 344 insertions(+), 29 deletions(-)
```

</details>
