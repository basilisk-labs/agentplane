# PR Review

Created: 2026-05-01T07:05:04.801Z
Branch: task/202605010644-0B48D4/recipes-version-parity

## Summary

AP-02: Guard recipes runtime version parity

Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.

## Scope

- In scope: Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
- Out of scope: unrelated refactors not required for "AP-02: Guard recipes runtime version parity".

## Verification

### Plan

1. Run `bun run release:parity && bun run test:project -- recipes`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified recipes runtime version parity with: bun run release:parity; bun run test:project -- recipes; bunx vitest run packages/agentplane/src/commands/release/check-release-parity-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testNamePattern 'bumps versions, commits, and tags using the latest plan' --testTimeout 180000 --hookTimeout 180000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.

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

- Updated: 2026-05-01T07:10:12.749Z
- Branch: task/202605010644-0B48D4/recipes-version-parity
- Head: 7663845e6697

```text
 .../src/commands/release/apply.mutation.ts         | 19 ++++++++++
 .../commands/release/apply.pipeline/mutation.ts    |  9 +++++
 .../agentplane/src/commands/release/apply.test.ts  |  6 ++++
 .../release/check-release-parity-script.test.ts    | 23 ++++++++++++
 packages/recipes/src/index.ts                      |  2 +-
 packages/testkit/src/release.ts                    |  6 ++++
 scripts/check-release-parity.mjs                   |  4 ++-
 scripts/lib/release-version-parity.mjs             | 41 ++++++++++++++++++++++
 8 files changed, 108 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
