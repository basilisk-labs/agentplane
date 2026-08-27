Task: `202608271425-9EWJA1`
Title: Align PR fixtures with committed Git identity
Canonical task record: `.agentplane/tasks/202608271425-9EWJA1/README.md`

## Summary

Align PR fixtures with committed Git identity

Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.

## Scope

- In scope: Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.
- Out of scope: unrelated refactors not required for "Align PR fixtures with committed Git identity".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T14:29:58.630Z
- Branch: task/202608271425-9EWJA1/align-pr-fixtures-with-committed-git-identity
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.pr-flow.pr-notes-verify.test.ts   |  5 +-
 .../run-cli.core.pr-flow.pr-open.artifacts.test.ts | 13 +++--
 .../cli/run-cli.core.pr-flow.pr-open.git.test.ts   | 60 +++++++++++++++++-----
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |  4 +-
 ...re.pr-flow.pr-validation.open-hydration.test.ts | 11 ++--
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts | 14 ++---
 ...n-cli.core.pr-flow.pr-validation.update.test.ts |  7 +--
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |  9 ++--
 packages/testkit/src/cli-core-pr-flow.ts           |  2 +
 packages/testkit/src/cli.test.ts                   | 43 +++++++++++++++-
 10 files changed, 127 insertions(+), 41 deletions(-)
```

</details>
