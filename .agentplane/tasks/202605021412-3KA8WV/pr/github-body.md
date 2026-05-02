Task: `202605021412-3KA8WV`
Title: Extend release distribution manifest with standalone assets

## Summary

Extend release distribution manifest with standalone assets

Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.

## Scope

- In scope: Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
- Out of scope: unrelated refactors not required for "Extend release distribution manifest with standalone assets".

## Verification

- State: ok
- Note: Passed: bun run release:distribution:check; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts; bunx eslint scripts/generate-release-distribution.mjs packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T17:03:38.292Z
- Branch: task/202605021412-3KA8WV/standalone-distribution-manifest
- Head: 598043f10bfb

```text
 .../generate-release-distribution-script.test.ts   | 100 +++++++++++++++++++++
 scripts/generate-release-distribution.mjs          |  79 ++++++++++++++--
 2 files changed, 171 insertions(+), 8 deletions(-)
```

</details>
