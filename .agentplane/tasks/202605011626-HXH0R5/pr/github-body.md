## Summary

Modularize publish workflow distribution stages

Refactor the release publishing workflow so npm, GitHub assets, package-manager publications, and evidence reporting are explicit distribution modules driven by the release distribution manifest.

## Scope

- In scope: Refactor the release publishing workflow so npm, GitHub assets, package-manager publications, and evidence reporting are explicit distribution modules driven by the release distribution manifest.
- Out of scope: unrelated refactors not required for "Modularize publish workflow distribution stages".

## Verification

- State: ok
- Note: Modular publish workflow verified: workflows:command-check passed; release:distribution:check passed; focused publish-result and publish workflow contract tests passed; lint:core passed; targeted Prettier check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T17:06:15.696Z
- Branch: task/202605011626-HXH0R5/modular-release-distribution
- Head: 47065cc2900a

```text
 .github/workflows/publish.yml                      |   8 ++
 .../release/publish-workflow-contract.test.ts      |   9 +-
 .../write-publish-result-manifest-script.test.ts   | 101 ++++++++++++++++++++-
 scripts/manifest.mjs                               |  66 +++++++++++++-
 4 files changed, 181 insertions(+), 3 deletions(-)
```

</details>
