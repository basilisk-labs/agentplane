# PR Review

Created: 2026-08-30T18:53:26.210Z

## Task

- Task: `202608301851-5W3XW6`
- Title: Recover unstarted task worktrees pinned before the approved planning baseline
- Status: DOING
- Branch: `task/202608301851-5W3XW6/recover-unstarted-task-worktrees-pinned-before-t`
- Canonical task record: `.agentplane/tasks/202608301851-5W3XW6/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T18:53:26.210Z
- Branch: task/202608301851-5W3XW6/recover-unstarted-task-worktrees-pinned-before-t
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  25 ++
 docs/user/cli-reference.generated.mdx              |   3 +
 ...i.core.task-advance.worktree-resolution.test.ts | 188 ++++++++++++++-
 .../commands/branch/work-resume-planning-base.ts   | 260 +++++++++++++++++++++
 .../src/commands/branch/work-resume.command.ts     |  51 +++-
 5 files changed, 523 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
