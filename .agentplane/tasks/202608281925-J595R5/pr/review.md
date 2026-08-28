# PR Review

Created: 2026-08-28T20:00:19.477Z

## Task

- Task: `202608281925-J595R5`
- Title: Resume required WorkItems before branch pre-merge closure
- Status: DOING
- Branch: `task/202608281925-J595R5/resume-required-workitems-before-branch-pre-merg`
- Canonical task record: `.agentplane/tasks/202608281925-J595R5/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T20:00:19.477Z
- Branch: task/202608281925-J595R5/resume-required-workitems-before-branch-pre-merg
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.task-advance.required-work.test.ts | 276 +++++++++++++++++++++
 .../evaluator-episode.calibration.test.ts          |  85 ++++++-
 .../src/commands/shared/workflow-step-branch.ts    |  28 +--
 .../shared/workflow-step-required-work.test.ts     | 221 +++++++++++++++++
 .../commands/shared/workflow-step-required-work.ts |  99 ++++++++
 5 files changed, 688 insertions(+), 21 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
