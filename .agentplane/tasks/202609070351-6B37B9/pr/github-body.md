Task: `202609070351-6B37B9`
Title: Sign macOS standalone release binaries before packaging
Canonical task record: `.agentplane/tasks/202609070351-6B37B9/README.md`

## Summary

Sign macOS standalone release binaries before packaging

Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.

## Scope

- In scope: Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.
- Out of scope: unrelated refactors not required for "Sign macOS standalone release binaries before packaging".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T04:03:49.611Z
- Branch: task/202609070351-6B37B9/sign-macos-standalone-release-binaries-before-pa
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      | 119 ++++++++++++++++++--
 .../release/generate-bun-cli-assets-script.test.ts |  83 +++++++++++++-
 .../generate-release-distribution-script.test.ts   |  32 +++++-
 .../release/publish-workflow-contract.test.ts      | 122 ++++++++++++++++++++-
 scripts/generate/generate-bun-cli-assets.mjs       |   7 ++
 scripts/generate/generate-release-distribution.mjs |   3 +-
 6 files changed, 353 insertions(+), 13 deletions(-)
```

</details>
