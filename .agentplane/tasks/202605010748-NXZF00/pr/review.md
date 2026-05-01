# PR Review

Created: 2026-05-01T07:49:29.976Z
Branch: task/202605010748-NXZF00/code-map-recipe

## Summary

Replace recipes catalog with code map recipe

Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop.

## Scope

- In scope: Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop.
- Out of scope: unrelated refactors not required for "Replace recipes catalog with code map recipe".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified code-map recipe catalog replacement: list-remote with dev public-key override passed; local archive install passed; init --recipes code-map vendored the recipe and generated prompt graph included recipe.code-map/policy/.agentplane/policy/body/code-map-discipline; bun run ci:recipes passed; bun run docs:recipes:check passed; policy routing passed.

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

- Updated: 2026-05-01T08:32:44.491Z
- Branch: task/202605010748-NXZF00/code-map-recipe
- Head: 521c6df43060

```text
 agentplane-recipes                                 |  2 +-
 docs/recipes-inventory.json                        | 76 +++++-----------------
 package.json                                       |  2 +-
 .../src/runtime/prompt-modules/compiler.ts         | 11 +++-
 scripts/README.md                                  | 74 ++++++++++-----------
 scripts/check-agent-onboarding-scenario.mjs        |  8 +--
 scripts/generate-recipes-inventory.mjs             |  7 +-
 scripts/oversized-test-baseline.json               |  2 +-
 8 files changed, 74 insertions(+), 108 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
