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

- Updated: 2026-05-03T05:42:18.067Z
- Branch: task/202605030530-TB2GDS/next-patch-release-prep
- Head: e53eb0678e0b

```text
 .github/workflows/publish-distribution-module.yml  |   9 ++
 .github/workflows/publish.yml                      |   9 ++
 docs/recipes-inventory.json                        |   2 +-
 docs/releases/v0.4.2.md                            | 136 +++++++++++++++++++++
 .../src/commands/pr/internal/review-template.ts    |  12 +-
 packages/recipes/src/constants.ts                  |   3 +
 scripts/publish-external-distribution.mjs          |  62 +++++++++-
 scripts/render-homebrew-formula.mjs                |  11 +-
 scripts/render-scoop-manifest.mjs                  |  15 ++-
 scripts/render-setup-agentplane-action.mjs         |  61 +++++----
 10 files changed, 288 insertions(+), 32 deletions(-)
```

</details>
