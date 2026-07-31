Task: `202607311456-B67DP1`
Title: Finalize integration from immutable branch head
Canonical task record: `.agentplane/tasks/202607311456-B67DP1/README.md`

## Summary

Finalize integration from immutable branch head

Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization.

## Scope

- In scope: Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization.
- Out of scope: unrelated refactors not required for "Finalize integration from immutable branch head".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T14:59:40.807Z
- Branch: task/202607311456-B67DP1/finalize-integration-from-immutable-branch-head
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts | 1 +
 packages/agentplane/src/commands/pr/integrate/internal/finalize.ts      | 2 +-
 2 files changed, 2 insertions(+), 1 deletion(-)
```

</details>
