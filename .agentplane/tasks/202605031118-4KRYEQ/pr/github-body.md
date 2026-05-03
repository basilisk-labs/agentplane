Task: `202605031118-4KRYEQ`
Title: Generate Bun executable release assets

## Summary

Generate Bun executable release assets

Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel.

## Scope

- In scope: Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel.
- Out of scope: unrelated refactors not required for "Generate Bun executable release assets".

## Verification

- State: ok
- Note: Focused verification passed: bun run build; node scripts/generate-bun-cli-assets.mjs --check generated 5 Bun executable assets; bun test packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T12:16:27.579Z
- Branch: task/202605031118-4KRYEQ/bun-binary-release-assets
- Head: fd8245541efa

```text
 package.json                                       |   4 +-
 .../release/generate-bun-cli-assets-script.test.ts |  95 ++++++++
 .../generate-release-distribution-script.test.ts   |  35 +++
 scripts/README.md                                  |   2 +
 scripts/generate-bun-cli-assets.mjs                | 243 +++++++++++++++++++++
 scripts/generate-release-distribution.mjs          |  50 ++++-
 6 files changed, 426 insertions(+), 3 deletions(-)
```

</details>
