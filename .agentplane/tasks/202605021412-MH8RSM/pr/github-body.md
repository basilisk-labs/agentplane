Task: `202605021412-MH8RSM`
Title: Switch Scoop and setup-action to standalone assets

## Summary

Switch Scoop and setup-action to standalone assets

Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.

## Scope

- In scope: Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
- Out of scope: unrelated refactors not required for "Switch Scoop and setup-action to standalone assets".

## Verification

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-MH8RSM; bun run release:scoop:check; bun run release:setup-action:check; bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bunx eslint scripts/render-scoop-manifest.mjs scripts/render-setup-agentplane-action.mjs packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T17:44:07.686Z
- Branch: task/202605021412-MH8RSM/scoop-setup-standalone-assets
- Head: a01933ea0170

```text
 ...ender-scoop-and-setup-standalone-script.test.ts | 139 +++++++++++++++++++++
 scripts/render-scoop-manifest.mjs                  |  53 +++++---
 scripts/render-setup-agentplane-action.mjs         |  94 +++++++++++---
 3 files changed, 255 insertions(+), 31 deletions(-)
```

</details>
