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
- Note: Review fixes passed: typecheck; docs CLI freshness; builtin assets freshness; evaluator regression test; exact-file eslint/prettier; policy routing; doctor; local evaluator smoke for --builtin false and nested cwd.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:27:45.367Z
- Branch: task/202605131713-1GHKB1/public-evaluator-catalog
- Head: 828c6fe33f07

```text
 .agentplane/evaluators/recovery-context.md         |  47 ++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 ROADMAP.md                                         |   2 +
 docs/user/cli-reference.generated.mdx              |  63 +++
 docs/user/commands.mdx                             |  15 +
 .../assets/evaluators/recovery-context.md          |  47 ++
 packages/agentplane/assets/framework.manifest.json |   7 +
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  81 ++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   3 +
 .../src/cli/run-cli/command-catalog/project.ts     |   9 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/cli/run-cli/commands/init/execution.ts     |  18 +
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   8 +
 .../src/cli/run-cli/commands/init/steps/apply.ts   |  10 +
 .../cli/run-cli/commands/init/write-evaluators.ts  |  41 ++
 .../src/commands/evaluator/evaluator.command.ts    | 108 +++++
 .../src/commands/evaluator/evaluator.spec.ts       | 102 ++++
 packages/agentplane/src/commands/upgrade/policy.ts |   1 +
 packages/agentplane/src/evaluators/catalog.ts      | 127 +++++
 .../src/runtime/shared/runtime-artifacts.ts        |   1 +
 .../src/shared/builtin-assets.generated.ts         |   9 +-
 .../agentplane/src/shared/protected-paths.test.ts  |  21 +
 packages/agentplane/src/shared/protected-paths.ts  |   6 +-
 23 files changed, 1255 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
