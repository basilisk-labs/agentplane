# PR Review

Created: 2026-07-25T00:37:21.141Z

## Task

- Task: `202607250036-DFWJM6`
- Title: Publish rebased PR branches with an explicit force-with-lease
- Status: DONE
- Branch: `task/202607250036-DFWJM6/force-with-lease-pr-publish`
- Canonical task record: `.agentplane/tasks/202607250036-DFWJM6/README.md`

## Verification

- State: ok
- Note: Rework verified at cbf4ac33977c: focused publication 21/21, parser and integration regressions pass, full fast 452/452 files and 3045/3045 tests, critical CLI 11/11 chunks, targeted PR route 22/22 files and 134/134 tests, typecheck/lint/format/hotspots/task lint/policy routing pass, and post-run temp-root birthtime inventory is empty.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T01:04:43.697Z
- Branch: task/202607250036-DFWJM6/force-with-lease-pr-publish
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.branch-meta.test.ts       |   6 +-
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |   3 +-
 .../src/cli/run-cli.core.hooks.install.test.ts     |  15 +-
 .../src/cli/run-cli.core.hooks.uninstall.test.ts   |  15 +-
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   2 +-
 ...run-cli.core.pr-flow.integrate-failures.test.ts |  19 +
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |  59 ++-
 ...-cli.core.pr-flow.integrate-rebase-race.test.ts |   9 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |  69 ++-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  35 +-
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts |   6 +-
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |  15 +-
 .../src/commands/pr/branch-publication.test.ts     | 522 +++++++++++++++++++++
 .../src/commands/pr/branch-publication.ts          | 284 +++++++++++
 .../src/commands/pr/internal/sync-github.ts        |   2 +-
 packages/agentplane/src/commands/pr/open.ts        | 138 +-----
 .../agentplane/src/commands/shared/pr-meta.test.ts |  14 +
 .../src/commands/shared/pr-meta/parser.ts          |   5 +
 packages/testkit/src/cli-harness.ts                | 383 ++++++++++++++-
 packages/testkit/src/github-pr.ts                  |  65 ++-
 packages/testkit/src/index.test.ts                 |  14 +-
 21 files changed, 1417 insertions(+), 263 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
