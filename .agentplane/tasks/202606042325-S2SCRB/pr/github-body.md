Task: `202606042325-S2SCRB`
Title: Prepare v0.6.17 release candidate
Canonical task record: `.agentplane/tasks/202606042325-S2SCRB/README.md`

## Summary

Prepare v0.6.17 release candidate

Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.

## Scope

- In scope: Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
- Out of scope: unrelated refactors not required for "Prepare v0.6.17 release candidate".

## Verification

- State: ok
- Note: Post-rebase release candidate verification passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T23:25:48.534Z
- Branch: task/202606042325-S2SCRB/prepare-v0-6-17-release-candidate
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/tasks/202606042326-M1JYRV/README.md    | 189 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606042338-YX0GX0/README.md    | 189 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606042352-WY0RTM/README.md    | 189 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606050001-Y1Z967/README.md    | 196 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606050015-QS17HE/README.md    | 196 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606050016-CWE59S/README.md    | 195 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  22 +
 .agentplane/tasks/202606050018-8RC2VD/README.md    | 196 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606050026-DFCC8S/README.md    | 196 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606050028-DMF6BH/README.md    | 188 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  22 +
 .agentplane/tasks/202606050031-F42081/README.md    | 196 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  23 ++
 .agentplane/tasks/202606050035-YEAKJF/README.md    | 188 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  22 +
 .agentplane/tasks/202606050039-Z2T89H/README.md    | 195 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  22 +
 .agentplane/tasks/202606050043-B2MFPM/README.md    | 195 +++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++++
 .../quality-report.json                            |  22 +
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.17.md                           |  61 ++-
 package.json                                       |   6 +-
 packages/agentplane/package.json                   |  10 +-
 packages/agentplane/src/commands/pr/check.ts       |   5 +
 .../src/commands/pr/internal/freshness.test.ts     |  20 +
 .../src/commands/pr/internal/freshness.ts          |   2 +-
 .../src/commands/release/apply.preflight.plan.ts   |  44 +-
 .../src/commands/release/apply.preflight.test.ts   |  28 ++
 .../commands/release/release-ci-contract.test.ts   |   4 +-
 packages/core/package.json                         |   6 +-
 packages/recipes/package.json                      |   6 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   4 +-
 scripts/README.md                                  |  14 +-
 scripts/checks/check-knip-baseline.mjs             |  34 +-
 scripts/checks/run-depcruise-arch.mjs              | 106 +++++
 scripts/checks/run-tsup-build.mjs                  |  50 +++
 scripts/checks/run-typescript-build.mjs            |  52 +++
 scripts/checks/run-vitest-suite.mjs                |  15 +-
 88 files changed, 10383 insertions(+), 49 deletions(-)
```

</details>
