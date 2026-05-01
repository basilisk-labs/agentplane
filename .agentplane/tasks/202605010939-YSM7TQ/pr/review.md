# PR Review

Created: 2026-05-01T09:41:47.808Z
Branch: task/202605010939-YSM7TQ/recipes-signing-rotation

## Summary

Rotate recipes signing trust root

Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.

## Scope

- In scope: Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.
- Out of scope: unrelated refactors not required for "Rotate recipes signing trust root".

## Verification

### Plan

1. Run a default remote catalog smoke using a clean AGENTPLANE_HOME and the updated trust-root. Expected: agentplane recipes list-remote --refresh --yes lists code-map@0.1.0 without AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS override.
2. Run targeted recipes remote usage tests. Expected: signature validation and catalog loading tests pass.
3. Run docs/policy sanity checks relevant to changed docs. Expected: routing/docs checks pass or any unrelated pre-existing drift is recorded.
4. Confirm agentplane-recipes/index.json.sig uses key_id 2026-05, the public key is committed, and no private key material is tracked or printed.

### Current Status

- State: pending
- Note: Not recorded yet.

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

- Updated: 2026-05-01T10:00:31.203Z
- Branch: task/202605010939-YSM7TQ/recipes-signing-rotation
- Head: 3fc930da98f1

```text
 agentplane-recipes                                 |  2 +-
 .../0009-recipes-index-signing-algorithm-policy.md | 25 ++++++++++++++++++++++
 docs/developer/recipes-development.mdx             |  6 ++++++
 docs/developer/recipes-safety.mdx                  |  4 ++++
 packages/recipes/src/constants.ts                  |  3 +++
 5 files changed, 39 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
