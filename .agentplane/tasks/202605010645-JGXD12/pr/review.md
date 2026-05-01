# PR Review

Created: 2026-05-01T10:00:45.097Z
Branch: task/202605010645-JGXD12/release-apply-test-split

## Summary

AP-10: Split release apply tests

Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.

## Scope

- In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
- Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted.

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

- Updated: 2026-05-01T10:19:23.835Z
- Branch: task/202605010645-JGXD12/release-apply-test-split
- Head: a4537344bf8c

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |    7 +-
 .../src/commands/release/apply.apply-flow.test.ts  |  156 +++
 .../src/commands/release/apply.preflight.test.ts   |  405 +++++++
 .../commands/release/apply.push-recovery.test.ts   |  400 ++++++
 .../agentplane/src/commands/release/apply.test.ts  | 1268 --------------------
 .../release/apply.version-mutation.test.ts         |  352 ++++++
 packages/testkit/src/release.ts                    |   71 +-
 scripts/lib/test-route-registry.mjs                |    5 +-
 scripts/oversized-test-baseline.json               |    8 +-
 9 files changed, 1395 insertions(+), 1277 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
