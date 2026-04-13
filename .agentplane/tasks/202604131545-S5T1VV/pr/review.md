# PR Review

Created: 2026-04-13T15:48:44.429Z
Branch: task/202604131545-S5T1VV/skip-unsafe-post-merge-cleanup

## Summary

Skip unsafe worktrees in post-merge cleanup

Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout.

## Scope

- In scope: Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout.
- Out of scope: unrelated refactors not required for "Skip unsafe worktrees in post-merge cleanup".

## Verification

### Plan

1. Review the requested outcome for "Skip unsafe worktrees in post-merge cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts. Result: pass. Evidence: automated post-merge cleanup now skips unsafe outside-root/current worktrees, still prunes safe merged task tails, and manual cleanup merged outside-repo semantics remain strict.

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

- Updated: 2026-04-13T15:48:44.429Z
- Branch: task/202604131545-S5T1VV/skip-unsafe-post-merge-cleanup
- Head: 464f660b3f28

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
