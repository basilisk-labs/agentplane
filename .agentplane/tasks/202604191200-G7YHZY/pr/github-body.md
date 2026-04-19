## Summary

Avoid redundant manual close tails after hosted closure

Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.

## Scope

- In scope: Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
- Out of scope: unrelated refactors not required for "Avoid redundant manual close tails after hosted closure".

## Verification

- State: ok
- Note: Validated redundant close-tail suppression on base-side canonical closures: finish no longer materializes a task-close branch when the base already has canonical close artifacts, and hosted-close-pr now short-circuits before any GitHub recovery lookup once the task is already closed for that merge.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T12:25:28.193Z
- Branch: task/202604191200-G7YHZY/avoid-redundant-close-tail
- Head: 6d3dca0e0e84

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 140 +++++----------------
 packages/agentplane/src/commands/task/finish.ts    |  37 ++++++
 .../src/commands/task/finish.unit.test.ts          |  55 ++++++++
 .../src/commands/task/hosted-close-pr.command.ts   |  24 +++-
 4 files changed, 143 insertions(+), 113 deletions(-)
```

</details>
