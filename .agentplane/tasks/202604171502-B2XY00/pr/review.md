# PR Review

Created: 2026-04-17T15:22:20.793Z
Branch: task/202604171502-B2XY00/manifest-cli-unification

## Summary

Unify manifest writer scripts behind scripts/manifest.mjs

Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.

## Scope

- In scope: Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.
- Out of scope: unrelated refactors not required for "Unify manifest writer scripts behind scripts/manifest.mjs".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/cli/runtime-watch.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: manifest generation now runs through scripts/manifest.mjs and the declared lint plus release-manifest tests pass.

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

- Updated: 2026-04-17T15:26:31.846Z
- Branch: task/202604171502-B2XY00/manifest-cli-unification
- Head: 82601d2c9a6f

```text
 .github/workflows/ci.yml                           |   2 +-
 .github/workflows/publish.yml                      |   2 +-
 packages/agentplane/package.json                   |   2 +-
 packages/agentplane/src/cli/runtime-watch.test.ts  |   8 +-
 .../commands/release/ci-workflow-contract.test.ts  |   2 +-
 .../release/publish-workflow-contract.test.ts      |   2 +-
 .../write-publish-result-manifest-script.test.ts   |   6 +-
 .../write-release-ready-manifest-script.test.ts    |  10 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 scripts/manifest.mjs                               | 621 +++++++++++++++++++++
 scripts/run-local-release-e2e.mjs                  |   3 +-
 scripts/write-build-manifest.mjs                   |  71 ---
 scripts/write-publish-result-manifest.mjs          | 287 ----------
 scripts/write-release-ready-manifest.mjs           | 258 ---------
 15 files changed, 642 insertions(+), 636 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
