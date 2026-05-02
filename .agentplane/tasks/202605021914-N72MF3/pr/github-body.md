Task: `202605021914-N72MF3`
Title: Modularize release publish jobs

## Summary

Modularize release publish jobs

Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories.

## Scope

- In scope: Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories.
- Out of scope: unrelated refactors not required for "Modularize release publish jobs".

## Verification

- State: ok
- Note: Verified: modular release pipeline checks passed: workflow lint, format, release:prepublish:fast, distribution/standalone/Homebrew/Scoop/setup-action/GHCR checks, targeted release contract tests, policy routing, docs scripts, and agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T19:37:06.619Z
- Branch: task/202605021914-N72MF3/release-pipeline-modules
- Head: 42ac5f1c4588

```text
 .agentplane/tasks/202605021914-ADH1EE/README.md    | 118 +++++++++++++
 .agentplane/tasks/202605021914-AMCDG4/README.md    | 118 +++++++++++++
 .agentplane/tasks/202605021914-Z2P2TS/README.md    | 118 +++++++++++++
 .github/workflows/publish-distribution-module.yml  | 196 +++++++++++++++++++++
 .github/workflows/publish.yml                      |   5 +-
 docs/developer/release-and-publishing.mdx          |  39 ++--
 .../generate-release-distribution-script.test.ts   |  12 ++
 .../generate-standalone-cli-assets-script.test.ts  |  49 +++++-
 .../release/publish-workflow-contract.test.ts      |  31 ++++
 scripts/generate-release-distribution.mjs          |  99 ++++++++---
 scripts/generate-standalone-cli-assets.mjs         |  54 ++++--
 scripts/render-ghcr-image-metadata.mjs             |  26 ++-
 12 files changed, 805 insertions(+), 60 deletions(-)
```

</details>
