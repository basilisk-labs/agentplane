## Summary

Align package versions after v0.3.13 release

Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.

## Scope

- In scope: Remove version drift by updating packages/recipes version surfaces, dependency pins, and generated references to the current 0.3.13 workspace version.
- Out of scope: unrelated refactors not required for "Align package versions after v0.3.13 release".

## Verification

- State: ok
- Note: Verified recipes version parity and release availability checks after adding recipes package coverage.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
