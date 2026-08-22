# PR Review

Created: 2026-08-22T10:19:00.838Z

## Task

- Task: `202608221017-2HT3N7`
- Title: Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr...
- Status: DOING
- Branch: `task/202608221017-2HT3N7/port-the-complete-pre-merge-quality-review-lifec`
- Canonical task record: `.agentplane/tasks/202608221017-2HT3N7/README.md`

## Verification

- State: needs_rework
- Note: P1 review requires linked batch task IDs in the reviewed descendant check; implementation updated in commit 13310d16d225.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T10:22:48.051Z
- Branch: task/202608221017-2HT3N7/port-the-complete-pre-merge-quality-review-lifec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/quality-review-target.ts   |   6 +
 .../src/commands/task/finish-blueprint-evidence.ts |  47 ++++---
 .../src/commands/task/finish-execute-commit.ts     |  19 +--
 .../agentplane/src/commands/task/finish-shared.ts  |  18 +++
 .../task/finish.quality-review-target.unit.test.ts | 137 +++++++++++++++++++++
 packages/agentplane/src/commands/task/plan.ts      |   4 +-
 .../agentplane/src/commands/task/plan.unit.test.ts |  52 ++++++++
 7 files changed, 248 insertions(+), 35 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
