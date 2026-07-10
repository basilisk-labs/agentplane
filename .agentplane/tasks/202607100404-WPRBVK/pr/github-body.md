Task: `202607100404-WPRBVK`
Title: Make doctor batch consistency rebase-aware
Canonical task record: `.agentplane/tasks/202607100404-WPRBVK/README.md`

## Summary

Make doctor batch consistency rebase-aware

For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit.

## Scope

- In scope: For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit.
- Out of scope: unrelated refactors not required for "Make doctor batch consistency rebase-aware".

## Verification

- State: ok
- Note:

```text
Pass: focused doctor tests 14/14; typecheck; lint:core; ci:contract; full fast suite; hotspot
baseline; policy routing; diff validation; live doctor exits OK without the false batch-consistency
warning.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T04:04:49.139Z
- Branch: task/202607100404-WPRBVK/make-doctor-batch-consistency-rebase-aware
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |  1 +
 docs/internal/v0.6.22-refactor-plan.md             |  2 +-
 .../src/commands/doctor.branch-pr.batch.test.ts    | 78 ++++++++++++++++++++++
 .../agentplane/src/commands/doctor/branch-pr.ts    |  7 +-
 4 files changed, 86 insertions(+), 2 deletions(-)
```

</details>
