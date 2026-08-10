Task: `202608101223-ZCA7JG`
Title: Accept verification records for metadata-only branch_pr tasks
Canonical task record: `.agentplane/tasks/202608101223-ZCA7JG/README.md`

## Summary

Accept verification records for metadata-only branch_pr tasks

Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null.

## Scope

- In scope: Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null.
- Out of scope: unrelated refactors not required for "Accept verification records for metadata-only branch_pr tasks".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T12:25:44.479Z
- Branch: task/202608101223-ZCA7JG/accept-verification-records-for-metadata-only-br
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/task-verification-records.test.ts       | 121 ++++++++++++++++++---
 .../commands/shared/task-verification-records.ts   |   3 +-
 2 files changed, 105 insertions(+), 19 deletions(-)
```

</details>
