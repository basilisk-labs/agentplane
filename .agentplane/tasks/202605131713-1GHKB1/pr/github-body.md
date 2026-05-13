Task: `202605131713-1GHKB1`
Title: Add public evaluator catalog commands
Canonical task record: `.agentplane/tasks/202605131713-1GHKB1/README.md`

## Summary

Add public evaluator catalog commands

Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap.

## Scope

- In scope: Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap.
- Out of scope: unrelated refactors not required for "Add public evaluator catalog commands".

## Verification

- State: ok
- Note: Post-second-rebase verification passed: build; focused evaluator/init/upgrade/release-smoke and lifecycle contract tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:52:06.443Z
- Branch: task/202605131713-1GHKB1/public-evaluator-catalog
- Head: 79a606254d7f

```text
 .agentplane/evaluators/recovery-context.md         |  47 ++
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 ROADMAP.md                                         |   2 +
 docs/user/cli-reference.generated.mdx              |  84 ++++
 docs/user/commands.mdx                             |  15 +
 .../assets/evaluators/recovery-context.md          |  47 ++
 packages/agentplane/assets/framework.manifest.json |   7 +
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  58 +++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   3 +
 .../src/cli/run-cli/command-catalog/project.ts     |   9 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/cli/run-cli/commands/init/execution.ts     |  18 +
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   8 +
 .../src/cli/run-cli/commands/init/steps/apply.ts   |  10 +
 .../cli/run-cli/commands/init/write-evaluators.ts  |  41 ++
 .../src/commands/evaluator/evaluator.command.ts    | 101 ++++
 .../src/commands/evaluator/evaluator.spec.ts       |  90 ++++
 packages/agentplane/src/commands/upgrade/policy.ts |   1 +
 packages/agentplane/src/evaluators/catalog.ts      | 127 +++++
 .../src/runtime/shared/runtime-artifacts.ts        |   1 +
 .../src/shared/builtin-assets.generated.ts         |   9 +-
 .../agentplane/src/shared/protected-paths.test.ts  |  21 +
 packages/agentplane/src/shared/protected-paths.ts  |   6 +-
 23 files changed, 1220 insertions(+), 3 deletions(-)
```

</details>
