# PR Review

Created: 2026-04-07T20:28:06.142Z
Branch: task/202604071954-6WR36R/integrate-artifact-recovery

## Summary

Make integrate recover from repairable PR artifact drift

Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.

## Scope

- In scope: Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.
- Out of scope: unrelated refactors not required for "Make integrate recover from repairable PR artifact drift".

## Verification

### Plan

1. Run focused integrate tests. Expected: recoverable pr/meta.json or verify-sha drift no longer hard-fails integrate.
2. Exercise strict drift coverage. Expected: real branch drift still fails with an explicit validation error.
3. Run focused lint on touched integrate files. Expected: repaired artifact-refresh paths lint cleanly.

### Current Status

- State: ok
- Note: Checks: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts; bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check'; bun x eslint packages/agentplane/src/commands/pr/internal/freshness.ts packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Evidence: pr check now recovers missing verify metadata only when task verification or verify.log proves current-head freshness, while real stale verify-sha drift still fails.

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

- Updated: 2026-04-07T20:47:13.363Z
- Branch: task/202604071954-6WR36R/integrate-artifact-recovery
- Head: 7db320370953

```text
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 93 ++++++++++++++++++++++
 packages/agentplane/src/commands/pr/check.ts       | 71 +++++++++--------
 .../commands/pr/integrate/internal/prepare.test.ts | 43 +++++++++-
 .../src/commands/pr/integrate/internal/prepare.ts  | 49 +++++-------
 .../src/commands/pr/internal/freshness.ts          | 77 ++++++++++++++++++
 5 files changed, 272 insertions(+), 61 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
