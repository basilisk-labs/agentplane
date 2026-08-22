Task: `202608221335-6DSF3R`
Title: Fix idempotent null-WorkItem external result acceptance
Canonical task record: `.agentplane/tasks/202608221335-6DSF3R/README.md`

## Summary

Fix idempotent null-WorkItem external result acceptance

Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.

## Scope

- In scope: Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.
- Out of scope: unrelated refactors not required for "Fix idempotent null-WorkItem external result acceptance".

## Verification

- State: needs_rework
- Note:

```text
Hosted P1 review found ambiguous null-ID routing when multiple WorkItems are CLAIMED; fail closed
before scheduler fallback and add focused coverage.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T13:42:54.186Z
- Branch: task/202608221335-6DSF3R/fix-idempotent-null-workitem-external-result-acc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/task-centric-external-result.test.ts      | 143 +++++++++++++++++++--
 .../commands/task/task-centric-external-result.ts  |  39 +++++-
 2 files changed, 165 insertions(+), 17 deletions(-)
```

</details>
