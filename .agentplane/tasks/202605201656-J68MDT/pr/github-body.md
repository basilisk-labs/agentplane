Task: `202605201656-J68MDT`
Title: Fix done task next-action route
Canonical task record: `.agentplane/tasks/202605201656-J68MDT/README.md`

## Summary

Fix done task next-action route

Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.

## Scope

- In scope: Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.
- Out of scope: unrelated refactors not required for "Fix done task next-action route".

## Verification

- State: ok
- Note:

```text
Review fix accepted locally: branch_pr DONE tasks keep cleanup guidance, direct DONE tasks now
return a direct-safe terminal action with null command; no branch_pr recovery blockers for DONE
tasks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T17:02:42.798Z
- Branch: task/202605201656-J68MDT/done-next-action
- Head: bf2f3e28a4f8

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../src/cli/run-cli.core.route-decision.test.ts    |  54 +-
 .../src/commands/shared/route-decision.ts          |  18 +-
 3 files changed, 633 insertions(+), 11 deletions(-)
```

</details>
