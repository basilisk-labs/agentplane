## Summary

Materialize branch_pr close tails without dirtying base

Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.

## Scope

- In scope: Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.
- Out of scope: unrelated refactors not required for "Materialize branch_pr close tails without dirtying base".

## Verification

- State: ok
- Note: branch_pr finish now materializes a local task-close branch before the deterministic close commit, returns the checkout to the base branch, and keeps hosted-close/cleanup flows intact; typecheck, finish.unit, targeted cleanup-merged, targeted hosted-close-pr, and focused lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T08:24:33.798Z
- Branch: task/202604180819-6P5PRC/branch-pr-close-tail-helper
- Head: a8ed7ef44066

```text
 packages/agentplane/src/commands/task/finish.ts    | 134 +++++++++++++++++++--
 .../src/commands/task/finish.unit.test.ts          |  45 ++++++-
 2 files changed, 164 insertions(+), 15 deletions(-)
```

</details>
