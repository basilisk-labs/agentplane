## Summary

Avoid redundant manual close tails after hosted closure

Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.

## Scope

- In scope: Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
- Out of scope: unrelated refactors not required for "Avoid redundant manual close tails after hosted closure".

## Verification

- State: ok
- Note: Avoided redundant branch_pr close tails after canonical hosted closure: hosted-close-pr now skips follow-up PR creation when task README history already records a canonical close on base, and finish regression coverage prevents re-materializing redundant local task-close tails; validated by close-tail-state unit tests, finish unit regression, hosted-close-pr CLI regression, eslint, and prettier.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T14:00:06.222Z
- Branch: task/202604191200-G7YHZY/avoid-redundant-close-tail
- Head: e1f205fbdebf

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 136 +++++++--------------
 .../src/commands/task/close-tail-state.test.ts     |  50 ++++++++
 .../src/commands/task/close-tail-state.ts          |  30 +++++
 packages/agentplane/src/commands/task/finish.ts    |  85 ++++++++++---
 .../src/commands/task/finish.unit.test.ts          |  71 +++++++++++
 .../src/commands/task/hosted-close-pr.command.ts   |  41 ++++++-
 6 files changed, 302 insertions(+), 111 deletions(-)
```

</details>
