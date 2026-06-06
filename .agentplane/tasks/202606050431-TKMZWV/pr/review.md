# PR Review

Created: 2026-06-05T04:33:32.789Z

## Task

- Task: `202606050431-TKMZWV`
- Title: Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-onl...
- Status: DOING
- Branch: `task/202606050431-TKMZWV/fix-upstream-issue-4451-finish-task-complete-can`
- Canonical task record: `.agentplane/tasks/202606050431-TKMZWV/README.md`

## Verification

- State: ok
- Note: Verified: fixed direct closeout quality review target selection for existing task-artifact-only commit metadata. Commands: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts; git diff --check; node .agentplane/policy/check-routing.mjs.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T04:33:32.789Z
- Branch: task/202606050431-TKMZWV/fix-upstream-issue-4451-finish-task-complete-can
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/finish-execute-commit.ts     | 13 +++++++---
 .../task/finish.quality-review-target.unit.test.ts | 28 ++++++++++++++++++++++
 2 files changed, 38 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
