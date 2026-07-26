# PR Review

Created: 2026-07-25T22:39:31.309Z

## Task

- Task: `202607252235-5ZKP6T`
- Title: Prevent foreign task artifacts in branch_pr worktrees
- Status: DOING
- Branch: `task/202607252235-5ZKP6T/prevent-foreign-task-artifacts-in-branch-pr-work`
- Canonical task record: `.agentplane/tasks/202607252235-5ZKP6T/README.md`

## Verification

- State: ok
- Note: Verified rework SHA bc47bcd3: 42 focused tests passed; mutation, replacement, missing, and symlinked authoritative-source races each skipped with authoritative_source_changed_before_remove and retained the foreign replica; typecheck, lint, lifecycle, routing, diff, and doctor passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:40:26.297Z
- Branch: task/202607252235-5ZKP6T/prevent-foreign-task-artifacts-in-branch-pr-work
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221908-9M2FBQ/README.md    |   5 +-
 docs/internal/v0.7-refactor-plan.md                |  18 +-
 .../commands/branch/work-start.hook-shim.test.ts   |  36 +-
 .../src/commands/branch/work-start.materialize.ts  |  36 +-
 .../agentplane/src/commands/flow/repair.command.ts |  23 +
 .../src/commands/shared/route-decision-blockers.ts |  41 +-
 .../route-decision-blockers.worktree.test.ts       |  15 +
 .../src/commands/shared/route-decision.ts          |  15 +
 .../task-worktree-foreign-artifact-repair.test.ts  | 557 +++++++++++++++++++++
 .../task-worktree-foreign-artifact-repair.ts       | 553 ++++++++++++++++++++
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../shared/workflow-operation-projection.ts        |   3 +
 .../src/commands/shared/workflow-step-branch.ts    |  15 +-
 .../src/commands/shared/workflow-step-factory.ts   |  21 +
 .../commands/shared/workflow-step-fingerprint.ts   |   1 +
 .../src/commands/shared/workflow-step.test.ts      |   4 +
 .../src/commands/shared/workflow-step.ts           |  19 +
 18 files changed, 1327 insertions(+), 37 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
