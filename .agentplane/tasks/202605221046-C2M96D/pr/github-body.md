Task: `202605221046-C2M96D`
Title: Amend refreshed task artifacts after commit
Canonical task record: `.agentplane/tasks/202605221046-C2M96D/README.md`

## Summary

Amend refreshed task artifacts after commit

Optimize branch_pr task branches so refreshed task README, blueprint, and PR artifacts are folded into the active task commit with amend instead of creating extra artifact-only commits.

## Scope

In scope: branch_pr task artifact refresh commits after implementation commits and PR artifact refresh; tests and docs/help strings directly affected by that behavior. Out of scope: hosted-close close-tail commits, direct-mode close commits, GitHub merge behavior, release publishing, and broad task lifecycle redesign.

## Verification

- State: ok
- Note:

```text
Verified hosted verify-unit fix: added missing gitBranchUpstream/gitDiffStat test doubles for
integrate prepare diffstat freshness path; vitest prepare.test.ts passed (14 tests), typecheck
passed, targeted ESLint passed, full test:fast passed (325 files, 1947 passed, 2 skipped).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T12:17:47.567Z
- Branch: task/202605221046-C2M96D/amend-task-artifacts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../cli/run-cli.core.pr-flow.pr-lifecycle.test.ts  |  44 +-
 .../run-cli.core.pr-flow.pr-notes-verify.test.ts   |  11 +-
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts |   8 +-
 .../impl/commands.commit-non-close.unit.test.ts    |   8 +-
 .../src/commands/guard/impl/commit-refresh.ts      |  17 +-
 .../agentplane/src/commands/guard/impl/commit.ts   |   4 +-
 packages/agentplane/src/commands/pr/check.ts       |  13 +
 .../commands/pr/integrate/internal/prepare.test.ts |  10 +-
 .../src/commands/pr/integrate/internal/prepare.ts  |  25 +-
 .../src/commands/pr/internal/auto-commit.ts        |  30 +-
 .../src/commands/pr/internal/freshness.ts          |  60 ++-
 .../commands/pr/internal/pr-artifact-snapshot.ts   |  35 +-
 .../src/commands/pr/internal/review-template.ts    |   3 +-
 .../src/commands/pr/internal/sync-model.ts         |   1 -
 .../src/commands/pr/internal/sync-open-step.ts     |   8 +-
 .../src/commands/pr/internal/sync-update-step.ts   |   6 +-
 .../agentplane/src/commands/pr/internal/sync.ts    |  25 +-
 packages/agentplane/src/commands/pr/update.ts      |  28 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  34 +-
 packages/agentplane/src/commands/shared/pr-meta.ts |   1 -
 .../src/commands/shared/pr-meta/builders.ts        |  84 +--
 packages/testkit/src/guard.ts                      |   3 +
 23 files changed, 812 insertions(+), 218 deletions(-)
```

</details>
