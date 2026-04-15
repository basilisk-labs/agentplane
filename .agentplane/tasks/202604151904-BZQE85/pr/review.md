# PR Review

Created: 2026-04-15T19:05:12.225Z
Branch: task/202604151904-BZQE85/fix-wait-remote-checks-wrapper

## Summary

Fix workflow:wait-remote-checks wrapper argument forwarding

Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.

## Scope

- In scope: Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.
- Out of scope: unrelated refactors not required for "Fix workflow:wait-remote-checks wrapper argument forwarding".

## Verification

### Plan

1. Review the requested outcome for "Fix workflow:wait-remote-checks wrapper argument forwarding". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Wrapper and parser now treat --pr as a PR target alias; targeted script tests pass and live bun run workflow:wait-remote-checks -- --pr 331 succeeds.

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

- Updated: 2026-04-15T19:07:04.214Z
- Branch: task/202604151904-BZQE85/fix-wait-remote-checks-wrapper
- Head: 586564df6bfb

```text
 .agentplane/tasks/202604151904-BZQE85/README.md    | 121 +++++++++++++++++++++
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  23 ++++
 scripts/wait-remote-pr-checks.mjs                  |  13 +++
 3 files changed, 157 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
