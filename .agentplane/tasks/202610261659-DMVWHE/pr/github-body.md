Task: `202610261659-DMVWHE`
Title: Support provider branch updates in constrained-refspec checkouts
Canonical task record: `.agentplane/tasks/202610261659-DMVWHE/README.md`

## Summary

Support provider branch updates in constrained-refspec checkouts

Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression.

## Scope

- In scope: Validate exact task branch remote and merge metadata plus remote-tracking ref without requiring @{upstream} through a broad fetch refspec. Preserve fail-closed branch, head, clean tree, remote URL, and tracking SHA checks. Add single-branch fetch regression.
- Out of scope: unrelated refactors not required for "Support provider branch updates in constrained-refspec checkouts".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T17:05:03.047Z
- Branch: task/202610261659-DMVWHE/support-provider-branch-updates-in-constrained-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../pr/provider-update-branch-local.test.ts        | 46 ++++++++++++++++++++++
 .../commands/pr/provider-update-branch-local.ts    | 26 +++++++-----
 2 files changed, 62 insertions(+), 10 deletions(-)
```

</details>
