# PR Review

Created: 2026-04-09T17:50:28.326Z
Branch: task/202604091725-3KNEPP/sync-start-ready-worktree-readme

## Summary

Keep active branch_pr task README synced into worktree after start-ready

Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy.

## Scope

- In scope: Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy.
- Out of scope: unrelated refactors not required for "Keep active branch_pr task README synced into worktree after start-ready".

## Verification

### Plan

1. Start a branch_pr task from its task worktree and inspect both the base README and the task-worktree README. Expected: both copies show the same DOING status/comment after start-ready.
2. Run the targeted branch_pr lifecycle regression in run-cli.core.pr-flow.test.ts. Expected: the new start-ready sync scenario passes.
3. Lint the touched start-ready and pr-flow sources. Expected: eslint exits 0 for the modified files.

### Current Status

- State: ok
- Note: Verified that start-ready keeps the task README synchronized between the active task worktree and the base checkout, with targeted branch_pr lifecycle regression coverage and eslint clean.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T18:03:31.411Z
- Branch: task/202604091725-3KNEPP/sync-start-ready-worktree-readme
- Head: 8184d737c2d3

```text
 .agentplane/tasks/202604091725-3KNEPP/README.md    | 116 +++++++++++++++++++++
 .../tasks/202604091725-3KNEPP/pr/diffstat.txt      |   0
 .../tasks/202604091725-3KNEPP/pr/github-body.md    |  50 +++++++++
 .../tasks/202604091725-3KNEPP/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091725-3KNEPP/pr/meta.json |  14 +++
 .../tasks/202604091725-3KNEPP/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091725-3KNEPP/pr/review.md |  57 ++++++++++
 .../tasks/202604091725-3KNEPP/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.test.ts           |  95 +++++++++++++++++
 .../agentplane/src/commands/task/start-ready.ts    | 105 +++++++++++++++++++
 10 files changed, 438 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
