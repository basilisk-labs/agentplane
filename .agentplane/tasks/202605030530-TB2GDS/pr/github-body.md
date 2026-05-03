Task: `202605030530-TB2GDS`
Title: Prepare next patch release after task cleanup

## Summary

Prepare next patch release after task cleanup

Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate.

## Scope

- In scope: Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate.
- Out of scope: unrelated refactors not required for "Prepare next patch release after task cleanup".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T07:15:02.840Z
- Branch: task/202605030530-TB2GDS/next-patch-release-prep
- Head: 2b51f851920f

```text
 .agentplane/config.json                            |   2 +-
 .github/workflows/publish-distribution-module.yml  |   9 ++
 .github/workflows/publish.yml                      |   9 ++
 agentplane-recipes                                 |   2 +-
 docs/recipes-inventory.json                        |   2 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.4.2.md                            | 136 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 .../src/commands/pr/internal/review-template.ts    |  12 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/constants.ts                  |   3 +
 packages/recipes/src/index.ts                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 scripts/publish-external-distribution.mjs          |  62 +++++++++-
 scripts/render-homebrew-formula.mjs                |  11 +-
 scripts/render-scoop-manifest.mjs                  |  15 ++-
 scripts/render-setup-agentplane-action.mjs         |  61 +++++----
 18 files changed, 300 insertions(+), 44 deletions(-)
```

</details>
