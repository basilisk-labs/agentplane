# PR Review

Created: 2026-04-13T07:55:31.342Z
Branch: task/202604130750-E2J835/release-apply-branch-pr-safe

## Summary

Make release apply branch_pr-aware for protected-main publish

When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.

## Scope

- In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
- Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: - Fixed the hosted Significant File Coverage regression by updating commit-wrapper coverage expectations for the artifact follow-up commit produced by agentplane commit. - Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts -t "commit wrapper lets --allow-tasks cover a non-README active task artifact without a duplicate explicit prefix" --hookTimeout 60000 --testTimeout 60000 - Verified with: bun run test:significant-coverage

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

- Updated: 2026-04-13T12:40:12.133Z
- Branch: task/202604130750-E2J835/release-apply-branch-pr-safe
- Head: efd6a93cc7cb

```text
 .agentplane/tasks/202604130750-E2J835/README.md    | 230 +++++++++++++++++++++
 .../src/cli/bootstrap-framework-dev-script.test.ts |   2 +
 .../agentplane/src/cli/local-ci-selection.test.ts  |  28 +++
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |   4 -
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  84 ++++++++
 .../src/cli/run-cli.core.pr-flow.test.ts           |  15 ++
 .../agentplane/src/commands/branch/work-start.ts   |  50 ++++-
 packages/agentplane/src/commands/hooks/index.ts    |  16 +-
 .../agentplane/src/commands/pr/internal/sync.ts    |  27 ++-
 .../src/commands/release/apply.command.ts          | 151 ++++++++++++--
 .../src/commands/release/apply.reporting.ts        |  26 ++-
 .../agentplane/src/commands/release/apply.test.ts  | 187 +++++++++++++++++
 .../agentplane/src/commands/release/apply.types.ts |  12 +-
 scripts/bootstrap-framework-dev.mjs                |   9 +-
 scripts/lib/local-ci-selection.mjs                 |  81 +++++---
 15 files changed, 853 insertions(+), 69 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
