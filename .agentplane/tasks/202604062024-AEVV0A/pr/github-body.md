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

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-06T20:28:16.859Z
- Branch: task/202604062024-AEVV0A/commit-msg-task-context
- Head: 27a29c0a6f51

```text
No changes detected.
```

</details>
