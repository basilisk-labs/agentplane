Task: `202605100747-82QFWJ`
Title: Optimize branch_pr workflow resilience
Canonical task record: `.agentplane/tasks/202605100747-82QFWJ/README.md`

## Summary

Optimize branch_pr workflow resilience

Audit the branch_pr task lifecycle, map state transitions, identify redundant/error-prone steps, and implement a narrow refactor that makes the workflow faster, simpler, and more fault-tolerant without weakening verification or traceability.

## Scope

- In scope: Audit the branch_pr task lifecycle, map state transitions, identify redundant/error-prone steps, and implement a narrow refactor that makes the workflow faster, simpler, and more fault-tolerant without weakening verification or traceability.
- Out of scope: unrelated refactors not required for "Optimize branch_pr workflow resilience".

## Verification

- State: ok
- Note: Verified: task-new backend readiness now fails before stale cloud setup emits task-doc warnings or writes task cache; focused tests, formatting, lint, policy routing, and doctor passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T08:01:00.255Z
- Branch: task/202605100747-82QFWJ/branch-pr-resilience
- Head: b14440e726d2

```text
 .../blueprint/resolved-snapshot.json               | 533 +++++++++++++++++++++
 .../src/backends/task-backend.cloud.test.ts        |  30 ++
 .../src/backends/task-backend/cloud-backend.ts     |   4 +
 .../src/backends/task-backend/shared/types.ts      |   1 +
 .../src/cli/run-cli.core.tasks.create.test.ts      |  57 ++-
 packages/agentplane/src/commands/task/new.ts       |   1 +
 6 files changed, 625 insertions(+), 1 deletion(-)
```

</details>
