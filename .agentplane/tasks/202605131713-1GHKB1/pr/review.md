# PR Review

Created: 2026-05-13T17:46:20.298Z

## Task

- Task: `202605131713-1GHKB1`
- Title: Add public evaluator catalog commands
- Status: DOING
- Branch: `task/202605131713-1GHKB1/public-evaluator-catalog`
- Canonical task record: `.agentplane/tasks/202605131713-1GHKB1/README.md`

## Verification

- State: ok
- Note: Verification passed: typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:42:28.057Z
- Branch: task/202605131713-1GHKB1/public-evaluator-catalog
- Head: c6226453a93f

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
<!-- END AUTO SUMMARY -->
