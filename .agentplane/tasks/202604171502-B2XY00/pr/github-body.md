## Summary

Unify manifest writer scripts behind scripts/manifest.mjs

Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.

## Scope

- In scope: Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.
- Out of scope: unrelated refactors not required for "Unify manifest writer scripts behind scripts/manifest.mjs".

## Verification

- State: ok
- Note: Verified: manifest generation now runs through scripts/manifest.mjs and the declared lint plus release-manifest tests pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T15:26:31.846Z
- Branch: task/202604171502-B2XY00/manifest-cli-unification
- Head: 82601d2c9a6f

```text
 .github/workflows/ci.yml                           |   2 +-
 .github/workflows/publish.yml                      |   2 +-
 packages/agentplane/package.json                   |   2 +-
 packages/agentplane/src/cli/runtime-watch.test.ts  |   8 +-
 .../commands/release/ci-workflow-contract.test.ts  |   2 +-
 .../release/publish-workflow-contract.test.ts      |   2 +-
 .../write-publish-result-manifest-script.test.ts   |   6 +-
 .../write-release-ready-manifest-script.test.ts    |  10 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 scripts/manifest.mjs                               | 621 +++++++++++++++++++++
 scripts/run-local-release-e2e.mjs                  |   3 +-
 scripts/write-build-manifest.mjs                   |  71 ---
 scripts/write-publish-result-manifest.mjs          | 287 ----------
 scripts/write-release-ready-manifest.mjs           | 258 ---------
 15 files changed, 642 insertions(+), 636 deletions(-)
```

</details>
