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
- Note: Windows cleanup rework verified at db062c2cdb31: failing init scenario and helper contract 20/20, platform-critical 6/6 files and 91/91 tests, full fast 453/453 files and 3046/3046 tests, critical CLI 11/11 chunks, typecheck/lint/format/policy checks pass, and post-run temp-root birthtime inventory is empty. Hosted Windows rerun remains the external gate.
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
 packages/testkit/src/cli-harness.ts                | 390 ++++++++++++++-
 .../src/cli-harness/temp-root-cleanup.test.ts      |  19 +
 .../testkit/src/cli-harness/temp-root-cleanup.ts   |  14 +
 packages/testkit/src/github-pr.ts                  |  65 ++-
 packages/testkit/src/index.test.ts                 |  14 +-
 23 files changed, 1456 insertions(+), 264 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
