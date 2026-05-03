Task: `202605031524-RRPMDY`
Title: Harden branch_pr worktree ownership for batch tasks

## Summary

Harden branch_pr worktree ownership for batch tasks

Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task.

## Scope

- In scope: Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task.
- Out of scope: unrelated refactors not required for "Harden branch_pr worktree ownership for batch tasks".

## Verification

- State: ok
- Note: work start now rejects duplicate active branch ownership for a task.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T16:05:51.349Z
- Branch: task/202605031524-RRPMDY/batch-worktree-ownership
- Head: 6a26e9bc38a9

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           | 72 ++++++++++++++++++++++
 .../agentplane/src/commands/branch/work-start.ts   | 29 ++++++++-
 2 files changed, 100 insertions(+), 1 deletion(-)
```

</details>
