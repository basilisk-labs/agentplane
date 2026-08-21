Task: `202608212254-WR57ZD`
Title: Accept exact tree identity for GitHub rebase cleanup
Canonical task record: `.agentplane/tasks/202608212254-WR57ZD/README.md`

## Summary

Accept exact tree identity for GitHub rebase cleanup

Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE.

## Scope

- In scope: Allow cleanup reconciliation to accept an exact provider receipt when the provider head tree equals the single-parent GitHub rebase merge commit tree; preserve existing identity, object, receipt, and negative guards. Add focused regression tests, publish a PR, merge after hosted checks, then retry cleanup for E6CDHP and XEC2NE.
- Out of scope: unrelated refactors not required for "Accept exact tree identity for GitHub rebase cleanup".

## Verification

- State: needs_rework
- Note:

```text
Rework: Declared check failed: bunx vitest run
packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts
packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts
packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T23:12:20.018Z
- Branch: task/202608212254-WR57ZD/accept-exact-tree-identity-for-github-rebase-cle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../branch/cleanup-merged-provider-receipt.test.ts | 167 ++++++++++++++++++++-
 .../cleanup-merged-provider-reconciliation.ts      |  35 +++++
 2 files changed, 201 insertions(+), 1 deletion(-)
```

</details>
