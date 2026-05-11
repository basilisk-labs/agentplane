Task: `202605100837-6FTSE2`
Title: Pre-v0.5: enforce lifecycle commit-from-comment command matrix
Canonical task record: `.agentplane/tasks/202605100837-6FTSE2/README.md`

## Summary

Pre-v0.5: enforce lifecycle commit-from-comment command matrix

Define and enforce the command/mode matrix for start-ready, verify, set-status, and finish commit-from-comment behavior across direct, branch_pr task worktree, and branch_pr base checkout.

## Scope

- In scope: Define and enforce the command/mode matrix for start-ready, verify, set-status, and finish commit-from-comment behavior across direct, branch_pr task worktree, and branch_pr base checkout.
- Out of scope: unrelated refactors not required for "Pre-v0.5: enforce lifecycle commit-from-comment command matrix".

## Verification

- State: ok
- Note: Verified: lifecycle commit-from-comment matrix is enforced by a shared guard; start-ready/set-status are allowed in direct and branch_pr task worktrees but rejected on branch_pr base, finish is rejected in branch_pr, and verify has no commit-from-comment option.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-11T06:48:39.662Z
- Branch: task-202605100837-6FTSE2-lifecycle-commit-matrix
- Head: 5b4c8defed12

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 .../task/lifecycle-commit-matrix.unit.test.ts      | 141 ++++++
 .../agentplane/src/commands/task/set-status.ts     |   9 +
 packages/agentplane/src/commands/task/shared.ts    |   1 +
 .../src/commands/task/shared/transitions.ts        |  55 +++
 packages/agentplane/src/commands/task/start.ts     |   9 +
 6 files changed, 720 insertions(+)
```

</details>
