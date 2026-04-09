# PR Review

Created: 2026-04-09T12:21:08.124Z
Branch: task/202604091218-8S07FZ/multi-pr-wait

## Summary

Allow workflow:wait-remote-checks to accept multiple PRs

Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs.

## Scope

- In scope: Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs.
- Out of scope: unrelated refactors not required for "Allow workflow:wait-remote-checks to accept multiple PRs".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Verified multi-PR support in workflow:wait-remote-checks. Focused tests passed for single-PR, multi-PR order/caching, failure semantics, transient GH retry, auth failure, and timeout paths. Focused lint passed for scripts/wait-remote-pr-checks.mjs and packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts.

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

- Updated: 2026-04-09T12:32:54.189Z
- Branch: task/202604091218-8S07FZ/multi-pr-wait
- Head: 146bc13fb3a2

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
