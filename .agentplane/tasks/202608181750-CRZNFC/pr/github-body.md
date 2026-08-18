Task: `202608181750-CRZNFC`
Title: Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already re...
Canonical task record: `.agentplane/tasks/202608181750-CRZNFC/README.md`

## Summary

Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.

Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.

## Scope

- In scope: Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-18T17:51:51.714Z
- Branch: task/202608181750-CRZNFC/qualify-and-publish-agentplane-0-7-7-from-exact
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .../risk-e2e/logs/hosted-boundary-matrix.log       |   7 -
 .../risk-e2e/logs/packaged-candidate-flow.log      |   5 -
 .../samples/sample-01.events.jsonl                 |   1 -
 .../samples/sample-01.stderr.log                   |   2 -
 .../samples/sample-01.stdout.log                   | 123 ----------------
 .../samples/sample-02.events.jsonl                 |   1 -
 .../samples/sample-02.stderr.log                   |   2 -
 .../samples/sample-02.stdout.log                   | 123 ----------------
 .../samples/sample-03.events.jsonl                 |   1 -
 .../samples/sample-03.stderr.log                   |   2 -
 .../samples/sample-03.stdout.log                   | 123 ----------------
 .../samples/sample-04.events.jsonl                 |   1 -
 .../samples/sample-04.stderr.log                   |   2 -
 .../samples/sample-04.stdout.log                   | 123 ----------------
 .../samples/sample-05.events.jsonl                 |   1 -
 .../samples/sample-05.stderr.log                   |   2 -
 .../samples/sample-05.stdout.log                   | 123 ----------------
 .../samples/sample-01.events.jsonl                 |   1 -
 .../samples/sample-01.stderr.log                   |   2 -
 .../samples/sample-01.stdout.log                   | 124 ----------------
 .../samples/sample-02.events.jsonl                 |   1 -
 .../samples/sample-02.stderr.log                   |   2 -
 .../samples/sample-02.stdout.log                   | 124 ----------------
 .../samples/sample-03.events.jsonl                 |   1 -
 .../samples/sample-03.stderr.log                   |   2 -
 .../samples/sample-03.stdout.log                   | 124 ----------------
 .../samples/sample-04.events.jsonl                 |   1 -
 .../samples/sample-04.stderr.log                   |   2 -
 .../samples/sample-04.stdout.log                   | 124 ----------------
 .../samples/sample-05.events.jsonl                 |   1 -
 .../samples/sample-05.stderr.log                   |   2 -
 .../samples/sample-05.stdout.log                   | 124 ----------------
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/reference/generated-reference.mdx             |  14 +-
 package.json                                       |   2 +-
 packages/agentplane/package.json                   |   6 +-
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   6 +
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   6 +
 ...-cli.core.pr-flow.integrate-rebase-race.test.ts |   8 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |   6 +
 .../evaluator/evaluator-execute.command.test.ts    |   4 +-
 .../evaluator-qualification-packet.test.ts         |   2 +-
 .../commands/pr/integrate/internal/prepare.test.ts |   3 +
 .../branch-task-artifact-ownership.test.ts         |  85 +++++++++--
 .../pr/internal/branch-task-artifact-ownership.ts  |  22 ++-
 .../task-run-lifecycle-replay-security.test.ts     | 162 +++++++++++----------
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 packages/testkit/src/github-pr.ts                  |   8 +-
 scripts/README.md                                  |  24 +--
 .../baselines/v0.7-compatibility-candidate.json    |   6 +-
 scripts/checks/run-fast-ci-tests.mjs               |   2 +-
 69 files changed, 272 insertions(+), 1441 deletions(-)
```

</details>
