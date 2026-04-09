# PR Review

Created: 2026-04-09T13:57:30.099Z
Branch: task/202604091338-75VJ4R/wait-remote-gh-mock-race

## Summary

Stabilize wait-remote-pr-checks gh mock under parallel polling

Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks.

## Scope

- In scope: Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks.
- Out of scope: unrelated refactors not required for "Stabilize wait-remote-pr-checks gh mock under parallel polling".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000`. Expected: all cases pass, including transient-retry and timeout paths.
2. Re-run the flaky slices multiple times: `for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done` and `for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done`. Expected: no intermittent failures.
3. Run `bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts`. Expected: lint passes with no new formatting or style regressions.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done; bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: full file 7/7 pass; transient retry loop 10/10 pass; timeout loop 10/10 pass; eslint and prettier clean. Scope: packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts gh mock harness stability under concurrent status/check-runs polling.

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

- Updated: 2026-04-09T13:57:30.099Z
- Branch: task/202604091338-75VJ4R/wait-remote-gh-mock-race
- Head: b564d3604f34

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
