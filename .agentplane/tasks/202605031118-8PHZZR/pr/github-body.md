Task: `202605031118-8PHZZR`
Title: Embed AgentPlane assets for Bun binary

## Summary

Embed AgentPlane assets for Bun binary

Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory.

## Scope

- In scope: Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory.
- Out of scope: unrelated refactors not required for "Embed AgentPlane assets for Bun binary".

## Verification

- State: ok
- Note: Focused verification passed: bun test packages/agentplane/src/shared/package-paths.test.ts (3 tests); bun run build; bun build packages/agentplane/dist/cli.js --compile with embedded version; compiled binary in a temp directory without adjacent assets rendered role CODER from bundled assets.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T11:51:37.437Z
- Branch: task/202605031118-8PHZZR/bun-binary-assets
- Head: 70ac40da0ac8

```text
 .../src/shared/builtin-assets.generated.ts         | 188 +++++++++++++++++++++
 .../agentplane/src/shared/package-paths.test.ts    |  31 +++-
 packages/agentplane/src/shared/package-paths.ts    |  33 +++-
 3 files changed, 250 insertions(+), 2 deletions(-)
```

</details>
