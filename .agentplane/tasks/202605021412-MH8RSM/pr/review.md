# PR Review

Created: 2026-05-02T17:39:32.233Z
Branch: task/202605021412-MH8RSM/scoop-setup-standalone-assets

## Summary

Switch Scoop and setup-action to standalone assets

Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.

## Scope

- In scope: Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
- Out of scope: unrelated refactors not required for "Switch Scoop and setup-action to standalone assets".

## Verification

### Plan

1. Run `bun run release:scoop:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:setup-action:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-MH8RSM; bun run release:scoop:check; bun run release:setup-action:check; bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bunx eslint scripts/render-scoop-manifest.mjs scripts/render-setup-agentplane-action.mjs packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
