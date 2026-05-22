Task: `202605222225-2B0DJD`
Title: Treat already-merged PR delete-branch failures as integration progress
Canonical task record: `.agentplane/tasks/202605222225-2B0DJD/README.md`

## Summary

Treat already-merged PR delete-branch failures as integration progress

When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors.

## Scope

- In scope: When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors.
- Out of scope: unrelated refactors not required for "Treat already-merged PR delete-branch failures as integration progress".

## Verification

- State: ok
- Note:

```text
Evaluator check: already-merged gh output is treated as protected-base merge completion while
unrelated gh failures still flow through the existing handoff path; targeted regression, lint, and
typecheck passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T22:28:13.725Z
- Branch: task/202605222225-2B0DJD/already-merged-pr-delete-branch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/integrate/cmd.test.ts          | 73 ++++++++++++++++++++++
 .../pr/integrate/internal/github-pr-merge.ts       | 11 ++++
 2 files changed, 84 insertions(+)
```

</details>
