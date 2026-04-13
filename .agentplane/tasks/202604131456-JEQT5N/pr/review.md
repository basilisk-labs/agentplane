# PR Review

Created: 2026-04-13T14:57:20.049Z
Branch: task/202604131456-JEQT5N/auto-prune-task-worktree

## Summary

Auto-prune merged task worktrees and branches after integrate

After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.

## Scope

- In scope: After successful branch_pr integration and closure, automatically remove the task worktree and stale local task branch when safe, so release waves do not require manual local cleanup.
- Out of scope: unrelated refactors not required for "Auto-prune merged task worktrees and branches after integrate".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx eslint packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check packages/agentplane/src/commands/shared/merged-branch-cleanup.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: integrate still delegates through the cleanup hook, hosted-close-pr now auto-prunes the merged local task branch/worktree when safe, and the hosted-close integration regression confirms the branch disappears without breaking PR reuse/fallback flows. Scope: packages/agentplane/src/commands/shared/merged-branch-cleanup.ts, packages/agentplane/src/commands/pr/integrate/internal/cleanup.ts, packages/agentplane/src/commands/task/hosted-close-pr.command.ts, packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts

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

- Updated: 2026-04-13T15:07:30.556Z
- Branch: task/202604131456-JEQT5N/auto-prune-task-worktree
- Head: a2a6f4a56b50

```text
 .agentplane/tasks/202604131456-JEQT5N/README.md    | 125 +++++++++++++++++++++
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   6 +
 .../src/commands/pr/integrate/internal/cleanup.ts  |  65 +----------
 .../merged-branch-cleanup.test.ts}                 |  42 +++++--
 .../src/commands/shared/merged-branch-cleanup.ts   |  61 ++++++++++
 .../src/commands/task/hosted-close-pr.command.ts   |  42 +++++++
 6 files changed, 268 insertions(+), 73 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
