# PR Review

Created: 2026-05-02T17:29:47.769Z
Branch: task/202605021412-XDJ6X7/homebrew-standalone-assets

## Summary

Switch Homebrew formula to standalone assets

Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.

## Scope

- In scope: Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
- Out of scope: unrelated refactors not required for "Switch Homebrew formula to standalone assets".

## Verification

### Plan

1. Run `bun run release:homebrew:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `ruby -c generated Formula/agentplane.rb`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-XDJ6X7; bun run release:homebrew:check; bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; ruby -c generated Formula/agentplane.rb; bunx eslint scripts/render-homebrew-formula.mjs packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

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

- Updated: 2026-05-02T17:33:48.184Z
- Branch: task/202605021412-XDJ6X7/homebrew-standalone-assets
- Head: 22c39fcb601f

```text
 .../release/render-homebrew-formula-script.test.ts | 40 ++++++++++---
 scripts/render-homebrew-formula.mjs                | 69 +++++++++++++++-------
 2 files changed, 78 insertions(+), 31 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
