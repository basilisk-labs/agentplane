# PR Review

Created: 2026-04-10T02:26:18.567Z
Branch: task/202604100213-MVAGSD/integrate-premerge-artifact-guard

## Summary

Fail integrate before merging when task PR artifacts are missing

Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent.

## Scope

- In scope: Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent.
- Out of scope: unrelated refactors not required for "Fail integrate before merging when task PR artifacts are missing".

## Verification

### Plan

1. Run focused integrate regression coverage for the missing task PR artifact path. Expected: integrate exits before any base-branch merge-side mutation and reports the missing branch-backed artifacts explicitly.
2. Run the touched lint/test slice for the integrate validation path. Expected: the new pre-merge guard stays green with no new lint failures.
3. Inspect the operator-facing error for the missing artifact case. Expected: it names the missing `.agentplane/tasks/<task-id>/pr` artifact set and points at the task branch as the source to fix.

### Current Status

- State: ok
- Note: OK: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts; bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts -t 'integrate fails before merge when the task branch never committed PR artifacts|integrate fails when post-merge hook removes pr dir'; bun x eslint packages/agentplane/src/commands/pr/integrate/artifacts.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts.

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

- Updated: 2026-04-10T02:26:18.567Z
- Branch: task/202604100213-MVAGSD/integrate-premerge-artifact-guard
- Head: cd383aa8c7ea

```text
 .agentplane/tasks/202604100213-MVAGSD/README.md    | 95 ++++++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts | 90 ++++++++++++++++++++
 .../src/commands/pr/integrate/artifacts.ts         | 74 ++++++++++++++++-
 .../commands/pr/integrate/internal/prepare.test.ts |  3 +
 .../src/commands/pr/integrate/internal/prepare.ts  |  8 +-
 5 files changed, 268 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
