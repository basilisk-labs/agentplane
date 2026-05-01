# PR Review

Created: 2026-05-01T09:09:54.255Z
Branch: task/202605010645-WN3ZS8/hooks-test-split

## Summary

AP-08: Split hooks CLI test monolith

Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.

## Scope

- In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
- Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines.

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

- Updated: 2026-05-01T09:18:19.542Z
- Branch: task/202605010645-WN3ZS8/hooks-test-split
- Head: 2da946134c1e

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |  7 ++++-
 packages/testkit/package.json                      |  4 +++
 packages/testkit/src/hooks.ts                      | 36 ++++++++++++++++++++++
 scripts/lib/local-ci-selection.mjs                 |  2 +-
 scripts/lib/test-route-registry.mjs                |  5 ++-
 scripts/oversized-test-baseline.json               |  8 ++---
 vitest.config.ts                                   |  4 +++
 7 files changed, 57 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
