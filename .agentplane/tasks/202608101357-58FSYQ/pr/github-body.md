Task: `202608101357-58FSYQ`
Title: Reconcile local worktree and branch debt safely
Canonical task record: `.agentplane/tasks/202608101357-58FSYQ/README.md`

## Summary

Reconcile local worktree and branch debt safely

Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts.

## Scope

- In scope: Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts.
- Out of scope: unrelated refactors not required for "Reconcile local worktree and branch debt safely".

## Verification

- State: ok
- Note:

```text
PASS for implementation 2a4022ed19eb: provider proof receipts cover four exact merged PR heads;
after-inventory is 70 worktrees/84 branches with zero stale or safe-delete candidates and zero
duplicate active-task worktrees; primary main equals origin/main; protected RF05B and XS41ZV
status/diff/staged digests are unchanged; doctor exits 0 with four pre-existing lifecycle warnings;
policy routing passes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T21:10:04.185Z
- Branch: task/202608101357-58FSYQ/reconcile-local-worktree-and-branch-debt-safely
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
