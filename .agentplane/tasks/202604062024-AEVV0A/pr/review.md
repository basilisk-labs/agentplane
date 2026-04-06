# PR Review

Created: 2026-04-06T20:28:16.859Z
Branch: task/202604062024-AEVV0A/commit-msg-task-context

## Summary

Infer task context for commit-msg hook from task branch

Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context.

## Scope

- In scope: Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context.
- Out of scope: unrelated refactors not required for "Infer task context for commit-msg hook from task branch".

## Verification

### Plan

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -t "hooks run commit-msg"`. Expected: commit-msg hook accepts task-like subjects on task branches when env is unset and still rejects them on non-task branches.
2. Run `bun x eslint packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: lint exits 0.

### Current Status

- State: ok
- Note: Commit-msg hook now infers task context from task branches when AGENTPLANE_TASK_ID is unset; targeted hook vitest and eslint passed.

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

- Updated: 2026-04-06T20:35:29.777Z
- Branch: task/202604062024-AEVV0A/commit-msg-task-context
- Head: 23dbab8b484f

```text
 .agentplane/tasks/202604062024-AEVV0A/README.md    | 111 +++++++++++++++++++++
 .../tasks/202604062024-AEVV0A/pr/diffstat.txt      |   0
 .../tasks/202604062024-AEVV0A/pr/github-body.md    |  49 +++++++++
 .../tasks/202604062024-AEVV0A/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604062024-AEVV0A/pr/meta.json |  14 +++
 .../tasks/202604062024-AEVV0A/pr/notes.jsonl       |   0
 .agentplane/tasks/202604062024-AEVV0A/pr/review.md |  56 +++++++++++
 .../tasks/202604062024-AEVV0A/pr/verify.log        |   0
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |  20 ++++
 packages/agentplane/src/commands/hooks/index.ts    |  22 +++-
 10 files changed, 272 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
