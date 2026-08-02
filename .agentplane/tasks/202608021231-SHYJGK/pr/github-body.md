Task: `202608021231-SHYJGK`
Title: Remove the v0.7.1 matched CLI latency regression
Canonical task record: `.agentplane/tasks/202608021231-SHYJGK/README.md`

## Summary

Remove the v0.7.1 matched CLI latency regression

Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.

## Scope

- In scope: Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.
- Out of scope: unrelated refactors not required for "Remove the v0.7.1 matched CLI latency regression".

## Verification

- State: ok
- Note:

```text
Exact SHA cf1dfbb106f0c46ec549aecceef60b4f5fe203eb verified with frozen runtime evidence: 4687/4687
full tests, full contract, focused negative/replay checks, and 20-pair cold/warm matched latency all
pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T15:37:35.696Z
- Branch: task/202608021231-SHYJGK/remove-the-v0-7-1-matched-cli-latency-regression
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202608021232-6BTB6D/README.md    |   7 +-
 .agentplane/tasks/202608021534-J5G235/README.md    | 100 +++++++
 .agentplane/tasks/202608021534-YN84E1/README.md    | 101 +++++++
 .agentplane/tasks/202608021535-9EWFAB/README.md    | 101 +++++++
 .agentplane/tasks/202608021535-CNQKXP/README.md    | 101 +++++++
 packages/agentplane/package.json                   |   7 +-
 packages/agentplane/src/cli-bun.ts                 |  31 +++
 .../src/cli/run-cli.core.init.interactive.test.ts  |  12 +-
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |  11 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  33 ++-
 packages/agentplane/src/cli/run-cli.ts             |  53 +++-
 .../src/cli/run-cli/command-catalog-helpers.ts     |  55 ++++
 .../src/cli/run-cli/command-catalog-loader.ts      | 194 ++++++++++++++
 .../src/cli/run-cli/command-catalog.test.ts        |  25 ++
 .../agentplane/src/cli/run-cli/command-catalog.ts  |  49 +---
 .../run-cli/command-catalog/context-evaluator.ts   |   2 +-
 .../src/cli/run-cli/command-catalog/core-fast.ts   |  20 ++
 .../src/cli/run-cli/command-catalog/core.ts        |  10 +-
 .../src/cli/run-cli/command-catalog/hermes.ts      |   2 +-
 .../src/cli/run-cli/command-catalog/task-read.ts   |  36 +++
 .../src/cli/run-cli/command-catalog/task.ts        |  10 +-
 .../src/cli/run-cli/command-loaders/core.ts        |   9 +-
 .../src/cli/run-cli/command-loaders/evaluator.ts   |  17 +-
 .../src/cli/run-cli/command-loaders/project.ts     |  87 +++---
 .../src/cli/run-cli/command-loaders/task.ts        |  19 +-
 .../src/cli/run-cli/commands/init/run.ts           |  13 +
 .../src/cli/run-cli/commands/init/spec.ts          |  12 +-
 .../src/cli/run-cli/deferred-runtime-loader.ts     |  11 +
 .../agentplane/src/cli/run-cli/deferred-runtime.ts |  31 +++
 .../src/cli/run-cli/registry.run.test.ts           |   2 +-
 .../agentplane/src/cli/run-cli/registry.run.ts     |  14 +-
 .../evaluator/evaluator-catalog.command.ts         |   8 +-
 .../src/commands/evaluator/evaluator.command.ts    |  36 +--
 .../src/commands/hermes/hermes.command.ts          |  13 -
 .../release/bun-compiled-cli-smoke-script.test.ts  |   9 +-
 .../src/commands/task/advance.command.ts           |  46 +---
 .../agentplane/src/commands/task/advance.spec.ts   |  44 ++++
 packages/agentplane/src/commands/task/list.ts      |  28 +-
 .../agentplane/src/commands/task/run.command.ts    | 236 +----------------
 packages/agentplane/src/commands/task/run.spec.ts  | 226 ++++++++++++++++
 packages/agentplane/src/meta/version.ts            |  24 +-
 packages/agentplane/src/shared/errors.test.ts      |  20 ++
 packages/agentplane/src/shared/errors.ts           |  29 ++
 .../agentplane/src/shared/package-paths.test.ts    |  15 ++
 packages/agentplane/src/shared/package-paths.ts    |  38 +--
 packages/agentplane/tsup.config.ts                 |   5 +
 scripts/baselines/knip-baseline.json               |  14 +-
 .../baselines/v0.7-compatibility-candidate.json    |  83 ++++--
 .../check-compatibility-contract-baseline.mjs      | 147 +++++++++--
 scripts/generate/generate-bun-cli-assets.mjs       |   2 +-
 scripts/lib/package-tarball-policy.mjs             |  15 ++
 .../check-v0.7.1-product-contract.mjs              |  18 +-
 .../measure-v0.7.1-matched-cli-latency.mjs         | 293 ++++++++++++++++-----
 .../qualification/release-qualification.test.mjs   | 140 +++++++++-
 scripts/release/check-package-tarball.mjs          |   7 +-
 scripts/release/generate-cli-help-catalog.mjs      |  24 ++
 scripts/release/smoke-bun-compiled-cli.mjs         |  58 +++-
 57 files changed, 2101 insertions(+), 652 deletions(-)
```

</details>
