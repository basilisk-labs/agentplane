# PR Review

Created: 2026-05-01T10:33:13.996Z
Branch: task/202605010645-FD8ZPX/guard-commit-wrapper-test-split

## Summary

AP-11: Split guard commit wrapper tests

Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.

## Scope

- In scope: Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.
- Out of scope: unrelated refactors not required for "AP-11: Split guard commit wrapper tests".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: guard commit-wrapper tests split into env, policy, refresh, and close suites; routing, inventory, and significant coverage use the split files; oversized baseline ratcheted.

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

- Updated: 2026-05-01T10:47:25.967Z
- Branch: task/202605010645-FD8ZPX/guard-commit-wrapper-test-split
- Head: b4519cea01e4

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |    7 +-
 ...run-cli.core.guard.commit-wrapper.close.test.ts |  401 +++++++
 .../run-cli.core.guard.commit-wrapper.env.test.ts  |  284 +++++
 ...un-cli.core.guard.commit-wrapper.policy.test.ts |  229 ++++
 ...n-cli.core.guard.commit-wrapper.refresh.test.ts |  332 ++++++
 .../cli/run-cli.core.guard.commit-wrapper.test.ts  | 1217 --------------------
 scripts/lib/test-inventory.mjs                     |    8 +-
 scripts/lib/test-route-registry.mjs                |    5 +-
 scripts/oversized-test-baseline.json               |    8 +-
 9 files changed, 1263 insertions(+), 1228 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
