# PR Review

Created: 2026-06-03T17:44:58.986Z

## Task

- Task: `202606031744-7N0FHQ`
- Title: Support pre-merge branch_pr closure
- Status: DONE
- Branch: `task/202606031744-7N0FHQ/support-pre-merge-branch-pr-closure`
- Canonical task record: `.agentplane/tasks/202606031744-7N0FHQ/README.md`

## Verification

- State: ok
- Note: Verified pre-merge closure one-PR route: local and remote next-action now keep DONE task in pr_open_integration_lane while PR #4402 is open; pr metadata preserves pre_merge_closure markers across rebuilds; doctor ignores DONE/open PR artifacts only when pre_merge_closure is recorded.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T17:44:58.986Z
- Branch: task/202606031744-7N0FHQ/support-pre-merge-branch-pr-closure
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/workflow.branch_pr.md           |  16 ++--
 docs/user/branching-and-pr-artifacts.mdx           |  19 ++--
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/task-lifecycle.mdx                       |   6 +-
 docs/user/workflow.mdx                             |  14 +--
 packages/agentplane/src/commands/finish.run.ts     |   2 +
 .../agentplane/src/commands/finish.spec.shared.ts  |  16 ++++
 packages/agentplane/src/commands/finish.spec.ts    |   7 ++
 .../agentplane/src/commands/task/finish-close.ts   |  20 ++++
 .../agentplane/src/commands/task/finish-command.ts |   2 +
 .../src/commands/task/finish-execute-close.ts      |  48 ++++++++++
 .../agentplane/src/commands/task/finish-plan.ts    |  23 +++++
 .../agentplane/src/commands/task/finish-types.ts   |   2 +
 .../commands/task/finish.close-tail.unit.test.ts   | 106 +++++++++++++++++++++
 .../src/commands/task/hosted-close.command.test.ts |  37 ++++++-
 .../src/commands/task/hosted-close.command.ts      |  14 +++
 16 files changed, 305 insertions(+), 28 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
