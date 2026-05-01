## Summary

Rotate recipes signing trust root

Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.

## Scope

- In scope: Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.
- Out of scope: unrelated refactors not required for "Rotate recipes signing trust root".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
