# PR Review

Created: 2026-05-01T06:13:31.223Z
Branch: task/202605010613-07JD2T/recipes-catalog-compat

## Summary

Fix recipes catalog compatibility

Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.

## Scope

- In scope: Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.
- Out of scope: unrelated refactors not required for "Fix recipes catalog compatibility".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Recipe catalog compatibility verified: runtime manifest/assets/scenario validation passed for viewer and dokploy; signed list-remote worked with the committed dev public key override; path and archive installs passed for both recipes; HTTP index install-by-name smoke passed; init --recipes viewer vendored the active recipe and generated prompt graph; docs:recipes:check passed.

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

- Updated: 2026-05-01T07:06:37.538Z
- Branch: task/202605010613-07JD2T/recipes-catalog-compat
- Head: 9593bbc7fd65

```text
 .agentplane/policy/incidents.md                         |  3 ++-
 agentplane-recipes                                      |  2 +-
 docs/recipes-inventory.json                             | 13 +++++--------
 packages/agentplane/assets/AGENTS.md                    |  8 ++++----
 packages/agentplane/assets/policy/incidents.md          |  3 ++-
 packages/agentplane/src/runtime/prompt-modules/index.ts |  4 +---
 scripts/check-oversized-test-baseline.mjs               |  2 +-
 website/src/data/homepage-content.ts                    |  2 +-
 8 files changed, 17 insertions(+), 20 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
