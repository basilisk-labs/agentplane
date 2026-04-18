## Summary

Make cleanup merged idempotent for partially removed task branches

Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO.

## Scope

- In scope: Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO.
- Out of scope: unrelated refactors not required for "Make cleanup merged idempotent for partially removed task branches".

## Verification

- State: ok
- Note: cleanup merged now delegates local branch/worktree teardown to the shared merged-branch helper, so already-removed local branches are treated as idempotent success instead of E_IO; merged-branch-cleanup.unit, targeted cleanup-merged CLI regression, lint, and typecheck passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T08:34:23.341Z
- Branch: task/202604180831-Q8A3E9/cleanup-merged-idempotent
- Head: 6ea5b5376aee

```text
 .../src/commands/branch/cleanup-merged.ts          | 14 +++++--------
 .../commands/shared/merged-branch-cleanup.test.ts  | 24 ++++++++++++++++++++++
 2 files changed, 29 insertions(+), 9 deletions(-)
```

</details>
