# PR Review

Created: 2026-04-17T12:25:09.953Z
Branch: task/202604171154-1WZZJK/recipes-version-parity

## Summary

Align package versions after v0.3.13 release

Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.

## Scope

- In scope: Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.
- Out of scope: unrelated refactors not required for "Align package versions after v0.3.13 release".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified recipes version parity and release availability checks after adding recipes package coverage.

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

- Updated: 2026-04-17T12:37:15.432Z
- Branch: task/202604171154-1WZZJK/recipes-version-parity
- Head: 1e209ccc1929

```text
 bun.lock                                           |  4 +--
 docs/reference/generated-reference.mdx             |  2 +-
 packages/agentplane/package.json                   |  2 +-
 .../src/commands/release.test-helpers.ts           | 11 +++++++
 .../release/check-release-parity-script.test.ts    | 35 +++++++++++++++++++++
 .../npm-version-availability-script.test.ts        | 15 ++++++++-
 packages/recipes/package.json                      |  2 +-
 packages/recipes/src/index.ts                      |  2 +-
 scripts/check-npm-version-availability.mjs         |  2 +-
 scripts/check-release-parity.mjs                   |  4 +--
 scripts/lib/release-version-parity.mjs             | 36 +++++++++++++++++++---
 11 files changed, 100 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
