# PR Review

Created: 2026-08-29T22:21:11.540Z

## Task

- Task: `202608292218-3N0FBK`
- Title: Prevent branch closeout while required WorkItems are incomplete
- Status: DOING
- Branch: `task/202608292218-3N0FBK/prevent-branch-closeout-while-required-workitems`
- Canonical task record: `.agentplane/tasks/202608292218-3N0FBK/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T22:21:11.540Z
- Branch: task/202608292218-3N0FBK/prevent-branch-closeout-while-required-workitems
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          | 30 +++++++-
 .../src/commands/shared/workflow-step-branch.ts    | 12 +++
 .../commands/shared/workflow-step-quality.test.ts  | 85 ++++++++++++++++++++++
 3 files changed, 126 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
