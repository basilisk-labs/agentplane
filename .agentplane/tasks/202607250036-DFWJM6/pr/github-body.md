Task: `202607250036-DFWJM6`
Title: Publish rebased PR branches with an explicit force-with-lease
Canonical task record: `.agentplane/tasks/202607250036-DFWJM6/README.md`

## Summary

Publish rebased PR branches with an explicit force-with-lease

Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.

## Scope

- In scope: publish an existing matching open PR after a local rebase only through an exact observed source object and ref-scoped force-with-lease bound to the observed remote head.
- Required hosted-CI rework: align integration fixtures with evaluator provenance, queue identity, SKIPPED checks, canonical base pinning, exact published provider/upstream head, and fresh pre-merge closure.
- Required compatibility fix: preserve a structurally valid pre_merge_closure marker when forward-compatible PR metadata fallback reconstructs metadata with a future enum value.
- Required test-infrastructure hardening: unique fake GitHub directories, awaited cleanup of hosted-fixture resources, full removal of harness-managed roots after every scenario, per-file Git-template cleanup, and migration of direct non-git fixtures into that lifecycle.
- Out of scope: unrelated publication behavior, provider semantics, or production refactors not required by these enforced regressions.

## Verification

- State: needs_rework
- Note:

```text
Hosted Windows still fails at PR head 659ae331c780ed79b9c4f43f8d1578937101d039: one init validation
root remains locked after bounded cleanup retries.
```
- Canonical workflow state lives in the task README.

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
 .../run-cli.core.init.validation-conflicts.test.ts |   7 +-
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
 24 files changed, 1460 insertions(+), 267 deletions(-)
```

</details>
