# PR Review

Created: 2026-05-01T17:10:15.251Z
Branch: task/202605011626-TG4GZ4/homebrew-tap-publication

## Summary

Add Homebrew tap publication module

Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.

## Scope

- In scope: Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.
- Out of scope: unrelated refactors not required for "Add Homebrew tap publication module".

## Verification

### Plan

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Homebrew tap module verified: release:homebrew:check passed; release:distribution:check passed; workflows:command-check passed; docs:scripts:check passed; publish workflow contract test passed; lint:core passed; targeted Prettier check passed.

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

- Updated: 2026-05-01T17:13:16.665Z
- Branch: task/202605011626-TG4GZ4/homebrew-tap-publication
- Head: 91fb43545abd

```text
 .github/workflows/publish.yml                      |  14 ++
 package.json                                       |   1 +
 .../release/publish-workflow-contract.test.ts      |   4 +
 scripts/README.md                                  |   1 +
 scripts/render-homebrew-formula.mjs                | 154 +++++++++++++++++++++
 5 files changed, 174 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
