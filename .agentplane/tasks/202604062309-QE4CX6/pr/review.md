# PR Review

Created: 2026-04-06T23:23:06.350Z
Branch: task/202604062309-QE4CX6/remote-check-polling

## Summary

Replace gh watch in remote-check wait path with resilient polling

Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses.

## Scope

- In scope: Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses.
- Out of scope: unrelated refactors not required for "Replace gh watch in remote-check wait path with resilient polling".

## Verification

### Plan

1. Run focused wait-remote-pr-checks script tests for success, retry, permanent failure, and timeout paths. Expected: resilient polling behavior is covered and green.
2. Run eslint on the touched wait-remote-checks implementation and tests. Expected: no lint errors in touched scope.
3. Review the script help and runtime output. Expected: the command no longer claims to be a thin `gh pr checks --watch` wrapper and it prints explicit polling status/failure messages.

### Current Status

- State: ok
- Note: Focused wait-remote-checks coverage passed after bootstrapping the task worktree: bun x vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; bun x eslint scripts/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: workflow:wait-remote-checks now polls GitHub state directly, retries transient transport failures, and times out explicitly instead of delegating to gh pr checks --watch.

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

- Updated: 2026-04-06T23:23:06.350Z
- Branch: task/202604062309-QE4CX6/remote-check-polling
- Head: 61ce80966f00

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
