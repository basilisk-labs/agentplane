Task: `202607291650-R1N8C5`
Title: Restore PR head tracking after constrained refspec publication
Canonical task record: `.agentplane/tasks/202607291650-R1N8C5/README.md`

## Summary

Restore PR head tracking after constrained refspec publication

Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout.

## Scope

- In scope: Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout.
- Out of scope: unrelated refactors not required for "Restore PR head tracking after constrained refspec publication".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T16:51:35.238Z
- Branch: task/202607291650-R1N8C5/restore-pr-head-tracking-after-constrained-refsp
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
