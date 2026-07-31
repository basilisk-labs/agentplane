# PR Review

Created: 2026-07-31T15:29:40.734Z

## Task

- Task: `202607311529-773BXT`
- Title: Make merged worktree cleanup idempotent
- Status: DOING
- Branch: `task/202607311529-773BXT/make-merged-worktree-cleanup-idempotent`
- Canonical task record: `.agentplane/tasks/202607311529-773BXT/README.md`

## Verification

- State: ok
- Note: 20 focused cleanup/integration tests passed; typecheck, format, lint:core, and release:prepublish:fast passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T15:29:40.734Z
- Branch: task/202607311529-773BXT/make-merged-worktree-cleanup-idempotent
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/merged-branch-cleanup.test.ts  | 39 +++++++++++++++++
 .../src/commands/shared/merged-branch-cleanup.ts   | 49 +++++++++++++---------
 2 files changed, 68 insertions(+), 20 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
