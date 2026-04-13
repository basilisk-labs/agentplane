## Summary

Auto-prune merged task worktrees and branches after integrate

After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.

## Scope

- In scope: After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.
- Out of scope: unrelated refactors not required for "Auto-prune merged task worktrees and branches after integrate".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx eslint packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: integrate still delegates through the cleanup hook, hosted-close-pr now auto-prunes the merged local task branch/worktree when safe, and the hosted-close integration regression confirms the branch disappears without breaking PR reuse/fallback flows. Scope: packages/agentplane/src/commands/shared/merged-branch-cleanup.ts, packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts, packages/agentplane/src/commands/task/hosted-close-pr.command.ts, packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T14:57:20.049Z
- Branch: task/202604131456-JEQT5N/auto-prune-task-worktree
- Head: 8f96bf8fa03e

```text
No changes detected.
```

</details>
