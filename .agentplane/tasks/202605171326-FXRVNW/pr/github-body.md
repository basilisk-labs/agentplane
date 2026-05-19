Task: `202605171326-FXRVNW`
Title: Freeze release candidate base and scope after late merges
Canonical task record: `.agentplane/tasks/202605171326-FXRVNW/README.md`

## Summary

Freeze release candidate base and scope after late merges

Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.

## Scope

- In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
- Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".

## Verification

- State: ok
- Note:

```text
Verified follow-up: integrate test helpers now record EVALUATOR verification against the branch
implementation commit before PR artifacts are opened.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T19:39:43.521Z
- Branch: task/202605171326-FXRVNW/v063-prerelease-rough-edges
- Head: f1afccb640b5

```text
 .agentplane/tasks/202605170941-3RACDD/README.md    |  84 ++-
 .../blueprint/resolved-snapshot.json               | 363 +++++++++++++
 .agentplane/tasks/202605171325-7P2VM4/README.md    |  74 ++-
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 .agentplane/tasks/202605171325-7P5M3V/README.md    |  74 ++-
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 .../agentplane/src/cli/local-ci-selection.test.ts  |   5 +
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   6 +
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |  10 +
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |  12 +
 ...n-cli.core.pr-flow.integrate-validation.test.ts |   4 +
 .../src/commands/context/release-readiness.test.ts |  16 +
 packages/agentplane/src/commands/context/wiki.ts   |   4 +
 packages/agentplane/src/commands/pr/check.ts       |  19 +
 .../pr/integrate/internal/github-pr-merge.ts       |  18 +
 .../commands/pr/internal/github-review-threads.ts  | 108 ++++
 .../src/commands/pr/internal/sync-github.ts        |  43 ++
 .../commands/release/apply.pipeline/preflight.ts   |   1 +
 .../src/commands/release/apply.pipeline/state.ts   | 156 ++++++
 .../src/commands/release/apply.preflight.plan.ts   |   3 +-
 .../src/commands/release/apply.preflight.test.ts   |  55 ++
 .../agentplane/src/commands/release/apply.types.ts |   1 +
 .../src/commands/release/plan.command.ts           |  87 ++-
 .../agentplane/src/commands/release/plan.test.ts   |  54 +-
 .../agentplane/src/commands/task/finish-close.ts   |  15 +-
 .../commands/task/finish.close-tail.unit.test.ts   |  37 +-
 .../commands/task/finish.validation.unit.test.ts   |   4 +
 .../src/commands/task/mutation-parity.unit.test.ts |  10 +-
 packages/core/src/tasks/task-store.ts              |  14 +-
 packages/testkit/src/cli-harness.ts                |   2 +-
 scripts/lib/pre-push-scope.mjs                     |   2 +-
 scripts/release/next-action.mjs                    |   6 +
 scripts/release/state.mjs                          |  46 +-
 34 files changed, 2776 insertions(+), 65 deletions(-)
```

</details>
