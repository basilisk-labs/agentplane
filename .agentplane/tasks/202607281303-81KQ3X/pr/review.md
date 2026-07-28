# PR Review

Created: 2026-07-28T13:04:14.654Z

## Task

- Task: `202607281303-81KQ3X`
- Title: Persist branch_pr authority outside the PR head
- Status: DONE
- Branch: `task/202607281303-81KQ3X/persist-branch-pr-authority-outside-the-pr-head`
- Canonical task record: `.agentplane/tasks/202607281303-81KQ3X/README.md`

## Verification

- State: ok
- Note: Verified authority storage across linked worktrees, exact-scope rejection, typecheck, focused tests, test:fast, and local fast CI.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T13:04:44.037Z
- Branch: task/202607281303-81KQ3X/persist-branch-pr-authority-outside-the-pr-head
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/route-decision.ts          |  26 +++-
 .../shared/side-effect-authority-store.test.ts     | 144 +++++++++++++++++++++
 .../commands/shared/side-effect-authority-store.ts | 127 ++++++++++++++++++
 .../src/commands/task/authority-grant.command.ts   | 110 ++++++++--------
 4 files changed, 347 insertions(+), 60 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
