## Summary

Commit task README with branch_pr PR packet artifacts

Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery.

## Scope

- In scope: Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery.
- Out of scope: unrelated refactors not required for "Commit task README with branch_pr PR packet artifacts".

## Verification

- State: ok
- Note: Auto-commit now stages the task README together with the same task's PR packet; targeted PR flow tests pass, and a live pr open --sync-only probe leaves the task path fully clean with README tracked.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T19:28:25.786Z
- Branch: task/202604151921-DQ7DB6/commit-task-readme-with-packet
- Head: 2d7b620fe1bd

```text
 .agentplane/tasks/202604151921-DQ7DB6/README.md    | 121 +++++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  22 +++-
 .../src/commands/pr/internal/auto-commit.ts        |  26 +++--
 3 files changed, 154 insertions(+), 15 deletions(-)
```

</details>
