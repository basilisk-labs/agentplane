Task: `202605021412-XDJ6X7`
Title: Switch Homebrew formula to standalone assets

## Summary

Switch Homebrew formula to standalone assets

Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.

## Scope

- In scope: Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
- Out of scope: unrelated refactors not required for "Switch Homebrew formula to standalone assets".

## Verification

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-XDJ6X7; bun run release:homebrew:check; bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; ruby -c generated Formula/agentplane.rb; bunx eslint scripts/render-homebrew-formula.mjs packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T17:33:48.184Z
- Branch: task/202605021412-XDJ6X7/homebrew-standalone-assets
- Head: 22c39fcb601f

```text
 .../release/render-homebrew-formula-script.test.ts | 40 ++++++++++---
 scripts/render-homebrew-formula.mjs                | 69 +++++++++++++++-------
 2 files changed, 78 insertions(+), 31 deletions(-)
```

</details>
