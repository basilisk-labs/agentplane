# PR Review

Created: 2026-07-25T22:13:26.625Z

## Task

- Task: `202607252051-ZMVZRZ`
- Title: Make merged worktree cleanup resilient to partial removal
- Status: DOING
- Branch: `task/202607252051-ZMVZRZ/make-merged-worktree-cleanup-resilient`
- Canonical task record: `.agentplane/tasks/202607252051-ZMVZRZ/README.md`

## Verification

- State: needs_rework
- Note: Hosted Core CI #30178341063 failed verify-contract at the hotspot baseline; task requires a bounded test split before re-verification.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:14:25.745Z
- Branch: task/202607252051-ZMVZRZ/make-merged-worktree-cleanup-resilient
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.core.pr-flow.cleanup-merged.remote.test.ts | 171 +++++++++++++++++++++
 .../src/commands/branch/cleanup-merged.ts          |  17 +-
 .../commands/shared/merged-branch-cleanup.test.ts  | 144 ++++++++++++++++-
 .../src/commands/shared/merged-branch-cleanup.ts   |  85 +++++++++-
 4 files changed, 410 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
